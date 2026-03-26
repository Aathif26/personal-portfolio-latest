'use client';

import React, { useState, useEffect } from 'react';
import EditorContainer from '@/components/admin/EditorContainer';
import { fetchCapabilities, updateCapabilities } from '@/actions/contentActions';
import { Plus, Trash2, Tag, MoveUp, MoveDown } from 'lucide-react';

export default function CapabilitiesAdmin() {
  const [capabilities, setCapabilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchCapabilities();
      setCapabilities(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    await updateCapabilities(capabilities);
  };

  const addCapability = () => {
    setCapabilities([
      ...capabilities,
      {
        title: "New Capability",
        description: "Description of your capability",
        icon: "layout",
        iconColor: "blue",
        iconBg: "bg-blue-500/10",
        tags: ["Tag 1"],
        className: "md:col-span-1"
      }
    ]);
  };

  const removeCapability = (index: number) => {
    setCapabilities(capabilities.filter((_, i) => i !== index));
  };

  const updateField = (index: number, field: string, value: any) => {
    const next = [...capabilities];
    next[index] = { ...next[index], [field]: value };
    setCapabilities(next);
  };

  const moveCapability = (index: number, direction: 'up' | 'down') => {
    const next = [...capabilities];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= next.length) return;
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setCapabilities(next);
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground font-mono">Loading workspace...</div>;

  return (
    <EditorContainer title="Manage Capabilities" onSave={handleSave}>
      <div className="space-y-8">
        {capabilities.map((cap, index) => (
          <div key={index} className="group relative rounded-2xl border border-border bg-background/50 p-6 transition-all hover:border-primary/30">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => moveCapability(index, 'up')}
                className="p-1.5 rounded-lg bg-surface-2 border border-border hover:text-primary transition-colors"
                disabled={index === 0}
              >
                <MoveUp className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => moveCapability(index, 'down')}
                className="p-1.5 rounded-lg bg-surface-2 border border-border hover:text-primary transition-colors"
                disabled={index === capabilities.length - 1}
              >
                <MoveDown className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Title</label>
                    <input
                      value={cap.title}
                      onChange={(e) => updateField(index, 'title', e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Icon Identifier</label>
                    <select
                      value={cap.icon}
                      onChange={(e) => updateField(index, 'icon', e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    >
                      <option value="layout">Layout (Frontend)</option>
                      <option value="server">Server (Backend)</option>
                      <option value="brain">Brain (AI/ML)</option>
                      <option value="terminal">Terminal (DevOps)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Description</label>
                  <input
                    value={cap.description}
                    onChange={(e) => updateField(index, 'description', e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tags (Comma separated)</label>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <input
                      value={cap.tags.join(', ')}
                      onChange={(e) => updateField(index, 'tags', e.target.value.split(',').map(t => t.trim()))}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      placeholder="Next.js, React, TypeScript..."
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeCapability(index)}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                title="Remove Capability"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addCapability}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-6 text-muted-foreground hover:border-primary hover:text-primary transition-all group"
        >
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          <span className="font-semibold text-sm">Add New Capability Area</span>
        </button>
      </div>
    </EditorContainer>
  );
}
