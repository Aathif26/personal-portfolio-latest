'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import { useTheme } from '@/hooks/useTheme';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownEditorProps {
  value: string;
  onChange: (value?: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const { theme } = useTheme();

  return (
    <div className="md-editor-container" data-color-mode={theme}>
      <MDEditor
        value={value}
        onChange={onChange}
        preview="live"
        height={400}
        style={{
          borderRadius: '1rem',
          overflow: 'hidden',
          backgroundColor: 'transparent',
          border: '1px solid var(--border)',
        }}
      />
    </div>
  );
}
