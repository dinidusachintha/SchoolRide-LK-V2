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
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
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
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
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

  // Close drawer on route change and Escape key; lock body scroll when open
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  // Protect Admin route
  React.useEffect(() => {
    if (!isLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen flex bg-[#0B1528] text-slate-900 selection:bg-[#0B2345] selection:text-white antialiased font-sans admin-dashboard">
      
      {/* ======================================================== */}
      {/* 1. DESKTOP SIDEBAR (DARK NAVY BLUE THEME)               */}
      {/* ======================================================== */}
      <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-white/10 bg-[#0B1528] p-5 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.25)] text-white">
        <div className="space-y-6">
          
          {/* Logo & Root Tag */}
          <div className="space-y-3 pb-4 border-b border-white/10">
            <Link href="/" className="inline-block group">
              <div className="px-3.5 py-2 rounded-2xl bg-[#0F223D] border border-white/15 shadow-sm transition-all inline-flex items-center">
                <Image
                  src="/logo.png"
                  alt="SchoolRide LK"
                  width={150}
                  height={30}
                  priority
                  className="h-7 w-auto object-contain brightness-110"
                />
              </div>
            </Link>
            
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-200 flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-[#FFC928] animate-pulse" />
                Root Authority
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFC928]/15 text-[#FFC928] border border-[#FFC928]/30">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Operations &amp; Security
            </div>
            {adminNavItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#162C52] text-white font-bold border border-blue-400/30 shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? 'text-[#FFC928]' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${active ? 'bg-white/20 text-white border-white/30' : item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout at Bottom */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white text-xs font-extrabold shrink-0 border border-white/20 shadow-inner">
                {(user?.fullName || 'Admin')
                  .split(' ')
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-white truncate">
                  {user?.fullName || 'System Administrator'}
                </p>
                <p className="text-[10px] font-semibold text-slate-400">
                  {user?.role || 'Root Authority'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => logout()}
              title="Logout"
              aria-label="Sign out of Admin Console"
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA (CLEAN WHITE CANVAS)                */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Topbar: Upper Section (Yellow Brand Theme) */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 sm:px-8 border-b border-[#E5B21D] bg-[#FFC928] text-[#0B1528] shadow-sm">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="admin-mobile-drawer"
              aria-label="Toggle Admin Navigation"
              className="p-2 rounded-xl bg-[#0B1528]/10 text-[#0B1528] border border-[#0B1528]/15 hover:bg-[#0B1528]/15 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Image
              src="/logo.png"
              alt="SchoolRide LK"
              width={120}
              height={24}
              className="h-6 w-auto object-contain"
            />
          </div>

          {/* Breadcrumb / Title */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-[#0B1528]/80">
            <Link href="/admin/dashboard" className="hover:text-[#0B1528] transition-colors font-bold">
              SchoolRide LK Admin
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#0B1528]/60" />
            <span className="text-[#0B1528] font-black capitalize tracking-tight">
              {pathname.replace('/admin/', '').replace('-', ' ') || 'Dashboard'}
            </span>
          </div>

          {/* Right Header Status Widgets */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Live Sri Lanka Time */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1528]/10 border border-[#0B1528]/15 text-xs font-mono text-[#0B1528] font-bold">
              <Clock className="h-3.5 w-3.5 text-[#0B1528]" />
              <span suppressHydrationWarning>{currentTime || '08:30:00 AM'} SLST</span>
            </div>

            {/* Mock API indicator */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1528]/10 border border-[#0B1528]/15 text-[11px] font-bold text-[#0B1528] shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>API :4000</span>
              <span className="text-emerald-900 font-mono text-[10px] font-black">CONNECTED</span>
            </div>

            <Link href="/" className="hidden md:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="bg-[#0B1528] hover:bg-[#162C52] text-white border-transparent text-xs font-bold shadow-md hover:text-white"
              >
                View Public Site <ExternalLink className="h-3 w-3 ml-1.5 text-[#FFC928]" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden p-4 bg-[#0B1528] border-b border-white/10 space-y-2 text-white">
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
                      ? 'bg-[#162C52] text-white font-bold border border-blue-400/30'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? 'text-[#FFC928]' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${active ? 'bg-white/20 text-white border-white/30' : item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Page Content: Navy Blue & Yellow Atmospheric Background */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 dashboard-navy-yellow-bg">
          {children}
        </main>
      </div>

    </div>
  );
}
