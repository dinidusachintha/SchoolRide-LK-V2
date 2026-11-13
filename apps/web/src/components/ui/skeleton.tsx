import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

export function Skeleton({
  className,
  shimmer = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={cn(
        'rounded-xl bg-[#0B1528]/[0.08] dark:bg-slate-800/80 transition-colors',
        shimmer ? 'skeleton-shimmer' : 'animate-skeleton-pulse',
        className
      )}
      {...props}
    />
  );
}

// Specialized Skeletons for Rich Smooth Scrolling & Streaming States

export function SchoolCardSkeleton() {
  return (
    <div className="p-6 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-5 w-28 rounded-full" />
      </div>
      <Skeleton className="h-7 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-1/2 rounded" />
      <div className="space-y-2 pt-3 border-t border-slate-200/60 dark:border-slate-800">
        <Skeleton className="h-3 w-1/3 rounded" />
        <Skeleton className="h-3.5 w-full rounded" />
        <Skeleton className="h-3.5 w-4/5 rounded" />
      </div>
      <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>
    </div>
  );
}

export function DriverCardSkeleton() {
  return (
    <div className="p-6 rounded-[28px] bg-white/65 border border-white/75 shadow-lg backdrop-blur-xl space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-2xl shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-1/2 rounded-lg" />
          <Skeleton className="h-3.5 w-1/3 rounded-lg" />
        </div>
        <Skeleton className="h-7 w-16 rounded-full" />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <Skeleton className="h-14 rounded-xl" />
        <Skeleton className="h-14 rounded-xl" />
      </div>

      <div className="flex gap-2 pt-1">
        <Skeleton className="h-6 w-20 rounded-lg" />
        <Skeleton className="h-6 w-24 rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-lg" />
      </div>

      <div className="pt-4 border-t border-white/40 flex items-center justify-between">
        <Skeleton className="h-7 w-28 rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-full" />
          <Skeleton className="h-9 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function LiveTrackingSkeleton() {
  return (
    <div className="rounded-[32px] overflow-hidden border border-white/75 bg-white/65 shadow-lg backdrop-blur-xl space-y-4">
      <Skeleton className="w-full h-[360px] sm:h-[420px] rounded-none" />
      <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-6 w-56 rounded-lg" />
          <Skeleton className="h-3.5 w-44 rounded-lg" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-12 w-24 rounded-xl" />
          <Skeleton className="h-12 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function MetricStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-2 flex flex-col items-center">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-4 w-36 rounded" />
        </div>
      ))}
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 py-4 px-4 border-b border-slate-200/60 dark:border-slate-800">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4 rounded',
            i === 0 ? 'w-12' : i === 1 ? 'w-36' : 'flex-1'
          )}
        />
      ))}
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="p-7 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
      <Skeleton className="h-4 w-24 rounded" />
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-full rounded" />
        <Skeleton className="h-3.5 w-5/6 rounded" />
        <Skeleton className="h-3.5 w-3/4 rounded" />
      </div>
      <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-1">
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-3 w-40 rounded" />
      </div>
    </div>
  );
}

/** Shared frosted white glass loading skeleton for Parent & Driver dashboard portals. */
export function PortalDashboardSkeleton({ kpiCount = 4 }: { kpiCount?: number }) {
  return (
    <div className="min-h-screen dashboard-navy-yellow-bg text-[#0B1528] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <div className="flex items-center gap-2 pb-2 border-b border-white/15 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-9 w-28 rounded-full shrink-0" />
          ))}
        </div>
        <div className="rounded-[32px] p-6 sm:p-8 border border-white/75 bg-white/65 backdrop-blur-xl space-y-4">
          <Skeleton className="h-6 w-44 rounded-full" />
          <Skeleton className="h-9 w-72 max-w-full rounded-xl" />
          <Skeleton className="h-4 w-96 max-w-full rounded-lg" />
        </div>
        <div className="rounded-[32px] p-6 sm:p-8 border border-white/75 bg-white/65 backdrop-blur-xl space-y-6">
          {kpiCount > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: kpiCount }).map((_, i) => (
                <Skeleton key={i} className="h-28 rounded-[22px]" />
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-56 rounded-[24px]" />
            <Skeleton className="h-56 rounded-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
