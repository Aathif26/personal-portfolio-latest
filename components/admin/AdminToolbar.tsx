'use client';

import React from 'react';
import Link from 'next/link';
import { Settings, Eye, Edit3, LayoutDashboard, LogOut } from 'lucide-react';
import { useAdmin } from '../providers/AdminProvider';
import { logout } from '@/actions/authActions';

export default function AdminToolbar() {
  const { isAdmin, isEditMode, toggleEditMode } = useAdmin();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-100 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-full border border-border bg-surface-1/80 p-2 shadow-2xl backdrop-blur-xl transition-colors duration-300">
        <div className="flex items-center gap-1 border-r border-border pr-2 mr-1">
          <Link
            href="/admin/dashboard"
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            title="Admin Dashboard"
          >
            <LayoutDashboard className="h-5 w-5" />
          </Link>
        </div>

        <button
          onClick={toggleEditMode}
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            isEditMode 
              ? 'bg-primary text-primary-foreground shadow-inner' 
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          {isEditMode ? (
            <>
              <Edit3 className="h-4 w-4" />
              <span>Edit Mode ON</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span>Preview Mode</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1 border-l border-border pl-2 ml-1">
          <button
            onClick={() => logout()}
            className="rounded-full p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
