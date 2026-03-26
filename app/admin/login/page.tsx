'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LogIn, Loader2 } from 'lucide-react';
import { login } from '@/actions/authActions';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-surface-1 p-10 shadow-2xl relative z-10 backdrop-blur-sm">
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
            <LogIn className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Admin Portal</h1>
          <p className="mt-2 text-sm text-muted-foreground">Identify yourself to manage Alex Chen's Space</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="admin"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 px-4 py-2 text-center text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Access Workspace'}
          </button>
        </form>

        <div className="pt-4 text-center">
          <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
            ← Return to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
