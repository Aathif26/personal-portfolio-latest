'use client';

import React, { useState, useEffect } from 'react';
import EditorContainer from '@/components/admin/EditorContainer';
import { fetchExperience, updateExperience } from '@/actions/contentActions';
import { Plus, Trash2, Calendar, Building2, Briefcase, ChevronRight, MoveUp, MoveDown } from 'lucide-react';

export default function ExperienceAdmin() {
  const [experience, setExperience] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchExperience();
      setExperience(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    await updateExperience(experience);
  };

  const addExperience = () => {
    setExperience([
      {
        id: `exp-${Date.now()}`,
        role: "New Role",
        company: "Company Name",
        period: "2023 — Present",
        description: "Role summary description...",
        achievements: ["Highlight 1", "Highlight 2"]
      },
      ...experience,
    ]);
  };

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const updateField = (index: number, field: string, value: any) => {
    const next = [...experience];
    next[index] = { ...next[index], [field]: value };
    setExperience(next);
  };

  const updateAchievement = (index: number, achIndex: number, value: string) => {
    const next = [...experience];
    const nextAchs = [...next[index].achievements];
    nextAchs[achIndex] = value;
    next[index].achievements = nextAchs;
    setExperience(next);
  };

  const addAchievement = (index: number) => {
    const next = [...experience];
    next[index].achievements = [...next[index].achievements, "New achievement..."];
    setExperience(next);
  };

  const removeAchievement = (index: number, achIndex: number) => {
    const next = [...experience];
    next[index].achievements = next[index].achievements.filter((_: any, i: number) => i !== achIndex);
    setExperience(next);
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const next = [...experience];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= next.length) return;
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setExperience(next);
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground font-mono">Loading timeline...</div>;

  return (
    <EditorContainer title="Manage Professional Journey" onSave={handleSave}>
      <div className="space-y-8">
        <button
          onClick={addExperience}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-6 text-muted-foreground hover:border-primary hover:text-primary transition-all group bg-surface-1/30"
        >
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          <span className="font-semibold">Add New Career Milestone</span>
        </button>

        {experience.map((exp, index) => (
          <div key={exp.id} className="group relative rounded-3xl border border-border bg-background p-8 transition-all hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-primary/5">
            <div className="absolute -left-3 top-10 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => moveExperience(index, 'up')}
                className="p-1.5 rounded-lg bg-surface-2 border border-border hover:text-primary transition-colors"
                disabled={index === 0}
              >
                <MoveUp className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => moveExperience(index, 'down')}
                className="p-1.5 rounded-lg bg-surface-2 border border-border hover:text-primary transition-colors"
                disabled={index === experience.length - 1}
              >
                <MoveDown className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Briefcase className="h-3 w-3" /> Role Title
                    </label>
                    <input
                      value={exp.role}
                      onChange={(e) => updateField(index, 'role', e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Building2 className="h-3 w-3" /> Company
                    </label>
                    <input
                      value={exp.company}
                      onChange={(e) => updateField(index, 'company', e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> Period
                    </label>
                    <input
                      value={exp.period}
                      onChange={(e) => updateField(index, 'period', e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="2022 — Present"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">High-level Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateField(index, 'description', e.target.value)}
                    className="w-full min-h-[80px] rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Key Achievements</label>
                    <button
                      onClick={() => addAchievement(index)}
                      className="text-[10px] font-bold uppercase text-primary hover:underline"
                    >
                      + Add Achievement
                    </button>
                  </div>
                  <div className="space-y-3">
                    {exp.achievements.map((ach: string, achIndex: number) => (
                      <div key={achIndex} className="flex items-start gap-2 group/ach">
                        <div className="h-8 w-1.5 rounded-full bg-primary/20 shrink-0 mt-1" />
                        <textarea
                          value={ach}
                          onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                          className="flex-1 min-h-[40px] rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary outline-none transition-all"
                        />
                        <button
                          onClick={() => removeAchievement(index, achIndex)}
                          className="opacity-0 group-hover/ach:opacity-100 p-2 text-muted-foreground hover:text-destructive transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeExperience(index)}
                className="mt-6 p-2 text-muted-foreground hover:text-destructive transition-colors shrink-0"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </EditorContainer>
  );
}
