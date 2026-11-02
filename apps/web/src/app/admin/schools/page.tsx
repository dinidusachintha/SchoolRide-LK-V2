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
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-[#4E6258] hover:text-[#094718] transition-colors mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-black text-[#0B2C22] tracking-tight">
              School Campus <span className="text-[#16A34A]">&amp; Route Directory</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6258]">
            Configure verified dropoff gates, GPS coordinates, and van operator route mappings across Sri Lanka.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Register New School</span>
        </button>
      </div>

      {/* Filter Toolbar: White Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-emerald-950/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <div className="sm:col-span-2 relative">
          <input
            type="text"
            placeholder="Search school by campus name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-emerald-200 bg-[#FAFDF9] text-xs text-[#0B2C22] placeholder:text-[#709080] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#709080]" />
        </div>

        <div>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-emerald-200 bg-[#FAFDF9] text-xs font-semibold text-[#0B2C22] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
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

      {/* Schools Cards Grid: White Cards with Green Headers */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-44 rounded-2xl bg-white border border-emerald-100" />
          <Skeleton className="h-44 rounded-2xl bg-white border border-emerald-100" />
          <Skeleton className="h-44 rounded-2xl bg-white border border-emerald-100" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#4E6258] bg-white rounded-2xl border border-emerald-950/[0.08]">
          No schools found matching search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((school) => (
            <div
              key={school.id}
              className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] hover:border-emerald-300 hover:shadow-md transition-all space-y-3 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3] shrink-0">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0B2C22] leading-snug">{school.name}</h3>
                      <p className="text-[11px] text-[#4E6258] flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-[#16A34A]" /> {school.city}, {school.district}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenEdit(school)}
                    className="p-1.5 rounded-lg text-[#709080] hover:text-[#094718] hover:bg-[#EAF6ED] transition-colors"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="text-xs text-[#4E6258] leading-relaxed line-clamp-2">
                  {school.address}
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-[11px]">
                <span className="font-mono text-[#16A34A] font-semibold">
                  {school.latitude.toFixed(4)}° N, {school.longitude.toFixed(4)}° E
                </span>
                <span className="px-2 py-0.5 rounded-full font-bold bg-[#EAF6ED] text-[#094718] border border-[#BCE6C9]">
                  {school.district}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-emerald-100 text-[#0B2C22]">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#0B2C22]">
              {editingSchoolId ? 'Edit School Details' : 'Register New School Campus'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#0B2C22] mb-1">School Name</label>
              <Input
                placeholder="e.g. Royal College"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0B2C22] mb-1">District</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-[#FAFDF9] text-xs font-semibold text-[#0B2C22]"
                >
                  {SRI_LANKAN_DISTRICTS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0B2C22] mb-1">City / Town</label>
                <Input
                  placeholder="e.g. Colombo 07"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B2C22] mb-1">Street Address</label>
              <Input
                placeholder="e.g. Reid Avenue, Colombo 00700"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0B2C22] mb-1">Gate Latitude</label>
                <Input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                  className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0B2C22] mb-1">Gate Longitude</label>
                <Input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                  className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs font-mono"
                  required
                />
              </div>
            </div>
            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="bg-white text-[#4E6258] border-slate-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs"
              >
                {isSubmitting ? 'Saving...' : editingSchoolId ? 'Update Campus' : 'Register School'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
