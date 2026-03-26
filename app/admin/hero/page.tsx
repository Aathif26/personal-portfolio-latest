'use client';

import { useEffect, useState } from 'react';
import EditorContainer from '@/components/admin/EditorContainer';
import { updateHero, fetchHero } from '@/actions/contentActions';
import { HeroData } from '@/types';

export default function HeroEditorPage() {
  const [data, setData] = useState<HeroData | null>(null);

  useEffect(() => {
    fetchHero().then(setData);
  }, []);

  const handleSave = async () => {
    if (data) {
      await updateHero(data);
    }
  };

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading hero data...</div>;

  return (
    <EditorContainer title="Edit Hero Section" onSave={handleSave}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="col-span-2 space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">CTA Text</label>
          <input
            type="text"
            value={data.ctaText}
            onChange={(e) => setData({ ...data, ctaText: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">CTA Link</label>
          <input
            type="text"
            value={data.ctaLink}
            onChange={(e) => setData({ ...data, ctaLink: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="col-span-2 space-y-2">
          <label className="text-sm font-medium">Highlight Text</label>
          <input
            type="text"
            value={data.highlightText}
            onChange={(e) => setData({ ...data, highlightText: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    </EditorContainer>
  );
}
