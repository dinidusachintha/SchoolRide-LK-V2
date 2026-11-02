import os

# 1. Update Admin Layout (apps/web/src/app/admin/layout.tsx)
layout_code = '''\'use client\';

import * as React from \'react\';
import Link from \'next/link\';
import Image from \'next/image\';
import { usePathname, useRouter } from \'next/navigation\';
import { useAuth } from \'@/lib/auth-context\';
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
} from \'lucide-react\';
import { Badge } from \'@/components/ui/badge\';
import { Button } from \'@/components/ui/button\';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const adminNavItems: NavItem[] = [
  {
    name: \'Overview Dashboard\',
    href: \'/admin/dashboard\',
    icon: LayoutDashboard,
  },
  {
    name: \'Driver Verifications\',
    href: \'/admin/verifications\',
    icon: FileCheck,
    badge: \'KYC\',
    badgeColor: \'bg-[#EAF6ED] text-[#094718] border-[#BCE6C9]\',
  },
  {
    name: \'User Management\',
    href: \'/admin/users\',
    icon: Users,
  },
  {
    name: \'Schools & Routes\',
    href: \'/admin/schools\',
    icon: School,
  },
  {
    name: \'Safety & Complaints\',
    href: \'/admin/complaints\',
    icon: AlertTriangle,
    badge: \'Active\',
    badgeColor: \'bg-amber-50 text-amber-800 border-amber-200\',
  },
  {
    name: \'Security Audit Logs\',
    href: \'/admin/audit-logs\',
    icon: History,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(\'\');

  // Sri Lanka Time ticker
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString(\'en-US\', {
          timeZone: \'Asia/Colombo\',
          hour: \'2-digit\',
          minute: \'2-digit\',
          second: \'2-digit\',
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
    if (!isLoading && (!user || user.role !== \'ADMIN\')) {
      router.push(\'/login\');
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
              <div className="p-2 rounded-2xl bg-[#FAFDF9] border border-emerald-100 hover:border-emerald-300 transition-all">
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
                      ? \'bg-[#094718] text-white shadow-sm font-bold\'
                      : \'text-[#4E6258] hover:bg-[#EAF6ED] hover:text-[#094718]\'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        active ? \'text-white\' : \'text-[#709080] group-hover:text-[#094718]\'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        active ? \'bg-white/20 text-white border-white/30\' : item.badgeColor
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
              {user?.fullName?.slice(0, 2).toUpperCase() || \'AD\'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#0B2C22] truncate">{user?.fullName || \'Root Admin\'}</div>
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
              {pathname.replace(\'/admin/\', \'\').replace(\'-\', \' \') || \'Dashboard\'}
            </span>
          </div>

          {/* Right Header Status Widgets */}
          <div className="flex items-center gap-4">
            {/* Live Sri Lanka Time */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF6ED] border border-[#CDE9D3] text-xs font-mono text-[#094718] font-bold">
              <Clock className="h-3.5 w-3.5 text-[#16A34A]" />
              <span>{currentTime || \'08:30:00 AM\'} SLST</span>
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
                      ? \'bg-[#094718] text-white font-bold\'
                      : \'text-[#4E6258] hover:bg-[#EAF6ED] hover:text-[#094718]\'
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
'''

with open(r'SchoolRide-LK-V2\apps\web\src\app\admin\layout.tsx', 'w', encoding='utf-8') as f:
    f.write(layout_code)

print("Updated admin layout.tsx with white sidebar, topbar & green fonts!")

# 2. Update Admin Dashboard Page (apps/web/src/app/admin/dashboard/page.tsx)
dashboard_code = '''\'use client\';

import * as React from \'react\';
import Link from \'next/link\';
import { useRouter } from \'next/navigation\';
import { useAuth } from \'@/lib/auth-context\';
import { api } from \'@/lib/api-client\';
import { Button } from \'@/components/ui/button\';
import { Badge } from \'@/components/ui/badge\';
import { Skeleton } from \'@/components/ui/skeleton\';
import {
  ShieldCheck,
  Users,
  Bus,
  AlertTriangle,
  Radio,
  FileCheck,
  School,
  History,
  ArrowRight,
  Clock,
  CheckCircle2,
  Lock,
  Sparkles,
  TrendingUp,
} from \'lucide-react\';
import { formatSriLankanDateTime } from \'@schoolride/shared\';

export default function AdminDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [overview, setOverview] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== \'ADMIN\')) {
      router.push(\'/login\');
      return;
    }

    async function loadOverview() {
      setIsLoading(true);
      try {
        const data = await api.get(\'/admin/overview\');
        setOverview(data);
      } catch (err: any) {
        console.error(\'Failed to load admin overview:\', err);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      loadOverview();
    }
  }, [user, authLoading, router]);

  if (isLoading || authLoading) {
    return (
      <div className="space-y-6 w-full">
        <Skeleton className="h-10 w-64 bg-emerald-950/[0.05]" />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Skeleton className="h-32 rounded-2xl bg-white border border-emerald-100" />
          <Skeleton className="h-32 rounded-2xl bg-white border border-emerald-100" />
          <Skeleton className="h-32 rounded-2xl bg-white border border-emerald-100" />
          <Skeleton className="h-32 rounded-2xl bg-white border border-emerald-100" />
        </div>
      </div>
    );
  }

  const m = overview?.metrics || {};
  const logs = overview?.recentAuditLogs || [];

  return (
    <div className="space-y-8 w-full text-left">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B2C22] tracking-tight">
              Administrative <span className="text-[#16A34A]">Control Center</span>
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-[#EAF6ED] border border-[#BCE6C9] text-[#094718] text-[11px] font-extrabold uppercase tracking-wider">
              Root Authority
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6258] mt-1.5">
            Real-time platform oversight, driver safety verification queues, school registry, and audit trails.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/verifications">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer">
              <FileCheck className="h-4 w-4 text-[#86EFAC]" />
              <span>Verification Queue ({m.pendingVerifications || 0})</span>
            </button>
          </Link>
          <Link href="/admin/complaints">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-amber-800 font-bold text-xs border border-amber-200 transition-colors cursor-pointer shadow-sm">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>Safety Alerts ({m.openComplaints || 0})</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid: White Cards with Green Fonts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Registered Users */}
        <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] hover:border-emerald-300 transition-all flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3] shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#16A34A]">Total Users</p>
            <h3 className="text-2xl font-black text-[#0B2C22]">{m.totalUsers || 0}</h3>
            <p className="text-[11px] text-[#4E6258] mt-0.5">
              <span className="text-[#094718] font-bold">{m.totalParents || 0}</span> Parents • <span className="text-[#094718] font-bold">{m.totalDrivers || 0}</span> Drivers
            </p>
          </div>
        </div>

        {/* Pending Verifications */}
        <Link href="/admin/verifications" className="block group">
          <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] group-hover:border-amber-400/80 transition-all flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Pending Review</p>
              <h3 className="text-2xl font-black text-[#0B2C22]">{m.pendingVerifications || 0}</h3>
              <p className="text-[11px] text-[#4E6258] mt-0.5">
                <span className="text-[#16A34A] font-bold">{m.verifiedDrivers || 0}</span> Verified Drivers Active
              </p>
            </div>
          </div>
        </Link>

        {/* Active Rides */}
        <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] hover:border-emerald-300 transition-all flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3] shrink-0">
            <Radio className="h-6 w-6 animate-pulse text-[#16A34A]" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#16A34A]">Active Trips</p>
            <h3 className="text-2xl font-black text-[#0B2C22]">{m.activeRides || 0}</h3>
            <p className="text-[11px] text-[#16A34A] font-semibold mt-0.5 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A] animate-ping" />
              Live in transit now
            </p>
          </div>
        </div>

        {/* Open Safety Complaints */}
        <Link href="/admin/complaints" className="block group">
          <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] group-hover:border-rose-400 transition-all flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-rose-800">Safety Concerns</p>
              <h3 className="text-2xl font-black text-[#0B2C22]">{m.openComplaints || 0}</h3>
              <p className="text-[11px] text-[#4E6258] mt-0.5">Priority resolution required</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Navigation Cards: White Cards with Green Fonts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/verifications" className="block group">
          <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] group-hover:border-emerald-300 group-hover:shadow-md transition-all space-y-3 h-full cursor-pointer shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3]">
                <FileCheck className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-[#709080] group-hover:text-[#094718] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-[#0B2C22] group-hover:text-[#094718] transition-colors">Driver KYC &amp; Verification</h3>
            <p className="text-xs text-[#4E6258] leading-relaxed">
              Review commercial driving licenses, NIC documents, vehicle revenue licenses, and approve driver onboarding.
            </p>
          </div>
        </Link>

        <Link href="/admin/schools" className="block group">
          <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] group-hover:border-emerald-300 group-hover:shadow-md transition-all space-y-3 h-full cursor-pointer shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3]">
                <School className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-[#709080] group-hover:text-[#094718] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-[#0B2C22] group-hover:text-[#094718] transition-colors">Schools &amp; Route Hub</h3>
            <p className="text-xs text-[#4E6258] leading-relaxed">
              Manage Sri Lankan national &amp; provincial schools, GPS dropoff coordinates, and registered van route coverage.
            </p>
          </div>
        </Link>

        <Link href="/admin/complaints" className="block group">
          <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] group-hover:border-amber-300 group-hover:shadow-md transition-all space-y-3 h-full cursor-pointer shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-[#709080] group-hover:text-amber-700 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-[#0B2C22] group-hover:text-[#094718] transition-colors">Safety Complaints &amp; Disputes</h3>
            <p className="text-xs text-[#4E6258] leading-relaxed">
              Audit reported incidents from parents and operators with swift resolution workflows and driver suspensions.
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Security Audit Trail: White Card with Green Headers */}
      <div className="rounded-2xl bg-white border border-emerald-950/[0.08] overflow-hidden shadow-sm space-y-0">
        <div className="p-5 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <History className="h-4 w-4 text-[#16A34A]" />
            <h3 className="text-sm font-bold text-[#0B2C22]">Recent Administrative Audit Logs</h3>
          </div>
          <Link href="/admin/audit-logs">
            <span className="text-xs font-semibold text-[#16A34A] hover:underline flex items-center gap-1">
              View All Logs <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>

        <div className="divide-y divide-emerald-100/60">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#4E6258]">
              No audit log entries recorded yet.
            </div>
          ) : (
            logs.slice(0, 5).map((log: any) => (
              <div key={log.id} className="p-4 hover:bg-[#FAFDF9] transition-colors flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#16A34A]" />
                  <div>
                    <span className="text-xs font-bold text-[#0B2C22] mr-2">{log.action}</span>
                    <span className="text-xs text-[#4E6258] font-mono">{log.entityType} ({log.entityId})</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <span className="text-[11px] text-[#16A34A] font-mono font-semibold">{formatSriLankanDateTime(log.createdAt)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
'''

with open(r'SchoolRide-LK-V2\apps\web\src\app\admin\dashboard\page.tsx', 'w', encoding='utf-8') as f:
    f.write(dashboard_code)

print("Updated admin dashboard page.tsx with white cards & green fonts!")

# 3. Update Admin Verifications Page (apps/web/src/app/admin/verifications/page.tsx)
verif_code = '''\'use client\';

import * as React from \'react\';
import Link from \'next/link\';
import { useRouter } from \'next/navigation\';
import { useAuth } from \'@/lib/auth-context\';
import { api } from \'@/lib/api-client\';
import { Button } from \'@/components/ui/button\';
import { Badge } from \'@/components/ui/badge\';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from \'@/components/ui/dialog\';
import { Textarea } from \'@/components/ui/input\';
import { EmptyState } from \'@/components/ui/empty-state\';
import { Skeleton } from \'@/components/ui/skeleton\';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Car,
  User,
  ShieldCheck,
  Phone,
  Calendar,
  Eye,
  FileText,
  Clock,
} from \'lucide-react\';
import { toast } from \'sonner\';
import { VerificationStatus, formatSriLankanDateTime } from \'@schoolride/shared\';

export default function AdminVerificationsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [queue, setQueue] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Rejection modal
  const [rejectingDriverId, setRejectingDriverId] = React.useState<string | null>(null);
  const [rejectReason, setRejectReason] = React.useState(\'\');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const loadQueue = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.get(\'/admin/verifications\');
      setQueue(data || []);
    } catch (err: any) {
      console.error(\'Failed to load verification queue:\', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== \'ADMIN\')) {
      router.push(\'/login\');
      return;
    }
    if (user) {
      loadQueue();
    }
  }, [user, authLoading, router, loadQueue]);

  const handleApprove = async (driverId: string) => {
    try {
      await api.patch(`/admin/verifications/${driverId}/approve`, {});
      toast.success(\'Driver credentials verified and operating authority granted!\');
      loadQueue();
    } catch (err: any) {
      toast.error(err.message || \'Failed to approve driver.\');
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingDriverId) return;

    if (!rejectReason.trim()) {
      toast.error(\'Please specify a rejection reason for the applicant.\');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.patch(`/admin/verifications/${rejectingDriverId}/reject`, {
        reason: rejectReason.trim(),
      });
      toast.info(\'Driver application rejected and correction requested.\');
      setRejectingDriverId(null);
      setRejectReason(\'\');
      loadQueue();
    } catch (err: any) {
      toast.error(err.message || \'Failed to reject driver.\');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || authLoading) {
    return (
      <div className="space-y-6 w-full">
        <Skeleton className="h-8 w-64 bg-emerald-950/[0.05]" />
        <Skeleton className="h-96 w-full rounded-2xl bg-white border border-emerald-100" />
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-[#4E6258] hover:text-[#094718] transition-colors mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-black text-[#0B2C22] tracking-tight">
              Driver Verification <span className="text-[#16A34A]">Inspection Queue</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6258]">
            Strict child safety compliance: inspect identity documents, police clearance, and vehicle roadworthiness before granting live status.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider shrink-0 shadow-sm">
          {queue.length} Pending Applications
        </span>
      </div>

      {/* Queue List: Pure White Cards with Green Typography */}
      {queue.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-emerald-950/[0.08] text-center space-y-3 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-[#EAF6ED] text-[#094718] flex items-center justify-center mx-auto border border-[#CDE9D3]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0B2C22]">Verification Queue is Clear</h3>
          <p className="text-xs text-[#4E6258] max-w-md mx-auto">
            There are currently no driver applications awaiting administrative review. Outstanding work!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {queue.map((driver) => (
            <div key={driver.id} className="p-6 rounded-2xl bg-white border border-emerald-950/[0.08] space-y-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-emerald-300 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3] shrink-0">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2C22]">
                      {driver.user?.fullName}
                    </h3>
                    <p className="text-xs text-[#4E6258]">
                      Email: <span className="text-[#0B2C22] font-semibold">{driver.user?.email}</span> • Phone: <strong className="text-[#094718]">{driver.user?.phone}</strong> • Region:{\' \' }
                      <span className="text-[#0B2C22] font-semibold">{driver.user?.district} ({driver.user?.city})</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-800">
                    {driver.verificationStatus}
                  </span>
                  <span className="text-[11px] text-[#16A34A] font-mono font-bold">
                    Applied: {formatSriLankanDateTime(driver.createdAt)}
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-4 rounded-xl bg-[#FAFDF9] border border-emerald-100 text-xs text-[#4E6258] leading-relaxed">
                <strong className="text-[#0B2C22]">Service Bio:</strong> {driver.bio || \'No description provided.\'}
                <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-[#0B2C22]">
                  <span>Driving Experience: <strong className="text-[#094718] font-bold">{driver.experienceYears || 0} years</strong></span>
                  <span>NIC: <strong className="text-[#094718] font-mono font-bold">{driver.nicNumber || \'N/A\'}</strong></span>
                  <span>License No: <strong className="text-[#094718] font-mono font-bold">{driver.licenseNumber || \'N/A\'}</strong></span>
                </div>
              </div>

              {/* Registered Vehicles */}
              {driver.vehicles && driver.vehicles.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#0B2C22] uppercase tracking-wider block">
                    Registered Vehicle Information:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {driver.vehicles.map((v: any) => (
                      <div key={v.id} className="p-4 rounded-xl bg-[#F4FAF5] border border-emerald-100 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-sm font-bold text-[#0B2C22] block">{v.model} ({v.type})</span>
                          <span className="text-xs text-[#4E6258] font-mono block">Plate: {v.licensePlate}</span>
                          <span className="text-[11px] text-[#16A34A] font-bold">Capacity: {v.capacity} Seats {v.isAirConditioned ? \'• AC\' : \'\'}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3]">
                          {v.color || \'Yellow Commuter\'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification Actions */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-emerald-100">
                <button
                  onClick={() => setRejectingDriverId(driver.id)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200 transition-colors cursor-pointer"
                >
                  Reject with Feedback
                </button>
                <button
                  onClick={() => handleApprove(driver.id)}
                  className="px-5 py-2.5 rounded-xl bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#86EFAC]" />
                  <span>Verify &amp; Authorize Operating Status</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      <Dialog open={!!rejectingDriverId} onOpenChange={() => setRejectingDriverId(null)}>
        <DialogContent className="sm:max-w-md bg-white border border-emerald-100 text-[#0B2C22]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#0B2C22]">
              Reject Driver Verification
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReject} className="space-y-4 pt-2">
            <p className="text-xs text-[#4E6258]">
              Please state why the credentials failed compliance (e.g., blurred NIC, expired revenue license, unverified commercial heavy license).
            </p>
            <Textarea
              placeholder="e.g. Please upload a clear photo of your 2026 Provincial Revenue License."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs min-h-[100px]"
              required
            />
            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRejectingDriverId(null)}
                className="bg-white text-[#4E6258] border-slate-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
              >
                {isSubmitting ? \'Rejecting...\' : \'Confirm Rejection\'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
'''

with open(r'SchoolRide-LK-V2\apps\web\src\app\admin\verifications\page.tsx', 'w', encoding='utf-8') as f:
    f.write(verif_code)

print("Updated admin verifications page.tsx with white cards & green fonts!")

# 4. Update Admin Users Page (apps/web/src/app/admin/users/page.tsx)
users_code = '''\'use client\';

import * as React from \'react\';
import Link from \'next/link\';
import { useRouter } from \'next/navigation\';
import { useAuth } from \'@/lib/auth-context\';
import { api } from \'@/lib/api-client\';
import { Button } from \'@/components/ui/button\';
import { Badge } from \'@/components/ui/badge\';
import { Input } from \'@/components/ui/input\';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from \'@/components/ui/dialog\';
import { Textarea } from \'@/components/ui/input\';
import { Skeleton } from \'@/components/ui/skeleton\';
import {
  Users,
  Search,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  UserCheck,
  UserX,
} from \'lucide-react\';
import { toast } from \'sonner\';
import { AccountStatus, UserRole, formatSriLankanDateTime } from \'@schoolride/shared\';

export default function AdminUsersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [users, setUsers] = React.useState<any[]>([]);
  const [roleFilter, setRoleFilter] = React.useState(\'\');
  const [statusFilter, setStatusFilter] = React.useState(\'\');
  const [searchQuery, setSearchQuery] = React.useState(\'\');
  const [isLoading, setIsLoading] = React.useState(true);

  // Suspend modal state
  const [suspendingUser, setSuspendingUser] = React.useState<any>(null);
  const [suspendReason, setSuspendReason] = React.useState(\'\');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const loadUsers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (roleFilter) params.append(\'role\', roleFilter);
      if (statusFilter) params.append(\'status\', statusFilter);
      if (searchQuery.trim()) params.append(\'query\', searchQuery.trim());

      const data = await api.get(`/admin/users?${params.toString()}`);
      setUsers(data || []);
    } catch (err: any) {
      console.error(\'Failed to load users:\', err);
    } finally {
      setIsLoading(false);
    }
  }, [roleFilter, statusFilter, searchQuery]);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== \'ADMIN\')) {
      router.push(\'/login\');
      return;
    }
    if (user) {
      loadUsers();
    }
  }, [user, authLoading, router, loadUsers]);

  const handleToggleSuspend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suspendingUser) return;

    setIsSubmitting(true);
    try {
      if (suspendingUser.status === AccountStatus.SUSPENDED) {
        await api.patch(`/admin/users/${suspendingUser.id}/reactivate`, {});
        toast.success(`Account for ${suspendingUser.fullName} reactivated.`);
      } else {
        await api.patch(`/admin/users/${suspendingUser.id}/suspend`, {
          reason: suspendReason.trim() || \'Administrative security suspension\',
        });
        toast.warning(`Account for ${suspendingUser.fullName} suspended.`);
      }
      setSuspendingUser(null);
      setSuspendReason(\'\');
      loadUsers();
    } catch (err: any) {
      toast.error(err.message || \'Failed to update account status.\');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 w-full text-left">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-[#4E6258] hover:text-[#094718] transition-colors mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-black text-[#0B2C22] tracking-tight">
              User Identity <span className="text-[#16A34A]">&amp; Access Control</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6258]">
            Manage platform users, inspect role assignments, and enforce safety suspensions.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-[#EAF6ED] border border-[#BCE6C9] text-[#094718] text-xs font-bold shrink-0">
          {users.length} Users Listed
        </span>
      </div>

      {/* Filter Toolbar: White Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-emerald-950/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
        <div className="sm:col-span-2 relative">
          <input
            type="text"
            placeholder="Search by full name, email, phone or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-emerald-200 bg-[#FAFDF9] text-xs text-[#0B2C22] placeholder:text-[#709080] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#709080]" />
        </div>

        <div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-emerald-200 bg-[#FAFDF9] text-xs font-semibold text-[#0B2C22] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          >
            <option value="">All Roles</option>
            <option value={UserRole.PARENT}>Parents</option>
            <option value={UserRole.DRIVER}>Drivers</option>
            <option value={UserRole.ADMIN}>Administrators</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-emerald-200 bg-[#FAFDF9] text-xs font-semibold text-[#0B2C22] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          >
            <option value="">All Statuses</option>
            <option value={AccountStatus.ACTIVE}>Active</option>
            <option value={AccountStatus.PENDING_VERIFICATION}>Pending Verification</option>
            <option value={AccountStatus.SUSPENDED}>Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table: White Card with Green Headers */}
      <div className="rounded-2xl bg-white border border-emerald-950/[0.08] shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            <Skeleton className="h-6 w-full bg-emerald-950/[0.05]" />
            <Skeleton className="h-6 w-full bg-emerald-950/[0.05]" />
            <Skeleton className="h-6 w-full bg-emerald-950/[0.05]" />
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#4E6258]">
            No users found matching current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4FAF5] text-[#094718] border-b border-emerald-100 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Registered</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#FAFDF9] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0B2C22]">{u.fullName}</div>
                      <div className="text-[11px] text-[#4E6258]">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#0B2C22]">
                      {u.phone}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EAF6ED] text-[#094718] border border-[#BCE6C9]">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          u.status === AccountStatus.ACTIVE
                            ? \'bg-[#EBF7EE] text-[#16A34A] border-[#BCE6C9]\'
                            : u.status === AccountStatus.SUSPENDED
                            ? \'bg-rose-50 text-rose-700 border-rose-200\'
                            : \'bg-amber-50 text-amber-700 border-amber-200\'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#4E6258]">
                      {u.district} ({u.city})
                    </td>
                    <td className="py-3.5 px-4 text-[#4E6258] font-mono text-[11px]">
                      {formatSriLankanDateTime(u.createdAt)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {u.role !== UserRole.ADMIN && (
                        <button
                          onClick={() => {
                            setSuspendingUser(u);
                            setSuspendReason(\'\');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            u.status === AccountStatus.SUSPENDED
                              ? \'bg-[#EAF6ED] text-[#094718] border-[#CDE9D3] hover:bg-[#D8EFE0]\'
                              : \'bg-white text-rose-700 border-rose-200 hover:bg-rose-50\'
                          }`}
                        >
                          {u.status === AccountStatus.SUSPENDED ? \'Reactivate\' : \'Suspend\'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Suspend / Reactivate Dialog */}
      <Dialog open={!!suspendingUser} onOpenChange={() => setSuspendingUser(null)}>
        <DialogContent className="sm:max-w-md bg-white border border-emerald-100 text-[#0B2C22]">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#0B2C22]">
              {suspendingUser?.status === AccountStatus.SUSPENDED
                ? `Reactivate Account: ${suspendingUser?.fullName}`
                : `Suspend Account: ${suspendingUser?.fullName}`}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleToggleSuspend} className="space-y-4 pt-2">
            {suspendingUser?.status === AccountStatus.SUSPENDED ? (
              <p className="text-xs text-[#4E6258]">
                Reactivating will restore login access and allow this user to book rides or operate vans normally.
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-[#4E6258]">
                  Suspension immediately revokes active session access and driver operating status.
                </p>
                <Textarea
                  placeholder="Reason for suspension (e.g., policy violation, complaint investigation)"
                  value={suspendReason}
                  onChange={(e) => setSuspendReason(e.target.value)}
                  className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs min-h-[90px]"
                />
              </div>
            )}
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSuspendingUser(null)}
                className="bg-white text-[#4E6258] border-slate-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className={
                  suspendingUser?.status === AccountStatus.SUSPENDED
                    ? \'bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs\'
                    : \'bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs\'
                }
              >
                {isSubmitting
                  ? \'Saving...\'
                  : suspendingUser?.status === AccountStatus.SUSPENDED
                  ? \'Confirm Reactivation\'
                  : \'Confirm Suspension\'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
'''

with open(r'SchoolRide-LK-V2\apps\web\src\app\admin\users\page.tsx', 'w', encoding='utf-8') as f:
    f.write(users_code)

print("Updated admin users page.tsx with white cards & green fonts!")

# 5. Update Admin Schools Page (apps/web/src/app/admin/schools/page.tsx)
schools_code = '''\'use client\';

import * as React from \'react\';
import Link from \'next/link\';
import { useRouter } from \'next/navigation\';
import { useAuth } from \'@/lib/auth-context\';
import { api } from \'@/lib/api-client\';
import { Button } from \'@/components/ui/button\';
import { Badge } from \'@/components/ui/badge\';
import { Input } from \'@/components/ui/input\';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from \'@/components/ui/dialog\';
import { Skeleton } from \'@/components/ui/skeleton\';
import {
  School,
  Plus,
  Search,
  MapPin,
  ArrowLeft,
  Compass,
  Edit,
  GraduationCap,
} from \'lucide-react\';
import { toast } from \'sonner\';
import { SRI_LANKAN_DISTRICTS } from \'@schoolride/shared\';

export default function AdminSchoolsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [schools, setSchools] = React.useState<any[]>([]);
  const [districtFilter, setDistrictFilter] = React.useState(\'\');
  const [searchQuery, setSearchQuery] = React.useState(\'\');
  const [isLoading, setIsLoading] = React.useState(true);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingSchoolId, setEditingSchoolId] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: \'\',
    district: \'Colombo\',
    city: \'Colombo\',
    address: \'\',
    latitude: 6.9034,
    longitude: 79.8596,
  });

  const loadSchools = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.get(\'/schools\');
      setSchools(data || []);
    } catch (err: any) {
      console.error(\'Failed to load schools:\', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== \'ADMIN\')) {
      router.push(\'/login\');
      return;
    }
    if (user) {
      loadSchools();
    }
  }, [user, authLoading, router, loadSchools]);

  const handleOpenAdd = () => {
    setEditingSchoolId(null);
    setFormData({
      name: \'\',
      district: \'Colombo\',
      city: \'Colombo\',
      address: \'\',
      latitude: 6.9034,
      longitude: 79.8596,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (school: any) => {
    setEditingSchoolId(school.id);
    setFormData({
      name: school.name,
      district: school.district,
      city: school.city,
      address: school.address,
      latitude: school.latitude,
      longitude: school.longitude,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error(\'School name is required.\');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingSchoolId) {
        await api.patch(`/schools/${editingSchoolId}`, formData);
        toast.success(\'School details updated successfully.\');
      } else {
        await api.post(\'/schools\', formData);
        toast.success(\'New school campus added to platform registry.\');
      }
      setIsDialogOpen(false);
      loadSchools();
    } catch (err: any) {
      toast.error(err.message || \'Failed to save school.\');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = schools.filter((s) => {
    const matchesDistrict = !districtFilter || s.district.toLowerCase() === districtFilter.toLowerCase();
    const matchesQuery = !searchQuery.trim() ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesQuery;
  });

  return (
    <div className="space-y-8 w-full text-left">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-[#4E6258] hover:text-[#094718] transition-colors mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-black text-[#0B2C22] tracking-tight">
              School Campus <span className="text-[#16A34A]">&amp; Route Directory</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6258]">
            Configure verified dropoff gates, GPS coordinates, and van operator route mappings across Sri Lanka.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Register New School</span>
        </button>
      </div>

      {/* Filter Toolbar: White Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-emerald-950/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <div className="sm:col-span-2 relative">
          <input
            type="text"
            placeholder="Search school by campus name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-emerald-200 bg-[#FAFDF9] text-xs text-[#0B2C22] placeholder:text-[#709080] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#709080]" />
        </div>

        <div>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-emerald-200 bg-[#FAFDF9] text-xs font-semibold text-[#0B2C22] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          >
            <option value="">All Districts ({SRI_LANKAN_DISTRICTS.length})</option>
            {SRI_LANKAN_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schools Cards Grid: White Cards with Green Headers */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-44 rounded-2xl bg-white border border-emerald-100" />
          <Skeleton className="h-44 rounded-2xl bg-white border border-emerald-100" />
          <Skeleton className="h-44 rounded-2xl bg-white border border-emerald-100" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#4E6258] bg-white rounded-2xl border border-emerald-950/[0.08]">
          No schools found matching search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((school) => (
            <div
              key={school.id}
              className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] hover:border-emerald-300 hover:shadow-md transition-all space-y-3 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3] shrink-0">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0B2C22] leading-snug">{school.name}</h3>
                      <p className="text-[11px] text-[#4E6258] flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-[#16A34A]" /> {school.city}, {school.district}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenEdit(school)}
                    className="p-1.5 rounded-lg text-[#709080] hover:text-[#094718] hover:bg-[#EAF6ED] transition-colors"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="text-xs text-[#4E6258] leading-relaxed line-clamp-2">
                  {school.address}
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-[11px]">
                <span className="font-mono text-[#16A34A] font-semibold">
                  {school.latitude.toFixed(4)}° N, {school.longitude.toFixed(4)}° E
                </span>
                <span className="px-2 py-0.5 rounded-full font-bold bg-[#EAF6ED] text-[#094718] border border-[#BCE6C9]">
                  {school.district}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-emerald-100 text-[#0B2C22]">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#0B2C22]">
              {editingSchoolId ? \'Edit School Details\' : \'Register New School Campus\'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#0B2C22] mb-1">School Name</label>
              <Input
                placeholder="e.g. Royal College"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0B2C22] mb-1">District</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-[#FAFDF9] text-xs font-semibold text-[#0B2C22]"
                >
                  {SRI_LANKAN_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0B2C22] mb-1">City / Town</label>
                <Input
                  placeholder="e.g. Colombo 07"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B2C22] mb-1">Street Address</label>
              <Input
                placeholder="e.g. Reid Avenue, Colombo 00700"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0B2C22] mb-1">Gate Latitude</label>
                <Input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                  className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0B2C22] mb-1">Gate Longitude</label>
                <Input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                  className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs font-mono"
                  required
                />
              </div>
            </div>
            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="bg-white text-[#4E6258] border-slate-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs"
              >
                {isSubmitting ? \'Saving...\' : editingSchoolId ? \'Update Campus\' : \'Register School\'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
'''

with open(r'SchoolRide-LK-V2\apps\web\src\app\admin\schools\page.tsx', 'w', encoding='utf-8') as f:
    f.write(schools_code)

print("Updated admin schools page.tsx with white cards & green fonts!")

# 6. Update Admin Complaints Page (apps/web/src/app/admin/complaints/page.tsx)
complaints_code = '''\'use client\';

import * as React from \'react\';
import Link from \'next/link\';
import { useRouter } from \'next/navigation\';
import { useAuth } from \'@/lib/auth-context\';
import { api } from \'@/lib/api-client\';
import { Button } from \'@/components/ui/button\';
import { Badge } from \'@/components/ui/badge\';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from \'@/components/ui/dialog\';
import { Textarea } from \'@/components/ui/input\';
import { Skeleton } from \'@/components/ui/skeleton\';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  User,
  Bus,
  Clock,
  ShieldAlert,
  MessageSquare,
} from \'lucide-react\';
import { toast } from \'sonner\';
import { ComplaintStatus, formatSriLankanDateTime } from \'@schoolride/shared\';

export default function AdminComplaintsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [complaints, setComplaints] = React.useState<any[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<\'ALL\' | \'OPEN\' | \'RESOLVED\'>(\'OPEN\');
  const [isLoading, setIsLoading] = React.useState(true);

  // Moderation modal
  const [resolvingComplaint, setResolvingComplaint] = React.useState<any>(null);
  const [resolutionStatus, setResolutionStatus] = React.useState(ComplaintStatus.RESOLVED);
  const [resolutionNotes, setResolutionNotes] = React.useState(\'\');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const loadComplaints = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.get(\'/complaints\');
      setComplaints(data || []);
    } catch (err: any) {
      console.error(\'Failed to load complaints:\', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== \'ADMIN\')) {
      router.push(\'/login\');
      return;
    }
    if (user) {
      loadComplaints();
    }
  }, [user, authLoading, router, loadComplaints]);

  const handleResolveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingComplaint) return;

    if (!resolutionNotes.trim()) {
      toast.error(\'Please provide resolution investigation notes.\');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.patch(`/complaints/${resolvingComplaint.id}/resolve`, {
        status: resolutionStatus,
        resolutionNotes: resolutionNotes.trim(),
      });
      toast.success(\'Incident complaint marked as resolved.\');
      setResolvingComplaint(null);
      setResolutionNotes(\'\');
      loadComplaints();
    } catch (err: any) {
      toast.error(err.message || \'Failed to resolve complaint.\');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = complaints.filter((c) => {
    if (statusFilter === \'ALL\') return true;
    if (statusFilter === \'OPEN\') {
      return c.status === ComplaintStatus.SUBMITTED || c.status === ComplaintStatus.UNDER_REVIEW;
    }
    return c.status === ComplaintStatus.RESOLVED || c.status === ComplaintStatus.DISMISSED;
  });

  return (
    <div className="space-y-8 w-full text-left">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-[#4E6258] hover:text-[#094718] transition-colors mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-black text-[#0B2C22] tracking-tight">
              Safety Complaints <span className="text-[#16A34A]">&amp; Incident Desk</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6258]">
            Investigate safety reports, route disputes, punctuality flags, and enforce accountability.
          </p>
        </div>

        {/* Filter Pills: White Background */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white border border-emerald-100 shadow-sm">
          {(['OPEN', 'RESOLVED', 'ALL'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === tab
                  ? \'bg-[#094718] text-white shadow-sm\'
                  : \'text-[#4E6258] hover:text-[#094718] hover:bg-[#EAF6ED]\'
              }`}
            >
              {tab === \'OPEN\' ? \'Open Inquiries\' : tab === \'RESOLVED\' ? \'Resolved\' : \'All Logged\'}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List: White Cards with Green Highlights */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-40 rounded-2xl bg-white border border-emerald-100" />
          <Skeleton className="h-40 rounded-2xl bg-white border border-emerald-100" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#4E6258] bg-white rounded-2xl border border-emerald-950/[0.08] shadow-sm">
          No complaints matching the selected filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl bg-white border border-emerald-950/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4 hover:border-emerald-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                    <ShieldAlert className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0B2C22]">{c.subject}</h3>
                    <p className="text-[11px] text-[#4E6258]">
                      Filed by: <strong className="text-[#0B2C22]">{c.complainant?.fullName}</strong> ({c.complainant?.email}) • Category: <span className="font-bold text-[#094718]">{c.category}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      c.status === ComplaintStatus.RESOLVED
                        ? \'bg-[#EBF7EE] text-[#16A34A] border-[#BCE6C9]\'
                        : c.status === ComplaintStatus.DISMISSED
                        ? \'bg-slate-100 text-slate-600 border-slate-200\'
                        : \'bg-amber-50 text-amber-800 border-amber-200\'
                    }`}
                  >
                    {c.status}
                  </span>
                  <span className="text-[11px] text-[#16A34A] font-mono font-bold">
                    {formatSriLankanDateTime(c.createdAt)}
                  </span>
                </div>
              </div>

              {/* Description Body */}
              <div className="p-4 rounded-xl bg-[#FAFDF9] border border-emerald-100 text-xs text-[#0B2C22] leading-relaxed">
                {c.description}
              </div>

              {/* Resolution Notes if Resolved */}
              {c.resolutionNotes && (
                <div className="p-3.5 rounded-xl bg-[#EAF6ED] border border-[#BCE6C9] text-xs text-[#094718]">
                  <strong>Administrative Resolution:</strong> {c.resolutionNotes}
                </div>
              )}

              {/* Action Buttons */}
              {c.status !== ComplaintStatus.RESOLVED && c.status !== ComplaintStatus.DISMISSED && (
                <div className="flex justify-end pt-2 border-t border-emerald-100">
                  <button
                    onClick={() => {
                      setResolvingComplaint(c);
                      setResolutionNotes(\'\');
                      setResolutionStatus(ComplaintStatus.RESOLVED);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                  >
                    Investigate &amp; Resolve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Resolution Dialog */}
      <Dialog open={!!resolvingComplaint} onOpenChange={() => setResolvingComplaint(null)}>
        <DialogContent className="sm:max-w-md bg-white border border-emerald-100 text-[#0B2C22]">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#0B2C22]">
              Resolve Safety Complaint #{resolvingComplaint?.id.slice(0, 8)}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleResolveSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#0B2C22] mb-1">Resolution Outcome</label>
              <select
                value={resolutionStatus}
                onChange={(e) => setResolutionStatus(e.target.value as ComplaintStatus)}
                className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-[#FAFDF9] text-xs font-semibold text-[#0B2C22]"
              >
                <option value={ComplaintStatus.RESOLVED}>Resolved (Corrective action enforced)</option>
                <option value={ComplaintStatus.DISMISSED}>Dismissed (Unsubstantiated claim)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B2C22] mb-1">Investigation Notes &amp; Findings</label>
              <Textarea
                placeholder="Document contact with driver/parent and final administrative decision..."
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs min-h-[100px]"
                required
              />
            </div>
            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setResolvingComplaint(null)}
                className="bg-white text-[#4E6258] border-slate-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs"
              >
                {isSubmitting ? \'Saving...\' : \'Submit Resolution\'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
'''

with open(r'SchoolRide-LK-V2\apps\web\src\app\admin\complaints\page.tsx', 'w', encoding='utf-8') as f:
    f.write(complaints_code)

print("Updated admin complaints page.tsx with white cards & green fonts!")

# 7. Update Admin Audit Logs Page (apps/web/src/app/admin/audit-logs/page.tsx)
logs_code = '''\'use client\';

import * as React from \'react\';
import Link from \'next/link\';
import { useRouter } from \'next/navigation\';
import { useAuth } from \'@/lib/auth-context\';
import { api } from \'@/lib/api-client\';
import { Button } from \'@/components/ui/button\';
import { Badge } from \'@/components/ui/badge\';
import { Skeleton } from \'@/components/ui/skeleton\';
import {
  History,
  ShieldCheck,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from \'lucide-react\';
import { formatSriLankanDateTime } from \'@schoolride/shared\';

export default function AdminAuditLogsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [logs, setLogs] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const loadLogs = React.useCallback(async (p: number) => {
    setIsLoading(true);
    try {
      const data = await api.get(`/admin/audit-logs?page=${p}&limit=25`);
      setLogs(data.data || []);
      setTotalCount(data.total || 0);
    } catch (err: any) {
      console.error(\'Failed to load audit logs:\', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== \'ADMIN\')) {
      router.push(\'/login\');
      return;
    }
    if (user) {
      loadLogs(page);
    }
  }, [user, authLoading, router, loadLogs, page]);

  return (
    <div className="space-y-8 w-full text-left">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-[#4E6258] hover:text-[#094718] transition-colors mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-black text-[#0B2C22] tracking-tight">
              Security &amp; Compliance <span className="text-[#16A34A]">Audit Trail</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6258]">
            Immutable chronological logging of administrative actions, role modifications, and KYC decisions.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-[#EAF6ED] border border-[#BCE6C9] text-[#094718] text-xs font-bold shrink-0">
          {totalCount} Total System Events
        </span>
      </div>

      {/* Audit Log Table: White Card with Green Headers */}
      <div className="rounded-2xl bg-white border border-emerald-950/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            <Skeleton className="h-6 w-full bg-emerald-950/[0.05]" />
            <Skeleton className="h-6 w-full bg-emerald-950/[0.05]" />
            <Skeleton className="h-6 w-full bg-emerald-950/[0.05]" />
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#4E6258]">
            No audit log entries recorded in database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4FAF5] text-[#094718] border-b border-emerald-100 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Timestamp (SLST)</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Entity Type</th>
                  <th className="py-3.5 px-4">Entity ID</th>
                  <th className="py-3.5 px-4">Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100/60">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#FAFDF9] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#16A34A] font-semibold">
                      {formatSriLankanDateTime(log.createdAt)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF6ED] text-[#094718] border border-[#BCE6C9]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#0B2C22]">
                      {log.entityType}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-[#4E6258]">
                      {log.entityId}
                    </td>
                    <td className="py-3.5 px-4 text-[#4E6258]">
                      {log.metadata ? (
                        <pre className="font-mono text-[10px] text-[#094718] bg-[#F4FAF5] p-1.5 rounded-lg border border-emerald-100 overflow-x-auto max-w-xs">
                          {JSON.stringify(log.metadata)}
                        </pre>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="p-4 bg-[#FAFDF9] border-t border-emerald-100 flex items-center justify-between text-xs text-[#4E6258]">
          <span>Page {page} of {Math.ceil(totalCount / 25) || 1}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-lg border border-emerald-200 bg-white text-[#0B2C22] hover:bg-emerald-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * 25 >= totalCount}
              className="p-1.5 rounded-lg border border-emerald-200 bg-white text-[#0B2C22] hover:bg-emerald-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
'''

with open(r'SchoolRide-LK-V2\apps\web\src\app\admin\audit-logs\page.tsx', 'w', encoding='utf-8') as f:
    f.write(logs_code)

print("Updated admin audit-logs page.tsx with white cards & green fonts!")

# 8. Update Admin Loading Skeleton (apps/web/src/app/admin/loading.tsx)
loading_code = '''\'use client\';

import * as React from \'react\';
import { Skeleton, TableRowSkeleton } from \'@/components/ui/skeleton\';

export default function AdminLoading() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFDF9] text-[#0B2C22] p-6 space-y-8">
      {/* Admin Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 rounded bg-emerald-950/[0.05]" />
          <Skeleton className="h-8 w-64 rounded-xl bg-emerald-950/[0.08]" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-xl bg-emerald-950/[0.05]" />
          <Skeleton className="h-10 w-36 rounded-xl bg-emerald-950/[0.05]" />
        </div>
      </div>

      {/* 4 Admin Metric Cards Skeleton: White Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-28 rounded bg-emerald-950/[0.05]" />
              <Skeleton className="h-8 w-8 rounded-lg bg-emerald-950/[0.08]" />
            </div>
            <Skeleton className="h-8 w-20 rounded bg-emerald-950/[0.08]" />
            <Skeleton className="h-3 w-36 rounded bg-emerald-950/[0.05]" />
          </div>
        ))}
      </div>

      {/* Admin Table Skeleton: White Card */}
      <div className="rounded-2xl bg-white border border-emerald-950/[0.08] shadow-sm overflow-hidden space-y-2 p-4">
        <div className="flex justify-between items-center py-2 border-b border-emerald-100">
          <Skeleton className="h-6 w-44 rounded bg-emerald-950/[0.08]" />
          <Skeleton className="h-9 w-32 rounded-xl bg-emerald-950/[0.05]" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <TableRowSkeleton key={i} columns={5} />
        ))}
      </div>
    </div>
  );
}
'''

with open(r'SchoolRide-LK-V2\apps\web\src\app\admin\loading.tsx', 'w', encoding='utf-8') as f:
    f.write(loading_code)

print("Updated admin loading.tsx with white cards & green skeleton highlights!")
