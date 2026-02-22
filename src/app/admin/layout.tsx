"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileSpreadsheet, 
  Settings, 
  BarChart3, 
  LogOut,
  GraduationCap,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: FileSpreadsheet, label: 'Applications', href: '/admin/applications' },
  { icon: Users, label: 'Staff Management', href: '/admin/staff' },
  { icon: BarChart3, label: 'Reports', href: '/admin/reports' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#f8faf9]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a472a] text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-headline text-xl leading-tight">Greenfield</h1>
            <p className="text-[10px] uppercase tracking-widest text-accent font-bold">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
                  isActive 
                    ? "bg-[#f0f7f4] text-[#1a472a] shadow-inner" 
                    : "hover:bg-white/5 text-white/70 hover:text-white"
                )}>
                  <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-white/40")} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button variant="ghost" className="w-full justify-start gap-3 text-white/60 hover:text-white hover:bg-white/5">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-headline text-primary capitalize">
              {pathname.split('/').pop() || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-primary">Admin User</p>
                <p className="text-[10px] text-muted-foreground uppercase">Admissions Dept</p>
              </div>
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/admin/40/40" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Area */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
