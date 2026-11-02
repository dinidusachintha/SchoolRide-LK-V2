'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users,
  Search,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  UserCheck,
  UserX,
} from 'lucide-react';
import { toast } from 'sonner';
import { AccountStatus, UserRole, formatSriLankanDateTime } from '@schoolride/shared';

export default function AdminUsersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [users, setUsers] = React.useState<any[]>([]);
  const [roleFilter, setRoleFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  // Suspend modal state
  const [suspendingUser, setSuspendingUser] = React.useState<any>(null);
  const [suspendReason, setSuspendReason] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const loadUsers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (roleFilter) params.append('role', roleFilter);
      if (statusFilter) params.append('status', statusFilter);
      if (searchQuery.trim()) params.append('query', searchQuery.trim());

      const data = await api.get(`/admin/users?${params.toString()}`);
      setUsers(data || []);
    } catch (err: any) {
      console.error('Failed to load users:', err);
    } finally {
      setIsLoading(false);
    }
  }, [roleFilter, statusFilter, searchQuery]);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/login');
      return;
    }
    if (user) {
      loadUsers();
    }
  }, [user, authLoading, router, loadUsers]);

  const handleUpdateStatus = async (targetUser: any, status: AccountStatus, reason?: string) => {
    try {
      await api.patch(`/admin/users/${targetUser.id}/status`, {
        status,
        reason,
      });
      toast.success(`User account status updated to ${status}`);
      setSuspendingUser(null);
      setSuspendReason('');
      loadUsers();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update user status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="space-y-6 w-full">
        <Skeleton className="h-8 w-64 bg-[#092B1C]" />
        <Skeleton className="h-96 w-full rounded-2xl bg-[#092B1C]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#12422A] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-[#8DAE9C] hover:text-[#4ADE80] transition-colors mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Platform User <span className="text-[#4ADE80]">Directory &amp; Moderation</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#8DAE9C]">
            Search, inspect, and manage accounts for registered parents, van drivers, and administrative staff.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-full bg-[#092B1C] border border-[#144D30] text-xs font-mono text-[#86EFAC] shrink-0">
          {users.length} Records Found
        </span>
      </div>

      {/* Filter and Search Bar in Dark Green */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-2 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#8DAE9C]" />
          <input
            type="text"
            placeholder="Search by name, email, or phone number..."
            className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#165A37] bg-[#072417] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#4ADE80]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <select
            className="w-full h-10 px-3 rounded-xl border border-[#165A37] bg-[#072417] text-white text-xs focus:outline-none focus:border-[#4ADE80]"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value={UserRole.PARENT}>Parents</option>
            <option value={UserRole.DRIVER}>Van Operators</option>
            <option value={UserRole.ADMIN}>Administrators</option>
          </select>
        </div>

        <div>
          <select
            className="w-full h-10 px-3 rounded-xl border border-[#165A37] bg-[#072417] text-white text-xs focus:outline-none focus:border-[#4ADE80]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value={AccountStatus.ACTIVE}>Active</option>
            <option value={AccountStatus.SUSPENDED}>Suspended</option>
            <option value={AccountStatus.PENDING_VERIFICATION}>Pending</option>
          </select>
        </div>
      </div>

      {/* Users Table in Dark Green with Light Green Font Highlights */}
      <div className="rounded-2xl overflow-hidden border border-[#144D30] bg-[#092B1C] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#072417] text-[#86EFAC] uppercase font-bold border-b border-[#12422A]">
              <tr>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">District / City</th>
                <th className="py-3.5 px-4">Joined</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#12422A]">
              {users.map((u) => {
                const isActive = u.status === AccountStatus.ACTIVE;
                const isSuspended = u.status === AccountStatus.SUSPENDED;

                return (
                  <tr key={u.id} className="hover:bg-[#0B3320] transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-white text-sm">{u.fullName}</p>
                      <p className="text-[11px] text-[#86EFAC] font-mono">{u.email}</p>
                      {u.phone && <p className="text-[10px] text-[#8DAE9C]">{u.phone}</p>}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          u.role === UserRole.ADMIN
                            ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                            : u.role === UserRole.DRIVER
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : 'bg-[#0E3E27] text-[#4ADE80] border-[#22C55E]/30'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          isActive
                            ? 'bg-[#0E3E27] text-[#4ADE80] border-[#22C55E]/30'
                            : isSuspended
                            ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#8DAE9C]">
                      {u.district || 'Colombo'}{u.city ? `, ${u.city}` : ''}
                    </td>

                    <td className="py-3.5 px-4 text-[#8DAE9C] font-mono text-[11px]">
                      {formatSriLankanDateTime(u.createdAt)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {u.role !== UserRole.ADMIN && (
                        isActive ? (
                          <button
                            type="button"
                            onClick={() => setSuspendingUser(u)}
                            className="px-3 py-1 rounded-lg text-[11px] font-bold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900 border border-rose-500/30 transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <UserX className="h-3 w-3" /> Suspend
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(u, AccountStatus.ACTIVE)}
                            className="px-3 py-1 rounded-lg text-[11px] font-bold text-[#4ADE80] hover:text-white bg-[#0E3E27] hover:bg-[#15803d] border border-[#22C55E]/30 transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <UserCheck className="h-3 w-3" /> Activate
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Suspend Reason Dialog */}
      <Dialog open={!!suspendingUser} onOpenChange={(open) => !open && setSuspendingUser(null)}>
        <DialogContent className="max-w-md bg-[#072417] border border-[#12422A] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Suspend User Account</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <p className="text-xs text-[#8DAE9C]">
              You are suspending <strong className="text-white">{suspendingUser?.fullName}</strong>. They will be immediately blocked from signing in or accepting rides.
            </p>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-1.5">
                Audit Suspension Reason *
              </label>
              <Textarea
                rows={3}
                placeholder="e.g. Repeated safety complaints from parents regarding schedule punctuality and vehicle inspection expiry."
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                className="bg-[#051A10] border-[#165A37] text-white placeholder:text-slate-500"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setSuspendingUser(null)} className="border-[#165A37] text-slate-300 hover:bg-[#0B3320]">
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={isSubmitting}
                onClick={() => handleUpdateStatus(suspendingUser, AccountStatus.SUSPENDED, suspendReason)}
              >
                {isSubmitting ? 'Suspending...' : 'Confirm Suspension'}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
