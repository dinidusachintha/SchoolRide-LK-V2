'use client';

import * as React from 'react';
import { Skeleton, TableRowSkeleton } from '@/components/ui/skeleton';

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
