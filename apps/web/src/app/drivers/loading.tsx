import * as React from 'react';
import { Skeleton, DriverCardSkeleton } from '@/components/ui/skeleton';

export default function DriversLoading() {
  return (
    <div className="flex flex-col w-full min-h-screen dashboard-navy-yellow-bg text-[#0B1528] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full relative z-10">
        {/* Header Skeleton */}
        <div className="rounded-[28px] p-6 sm:p-10 bg-white/65 border border-white/75 backdrop-blur-xl space-y-3">
          <Skeleton className="h-6 w-48 rounded-full" />
          <Skeleton className="h-10 w-3/4 rounded-xl" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="p-6 rounded-[28px] bg-white/65 border border-white/75 backdrop-blur-xl flex flex-col sm:flex-row gap-4 items-center">
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
