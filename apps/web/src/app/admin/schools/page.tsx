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
      const params = new URLSearchParams();
      if (districtFilter) params.append('district', districtFilter);
      if (searchQuery.trim()) params.append('query', searchQuery.trim());

      const data = await api.get(`/schools?${params.toString()}`);
      setSchools(data || []);
    } catch (err: any) {
      console.error('Failed to load schools:', err);
    } finally {
      setIsLoading(false);
    }
  }, [districtFilter, searchQuery]);

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
    if (!formData.name.trim() || !formData.address.trim()) {
      toast.error('School name and address are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingSchoolId) {
        await api.patch(`/schools/${editingSchoolId}`, formData);
        toast.success('School profile updated successfully!');
      } else {
        await api.post('/schools', formData);
        toast.success('New school added to national transport registry!');
      }
      setIsDialogOpen(false);
      loadSchools();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save school.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && schools.length === 0) {
    return (
      <div className="space-y-6 w-full">
        <Skeleton className="h-8 w-64 bg-[#092B1C]" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-40 rounded-2xl bg-[#092B1C]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#12422A] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-[#8DAE9C] hover:text-[#4ADE80] transition-colors mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Sri Lankan Schools <span className="text-[#4ADE80]">&amp; Route Registry</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#8DAE9C]">
            Manage recognized educational institutions, GPS dropoff coordinates, and registered van routes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#166534] hover:bg-[#15803d] text-white font-bold text-xs shadow-md border border-[#22C55E]/40 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4 text-[#86EFAC]" />
          <span>Add New School</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#8DAE9C]" />
          <input
            type="text"
            placeholder="Search school by name, street, or city..."
            className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#165A37] bg-[#072417] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#4ADE80]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <select
            className="w-full h-10 px-3 rounded-xl border border-[#165A37] bg-[#072417] text-white text-xs focus:outline-none focus:border-[#4ADE80]"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
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

      {/* Schools Cards Grid in Dark Green */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {schools.map((school) => (
          <div
            key={school.id}
            className="p-5 rounded-2xl bg-[#092B1C] border border-[#144D30] hover:border-[#22C55E]/40 transition-all flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0E3E27] text-[#4ADE80] border border-[#165A37] shrink-0">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{school.name}</h3>
                    <span className="text-[10px] text-[#4ADE80] font-semibold">{school.district} District</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(school)}
                  className="p-1.5 rounded-lg text-[#8DAE9C] hover:text-[#4ADE80] hover:bg-[#0E3E27] transition-colors"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="text-xs text-[#8DAE9C] flex items-center gap-1.5 leading-relaxed">
                <MapPin className="h-3.5 w-3.5 text-[#4ADE80] shrink-0" />
                <span className="line-clamp-2">{school.address}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-[#12422A] flex items-center justify-between text-[11px] text-[#86EFAC] font-mono">
              <span>{school.latitude.toFixed(4)}°N, {school.longitude.toFixed(4)}°E</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0E3E27] text-[#4ADE80] border border-[#22C55E]/30">
                Active Routes
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md bg-[#072417] border border-[#12422A] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingSchoolId ? 'Edit School Information' : 'Add New Educational Institution'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-1">
                Official School Name *
              </label>
              <Input
                placeholder="e.g. Royal College, Colombo 07"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#051A10] border-[#165A37] text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-1">
                  District *
                </label>
                <select
                  className="w-full h-10 px-3 rounded-xl border border-[#165A37] bg-[#051A10] text-white text-xs focus:outline-none"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                >
                  {SRI_LANKAN_DISTRICTS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-1">
                  City / Town *
                </label>
                <Input
                  placeholder="e.g. Colombo 07"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-[#051A10] border-[#165A37] text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-1">
                Street Address *
              </label>
              <Input
                placeholder="e.g. Rajakeeya Mawatha, Colombo 00700"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-[#051A10] border-[#165A37] text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-1">
                  GPS Latitude
                </label>
                <Input
                  type="number"
                  step="0.0001"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                  className="bg-[#051A10] border-[#165A37] text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-1">
                  GPS Longitude
                </label>
                <Input
                  type="number"
                  step="0.0001"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                  className="bg-[#051A10] border-[#165A37] text-white font-mono text-xs"
                />
              </div>
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-[#165A37] text-slate-300 hover:bg-[#0B3320]">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-[#166534] hover:bg-[#15803d] text-white">
                {isSubmitting ? 'Saving...' : editingSchoolId ? 'Save Changes' : 'Create School'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
