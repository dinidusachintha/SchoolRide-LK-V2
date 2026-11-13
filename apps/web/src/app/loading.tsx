import * as React from 'react';
import { Skeleton, MetricStatsSkeleton, SchoolCardSkeleton } from '@/components/ui/skeleton';

export default function GlobalLoading() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FFFFFF] dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Hero Section Skeleton */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Skeleton className="h-8 w-44 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-12 sm:h-14 w-full max-w-lg rounded-2xl" />
              <Skeleton className="h-12 sm:h-14 w-4/5 rounded-2xl" />
            </div>
            <Skeleton className="h-5 w-full max-w-md rounded" />
            <Skeleton className="h-5 w-3/4 rounded" />
            <div className="flex gap-4 pt-2">
              <Skeleton className="h-12 w-36 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
            <div className="flex gap-6 pt-3">
              <Skeleton className="h-5 w-28 rounded-full" />
              <Skeleton className="h-5 w-28 rounded-full" />
              <Skeleton className="h-5 w-28 rounded-full" />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Skeleton className="h-[340px] sm:h-[440px] w-full rounded-[32px]" />
          </div>
        </div>

        {/* 4 Bottom Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/80 shadow-sm flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-2xl shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-28 rounded" />
                <Skeleton className="h-3.5 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee Stats Skeleton */}
      <section className="py-10 border-y border-blue-900/30 bg-[#0B1528]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <MetricStatsSkeleton />
        </div>
      </section>

      {/* Grid Content Skeleton */}
      <section className="py-16 max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SchoolCardSkeleton />
          <SchoolCardSkeleton />
          <SchoolCardSkeleton />
        </div>
      </section>
    </div>
  );
}
