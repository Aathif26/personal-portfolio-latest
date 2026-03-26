'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Briefcase, 
  FileText, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { logout } from '@/actions/authActions';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Hero', href: '/admin/hero', icon: User },
  { label: 'About', href: '/admin/about', icon: FileText },
  { label: 'Capabilities', href: '/admin/capabilities', icon: Settings },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Skills', href: '/admin/skills', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: Briefcase },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-surface-2 transition-colors duration-300">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 px-6 py-8">
            <div className="h-9 w-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Settings className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight uppercase">Admin</span>
              <span className="text-[10px] text-muted-foreground font-mono">v1.2.0</span>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10' 
                      : 'text-muted-foreground hover:bg-surface-3 hover:text-foreground'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground/70'}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border mt-auto">
            <button
              onClick={() => logout()}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header Bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/admin/dashboard" className="hover:text-primary transition-colors">Admin</Link>
            <ChevronRight className="h-4 w-4 opacity-50" />
            <span className="text-foreground font-semibold capitalize">
              {pathname?.split('/').pop()?.replace(/-/g, ' ')}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors flex items-center gap-2">
              <LayoutDashboard className="h-3.5 w-3.5" />
              View Website
            </Link>
          </div>
        </header>

        <main className="p-8 pb-20">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
