'use client';

import React, { useState } from 'react';
import { Save, CheckCircle, Loader2 } from 'lucide-react';

interface EditorContainerProps {
  title: string;
  onSave: () => Promise<void>;
  children: React.ReactNode;
}

export default function EditorContainer({ title, onSave, children }: EditorContainerProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      await onSave();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and update your portfolio content manually.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : success ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {loading ? 'Saving Changes...' : success ? 'Saved Successfully' : 'Save Changes'}
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-surface-1 p-8 shadow-xl shadow-black/5">
        {children}
      </div>
      
      {success && (
        <div className="fixed bottom-8 right-8 flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-white shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle className="h-5 w-5" />
          <span>Changes saved successfully!</span>
        </div>
      )}
    </div>
  );
}
