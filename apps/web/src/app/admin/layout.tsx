'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  FileCheck,
  Users,
  School,
  AlertTriangle,
  History,
  ShieldCheck,
  ExternalLink,
  LogOut,
  Radio,
  Search,
  Bell,
  Clock,
  Sparkles,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const adminNavItems: NavItem[] = [
  {
    name: 'Overview Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Driver Verifications',
    href: '/admin/verifications',
    icon: FileCheck,
    badge: 'KYC',
    badgeColor: 'bg-[#EAF6ED] text-[#094718] border-[#BCE6C9]',
  },
  {
    name: 'User Management',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: 'Schools & Routes',
    href: '/admin/schools',
    icon: School,
  },
  {
    name: 'Safety & Complaints',
    href: '/admin/complaints',
    icon: AlertTriangle,
    badge: 'Active',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  {
    name: 'Security Audit Logs',
    href: '/admin/audit-logs',
    icon: History,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState('');

  // Sri Lanka Time ticker
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Colombo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Protect Admin route
  React.useEffect(() => {
    if (!isLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen flex bg-[#FAFDF9] text-[#0B2C22] selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* ======================================================== */}
      {/* 1. DESKTOP SIDEBAR (WHITE CARDS + GREEN FONTS)           */}
      {/* ======================================================== */}
      <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-emerald-100/80 bg-white p-5 shrink-0 select-none shadow-[2px_0_12px_rgba(0,0,0,0.02)]">
        <div className="space-y-6">
          
          {/* Logo & Root Tag */}
          <div className="space-y-3 pb-4 border-b border-emerald-100/80">
            <Link href="/" className="inline-block group">
              <div className="px-3.5 py-2 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all inline-flex items-center">
                <Image
                  src="/logo.png"
                  alt="SchoolRide LK"
                  width={160}
                  height={32}
                  priority
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>
            
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#16A34A] flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
                Root Authority
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF6ED] text-[#094718] border border-[#BCE6C9]">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#4E6258]">
              Operations &amp; Security
            </div>
            {adminNavItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group ${
                    active
                      ? 'bg-[#094718] text-white shadow-sm font-bold'
                      : 'text-[#4E6258] hover:bg-[#EAF6ED] hover:text-[#094718]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        active ? 'text-white' : 'text-[#709080] group-hover:text-[#094718]'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        active ? 'bg-white/20 text-white border-white/30' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Shortcuts */}
          <div className="p-3.5 rounded-2xl bg-[#F4FAF5] border border-emerald-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#094718] block">
              Island-Wide Coverage
            </span>
            <p className="text-[11px] text-[#4E6258] leading-snug">
              Monitoring verified school van operations across Western, Central &amp; Southern provinces.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[10px] font-semibold text-[#094718]">
              <Radio className="h-3.5 w-3.5 text-[#16A34A] animate-pulse" />
              <span>Real-time GPS Active</span>
            </div>
          </div>
        </div>

        {/* Sidebar Footer: System Status & User Profile */}
        <div className="space-y-4 pt-4 border-t border-emerald-100/80">
          <div className="flex items-center gap-2.5 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] font-bold text-xs border border-[#CDE9D3] shadow-sm">
              {user?.fullName?.slice(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#0B2C22] truncate">{user?.fullName || 'Root Admin'}</div>
              <div className="text-[10px] text-[#16A34A] truncate font-medium">superadmin@schoolride.lk</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" className="flex-1">
              <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAFDF9] hover:bg-[#EAF6ED] text-[11px] font-semibold text-[#094718] border border-emerald-200 transition-colors cursor-pointer">
                <span>Public Site</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </Link>
            <button
              onClick={() => logout()}
              title="Logout"
              className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA WITH WHITE TOPBAR                   */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 sm:px-8 border-b border-emerald-100/80 bg-white/95 backdrop-blur-md">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Image
              src="/logo.png"
              alt="SchoolRide LK"
              width={130}
              height={26}
              className="h-6 w-auto object-contain"
            />
          </div>

          {/* Breadcrumb / Title */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-[#4E6258]">
            <Link href="/admin/dashboard" className="hover:text-[#094718] transition-colors">
              SchoolRide LK Admin
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#16A34A]" />
            <span className="text-[#0B2C22] font-bold capitalize">
              {pathname.replace('/admin/', '').replace('-', ' ') || 'Dashboard'}
            </span>
          </div>

          {/* Right Header Status Widgets */}
          <div className="flex items-center gap-4">
            {/* Live Sri Lanka Time */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF6ED] border border-[#CDE9D3] text-xs font-mono text-[#094718] font-bold">
              <Clock className="h-3.5 w-3.5 text-[#16A34A]" />
              <span>{currentTime || '08:30:00 AM'} SLST</span>
            </div>

            {/* Mock API indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF7EE] border border-[#BCE6C9] text-[11px] font-bold text-[#094718] shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span>API :4000</span>
              <span className="text-[#16A34A] font-mono text-[10px]">CONNECTED</span>
            </div>

            <Link href="/" className="hidden md:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-[#094718] border-emerald-200 hover:bg-[#EAF6ED] hover:text-[#073713] text-xs font-bold"
              >
                View Public Site <ExternalLink className="h-3 w-3 ml-1.5" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden p-4 bg-white border-b border-emerald-100 space-y-2">
            {adminNavItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                    active
                      ? 'bg-[#094718] text-white font-bold'
                      : 'text-[#4E6258] hover:bg-[#EAF6ED] hover:text-[#094718]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Page Content: White cards with green fonts on light canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#FAFDF9]">
          {children}
        </main>
      </div>

    </div>
  );
}
