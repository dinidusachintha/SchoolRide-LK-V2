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
          reason: suspendReason.trim() || 'Administrative security suspension',
        });
        toast.warning(`Account for ${suspendingUser.fullName} suspended.`);
      }
      setSuspendingUser(null);
      setSuspendReason('');
      loadUsers();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update account status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 w-full text-left">
      {/* 2nd Section: Top Banner Card (Dark Navy Blue Background) */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#0B1528] text-white p-6 sm:p-8 border border-[#0B1528] shadow-md overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#FFC928]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Link href="/admin/dashboard" className="text-slate-400 hover:text-white transition-colors mr-1">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                User Identity <span className="text-[#FFC928]">&amp; Access Control</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-blue-100/80 max-w-2xl leading-relaxed">
              Manage platform users, inspect role assignments, and enforce safety suspensions across Sri Lanka.
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFC928] text-xs font-extrabold shrink-0 shadow-sm backdrop-blur-md">
            {users.length} Users Listed
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar: White Gray Glass Effect Background */}
      <div className="glass-search-bar p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center relative overflow-hidden">
        <div className="sm:col-span-2 relative">
          <input
            type="text"
            placeholder="Search by full name, email, phone or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300/80 bg-white/95 text-xs text-[#0B2345] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928] shadow-xs"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#0B2345]" />
        </div>

        <div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300/80 bg-white/95 text-xs font-bold text-[#0B2345] focus:outline-none focus:ring-2 focus:ring-[#FFC928] cursor-pointer shadow-xs"
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
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300/80 bg-white/95 text-xs font-bold text-[#0B2345] focus:outline-none focus:ring-2 focus:ring-[#FFC928] cursor-pointer shadow-xs"
          >
            <option value="">All Statuses</option>
            <option value={AccountStatus.ACTIVE}>Active</option>
            <option value={AccountStatus.PENDING_VERIFICATION}>Pending Verification</option>
            <option value={AccountStatus.SUSPENDED}>Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table: Premium White Glass Card */}
      <div className="glass-card-white rounded-3xl overflow-hidden shadow-md">
        {isLoading ? (
          <div className="p-8 space-y-4">
            <Skeleton className="h-6 w-full bg-slate-200/60" />
            <Skeleton className="h-6 w-full bg-slate-200/60" />
            <Skeleton className="h-6 w-full bg-slate-200/60" />
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No users found matching current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B1528] text-white border-b border-blue-900/50 font-extrabold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-4 text-white">User</th>
                  <th className="py-4 px-4 text-slate-200">Contact</th>
                  <th className="py-4 px-4 text-slate-200">Role</th>
                  <th className="py-4 px-4 text-slate-200">Status</th>
                  <th className="py-4 px-4 text-slate-200">Location</th>
                  <th className="py-4 px-4 text-slate-200">Registered</th>
                  <th className="py-4 px-4 text-right text-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-[#0B2345]">{u.fullName}</div>
                      <div className="text-[11px] text-slate-500">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-[#0B2345]">
                      {u.phone}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-[#0B2345] border border-blue-200/80">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          u.status === AccountStatus.ACTIVE
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : u.status === AccountStatus.SUSPENDED
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {u.district} ({u.city})
                    </td>
                    <td className="py-3.5 px-4 text-[#0B2345]/70 font-mono text-[11px] font-medium">
                      {formatSriLankanDateTime(u.createdAt)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {u.role !== UserRole.ADMIN && (
                        <button
                          onClick={() => {
                            setSuspendingUser(u);
                            setSuspendReason('');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            u.status === AccountStatus.SUSPENDED
                              ? 'bg-blue-50 text-[#0B2345] border-blue-200 hover:bg-blue-100'
                              : 'bg-white text-rose-700 border-rose-200 hover:bg-rose-50'
                          }`}
                        >
                          {u.status === AccountStatus.SUSPENDED ? 'Reactivate' : 'Suspend'}
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
        <DialogContent className="sm:max-w-md bg-white border border-slate-200 text-[#0B2345] rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-black text-[#0B2345]">
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
                  className="bg-slate-50 border-slate-200 text-[#0B2345] text-xs min-h-[90px] focus:ring-2 focus:ring-[#FFC928]"
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
                    ? 'bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs'
                    : 'bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs'
                }
              >
                {isSubmitting
                  ? 'Saving...'
                  : suspendingUser?.status === AccountStatus.SUSPENDED
                  ? 'Confirm Reactivation'
                  : 'Confirm Suspension'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
