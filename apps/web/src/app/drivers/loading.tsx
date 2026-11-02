import * as React from 'react';
import { Skeleton, DriverCardSkeleton } from '@/components/ui/skeleton';

export default function DriversLoading() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFDF9] dark:bg-slate-950 py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8 w-full">
        {/* Header Skeleton */}
        <div className="space-y-3 max-w-xl">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-10 w-3/4 rounded-xl" />
          <Skeleton className="h-4 w-full rounded" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-950/[0.08] shadow-sm flex flex-col sm:flex-row gap-4 items-center">
          <Skeleton className="h-11 flex-1 rounded-xl w-full" />
          <Skeleton className="h-11 w-44 rounded-xl" />
          <Skeleton className="h-11 w-32 rounded-xl" />
        </div>

        {/* Drivers Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <DriverCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
