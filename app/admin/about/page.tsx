'use client';

import { useEffect, useState } from 'react';
import EditorContainer from '@/components/admin/EditorContainer';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import { updateAbout, fetchAbout } from '@/actions/contentActions';

export default function AboutEditorPage() {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetchAbout().then(setContent);
  }, []);

  const handleSave = async () => {
    if (content !== null) {
      await updateAbout(content);
    }
  };

  if (content === null) return <div className="p-8 text-center text-muted-foreground">Loading about content...</div>;

  return (
    <EditorContainer title="Edit About Section" onSave={handleSave}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Use Markdown to format your biography. This will be displayed in the About section of your portfolio.
        </p>
        <MarkdownEditor value={content} onChange={(val) => setContent(val || '')} />
      </div>
    </EditorContainer>
  );
}
