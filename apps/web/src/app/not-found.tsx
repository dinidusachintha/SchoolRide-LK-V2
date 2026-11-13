import Link from 'next/link';
import { Bus, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full dashboard-navy-yellow-bg flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-lg w-full glass-card-white rounded-[32px] p-8 sm:p-10 text-center space-y-6 shadow-2xl">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B1528] text-[#FACC15] shadow-md mx-auto">
          <Bus className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#CA8A04]">
            404 • Route Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1528] tracking-tight">
            We couldn&apos;t find that page
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The link may have moved or is no longer active. Explore verified school van drivers or return to the SchoolRide LK homepage.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/drivers"
            className="btn-glass-yellow-3d px-6 py-3 text-xs sm:text-sm inline-flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            <span>Find School Vans</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B1528] hover:bg-[#071426] text-white font-bold text-xs sm:text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#FACC15]" />
            <span>Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

