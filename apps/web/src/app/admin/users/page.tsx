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
                            ? 'bg-[#EBF7EE] text-[#16A34A] border-[#BCE6C9]'
                            : u.status === AccountStatus.SUSPENDED
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
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
                            setSuspendReason('');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            u.status === AccountStatus.SUSPENDED
                              ? 'bg-[#EAF6ED] text-[#094718] border-[#CDE9D3] hover:bg-[#D8EFE0]'
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
