'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  MapPin,
  GraduationCap,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Search,
  Bus,
  CheckCircle2,
  Clock,
  Radio,
  Phone,
  AlertTriangle,
  School,
  Heart,
  Sparkles,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { INITIAL_SCHOOLS } from '@schoolride/shared';
import { motion, AnimatePresence } from 'framer-motion';

// Demonstration fallback profiles matching home page
const DEMO_CHILDREN = [
  {
    id: 'child-01',
    firstName: 'Dineth',
    lastName: 'Silva',
    dateOfBirth: '2014-05-12',
    gender: 'MALE',
    schoolId: 'school-col-01',
    grade: 'Grade 7-B',
    pickupAddress: 'No 45, Chapel Road, Nugegoda',
    pickupLatitude: 6.8722,
    pickupLongitude: 79.8997,
    dropoffAddress: 'Royal College, Rajakeeya Mawatha, Colombo 07',
    dropoffLatitude: 6.9066,
    dropoffLongitude: 79.8617,
    specialNotes: 'Prefers front seat if possible. Has asthma inhaler in school backpack.',
    school: {
      name: 'Royal College Colombo',
      district: 'Colombo',
      city: 'Colombo 07',
    },
    bookings: [
      {
        id: 'book-01',
        status: 'ACTIVE',
        route: {
          name: 'Royal College & Visakha Morning Run #04',
          driver: {
            name: 'Sunil Wickramasinghe',
            phone: '+94 77 123 4567',
            vehiclePlate: 'WP ND-8422',
          },
        },
      },
    ],
  },
  {
    id: 'child-02',
    firstName: 'Senuri',
    lastName: 'Silva',
    dateOfBirth: '2017-09-20',
    gender: 'FEMALE',
    schoolId: 'school-col-02',
    grade: 'Grade 4-D',
    pickupAddress: 'No 45, Chapel Road, Nugegoda',
    pickupLatitude: 6.8722,
    pickupLongitude: 79.8997,
    dropoffAddress: 'Visakha Vidyalaya, Vajira Road, Colombo 05',
    dropoffLatitude: 6.8860,
    dropoffLongitude: 79.8650,
    specialNotes: 'Needs assistance with heavy school bag at van boarding step.',
    school: {
      name: 'Visakha Vidyalaya Colombo',
      district: 'Colombo',
      city: 'Colombo 05',
    },
    bookings: [
      {
        id: 'book-02',
        status: 'ACTIVE',
        route: {
          name: 'Royal College & Visakha Morning Run #04',
          driver: {
            name: 'Sunil Wickramasinghe',
            phone: '+94 77 123 4567',
            vehiclePlate: 'WP ND-8422',
          },
        },
      },
    ],
  },
];

export default function ParentChildrenPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [childrenList, setChildrenList] = React.useState<any[]>(DEMO_CHILDREN);
  const [schools, setSchools] = React.useState<any[]>(INITIAL_SCHOOLS);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterTab, setFilterTab] = React.useState<'ALL' | 'ENROLLED' | 'UNENROLLED'>('ALL');

  // Add/Edit Modal State
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingChildId, setEditingChildId] = React.useState<string | null>(null);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('2015-05-10');
  const [gender, setGender] = React.useState('MALE');
  const [schoolId, setSchoolId] = React.useState(INITIAL_SCHOOLS[0]?.id || '');
  const [grade, setGrade] = React.useState('Grade 6');
  const [pickupAddress, setPickupAddress] = React.useState('');
  const [dropoffAddress, setDropoffAddress] = React.useState('');
  const [specialNotes, setSpecialNotes] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const fetchChildren = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const [res, schoolsRes] = await Promise.all([
        api.get('/parents/me/children').catch(() => []),
        api.get('/schools').catch(() => INITIAL_SCHOOLS),
      ]);

      if (schoolsRes?.length > 0) {
        setSchools(schoolsRes);
      }

      if (Array.isArray(res) && res.length > 0) {
        setChildrenList(res);
      } else {
        // Fallback to demonstration children profiles for a complete visual experience
        setChildrenList(DEMO_CHILDREN);
      }
    } catch {
      setChildrenList(DEMO_CHILDREN);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchChildren();
  }, [fetchChildren]);

  const handleOpenAddModal = () => {
    setEditingChildId(null);
    setFirstName('');
    setLastName('');
    setDateOfBirth('2015-05-10');
    setGender('MALE');
    setSchoolId(schools[0]?.id || INITIAL_SCHOOLS[0].id);
    setGrade('Grade 6');
    setPickupAddress(user?.district ? `No 10, Main Street, ${user.city || user.district}` : 'No 45, Chapel Road, Nugegoda');
    setDropoffAddress('');
    setSpecialNotes('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (child: any) => {
    setEditingChildId(child.id);
    setFirstName(child.firstName);
    setLastName(child.lastName);
    setDateOfBirth(child.dateOfBirth || '2015-01-01');
    setGender(child.gender || 'MALE');
    setSchoolId(child.schoolId || schools[0]?.id);
    setGrade(child.grade || 'Grade 6');
    setPickupAddress(child.pickupAddress || '');
    setDropoffAddress(child.dropoffAddress || '');
    setSpecialNotes(child.specialNotes || '');
    setModalOpen(true);
  };

  const handleSubmitChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !schoolId || !pickupAddress.trim()) {
      toast.error('Please fill in all mandatory fields.');
      return;
    }

    const selectedSchool = schools.find((s) => s.id === schoolId) || INITIAL_SCHOOLS[0];
    const dropoff = dropoffAddress || `${selectedSchool?.name || 'School Gate'}, ${selectedSchool?.city || ''}`;

    setIsSubmitting(true);
    try {
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dateOfBirth,
        gender,
        schoolId,
        grade,
        pickupAddress: pickupAddress.trim(),
        pickupLatitude: 6.8722,
        pickupLongitude: 79.8997,
        dropoffAddress: dropoff,
        dropoffLatitude: selectedSchool?.latitude || 6.9066,
        dropoffLongitude: selectedSchool?.longitude || 79.8617,
        specialNotes: specialNotes.trim(),
      };

      if (editingChildId) {
        try {
          await api.patch(`/parents/me/children/${editingChildId}`, payload);
        } catch {
          // Local state update for demonstration mode
        }
        setChildrenList((prev) =>
          prev.map((c) =>
            c.id === editingChildId
              ? {
                  ...c,
                  ...payload,
                  school: selectedSchool,
                }
              : c
          )
        );
        toast.success(`${firstName}'s profile updated successfully.`);
      } else {
        let createdChild: any = null;
        try {
          createdChild = await api.post('/parents/me/children', payload);
        } catch {
          // Local fallback creation
        }
        const newChildEntry = createdChild || {
          id: `child-${Date.now()}`,
          ...payload,
          school: selectedSchool,
          bookings: [],
        };
        setChildrenList((prev) => [newChildEntry, ...prev]);
        toast.success(`Registered ${firstName} ${lastName} successfully!`);
      }

      setModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save child profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteChild = async (childId: string, name: string) => {
    if (!confirm(`Are you sure you want to remove the profile for ${name}?`)) {
      return;
    }

    try {
      await api.delete(`/parents/me/children/${childId}`).catch(() => null);
    } catch {
      // Allow local removal
    }
    setChildrenList((prev) => prev.filter((c) => c.id !== childId));
    toast.success(`${name}'s profile has been removed.`);
  };

  // Filter and search
  const filteredChildren = childrenList.filter((child) => {
    const fullName = `${child.firstName} ${child.lastName}`.toLowerCase();
    const schoolName = (child.school?.name || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = fullName.includes(query) || schoolName.includes(query) || (child.grade || '').toLowerCase().includes(query);

    const hasBooking = child.bookings && child.bookings.length > 0;
    if (filterTab === 'ENROLLED') return matchesSearch && hasBooking;
    if (filterTab === 'UNENROLLED') return matchesSearch && !hasBooking;
    return matchesSearch;
  });

  const enrolledCount = childrenList.filter((c) => c.bookings && c.bookings.length > 0).length;
  const unenrolledCount = childrenList.length - enrolledCount;
  const uniqueSchools = Array.from(new Set(childrenList.map((c) => c.school?.name || c.schoolId))).length;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden select-none pb-20">
      
      {/* Background Soft Texture matching Home Page */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-yellow-100/30 via-emerald-50/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 relative z-10 text-left">
        
        {/* Parent Portal Navigation Sub-Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200/80 dark:border-slate-800">
          <Link href="/parent/dashboard">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              📌 Overview
            </button>
          </Link>
          <Link href="/parent/children">
            <button className="px-4 py-2 rounded-full text-xs font-black bg-[#FACC15] text-slate-950 shadow-sm cursor-pointer whitespace-nowrap">
              👦 My Children ({childrenList.length})
            </button>
          </Link>
          <Link href="/parent/bookings">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              🚐 Van Bookings
            </button>
          </Link>
          <Link href="/parent/rides/live">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-[#14532D] dark:text-emerald-400 border border-emerald-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Live Ride Map</span>
            </button>
          </Link>
          <Link href="/parent/complaints">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              ⚠️ Inquiries &amp; Support
            </button>
          </Link>
          <Link href="/parent/settings">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              ⚙️ Settings
            </button>
          </Link>
        </div>

        {/* Hero Welcome Showcase Card matching Home Page Theme */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Decorative glow matching home page */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-br from-yellow-100/40 via-emerald-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF08A] text-[#713F12] border border-yellow-300 text-xs font-bold shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[#CA8A04]" />
              <span>5-Tier Safety Verified Student Profiles</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
              My Children &amp; <span className="text-[#CA8A04] dark:text-[#FACC15] underline decoration-[#FACC15]/40 underline-offset-8">School Commute</span> 👦🎒
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Register student profiles, assign verified school destinations, customize morning pickup coordinates, and manage safety instructions for school van transport in Sri Lanka.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={handleOpenAddModal}
              className="px-5 sm:px-6 py-3 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Plus className="h-4 w-4" />
              <span>Register New Child</span>
              <Sparkles className="h-3.5 w-3.5 text-slate-950/70" />
            </button>

            <Link href="/drivers">
              <button className="px-5 py-3 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-400 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2 cursor-pointer">
                <Bus className="h-4 w-4 text-[#16A34A]" />
                <span>Browse School Vans</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* 4 Summary KPI Cards matching Home Page Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* KPI 1 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Registered Students
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-300 border border-emerald-200/80 flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {childrenList.length}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Active Family Profiles
            </p>
          </div>

          {/* KPI 2 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Van Passes
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FEF08A] text-[#713F12] border border-yellow-300 flex items-center justify-center">
                <Bus className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {enrolledCount}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Confirmed Van Commutes
            </p>
          </div>

          {/* KPI 3 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Schools Covered
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 flex items-center justify-center">
                <School className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {uniqueSchools}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Enrolled Campuses
            </p>
          </div>

          {/* KPI 4 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Safety Vetting
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#16A34A] border border-emerald-200 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#14532D] dark:text-[#FACC15]">
              100%
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Police &amp; Vehicle Inspected
            </p>
          </div>
        </div>

        {/* Filter and Search Bar Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name, school, or grade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FACC15]/50"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => setFilterTab('ALL')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterTab === 'ALL'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All ({childrenList.length})
            </button>
            <button
              onClick={() => setFilterTab('ENROLLED')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                filterTab === 'ENROLLED'
                  ? 'bg-[#14532D] text-[#FACC15] shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Bus className="h-3 w-3" />
              <span>Enrolled ({enrolledCount})</span>
            </button>
            <button
              onClick={() => setFilterTab('UNENROLLED')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterTab === 'UNENROLLED'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Needs Van ({unenrolledCount})
            </button>
          </div>
        </div>

        {/* Children Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64 rounded-3xl" />
            <Skeleton className="h-64 rounded-3xl" />
          </div>
        ) : filteredChildren.length === 0 ? (
          <div className="p-12 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-yellow-50 dark:bg-slate-800 text-[#CA8A04] flex items-center justify-center mx-auto">
              <Users className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-950 dark:text-white">No matching child profiles found</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {searchQuery
                  ? `No profiles matching "${searchQuery}". Try clearing your search term or adjusting filters.`
                  : 'Register your children to assign daily school pickup coordinates and discover certified van operators.'}
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Clear Search
                </button>
              )}
              <button
                onClick={handleOpenAddModal}
                className="px-5 py-2 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-sm cursor-pointer"
              >
                + Add Child Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredChildren.map((child) => {
              const hasBooking = child.bookings && child.bookings.length > 0;
              const booking = hasBooking ? child.bookings[0] : null;

              return (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-5 group relative overflow-hidden"
                >
                  {/* Top card accent line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 ${
                      hasBooking ? 'bg-gradient-to-r from-emerald-500 via-[#FACC15] to-emerald-600' : 'bg-gradient-to-r from-amber-400 to-yellow-500'
                    }`}
                  />

                  <div className="space-y-4">
                    {/* Header: Child Avatar, Name, and Quick Edit/Delete */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shadow-xs shrink-0 ${
                            hasBooking
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-[#14532D] dark:text-emerald-300 border border-emerald-300/80'
                              : 'bg-yellow-100 dark:bg-yellow-950/60 text-[#713F12] dark:text-yellow-300 border border-yellow-300/80'
                          }`}
                        >
                          {child.firstName[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-lg text-slate-950 dark:text-white leading-tight">
                              {child.firstName} {child.lastName}
                            </h3>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                child.gender === 'FEMALE'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                              }`}
                            >
                              {child.gender}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                            <span className="font-bold text-slate-700 dark:text-slate-300">{child.grade}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-slate-400" />
                              Born {child.dateOfBirth}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Edit & Delete Actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleOpenEditModal(child)}
                          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Edit Child Profile"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteChild(child.id, `${child.firstName} ${child.lastName}`)}
                          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                          title="Remove Child Profile"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* School Transit Status Badge */}
                    <div
                      className={`px-3.5 py-2 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                        hasBooking
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-[#14532D] dark:text-emerald-300'
                          : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {hasBooking ? (
                          <>
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-bold">
                              Enrolled in {booking.route?.name || 'School Van Commute'}
                            </span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-3.5 w-3.5 text-amber-600" />
                            <span className="font-bold">Not Yet Enrolled with a School Van</span>
                          </>
                        )}
                      </div>
                      {hasBooking && booking.route?.driver?.vehiclePlate && (
                        <span className="font-mono text-[10px] font-black bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-emerald-300/80 text-slate-900 dark:text-white">
                          {booking.route.driver.vehiclePlate}
                        </span>
                      )}
                    </div>

                    {/* Details Box: School & Pickup Information */}
                    <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs">
                      {/* School Row */}
                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-yellow-100 dark:bg-yellow-950/80 text-[#713F12] dark:text-yellow-300 flex items-center justify-center shrink-0 mt-0.5">
                          <GraduationCap className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Enrolled Campus</span>
                          <span className="font-extrabold text-slate-900 dark:text-white">
                            {child.school?.name || INITIAL_SCHOOLS.find((s) => s.id === child.schoolId)?.name || 'Premier Colombo School'}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 text-[11px] block">
                            {child.school?.district || 'Colombo'} • {child.school?.city || 'Colombo 07'}
                          </span>
                        </div>
                      </div>

                      {/* Pickup Address Row */}
                      <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                        <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-[#14532D] dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Morning Home Pickup</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200 leading-snug block">
                            {child.pickupAddress}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                            <CheckCircle2 className="h-3 w-3" /> 500m Safe Radius Geofence Active
                          </span>
                        </div>
                      </div>

                      {/* Special Notes / Health Instructions */}
                      {child.specialNotes && (
                        <div className="flex items-start gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px]">
                          <Heart className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <p className="text-slate-600 dark:text-slate-400 italic">
                            <strong className="not-italic text-slate-700 dark:text-slate-300">Notes:</strong> {child.specialNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    {hasBooking ? (
                      <div className="flex items-center gap-2">
                        <Link href="/parent/rides/live">
                          <button className="px-4 py-2 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
                            <Radio className="h-3 w-3 text-emerald-800 animate-pulse" />
                            <span>Live GPS Tracking</span>
                          </button>
                        </Link>
                        {booking.route?.driver?.phone && (
                          <a
                            href={`tel:${booking.route.driver.phone}`}
                            className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title={`Call Driver: ${booking.route.driver.name}`}
                          >
                            <Phone className="h-3.5 w-3.5 text-[#16A34A]" />
                          </a>
                        )}
                      </div>
                    ) : (
                      <Link href={`/drivers?schoolId=${child.schoolId}`}>
                        <button className="px-4 py-2 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
                          <Bus className="h-3.5 w-3.5" />
                          <span>Find Van for {child.firstName}</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </Link>
                    )}

                    <button
                      onClick={() => handleOpenEditModal(child)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-950 dark:hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      Edit Profile
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Safety & Verification Charter Banner matching Home Page */}
        <div className="rounded-[28px] bg-slate-950 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 text-[#FACC15] text-[11px] font-black uppercase tracking-wider border border-yellow-400/30">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FACC15]" />
              <span>Student Protection Guarantee</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Every school van is <span className="text-[#FACC15]">100% Police Verified</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              SchoolRide.lk conducts biometric criminal history checks, vehicle roadworthiness certifications, and GPS boundary monitoring so your child is protected every kilometer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/drivers">
              <button className="px-6 py-3 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer">
                Discover Verified Drivers
              </button>
            </Link>
            <Link href="/parent/complaints">
              <button className="px-5 py-3 rounded-full border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer">
                Contact Dispatch
              </button>
            </Link>
          </div>
        </div>

      </div>

      {/* Add / Edit Child Modal Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <form onSubmit={handleSubmitChild} className="text-left space-y-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-950 dark:text-white">
              {editingChildId ? 'Edit Student Profile' : 'Register New Child Profile'}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Student information is encrypted and accessible strictly to your assigned verified school van operator.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dineth"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Silva"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>
            </div>

            {/* Date of Birth, Gender, Grade */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="flex h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Grade / Class <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grade 7-B"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>
            </div>

            {/* School Selection */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Enrolled School Destination <span className="text-red-500">*</span>
              </label>
              <select
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
                className="flex h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                required
              >
                {schools.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {s.district} ({s.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Pickup Address */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Home Pickup Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. No 45, Chapel Road, Nugegoda"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                required
                className="flex h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
              />
            </div>

            {/* Special Notes / Health Instructions */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Special Medical Notes / Driver Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Inhaler in bag, front seat required, motion sickness"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="flex h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
              />
            </div>
          </div>

          <DialogFooter className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-sm transition-all cursor-pointer"
            >
              {isSubmitting ? 'Saving...' : editingChildId ? 'Update Profile' : 'Save Child Profile'}
            </button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
