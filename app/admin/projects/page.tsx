'use client';

import { useEffect, useState } from 'react';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  ExternalLink, 
  Github, 
  Image as ImageIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import EditorContainer from '@/components/admin/EditorContainer';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import { updateProjects, reorderProjects, fetchProjects } from '@/actions/contentActions';
import { Project } from '@/types';

function SortableProjectItem({ 
  project, 
  onDelete, 
  onUpdate 
}: { 
  project: Project; 
  onDelete: () => void; 
  onUpdate: (updates: Partial<Project>) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group rounded-xl border border-border bg-muted/20 ${isDragging ? 'opacity-50 shadow-2xl' : ''}`}
    >
      <div className="flex items-center gap-4 p-4">
        <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground hover:text-primary">
          <GripVertical className="h-5 w-5" />
        </button>
        
        <div className="flex-1 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-8">
            <h3 className="font-semibold">{project.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
          </div>
          <div className="col-span-3 text-right">
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded uppercase font-bold">
              {project.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <button 
            onClick={onDelete}
            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-border p-6 space-y-6 bg-card rounded-b-xl">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                value={project.category}
                onChange={(e) => onUpdate({ category: e.target.value as any })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="AI">AI</option>
                <option value="Web">Web</option>
                <option value="Full-Stack">Full-Stack</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Data">Data</option>
              </select>
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Brief Description</label>
              <input
                type="text"
                value={project.description}
                onChange={(e) => onUpdate({ description: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Full Description (Markdown)</label>
              <MarkdownEditor 
                value={project.longDescription} 
                onChange={(val) => onUpdate({ longDescription: val || '' })} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <input
                type="text"
                value={project.imageUrl}
                onChange={(e) => onUpdate({ imageUrl: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Featured</label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={project.featured}
                  onChange={(e) => onUpdate({ featured: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">Show as featured project</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium inline-flex items-center gap-2">
                <Github className="h-3 w-3" /> GitHub URL
              </label>
              <input
                type="text"
                value={project.githubUrl || ''}
                onChange={(e) => onUpdate({ githubUrl: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium inline-flex items-center gap-2">
                <ExternalLink className="h-3 w-3" /> Live URL
              </label>
              <input
                type="text"
                value={project.liveUrl || ''}
                onChange={(e) => onUpdate({ liveUrl: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsManagerPage() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data?.sort((a, b) => a.order - b.order) || []);
    });
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && projects) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex);
      // Update order property
      const orderedProjects = newProjects.map((p, i) => ({ ...p, order: i + 1 }));
      setProjects(orderedProjects);
    }
  };

  const addProject = () => {
    if (!projects) return;
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: 'New Project',
      description: 'A brief description of your new project.',
      longDescription: 'Detailed project description...',
      techStack: [],
      imageUrl: '',
      category: 'Web',
      featured: false,
      order: projects.length + 1
    };
    setProjects([...projects, newProject]);
  };

  const deleteProject = (id: string) => {
    if (!projects) return;
    setProjects(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    if (!projects) return;
    setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleSave = async () => {
    if (projects) {
      await updateProjects(projects);
    }
  };

  if (!projects) return <div className="p-8 text-center text-muted-foreground">Loading projects...</div>;

  return (
    <EditorContainer title="Manage Projects" onSave={handleSave}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Manage your works. Drag items to reorder them on your live portfolio.
          </p>
          <button
            onClick={addProject}
            className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projects.map(p => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {projects.map((project) => (
                <SortableProjectItem
                  key={project.id}
                  project={project}
                  onDelete={() => deleteProject(project.id)}
                  onUpdate={(updates) => updateProject(project.id, updates)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </EditorContainer>
  );
}
