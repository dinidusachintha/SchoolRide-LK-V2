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
import { Skeleton } from '@/components/ui/skeleton';
import {
  School,
  Plus,
  Search,
  MapPin,
  ArrowLeft,
  Compass,
  Edit,
  GraduationCap,
} from 'lucide-react';
import { toast } from 'sonner';
import { SRI_LANKAN_DISTRICTS } from '@schoolride/shared';

export default function AdminSchoolsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [schools, setSchools] = React.useState<any[]>([]);
  const [districtFilter, setDistrictFilter] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingSchoolId, setEditingSchoolId] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    district: 'Colombo',
    city: 'Colombo',
    address: '',
    latitude: 6.9034,
    longitude: 79.8596,
  });

  const loadSchools = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.get('/schools');
      setSchools(data || []);
    } catch (err: any) {
      console.error('Failed to load schools:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/login');
      return;
    }
    if (user) {
      loadSchools();
    }
  }, [user, authLoading, router, loadSchools]);

  const handleOpenAdd = () => {
    setEditingSchoolId(null);
    setFormData({
      name: '',
      district: 'Colombo',
      city: 'Colombo',
      address: '',
      latitude: 6.9034,
      longitude: 79.8596,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (school: any) => {
    setEditingSchoolId(school.id);
    setFormData({
      name: school.name,
      district: school.district,
      city: school.city,
      address: school.address,
      latitude: school.latitude,
      longitude: school.longitude,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('School name is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingSchoolId) {
        await api.patch(`/schools/${editingSchoolId}`, formData);
        toast.success('School details updated successfully.');
      } else {
        await api.post('/schools', formData);
        toast.success('New school campus added to platform registry.');
      }
      setIsDialogOpen(false);
      loadSchools();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save school.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = schools.filter((s) => {
    const matchesDistrict = !districtFilter || s.district.toLowerCase() === districtFilter.toLowerCase();
    const matchesQuery = !searchQuery.trim() ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesQuery;
  });

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
                School Campus <span className="text-[#FFC928]">&amp; Route Directory</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-blue-100/80 max-w-2xl leading-relaxed">
              Configure verified dropoff gates, GPS coordinates, and van operator route mappings across Sri Lanka.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="btn-glass-yellow-3d px-5 py-2.5 text-xs font-black shadow-lg flex items-center gap-2 shrink-0"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Register New School</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar: White Gray Glass Effect Background */}
      <div className="glass-search-bar p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center relative overflow-hidden">
        <div className="sm:col-span-2 relative">
          <input
            type="text"
            placeholder="Search school by campus name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300/80 bg-white/95 text-xs text-[#0B2345] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928] shadow-xs"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#0B2345]" />
        </div>

        <div>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300/80 bg-white/95 text-xs font-bold text-[#0B2345] focus:outline-none focus:ring-2 focus:ring-[#FFC928] cursor-pointer shadow-xs"
          >
            <option value="">All Districts ({SRI_LANKAN_DISTRICTS.length})</option>
            {SRI_LANKAN_DISTRICTS.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schools Cards Grid: Premium White Glass Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-44 rounded-3xl bg-slate-200/60" />
          <Skeleton className="h-44 rounded-3xl bg-slate-200/60" />
          <Skeleton className="h-44 rounded-3xl bg-slate-200/60" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card-white p-12 text-center text-xs text-slate-500 rounded-3xl">
          No schools found matching search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((school) => (
            <div
              key={school.id}
              className="glass-card-white glass-card-white-hover p-6 rounded-3xl space-y-3.5 flex flex-col justify-between shadow-md"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#0B2345] border border-blue-100 shadow-xs shrink-0">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[#0B2345] leading-snug">{school.name}</h3>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-[#FFC928]" /> {school.city}, {school.district}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenEdit(school)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B2345] hover:bg-slate-100 transition-colors"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {school.address}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                <span className="font-mono text-[#0B2345]/80 font-bold">
                  {school.latitude.toFixed(4)}° N, {school.longitude.toFixed(4)}° E
                </span>
                <span className="px-2.5 py-0.5 rounded-full font-bold bg-slate-100 text-[#0B2345] border border-slate-200">
                  {school.district}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-slate-200 text-[#0B2345] rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-black text-[#0B2345]">
              {editingSchoolId ? 'Edit School Details' : 'Register New School Campus'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#0B2345] mb-1">School Name</label>
              <Input
                placeholder="e.g. Royal College"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-50 border-slate-200 text-[#0B2345] text-xs focus:ring-2 focus:ring-[#FFC928]"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0B2345] mb-1">District</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-[#0B2345] focus:ring-2 focus:ring-[#FFC928]"
                >
                  {SRI_LANKAN_DISTRICTS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0B2345] mb-1">City / Town</label>
                <Input
                  placeholder="e.g. Colombo 07"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-slate-50 border-slate-200 text-[#0B2345] text-xs focus:ring-2 focus:ring-[#FFC928]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B2345] mb-1">Street Address</label>
              <Input
                placeholder="e.g. Reid Avenue, Colombo 00700"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-slate-50 border-slate-200 text-[#0B2345] text-xs focus:ring-2 focus:ring-[#FFC928]"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0B2345] mb-1">Gate Latitude</label>
                <Input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                  className="bg-slate-50 border-slate-200 text-[#0B2345] text-xs font-mono focus:ring-2 focus:ring-[#FFC928]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0B2345] mb-1">Gate Longitude</label>
                <Input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                  className="bg-slate-50 border-slate-200 text-[#0B2345] text-xs font-mono focus:ring-2 focus:ring-[#FFC928]"
                  required
                />
              </div>
            </div>
            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="bg-white text-slate-700 border-slate-200"
              >
                Cancel
              </Button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glass-yellow-3d px-5 py-2 text-xs font-black shadow-md cursor-pointer"
              >
                {isSubmitting ? 'Saving...' : editingSchoolId ? 'Update Campus' : 'Register School'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
