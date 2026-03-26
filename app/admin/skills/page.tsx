'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import EditorContainer from '@/components/admin/EditorContainer';
import { updateSkills, fetchSkills } from '@/actions/contentActions';
import { Skill } from '@/types';

export default function SkillsEditorPage() {
  const [skills, setSkills] = useState<Skill[] | null>(null);

  useEffect(() => {
    fetchSkills().then(setSkills);
  }, []);

  const handleSave = async () => {
    if (skills) {
      await updateSkills(skills);
    }
  };

  const addSkill = () => {
    if (skills) {
      setSkills([...skills, { name: 'New Skill', level: 80, category: 'frontend' }]);
    }
  };

  const removeSkill = (index: number) => {
    if (skills) {
      setSkills(skills.filter((_, i) => i !== index));
    }
  };

  const updateSkill = (index: number, updates: Partial<Skill>) => {
    if (skills) {
      const newSkills = [...skills];
      newSkills[index] = { ...newSkills[index], ...updates };
      setSkills(newSkills);
    }
  };

  if (!skills) return <div className="p-8 text-center text-muted-foreground">Loading skills...</div>;

  return (
    <EditorContainer title="Manage Skills" onSave={handleSave}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Manage your technical skills and proficiency levels.</p>
          <button
            onClick={addSkill}
            className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
          >
            <Plus className="h-4 w-4" />
            Add Skill
          </button>
        </div>

        <div className="grid gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4 transition-colors hover:border-primary/30"
            >
              <div className="flex-1 grid grid-cols-12 gap-4">
                <div className="col-span-5 space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Skill Name</label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, { name: e.target.value })}
                    className="w-full bg-transparent text-sm font-medium focus:outline-none"
                  />
                </div>
                <div className="col-span-3 space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Category</label>
                  <select
                    value={skill.category}
                    onChange={(e) => updateSkill(index, { category: e.target.value as any })}
                    className="w-full bg-transparent text-sm focus:outline-none"
                  >
                    <option value="ai">AI</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="devops">DevOps</option>
                    <option value="database">Database</option>
                  </select>
                </div>
                <div className="col-span-4 space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Level ({skill.level}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => updateSkill(index, { level: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
              <button
                onClick={() => removeSkill(index)}
                className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-destructive transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </EditorContainer>
  );
}
