'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { PortalDashboardSkeleton } from '@/components/ui/skeleton';
import { UserRole } from '@schoolride/shared';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthorized = !!user && allowedRoles.includes(user.role);

  React.useEffect(() => {
    if (isLoading) return;
    if (!user) {
      const next = pathname ? `?redirect=${encodeURIComponent(pathname)}` : '';
      router.replace(`/login${next}`);
      return;
    }
    if (!allowedRoles.includes(user.role)) {
      if (user.role === UserRole.ADMIN) router.replace('/admin/dashboard');
      else if (user.role === UserRole.DRIVER) router.replace('/driver/dashboard');
      else router.replace('/parent/dashboard');
    }
  }, [user, isLoading, allowedRoles, router, pathname]);

  if (isLoading || !isAuthorized) {
    return <>{fallback ?? <PortalDashboardSkeleton kpiCount={4} />}</>;
  }

  return <>{children}</>;
}
