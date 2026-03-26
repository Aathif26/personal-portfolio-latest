'use client';

import Link from 'next/link';
import { 
  User, 
  FileText, 
  Settings, 
  Briefcase,
  ArrowRight
} from 'lucide-react';

const stats = [
  { label: 'Hero Section', href: '/admin/hero', icon: User, color: 'text-blue-500' },
  { label: 'About Content', href: '/admin/about', icon: FileText, color: 'text-purple-500' },
  { label: 'Skills List', href: '/admin/skills', icon: Settings, color: 'text-orange-500' },
  { label: 'Projects', href: '/admin/projects', icon: Briefcase, color: 'text-green-500' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Welcome back! Manage your portfolio content below.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <div className={`rounded-xl bg-muted p-3 w-fit ${item.color}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">{item.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Manage {item.label.toLowerCase()}</p>
            </div>
            <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Go to editor <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-8">
        <h2 className="text-xl font-bold">Quick Actions</h2>
        <div className="mt-6 grid gap-4 overflow-hidden border-t border-border pt-6 sm:grid-cols-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-muted"
          >
            <div>
              <p className="font-medium">View Live Portfolio</p>
              <p className="text-sm text-muted-foreground">Open your website in a new tab</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div className="flex items-center justify-between rounded-xl border border-border p-4 opacity-50 cursor-not-allowed">
            <div>
              <p className="font-medium inline-flex items-center gap-2">
                Settings <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Coming Soon</span>
              </p>
              <p className="text-sm text-muted-foreground">System preferences and account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
