'use client';

import React, { useState } from 'react';
import { Edit2, X, Check } from 'lucide-react';
import { useAdmin } from '../providers/AdminProvider';

export interface EditableSectionProps {
  id: string;
  label: string;
  onSave: (data: any) => Promise<any>;
  children: React.ReactNode;
  currentData: any;
  isMarkdown?: boolean;
}

export function EditableSection({ 
  id: sectionId, 
  label,
  onSave, 
  children, 
  currentData,
  isMarkdown = false
}: EditableSectionProps) {
  const { isEditMode } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(currentData);

  if (!isEditMode) return <>{children}</>;

  const handleSave = async () => {
    try {
      const result = await onSave(tempData);
      if (result?.error) {
        alert(`Error: ${result.error}`);
        return;
      }
      setIsEditing(false);
    } catch (error) {
      alert("An unexpected error occurred while saving.");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setTempData(currentData);
    setIsEditing(false);
  };

  return (
    <div className="relative group/editable border-2 border-transparent hover:border-primary/30 transition-colors rounded-xl p-2 -m-2">
      {/* Label/Header */}
      <div className="absolute -top-3 left-4 z-50 px-2 py-0.5 bg-primary text-[10px] font-bold text-white rounded uppercase tracking-wider opacity-0 group-hover/editable:opacity-100 transition-opacity">
        {label}
      </div>

      {/* Edit Button Toggle */}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute right-4 top-4 z-50 rounded-full bg-primary p-2 text-primary-foreground opacity-0 shadow-lg transition-opacity group-hover/editable:opacity-100"
        >
          <Edit2 className="h-4 w-4" />
        </button>
      )}

      {/* Editor UI */}
      {isEditing ? (
        <div className="relative z-60 surface-2 p-6 rounded-2xl border border-primary/30 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display font-bold text-lg">Editing {label}</h4>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors"
              >
                <Check className="h-3.5 w-3.5" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-surface-3 text-foreground font-semibold text-sm hover:bg-surface-2 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {isMarkdown ? (
              <textarea
                value={tempData}
                onChange={(e) => setTempData(e.target.value)}
                className="w-full min-h-[300px] p-4 bg-background border border-border rounded-xl font-mono text-sm focus:border-primary outline-hidden"
              />
            ) : (
              <div className="p-4 bg-background border border-border rounded-xl text-center text-muted-foreground italic">
                Inline JSON editing is simplified. Please use the <a href="/admin/dashboard" className="text-primary hover:underline">Admin Dashboard</a> for better field control.
              </div>
            )}
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
