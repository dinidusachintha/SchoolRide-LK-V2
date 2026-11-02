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
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
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
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
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
    <div className="min-h-screen flex bg-[#051A10] text-slate-100 selection:bg-emerald-400 selection:text-emerald-950">
      
      {/* ======================================================== */}
      {/* 1. DESKTOP DARK GREEN SIDEBAR                           */}
      {/* ======================================================== */}
      <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-[#12422A] bg-[#072417] p-5 shrink-0 select-none">
        <div className="space-y-6">
          
          {/* Logo & Root Tag */}
          <div className="space-y-3 pb-4 border-b border-[#12422A]">
            <Link href="/" className="inline-block group">
              <div className="p-2.5 rounded-2xl bg-white/95 backdrop-blur shadow-md hover:scale-102 transition-transform">
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
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#4ADE80] flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse" />
                Root Authority
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0D3823] text-emerald-300 border border-[#1A5C39]">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#688E79]">
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
                      ? 'bg-[#0E3E27] text-white shadow-sm border border-[#22C55E]/40 font-bold'
                      : 'text-[#96B7A5] hover:bg-[#0B3320] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        active ? 'text-[#4ADE80]' : 'text-[#688E79] group-hover:text-[#4ADE80]'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Shortcuts */}
          <div className="p-3.5 rounded-2xl bg-[#092B1C] border border-[#144D30] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4ADE80] block">
              Island-Wide Coverage
            </span>
            <p className="text-[11px] text-[#8DAE9C] leading-snug">
              Monitoring verified school van operations across Western, Central &amp; Southern provinces.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[10px] font-semibold text-[#86EFAC]">
              <Radio className="h-3.5 w-3.5 text-[#4ADE80] animate-pulse" />
              <span>Real-time GPS Active</span>
            </div>
          </div>
        </div>

        {/* Sidebar Footer: System Status & User Profile */}
        <div className="space-y-4 pt-4 border-t border-[#12422A]">
          <div className="flex items-center gap-2.5 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#166534] to-[#0D3823] text-[#86EFAC] font-bold text-xs border border-[#22C55E]/40 shadow-sm">
              {user?.fullName?.slice(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{user?.fullName || 'Root Admin'}</div>
              <div className="text-[10px] text-[#4ADE80] truncate font-medium">superadmin@schoolride.lk</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" className="flex-1">
              <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0B3320] hover:bg-[#0E3E27] text-[11px] font-semibold text-emerald-200 border border-[#165A37] transition-colors cursor-pointer">
                <span>Public Site</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </Link>
            <button
              onClick={() => logout()}
              title="Logout"
              className="p-2 rounded-xl bg-[#1A1A10] hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-700/60 hover:border-rose-700/60 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA WITH DARK GREEN TOPBAR              */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 sm:px-8 border-b border-[#12422A] bg-[#072417]/95 backdrop-blur-md">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#0B3320] text-emerald-300 border border-[#165A37]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Image
              src="/logo.png"
              alt="SchoolRide LK"
              width={130}
              height={26}
              className="h-6 w-auto object-contain bg-white/90 p-1 rounded-lg"
            />
          </div>

          {/* Breadcrumb / Title */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-[#8DAE9C]">
            <Link href="/admin/dashboard" className="hover:text-white transition-colors">
              SchoolRide LK Admin
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#4ADE80]" />
            <span className="text-white font-bold capitalize">
              {pathname.replace('/admin/', '').replace('-', ' ') || 'Dashboard'}
            </span>
          </div>

          {/* Right Header Status Widgets */}
          <div className="flex items-center gap-4">
            {/* Live Sri Lanka Time */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#092B1C] border border-[#144D30] text-xs font-mono text-[#86EFAC]">
              <Clock className="h-3.5 w-3.5 text-[#4ADE80]" />
              <span>{currentTime || '08:30:00 AM'} SLST</span>
            </div>

            {/* Mock API indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B3522] border border-[#1B643E] text-[11px] font-bold text-white shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="text-[#86EFAC]">API :4000</span>
              <span className="text-emerald-400/60 font-mono text-[10px]">CONNECTED</span>
            </div>

            <Link href="/" className="hidden md:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="bg-[#0B3320] text-emerald-200 border-[#1A5C39] hover:bg-[#0E3E27] hover:text-white text-xs"
              >
                View Public Site <ExternalLink className="h-3 w-3 ml-1.5" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden p-4 bg-[#072417] border-b border-[#12422A] space-y-2">
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
                      ? 'bg-[#0E3E27] text-white border border-[#22C55E]/40 font-bold'
                      : 'text-[#96B7A5] hover:bg-[#0B3320] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[#4ADE80]" />
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

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#051A10]">
          {children}
        </main>
      </div>

    </div>
  );
}
