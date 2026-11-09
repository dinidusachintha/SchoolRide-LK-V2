'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SchoolCardSkeleton } from '@/components/ui/skeleton';
import { HowItWorksSlideshow } from '@/components/how-it-works-slideshow';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ShieldCheck,
  MapPin,
  Bell,
  CalendarDays,
  Play,
  ArrowRight,
  CheckCircle2,
  Phone,
  Clock,
  Sparkles,
  School,
  Bus,
  Search,
  Star,
  ChevronDown,
  Car,
  Navigation,
  UserCheck,
  Gauge
} from 'lucide-react';

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const visualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, x: 25 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const sectionFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomePage() {
  // Hero Section Template States (Uber "Go anywhere" layout on White Background)
  const [heroPickupLocation, setHeroPickupLocation] = React.useState('');
  const [heroDropoffSchool, setHeroDropoffSchool] = React.useState('');
  const [heroSchedule, setHeroSchedule] = React.useState('Pickup now');
  const [isHeroScheduleOpen, setIsHeroScheduleOpen] = React.useState(false);
  const [isHeroDistrictOpen, setIsHeroDistrictOpen] = React.useState(false);
  const [isHeroSchoolSuggestionsOpen, setIsHeroSchoolSuggestionsOpen] = React.useState(false);
  const [heroPriceEstimate, setHeroPriceEstimate] = React.useState<{
    pickup: string;
    dropoff: string;
    vanCount: number;
    monthlyRate: string;
    eta: string;
  } | null>(null);

  const handleUseCurrentLocation = () => {
    setHeroPickupLocation('Malabe Junction, Battaramulla');
  };

  const handleSeePrices = () => {
    const pickup = heroPickupLocation.trim() || 'Malabe, Battaramulla';
    const dropoff = heroDropoffSchool.trim() || 'Royal College, Colombo 07';
    setHeroPriceEstimate({
      pickup,
      dropoff,
      vanCount: 14,
      monthlyRate: 'LKR 8,500 / mo',
      eta: '25 min morning school run',
    });
  };

  const [selectedDistrict, setSelectedDistrict] = React.useState('All');
  const [schoolSearchQuery, setSchoolSearchQuery] = React.useState('');
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);
  const [isSchoolsDropdownOpen, setIsSchoolsDropdownOpen] = React.useState(false);

  const handleDistrictFilter = (district: string) => {
    setIsFiltering(true);
    setSelectedDistrict(district);
    setIsSchoolsDropdownOpen(false);
    setTimeout(() => setIsFiltering(false), 240);
  };

  const handleSchoolSearch = (val: string) => {
    setIsFiltering(true);
    setSchoolSearchQuery(val);
    setTimeout(() => setIsFiltering(false), 200);
  };
  const [activeSafetyTab, setActiveSafetyTab] = React.useState<'driver' | 'vehicle' | 'telemetry' | 'attendance'>('driver');
  const [simulatedLiveSpeed, setSimulatedLiveSpeed] = React.useState(38);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Speed simulator ticker effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedLiveSpeed((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const newSpeed = prev + delta;
        return newSpeed >= 32 && newSpeed <= 42 ? newSpeed : 38;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const schoolsData = [
    {
      id: 1,
      name: 'Royal College',
      district: 'Colombo',
      location: 'Colombo 07 (Reid Avenue)',
      vansCount: 28,
      students: 420,
      badge: 'Premier Boys',
      popularRoutes: ['Malabe → Rajagiriya → Colombo 07', 'Kottawa → Nugegoda → Colombo 07', 'Moratuwa → Dehiwala → Colombo 07'],
      monthlyRate: 'LKR 8,000 - 10,500',
    },
    {
      id: 2,
      name: 'Visakha Vidyalaya',
      district: 'Colombo',
      location: 'Colombo 05 (Vajira Road)',
      vansCount: 24,
      students: 380,
      badge: 'Premier Girls',
      popularRoutes: ['Piliyandala → Maharagama → Colombo 05', 'Battaramulla → Nugegoda → Colombo 05', 'Panadura → Mount Lavinia → Colombo 05'],
      monthlyRate: 'LKR 7,500 - 9,800',
    },
    {
      id: 3,
      name: 'Ananda College',
      district: 'Colombo',
      location: 'Colombo 10 (Maradana)',
      vansCount: 22,
      students: 350,
      badge: 'Premier Boys',
      popularRoutes: ['Wattala → Peliyagoda → Maradana', 'Kadawatha → Kiribathgoda → Maradana', 'Kaduwela → Malabe → Maradana'],
      monthlyRate: 'LKR 7,500 - 9,500',
    },
    {
      id: 4,
      name: 'Musaeus College',
      district: 'Colombo',
      location: 'Colombo 07 (Rosmead Place)',
      vansCount: 19,
      students: 290,
      badge: 'Private Girls',
      popularRoutes: ['Moratuwa → Wellawatte → Colombo 07', 'Thalawathugoda → Rajagiriya → Colombo 07', 'Kelaniya → Colombo 07'],
      monthlyRate: 'LKR 8,500 - 11,000',
    },
    {
      id: 5,
      name: 'Trinity College',
      district: 'Kandy',
      location: 'Kandy Central',
      vansCount: 15,
      students: 230,
      badge: 'Premier Boys',
      popularRoutes: ['Peradeniya → Getambe → Kandy', 'Katugastota → Kandy Town', 'Ampitiya → Tennekumbura → Kandy'],
      monthlyRate: 'LKR 6,500 - 8,500',
    },
    {
      id: 6,
      name: "St. Peter's College",
      district: 'Colombo',
      location: 'Colombo 04 (Bambalapitiya)',
      vansCount: 18,
      students: 280,
      badge: 'Premier Boys',
      popularRoutes: ['Dehiwala → Wellawatte → Colombo 04', 'Nugegoda → Kirulapone → Colombo 04', 'Piliyandala → Bambalapitiya'],
      monthlyRate: 'LKR 7,800 - 10,000',
    },
    {
      id: 7,
      name: "Bishop's College",
      district: 'Colombo',
      location: 'Colombo 03 (Boyd Place)',
      vansCount: 16,
      students: 260,
      badge: 'Private Girls',
      popularRoutes: ['Moratuwa → Wellawatte → Colombo 03', 'Kotte → Rajagiriya → Colombo 03', 'Kelaniya → Colombo 03'],
      monthlyRate: 'LKR 8,200 - 10,800',
    },
    {
      id: 8,
      name: 'Kingswood College',
      district: 'Kandy',
      location: 'Kandy (Peradeniya Road)',
      vansCount: 14,
      students: 210,
      badge: 'Premier Boys',
      popularRoutes: ['Galaha → Peradeniya → Kingswood', 'Pilimathalawa → Kandy', 'Katugastota → Kingswood'],
      monthlyRate: 'LKR 6,200 - 8,200',
    },
    {
      id: 9,
      name: 'Nalanda College',
      district: 'Colombo',
      location: 'Colombo 10 (Maradana)',
      vansCount: 20,
      students: 310,
      badge: 'Premier Boys',
      popularRoutes: ['Nittambuwa → Kadawatha → Colombo 10', 'Malabe → Battaramulla → Maradana', 'Pannipitiya → Maharagama → Colombo 10'],
      monthlyRate: 'LKR 7,500 - 9,600',
    },
  ];

  const filteredSchools = schoolsData.filter((sch) => {
    const matchesDistrict = selectedDistrict === 'All' || sch.district === selectedDistrict;
    const matchesSearch = sch.name.toLowerCase().includes(schoolSearchQuery.toLowerCase()) ||
                          sch.location.toLowerCase().includes(schoolSearchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  const visibleSchools = filteredSchools.slice(0, 3);
  const dropdownSchools = filteredSchools.slice(3);

  const featuredDrivers = [
    {
      id: 'd1',
      name: 'Sunil Wickramasinghe',
      experience: '14 Years Safe Driving',
      district: 'Colombo & Greater Suburbs',
      vehicle: 'Toyota HiAce Super GL',
      plate: 'WP ND-8422',
      seats: '14 Seats (Dual AC)',
      rating: 4.98,
      trips: 1840,
      routes: ['Malabe', 'Battaramulla', 'Rajagiriya', 'Colombo 07'],
      policeChecked: true,
      revenueLicenseValid: true,
      fee: 'LKR 8,500',
      status: '2 Seats Available',
    },
    {
      id: 'd2',
      name: 'Gamini Fernando',
      experience: '9 Years Safe Driving',
      district: 'Kandy City & Peradeniya',
      vehicle: 'Nissan Caravan High-Roof',
      plate: 'CP NA-3901',
      seats: '16 Seats (Dual AC)',
      rating: 4.95,
      trips: 1220,
      routes: ['Peradeniya', 'Getambe', 'Kandy Town', 'Trinity Gate'],
      policeChecked: true,
      revenueLicenseValid: true,
      fee: 'LKR 7,800',
      status: '1 Seat Available',
    },
    {
      id: 'd3',
      name: 'Pradeep Kumara',
      experience: '11 Years Safe Driving',
      district: 'Gampaha & Colombo North',
      vehicle: 'Toyota Commuter Bus',
      plate: 'WP NB-7140',
      seats: '18 Seats (Factory AC)',
      rating: 4.99,
      trips: 2150,
      routes: ['Kadawatha', 'Kiribathgoda', 'Kelaniya', 'Colombo 10'],
      policeChecked: true,
      revenueLicenseValid: true,
      fee: 'LKR 9,200',
      status: '3 Seats Available',
    },
  ];

  const faqs = [
    {
      q: 'How does SchoolRide LK verify school van operators?',
      a: 'Every driver must submit their official National Identity Card (NIC), commercial driving license with heavy passenger endorsement, vehicle provincial revenue license, and commercial passenger insurance policy. Human safety moderators independently inspect document validity, driver background checks, and vehicle safety gear before approval.',
    },
    {
      q: 'How does live real-time GPS tracking protect my child?',
      a: 'When the van starts its morning or afternoon run, an encrypted WebSocket connection streams real-time GPS telemetry (speed, route, and heading). Only authenticated parents whose children are assigned to that specific ride can access the live map. Home coordinates are kept private and never exposed publicly.',
    },
    {
      q: 'How are monthly transportation fees calculated and paid?',
      a: 'Van operators establish their standard monthly fee in Sri Lankan Rupees (LKR) based on pickup neighborhood, distance to school, and whether the van is air-conditioned. When you request a seat booking, the exact monthly fee is confirmed upfront with no hidden surcharges.',
    },
    {
      q: 'What happens if a driver is delayed by Colombo or Kandy traffic?',
      a: 'The driver console sends instant status alerts directly to the parent portal. You can view the van\'s live position, current speed, and estimated time of arrival (ETA) at your doorstep or the school gate.',
    },
    {
      q: 'Can I book rides for multiple children attending different schools?',
      a: 'Yes! From your Parent Dashboard, you can register multiple children with their individual schools, grades, and pickup addresses, and connect them with matching van routes serving those specific campuses.',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Anoma Wijesekera',
      role: 'Parent of 2 students at Visakha Vidyalaya',
      district: 'Colombo 05 (Bambalapitiya)',
      text: 'Having live GPS tracking gave our family total peace of mind every single morning. Our van driver Uncle Sunil is punctual, verified, and caring. SchoolRide LK has modernized school transportation in Sri Lanka!',
      rating: 5,
    },
    {
      name: 'Roshan Samarasinghe',
      role: 'Parent at Royal College',
      district: 'Rajagiriya & Battaramulla',
      text: 'Before this platform, finding a reliable van from Rajagiriya was a hassle of phone calls and guesswork. With SchoolRide LK, I inspected the vehicle license, safety equipment, and parent reviews before booking. Highly recommended.',
      rating: 5,
    },
    {
      name: 'Chamari Jayawardena',
      role: 'Parent at Trinity & Girls\' High School',
      district: 'Kandy (Peradeniya Route)',
      text: 'The automated arrival notifications when my daughter reaches the school gate are invaluable. The verification process gives real confidence that drivers are vetted and accountable.',
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#FFFFFF] dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 overflow-x-hidden selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (GO ANYWHERE TEMPLATE IN WHITE BACKGROUND) */}
      {/* ======================================================== */}
      <section className="relative w-full bg-[#FFFFFF] dark:bg-slate-950 pt-6 sm:pt-10 lg:pt-14 pb-10 sm:pb-14 lg:pb-16 border-b border-slate-200/80 dark:border-slate-800 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10 sm:space-y-12">

          {/* Top Split Row: Left Form & Right 4-Photo Collage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* ======================================================== */}
            {/* LEFT COLUMN: "Go anywhere" Search Form                    */}
            {/* ======================================================== */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 xl:col-span-5 space-y-5 text-left"
            >
              {/* 1. Location Indicator: 📍 Colombo, LK Change city */}
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setIsHeroDistrictOpen(!isHeroDistrictOpen)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1F2937] dark:text-slate-200 hover:text-[#14532D] transition-colors cursor-pointer select-none"
                >
                  <MapPin className="h-3.5 w-3.5 fill-[#1F2937] dark:fill-white text-[#1F2937] dark:text-white" />
                  <span>{selectedDistrict === 'All' ? 'Colombo, LK' : `${selectedDistrict}, LK`}</span>
                  <span className="text-[#6B7280] dark:text-slate-400 font-normal underline hover:text-[#1F2937] dark:hover:text-white transition-colors ml-0.5">
                    Change city
                  </span>
                </button>

                {/* Dropdown for Sri Lankan Districts */}
                {isHeroDistrictOpen && (
                  <div className="absolute left-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/90 dark:border-slate-800 py-2 z-50">
                    <div className="px-3.5 py-1 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                      Select District
                    </div>
                    {['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Galle', 'Kurunegala', 'Matara'].map((dist) => (
                      <button
                        key={dist}
                        type="button"
                        onClick={() => {
                          setSelectedDistrict(dist);
                          setIsHeroDistrictOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                          selectedDistrict === dist
                            ? 'text-[#14532D] dark:text-emerald-400 bg-[#EAF6ED] dark:bg-emerald-950/60 font-bold'
                            : 'text-[#1F2937] dark:text-slate-200'
                        }`}
                      >
                        {dist}, Sri Lanka
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Bold Headline: Go anywhere */}
              <div className="space-y-1.5">
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-black text-[#1F2937] dark:text-white tracking-tight leading-[1.08]">
                  Go anywhere
                </h1>
                <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                  Coordinating safe, punctual school transportation across Sri Lanka with verified neighborhood drivers.
                </p>
              </div>

              {/* 3. Timing Pill: 🕒 Pickup now ⌄ */}
              <div className="relative inline-block pt-0.5">
                <button
                  type="button"
                  onClick={() => setIsHeroScheduleOpen(!isHeroScheduleOpen)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3F4F6] dark:bg-slate-800 hover:bg-[#E5E7EB] dark:hover:bg-slate-700 text-[#1F2937] dark:text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer select-none"
                >
                  <Clock className="h-3.5 w-3.5 text-[#1F2937] dark:text-white" />
                  <span>{heroSchedule}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#4B5563] dark:text-slate-400" />
                </button>

                {/* Timing Dropdown */}
                {isHeroScheduleOpen && (
                  <div className="absolute left-0 mt-2 w-68 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/90 dark:border-slate-800 py-2 z-50">
                    <div className="px-3.5 py-1 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                      Schedule Type
                    </div>
                    {[
                      'Pickup now',
                      'Daily School Run (Morning & Afternoon)',
                      'Morning Pickup (6:30 AM - 7:30 AM)',
                      'Afternoon Return (1:30 PM - 3:00 PM)',
                      'Reserve for Term 2026',
                    ].map((sched) => (
                      <button
                        key={sched}
                        type="button"
                        onClick={() => {
                          setHeroSchedule(sched);
                          setIsHeroScheduleOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                          heroSchedule === sched
                            ? 'text-[#14532D] dark:text-emerald-400 bg-[#EAF6ED] dark:bg-emerald-950/60 font-bold'
                            : 'text-[#1F2937] dark:text-slate-200'
                        }`}
                      >
                        {sched}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Connected Route Inputs (Iconic Uber Connected Line on White Background) */}
              <div className="relative space-y-2 max-w-lg pt-1">
                {/* Vertical Connector Line */}
                <div className="absolute left-[18px] top-[22px] bottom-[22px] w-[2px] bg-slate-400 dark:bg-slate-600 z-10 flex flex-col justify-between items-center pointer-events-none">
                  {/* Top Dot (Solid Circle for Pickup) */}
                  <div className="h-2.5 w-2.5 rounded-full bg-[#1F2937] dark:bg-white ring-2 ring-[#F3F4F6] dark:ring-slate-800 -mt-0.5" />
                  {/* Bottom Dot (Solid Square for Dropoff) */}
                  <div className="h-2.5 w-2.5 bg-[#1F2937] dark:bg-white ring-2 ring-[#F3F4F6] dark:ring-slate-800 -mb-0.5" />
                </div>

                {/* Pickup Location Input */}
                <div className="relative pl-11 pr-11 py-3.5 bg-[#F3F4F6] dark:bg-slate-850 hover:bg-[#EAECEF] dark:hover:bg-slate-800 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-[#14532D] rounded-xl transition-all shadow-xs">
                  <input
                    type="text"
                    value={heroPickupLocation}
                    onChange={(e) => setHeroPickupLocation(e.target.value)}
                    placeholder="Pickup location"
                    className="w-full text-sm font-semibold text-[#1F2937] dark:text-white placeholder-[#6B7280] dark:placeholder-slate-400 bg-transparent outline-none"
                  />
                  {/* GPS Locator Arrow on right */}
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    title="Use current Sri Lanka location"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4B5563] dark:text-slate-400 hover:text-[#14532D] dark:hover:text-emerald-400 p-1 transition-colors cursor-pointer"
                  >
                    <Navigation className="h-4 w-4 fill-current rotate-45" />
                  </button>
                </div>

                {/* Dropoff Location Input */}
                <div className="relative pl-11 pr-4 py-3.5 bg-[#F3F4F6] dark:bg-slate-850 hover:bg-[#EAECEF] dark:hover:bg-slate-800 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-[#14532D] rounded-xl transition-all shadow-xs">
                  <input
                    type="text"
                    value={heroDropoffSchool}
                    onChange={(e) => {
                      setHeroDropoffSchool(e.target.value);
                      setIsHeroSchoolSuggestionsOpen(true);
                    }}
                    onFocus={() => setIsHeroSchoolSuggestionsOpen(true)}
                    placeholder="Dropoff location"
                    className="w-full text-sm font-semibold text-[#1F2937] dark:text-white placeholder-[#6B7280] dark:placeholder-slate-400 bg-transparent outline-none"
                  />
                </div>

                {/* School Quick Autocomplete Dropdown */}
                {isHeroSchoolSuggestionsOpen && (
                  <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-3 z-50 max-h-60 overflow-y-auto">
                    <div className="flex items-center justify-between px-2 pb-2 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                      <span>Suggested Schools</span>
                      <button
                        type="button"
                        onClick={() => setIsHeroSchoolSuggestionsOpen(false)}
                        className="text-[#14532D] dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                    <div className="space-y-1">
                      {schoolsData.slice(0, 5).map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setHeroDropoffSchool(`${s.name}, ${s.location}`);
                            setIsHeroSchoolSuggestionsOpen(false);
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-[#EAF6ED] dark:hover:bg-slate-800 transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <p className="text-xs font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400">
                              {s.name}
                            </p>
                            <p className="text-[11px] text-[#6B7280] dark:text-slate-400">
                              {s.location}
                            </p>
                          </div>
                          <span className="text-[11px] font-extrabold text-[#16A34A] bg-[#EAF6ED] dark:bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-200/60">
                            {s.vansCount} Vans
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Buttons Row: [ See prices ]   Log in to check your activity */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={handleSeePrices}
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#1F2937] hover:bg-black dark:bg-white dark:text-[#1F2937] dark:hover:bg-slate-200 text-white font-bold text-xs sm:text-sm md:text-base shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer"
                >
                  See prices
                </button>

                <Link
                  href="/login"
                  className="text-xs sm:text-sm font-semibold text-[#1F2937] dark:text-slate-200 underline hover:text-[#14532D] dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Log in to check your activity
                </Link>
              </div>

              {/* Dynamic Rate Estimate Drawer (Live Calculation) */}
              {heroPriceEstimate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-[#EAF6ED] dark:bg-emerald-950/60 border border-[#BCE6C9] dark:border-emerald-800 space-y-2 max-w-lg shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14532D] dark:text-emerald-300">
                    <span>{heroPriceEstimate.pickup} → {heroPriceEstimate.dropoff}</span>
                    <span className="text-base font-black text-[#14532D] dark:text-emerald-200">
                      {heroPriceEstimate.monthlyRate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#4B5563] dark:text-slate-300">
                    <span>{heroPriceEstimate.vanCount} Verified Vans • {heroPriceEstimate.eta}</span>
                    <Link
                      href={`/drivers?pickup=${encodeURIComponent(heroPriceEstimate.pickup)}&school=${encodeURIComponent(heroPriceEstimate.dropoff)}`}
                      className="font-bold text-[#14532D] dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>Book Seat Now</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}

            </motion.div>

            {/* ======================================================== */}
            {/* RIGHT COLUMN: 4-Photo Collage with Bottom Floating Card   */}
            {/* ======================================================== */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 xl:col-span-7 relative"
            >
              <div className="relative w-full max-w-[640px] mx-auto rounded-[32px] overflow-hidden p-1 sm:p-2 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                
                {/* 2x2 Photography Collage Grid */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                  
                  {/* Tile 1: Top-Left (Kids walking to school van) */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group shadow-sm">
                    <Image
                      src="/images/kids-walking-focus.jpg"
                      alt="Sri Lankan students with backpacks ready for school"
                      fill
                      priority
                      sizes="(max-width: 1024px) 50vw, 320px"
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Tile 2: Top-Right (Verified Driver Portrait) */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group shadow-sm">
                    <Image
                      src="/images/verified-driver-portrait.jpg"
                      alt="Verified SchoolRide LK driver"
                      fill
                      priority
                      sizes="(max-width: 1024px) 50vw, 320px"
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {/* Top Floating Mini-Badge */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-[10px] font-bold text-[#14532D] dark:text-emerald-400 shadow-xs">
                        <ShieldCheck className="h-3 w-3 text-[#16A34A]" />
                        100% Vetted
                      </span>
                    </div>
                  </div>

                  {/* Tile 3: Bottom-Left (Safety Parent & Child) */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group shadow-sm">
                    <Image
                      src="/images/safety-parent-child.jpg"
                      alt="Parent sending child to school safely"
                      fill
                      sizes="(max-width: 1024px) 50vw, 320px"
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Tile 4: Bottom-Right (School Van Fleet) */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group shadow-sm">
                    <Image
                      src="/images/vango-van-kids.jpg"
                      alt="Comfortable school van fleet in Sri Lanka"
                      fill
                      sizes="(max-width: 1024px) 50vw, 320px"
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                </div>

                {/* ======================================================== */}
                {/* FLOATING BANNER: "Ready to travel? Schedule ahead"        */}
                {/* ======================================================== */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 rounded-2xl bg-[#1F2937]/90 dark:bg-black/90 backdrop-blur-md text-white flex items-center justify-between gap-3 shadow-2xl border border-white/10 z-20">
                  <div className="text-left">
                    <p className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">
                      Ready to travel?
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-300 hidden sm:block pt-0.5">
                      Book verified school van seats in advance.
                    </p>
                  </div>
                  <Link href="/drivers">
                    <button
                      type="button"
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-[#1F2937] hover:bg-[#FACC15] hover:text-[#14532D] font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer shrink-0"
                    >
                      Schedule ahead
                    </button>
                  </Link>
                </div>

              </div>
            </motion.div>

          </div>

          {/* ======================================================== */}
          {/* BOTTOM 4 FEATURE CARDS (PRESERVING WEBSITE FUNCTIONALITY) */}
          {/* ======================================================== */}
          <motion.div
            variants={cardsContainerVariants}
            initial="hidden"
            animate="visible"
            className="w-full pt-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
              
              {/* Card 1: Book a Ride */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/drivers"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.08)] hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#16A34A] shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-sm sm:text-base font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400 transition-colors leading-snug flex items-center gap-1.5">
                      <span>Book a Ride</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#16A34A]" />
                    </h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                      Reserve a school ride in a few simple steps.
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Card 2: View Routes */}
              <motion.div variants={cardItemVariants}>
                <button
                  type="button"
                  onClick={() => scrollToSection('routes')}
                  className="w-full text-left group flex items-center gap-4 p-4 sm:p-4.5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.08)] hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#16A34A] shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <Navigation className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-sm sm:text-base font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400 transition-colors leading-snug flex items-center gap-1.5">
                      <span>View Routes</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#16A34A]" />
                    </h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                      Check available routes and pickup points.
                    </p>
                  </div>
                </button>
              </motion.div>

              {/* Card 3: Child Safety */}
              <motion.div variants={cardItemVariants}>
                <button
                  type="button"
                  onClick={() => scrollToSection('safety')}
                  className="w-full text-left group flex items-center gap-4 p-4 sm:p-4.5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.08)] hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#16A34A] shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-sm sm:text-base font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400 transition-colors leading-snug flex items-center gap-1.5">
                      <span>Child Safety</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#16A34A]" />
                    </h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                      Background-checked drivers and safety rules.
                    </p>
                  </div>
                </button>
              </motion.div>

              {/* Card 4: Track in Real Time */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/parent/rides/live"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.08)] hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#16A34A] shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-sm sm:text-base font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400 transition-colors leading-snug flex items-center gap-1.5">
                      <span>Track in Real Time</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#16A34A]" />
                    </h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                      Follow your child's live van location on GPS map.
                    </p>
                  </div>
                </Link>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. QUICK ROUTE MATCHER (BLACK BG & WHITE GLASS CARDS)     */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 bg-black text-white border-b border-white/10 relative overflow-hidden">
        {/* Soft Ambient Radial Accents */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-[#FACC15]/10 blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-[28px] bg-white/[0.08] backdrop-blur-xl border border-white/[0.18] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
              
              {/* Left Header Tag & Title */}
              <div className="space-y-1.5 pr-2 shrink-0">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#FACC15] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#FACC15]" /> Quick Route Matcher
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Find Verified Vans Serving Your School
                </h3>
                <p className="text-xs text-white/70 font-normal">
                  Filter by province, school, or pickup corridor across Sri Lanka.
                </p>
              </div>

              {/* 3 White Glass Effect Cards for Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 max-w-3xl">
                
                {/* 1. District Glass Card */}
                <div className="relative p-2.5 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/[0.15] hover:border-white/30 transition-all">
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Province / District
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictFilter(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-white/20 bg-white/[0.12] text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15] cursor-pointer"
                  >
                    <option value="All" className="bg-slate-900 text-white">All Districts (Sri Lanka)</option>
                    <option value="Colombo" className="bg-slate-900 text-white">Colombo (Western)</option>
                    <option value="Gampaha" className="bg-slate-900 text-white">Gampaha (Western)</option>
                    <option value="Kalutara" className="bg-slate-900 text-white">Kalutara (Western)</option>
                    <option value="Kandy" className="bg-slate-900 text-white">Kandy (Central)</option>
                    <option value="Galle" className="bg-slate-900 text-white">Galle (Southern)</option>
                    <option value="Kurunegala" className="bg-slate-900 text-white">Kurunegala (North Western)</option>
                  </select>
                </div>

                {/* 2. School Glass Card */}
                <div className="relative p-2.5 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/[0.15] hover:border-white/30 transition-all">
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Child's School
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Royal, Visakha, Ananda"
                      value={schoolSearchQuery}
                      onChange={(e) => handleSchoolSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-white/20 bg-white/[0.12] text-sm font-semibold text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                    <School className="absolute left-2.5 top-2.5 h-4 w-4 text-white/60 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Pickup Town Glass Card */}
                <div className="relative p-2.5 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/[0.15] hover:border-white/30 transition-all">
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Home / Pickup Town
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Nugegoda, Malabe"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-white/20 bg-white/[0.12] text-sm font-semibold text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-white/60 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2 lg:pt-0 shrink-0">
                <Link href="/drivers">
                  <button className="w-full lg:w-auto px-7 py-3.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <Search className="h-4 w-4 stroke-[2.5]" />
                    <span>Search Verified Fleet</span>
                  </button>
                </Link>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      <section className="py-20 md:py-24 bg-[#14532D] text-white text-center relative overflow-hidden shadow-xl">
        
        {/* Soft decorative background circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-lime-400/10 blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-emerald-200">
            <Sparkles className="h-4 w-4 text-[#FACC15]" />
            <span>Join Sri Lanka's Verified School Transport Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
            Ready to give your child a <br />
            <span className="text-[#16A34A]">safer, stress-free</span> commute?
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
            Connect with verified school van drivers in your neighborhood, view transparent monthly rates, and track morning journeys in real-time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-3 max-w-lg mx-auto">
            <Link href="/drivers" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#14532D] font-black text-sm sm:text-base shadow-lg hover:bg-emerald-50 transition-all cursor-pointer">
                Book a School Ride Now
              </button>
            </Link>
            <Link href="/register?role=DRIVER" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#073713] border-2 border-white/60 text-white font-bold text-sm sm:text-base hover:bg-[#0B2C22] transition-all cursor-pointer">
                Register as Van Driver
              </button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-emerald-200/80">
            <span className="flex items-center gap-1.5">✓ 100% Inspected Drivers</span>
            <span className="flex items-center gap-1.5">✓ Encrypted GPS Telemetry</span>
            <span className="flex items-center gap-1.5">✓ Zero Booking Surcharges</span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. LIVE TRUST & STATS MARQUEE (SMOOTH SCROLL ANIMATION)  */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-20 border-b border-slate-200/80 dark:border-slate-800 bg-[#F7FAF7] dark:bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F2937] dark:text-white">
                250<span className="text-[#16A34A]">+</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#4B5563] dark:text-slate-300">
                Verified Van Operators
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F2937] dark:text-white">
                18,500<span className="text-[#16A34A]">+</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#4B5563] dark:text-slate-300">
                Safe Morning Trips
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F2937] dark:text-white">
                48<span className="text-[#16A34A]">+</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#4B5563] dark:text-slate-300">
                Premier Schools Covered
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F2937] dark:text-white">
                99.8<span className="text-[#16A34A]">%</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#4B5563] dark:text-slate-300">
                On-Time School Arrivals
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. HOW TO REQUEST A RIDE (MATCHING 2ND IMAGE TEMPLATE)   */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-black text-white border-b border-slate-900 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <HowItWorksSlideshow />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. CHILD SAFETY & 5-TIER VERIFICATION (MATCHING IMAGES)  */}
      {/* ======================================================== */}
      <section id="safety" className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800 bg-[#F7FAF7] dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Safety Explanation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#14532D] dark:text-emerald-300 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                <span>5-Tier Safety &amp; Verification Charter</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2937] dark:text-white tracking-tight">
                Trust earned through <span className="text-[#16A34A]">rigorous inspection</span>.
              </h2>

              <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 leading-relaxed">
                We believe child safety requires verifiable criteria, not just slogans. Every school van operator on SchoolRide LK must submit proof of identity, legal credentials, and vehicle fitness before accepting student bookings.
              </p>

              {/* Safety Tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setActiveSafetyTab('driver')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSafetyTab === 'driver'
                      ? 'bg-[#14532D] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#4B5563] border border-emerald-100'
                  }`}
                >
                  1. Driver Background
                </button>
                <button
                  onClick={() => setActiveSafetyTab('vehicle')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSafetyTab === 'vehicle'
                      ? 'bg-[#14532D] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#4B5563] border border-emerald-100'
                  }`}
                >
                  2. Vehicle Roadworthiness
                </button>
                <button
                  onClick={() => setActiveSafetyTab('telemetry')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSafetyTab === 'telemetry'
                      ? 'bg-[#14532D] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#4B5563] border border-emerald-100'
                  }`}
                >
                  3. Speed &amp; Telemetry
                </button>
                <button
                  onClick={() => setActiveSafetyTab('attendance')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSafetyTab === 'attendance'
                      ? 'bg-[#14532D] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#4B5563] border border-emerald-100'
                  }`}
                >
                  4. Attendance Alerts
                </button>
              </div>

              {/* Tab Content Box */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-950/[0.08] shadow-sm space-y-3">
                {activeSafetyTab === 'driver' && (
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#1F2937] dark:text-white flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-[#16A34A]" /> Police Records &amp; NIC Identity Verification
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed">
                      Every driver submits their government National Identity Card (NIC) and Heavy Passenger Commercial Driver's License. Our team cross-references background credentials and previous passenger transport experience before granting approved status.
                    </p>
                  </div>
                )}
                {activeSafetyTab === 'vehicle' && (
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#1F2937] dark:text-white flex items-center gap-2">
                      <Car className="h-5 w-5 text-[#16A34A]" /> Annual Revenue License &amp; Passenger Insurance
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed">
                      All vans are required to maintain active Provincial Revenue Licenses and valid commercial passenger liability insurance. Vans must be equipped with working seatbelts, first aid kits, and emergency door releases.
                    </p>
                  </div>
                )}
                {activeSafetyTab === 'telemetry' && (
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#1F2937] dark:text-white flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-[#16A34A]" /> Live GPS Tracking &amp; Strict Speed Limiter Telemetry
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed">
                      School vans stream live speed and location coordinates directly to parents. The system automatically triggers warnings if speeds exceed 45 km/h in school safety corridors or if sudden route deviations occur.
                    </p>
                  </div>
                )}
                {activeSafetyTab === 'attendance' && (
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#1F2937] dark:text-white flex items-center gap-2">
                      <Bell className="h-5 w-5 text-[#16A34A]" /> Instant Doorstep Pickup &amp; School Gate Chimes
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed">
                      Parents receive an instant notification when the van arrives at their gate, when the student boards, and the moment the van stops safely at the school entrance.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <Link href="/safety">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#14532D] hover:bg-[#073713] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer">
                    <span>View Complete Safety Protocol</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right Side: Matching Photographic Showcases */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 space-y-4"
            >
              {/* Primary Photo Showcase: Sri Lankan Mother & Daughter with School Van */}
              <div className="relative rounded-[28px] overflow-hidden border border-emerald-950/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.06)] group">
                <div className="relative w-full h-[280px] sm:h-[340px]">
                  <Image
                    src="/images/safety-parent-child.jpg"
                    alt="Sri Lankan mother and daughter safely boarding school van"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                
                {/* Floating Badge on Photo */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#14532D] text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1F2937] dark:text-white">Daily Doorstep Attendance</h4>
                      <p className="text-xs text-[#4B5563] dark:text-slate-300">Automated boarding confirmation sent to parents</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold border border-emerald-200">
                    100% Monitored
                  </span>
                </div>
              </div>

              {/* Secondary Visual Strip: Inspected Fleet Van */}
              <div className="p-4 rounded-[22px] bg-white dark:bg-slate-900 border border-emerald-950/[0.08] shadow-sm flex items-center gap-4">
                <div className="relative h-18 w-28 rounded-xl overflow-hidden shrink-0 border border-emerald-100">
                  <Image
                    src="/images/van-vehicle-focus.jpg"
                    alt="Inspected yellow school van"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF7EE] text-[#14532D] border border-[#BCE6C9] uppercase">
                    Fleet Standard
                  </span>
                  <h4 className="text-sm font-bold text-[#1F2937] dark:text-white">Toyota HiAce Commuter &amp; Caravan Fleet</h4>
                  <p className="text-xs text-[#4B5563] dark:text-slate-300">High-roof passenger vans with factory AC &amp; certified safety belts.</p>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. LIVE GPS TELEMETRY & PARENT EXPERIENCE SHOWCASE       */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800 bg-[#FFFFFF] dark:bg-slate-900 relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: App Showcase Visual (Our Custom Subagent Image) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-[32px] overflow-hidden border border-emerald-950/[0.08] shadow-[0_16px_50px_rgba(9,71,24,0.08)] bg-slate-50 dark:bg-slate-800">
                <div className="relative w-full h-[360px] sm:h-[420px]">
                  <Image
                    src="/images/live-tracking-mockup.jpg"
                    alt="Smartphone tracking app screen with live GPS route"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Interactive Telemetry Overlay Card */}
                <div className="p-5 bg-white dark:bg-slate-900 border-t border-emerald-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">Live Stream Connected</span>
                    </div>
                    <h4 className="text-base font-extrabold text-[#1F2937] dark:text-white">
                      Royal College Morning Run #04
                    </h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-400">
                      Driver: Sunil Wickramasinghe • WP ND-8422
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center px-3 py-1.5 rounded-xl bg-[#EAF6ED] border border-[#D0EAD6]">
                      <span className="block text-[10px] font-bold text-[#4B5563] uppercase">Speed</span>
                      <span className="font-mono text-sm font-black text-[#14532D]">{simulatedLiveSpeed} km/h</span>
                    </div>
                    <div className="text-center px-3 py-1.5 rounded-xl bg-[#FAFDF9] border border-emerald-200">
                      <span className="block text-[10px] font-bold text-[#4B5563] uppercase">ETA Gate</span>
                      <span className="font-mono text-sm font-black text-[#1F2937]">8 mins</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Parent Tracking Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#14532D] dark:text-emerald-300 text-xs font-bold border border-emerald-200">
                <Navigation className="h-4 w-4" />
                <span>Live GPS Telemetry</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2937] dark:text-white tracking-tight">
                Never wonder where <br />
                <span className="text-[#16A34A]">the school van</span> is.
              </h2>

              <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 leading-relaxed">
                Gone are the days of standing outside in rain or sun wondering if the school van has already passed. The SchoolRide LK parent portal streams real-time GPS coordinates directly to your mobile screen.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAFDF9] dark:bg-slate-850 border border-emerald-900/[0.06] shadow-sm">
                  <div className="h-10 w-10 rounded-xl bg-[#14532D] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1F2937] dark:text-white">Precision Doorstep ETA Countdown</h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 mt-0.5">
                      Get a 10-minute and 2-minute proximity chime before the van pulls up to your gate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAFDF9] dark:bg-slate-850 border border-emerald-900/[0.06] shadow-sm">
                  <div className="h-10 w-10 rounded-xl bg-[#14532D] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1F2937] dark:text-white">Safe Speed Limit Monitoring</h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 mt-0.5">
                      Automated telemetry logs van speed continuously to guarantee drivers adhere to school zone limits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAFDF9] dark:bg-slate-850 border border-emerald-900/[0.06] shadow-sm">
                  <div className="h-10 w-10 rounded-xl bg-[#14532D] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1F2937] dark:text-white">Direct One-Touch Driver Hotline</h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 mt-0.5">
                      Call or send quick sick-leave notices directly through the parent dashboard with a single tap.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/parent/rides/live">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#14532D] hover:bg-[#073713] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer">
                    <span>Try Interactive Live Ride Demo</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. ISLAND-WIDE SCHOOL DIRECTORY & POPULAR ROUTES         */}
      {/* ======================================================== */}
      <section id="routes" className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800 bg-[#F7FAF7] dark:bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold border border-emerald-200">
                Island-Wide Coverage
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2937] dark:text-white tracking-tight">
                Covering <span className="text-[#16A34A]">Leading Schools</span> Across Sri Lanka
              </h2>
              <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300">
                Connecting top national, private, and international campuses with verified neighborhood van networks.
              </p>
            </div>

            {/* District Filter Pills & Quick Dropdown Button */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Colombo', 'Kandy'].map((district) => (
                <button
                  key={district}
                  onClick={() => handleDistrictFilter(district)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedDistrict === district
                      ? 'bg-[#14532D] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#4B5563] dark:text-slate-300 border border-emerald-200 dark:border-slate-800 hover:bg-emerald-50'
                  }`}
                >
                  {district === 'All' ? 'All Districts' : district}
                </button>
              ))}

              {dropdownSchools.length > 0 && (
                <button
                  onClick={() => setIsSchoolsDropdownOpen(!isSchoolsDropdownOpen)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSchoolsDropdownOpen
                      ? 'bg-[#14532D] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#14532D] dark:text-emerald-400 border border-emerald-300 dark:border-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  <School className="h-3.5 w-3.5 text-[#16A34A]" />
                  <span>More Schools ({dropdownSchools.length})</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isSchoolsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          </div>

          {/* School Cards Grid (Showing strictly 3 primary cards + dropdown for remaining) */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isFiltering ? (
                <>
                  <SchoolCardSkeleton />
                  <SchoolCardSkeleton />
                  <SchoolCardSkeleton />
                </>
              ) : filteredSchools.length === 0 ? (
                <div className="col-span-full py-12 text-center text-[#4B5563] dark:text-slate-400">
                  <p className="text-sm font-semibold">No schools found matching your search. Try adjusting your query or district.</p>
                </div>
              ) : (
                visibleSchools.map((school) => (
                  <motion.div
                    key={school.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    variants={sectionFadeUp}
                    className="p-6 rounded-[26px] bg-white dark:bg-slate-900 border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF6ED] text-[#14532D] border border-[#D0EAD6]">
                          {school.badge}
                        </span>
                        <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
                          <Bus className="h-3.5 w-3.5" /> {school.vansCount} Active Vans
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-[#1F2937] dark:text-white">
                        {school.name}
                      </h3>
                      <p className="text-xs text-[#4B5563] dark:text-slate-400 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#16A34A]" /> {school.location}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-emerald-100/60 dark:border-slate-800">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] dark:text-slate-400 block">
                          Popular Commute Routes:
                        </span>
                        {school.popularRoutes.map((route, i) => (
                          <div key={i} className="text-xs text-[#1F2937] dark:text-slate-200 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                            <span>{route}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-emerald-100/60 dark:border-slate-800 flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[10px] text-[#4B5563] dark:text-slate-400 block font-semibold">Typical Monthly Fee</span>
                        <span className="text-xs font-bold text-[#14532D] dark:text-emerald-400">{school.monthlyRate}</span>
                      </div>
                      <Link href="/drivers">
                        <button className="px-4 py-2 rounded-xl bg-[#14532D] text-white text-xs font-bold hover:bg-[#073713] transition-colors cursor-pointer">
                          View Vans
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Dropdown Toggle Button below the 3 cards */}
            {!isFiltering && dropdownSchools.length > 0 && (
              <div className="flex flex-col items-center justify-center pt-2">
                <button
                  onClick={() => setIsSchoolsDropdownOpen(!isSchoolsDropdownOpen)}
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-[#094718] dark:border-emerald-500 text-[#14532D] dark:text-emerald-300 font-bold text-xs sm:text-sm hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
                  aria-expanded={isSchoolsDropdownOpen}
                >
                  <School className="h-4 w-4 text-[#16A34A] group-hover:scale-110 transition-transform" />
                  <span>
                    {isSchoolsDropdownOpen
                      ? `Close Additional Schools (${dropdownSchools.length})`
                      : `View Other Schools in Dropdown (${dropdownSchools.length} More Campuses)`}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isSchoolsDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            )}

            {/* Expandable Dropdown Section with Smooth Animation */}
            <AnimatePresence>
              {isSchoolsDropdownOpen && dropdownSchools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden pt-2 space-y-4"
                >
                  <div className="pt-4 flex items-center justify-between border-t border-emerald-100/60 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
                      Other Mapped Schools ({dropdownSchools.length})
                    </span>
                    <span className="text-xs text-[#4B5563] dark:text-slate-400 hidden sm:inline">
                      All schools vetted with active van fleets
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dropdownSchools.map((school) => (
                      <motion.div
                        key={school.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 rounded-[26px] bg-white dark:bg-slate-900 border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF6ED] text-[#14532D] border border-[#D0EAD6]">
                              {school.badge}
                            </span>
                            <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
                              <Bus className="h-3.5 w-3.5" /> {school.vansCount} Active Vans
                            </span>
                          </div>

                          <h3 className="text-lg font-extrabold text-[#1F2937] dark:text-white">
                            {school.name}
                          </h3>
                          <p className="text-xs text-[#4B5563] dark:text-slate-400 flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-[#16A34A]" /> {school.location}
                          </p>

                          <div className="space-y-1.5 pt-2 border-t border-emerald-100/60 dark:border-slate-800">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] dark:text-slate-400 block">
                              Popular Commute Routes:
                            </span>
                            {school.popularRoutes.map((route, i) => (
                              <div key={i} className="text-xs text-[#1F2937] dark:text-slate-200 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                                <span>{route}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-emerald-100/60 dark:border-slate-800 flex items-center justify-between">
                          <div className="text-left">
                            <span className="text-[10px] text-[#4B5563] dark:text-slate-400 block font-semibold">Typical Monthly Fee</span>
                            <span className="text-xs font-bold text-[#14532D] dark:text-emerald-400">{school.monthlyRate}</span>
                          </div>
                          <Link href="/drivers">
                            <button className="px-4 py-2 rounded-xl bg-[#14532D] text-white text-xs font-bold hover:bg-[#073713] transition-colors cursor-pointer">
                              View Vans
                            </button>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. FEATURED FLEET & VERIFIED DRIVERS (PORTRAIT PHOTO)    */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800 bg-[#FFFFFF] dark:bg-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold border border-emerald-200">
                Verified School Fleet
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2937] dark:text-white tracking-tight">
                Meet Sri Lanka's <span className="text-[#16A34A]">Most Trusted Drivers</span>
              </h2>
              <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300">
                Vetted professionals with stellar safety records, licensed passenger vehicles, and genuine parental endorsements.
              </p>
            </div>

            <Link href="/drivers">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#094718] text-[#14532D] dark:border-emerald-400 dark:text-emerald-300 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-colors cursor-pointer">
                <span>View Full Driver Roster</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          {/* Featured Showcase: 1 Spotlight with Photo + 2 Companion Driver Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Spotlight Card with Generated Driver Portrait */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 rounded-[28px] overflow-hidden border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-[#FAFDF9] dark:bg-slate-850 flex flex-col justify-between"
            >
              <div className="relative w-full h-[280px] sm:h-[320px]">
                <Image
                  src="/images/verified-driver-portrait.jpg"
                  alt="Verified Sri Lankan school van driver Uncle Sunil"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#14532D] text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#16A34A]" /> Top Rated Driver
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#1F2937] dark:text-white">
                      Sunil Wickramasinghe
                    </h3>
                    <p className="text-xs text-[#4B5563] dark:text-slate-400">
                      14 Years Safe Commute • Colombo Routes
                    </p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                    <span>4.98</span>
                    <span className="text-xs text-amber-700">(142)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-[#4B5563] block">Vehicle</span>
                    <span className="text-xs font-bold text-[#1F2937] dark:text-white">Toyota HiAce GL (14-Seat AC)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-[#4B5563] block">Monthly Rate</span>
                    <span className="text-xs font-bold text-[#14532D] dark:text-emerald-400">LKR 8,500 / month</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold text-[#14532D]">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">✓ Police Clearance</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">✓ Revenue License 2026</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">✓ GPS Live Telemetry</span>
                </div>

                <div className="pt-2">
                  <Link href="/drivers">
                    <button className="w-full py-3 rounded-xl bg-[#14532D] hover:bg-[#073713] text-white font-bold text-sm shadow-md transition-colors cursor-pointer">
                      Book Seat with Driver Sunil
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Companion Drivers Cards */}
            <div className="lg:col-span-6 space-y-6">
              {featuredDrivers.slice(1).map((driver) => (
                <motion.div
                  key={driver.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={sectionFadeUp}
                  className="p-6 sm:p-7 rounded-[26px] bg-[#FAFDF9] dark:bg-slate-850 border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-extrabold text-[#1F2937] dark:text-white">
                          {driver.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF6ED] text-[#14532D] border border-[#D0EAD6]">
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-[#4B5563] dark:text-slate-400">
                        {driver.experience} • {driver.district}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                      <span>{driver.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#4B5563] dark:text-slate-400 block text-[11px]">Vehicle:</span>
                      <span className="font-bold text-[#1F2937] dark:text-white">{driver.vehicle}</span>
                    </div>
                    <div>
                      <span className="text-[#4B5563] dark:text-slate-400 block text-[11px]">Plate:</span>
                      <span className="font-mono font-bold text-[#1F2937] dark:text-white">{driver.plate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-emerald-100/60 dark:border-slate-800">
                    <span className="font-extrabold text-sm text-[#14532D] dark:text-emerald-400">{driver.fee} / month</span>
                    <Link href="/drivers">
                      <button className="px-4 py-2 rounded-xl bg-[#14532D] text-white text-xs font-bold hover:bg-[#073713] transition-colors cursor-pointer">
                        Check Availability
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. PARENT REVIEWS & TESTIMONIALS                         */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800 bg-[#F7FAF7] dark:bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center space-y-12">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionFadeUp}
            className="max-w-2xl mx-auto space-y-3"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold border border-emerald-200">
              Parent Community Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2937] dark:text-white tracking-tight">
              Loved by <span className="text-[#16A34A]">Sri Lankan Families</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300">
              Read how SchoolRide LK brings peace of mind to working parents across Colombo and Kandy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={sectionFadeUp}
                className="p-7 rounded-[26px] bg-white dark:bg-slate-900 border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-100/60 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#1F2937] dark:text-white">{t.name}</h4>
                    <span className="text-[10px] font-bold text-[#16A34A] bg-[#EAF6ED] px-2 py-0.5 rounded-full">Verified</span>
                  </div>
                  <p className="text-xs text-[#14532D] dark:text-emerald-400 font-semibold">{t.role}</p>
                  <p className="text-[11px] text-[#4B5563] dark:text-slate-400">{t.district}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. FREQUENTLY ASKED QUESTIONS (FRAMER MOTION ACCORDION) */}
      {/* ======================================================== */}
      <section id="faq" className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800 bg-[#FFFFFF] dark:bg-slate-900">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 text-center space-y-12">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionFadeUp}
            className="space-y-3"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold border border-emerald-200">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2937] dark:text-white tracking-tight">
              Frequently Asked <span className="text-[#16A34A]">Questions</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 max-w-xl mx-auto">
              Everything you need to know about safety standards, vehicle checks, and monthly seat bookings.
            </p>
          </motion.div>

          <div className="space-y-3 text-left">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[22px] border border-emerald-950/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1F2937] dark:text-white hover:text-[#14532D] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#16A34A] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed border-t border-emerald-100/60 dark:border-slate-800 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 11. DUAL CALL-TO-ACTION (PARENTS & DRIVERS)               */}
      

    </div>
  );
}
