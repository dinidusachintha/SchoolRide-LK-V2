'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SchoolCardSkeleton } from '@/components/ui/skeleton';
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
  const [selectedDistrict, setSelectedDistrict] = React.useState('All');
  const [schoolSearchQuery, setSchoolSearchQuery] = React.useState('');
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const handleDistrictFilter = (district: string) => {
    setIsFiltering(true);
    setSelectedDistrict(district);
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
  ];

  const filteredSchools = schoolsData.filter((sch) => {
    const matchesDistrict = selectedDistrict === 'All' || sch.district === selectedDistrict;
    const matchesSearch = sch.name.toLowerCase().includes(schoolSearchQuery.toLowerCase()) ||
                          sch.location.toLowerCase().includes(schoolSearchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

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
    <div className="flex flex-col w-full bg-[#FAFDF9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (FULL FITTING TO NAVBAR CORNERS & SCREEN)*/}
      {/* ======================================================== */}
      <section className="relative overflow-hidden w-full bg-[#FAFDF9] dark:bg-slate-950 flex flex-col justify-between pt-0 pb-6 sm:pb-8 lg:pb-10 min-h-[calc(100vh-4rem)]">
        
        {/* Soft Background Leaves at Screen Edges */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-10 sm:w-14 h-24 sm:h-28 pointer-events-none opacity-85 animate-float-slow -z-0">
          <Image
            src="/images/leaf-left-trans.png"
            alt="Foliage decoration"
            width={55}
            height={110}
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-2 right-0 w-12 sm:w-16 h-28 sm:h-36 pointer-events-none opacity-90 animate-float-reverse -z-0">
          <Image
            src="/images/leaf-right-trans.png"
            alt="Foliage decoration"
            width={65}
            height={130}
            className="object-contain"
          />
        </div>

        {/* Desktop Full-Bleed Artwork: Pinned directly to Navbar Corner and Right Edge with ZERO space */}
        <motion.div
          variants={visualVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:block absolute top-0 right-0 w-[56%] xl:w-[54%] 2xl:w-[51%] h-[calc(100%-130px)] max-h-[620px] pointer-events-none z-0"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/vango-hero-right-2x.png"
              alt="SchoolRide LK school ride yellow van with children in uniform"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain object-right-top"
            />
          </div>
        </motion.div>

        {/* Main Content & Artwork Row - Full Fitting */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex-1 flex flex-col justify-between z-10 relative">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 items-start gap-6 lg:gap-0 pt-3 sm:pt-4 lg:pt-6"
          >
            {/* Left Column: Heading, Subtitle, Buttons, Trust Badges */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-4 sm:space-y-5 lg:space-y-6 text-left py-2">
              
              {/* Badge: [ 🛡️ Safe • Reliable • On Time ] */}
              <motion.div variants={badgeVariants} className="inline-block">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF7EE] border border-[#BCE6C9] text-xs sm:text-sm font-semibold text-[#0B4626] shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-[#0B4626]" />
                  <span>Safe • Reliable • On Time</span>
                </div>
              </motion.div>

              {/* Title: Safe & Convenient School Rides for Your Children */}
              <motion.div variants={itemVariants} className="space-y-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] font-extrabold tracking-tight text-[#0B2C22] dark:text-white leading-[1.12]">
                  Safe &amp; Convenient <br />
                  School Rides for <br />
                  <span className="relative inline-block mt-0.5">
                    Your{' '}
                    <span className="text-[#8CB02C] relative">
                      Children
                      {/* Thick yellow/lime highlight curve directly matching reference image */}
                      <span className="absolute left-0 -bottom-1.5 w-full h-[5px] bg-[#E3D13E] rounded-full" />
                    </span>
                  </span>
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.p
                variants={itemVariants}
                className="text-xs sm:text-sm md:text-base text-[#4E6258] dark:text-slate-300 max-w-lg leading-relaxed font-normal"
              >
                A trusted school transportation service with verified drivers, real-time tracking and complete safety care for your child.
              </motion.p>

              {/* Action Buttons: [ 📅 Book a Ride ] [ ▶ How It Works ] */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3.5 pt-1"
              >
                {/* 1. Book a Ride Button */}
                <Link href="/drivers">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs sm:text-sm md:text-base shadow-sm transition-colors cursor-pointer"
                  >
                    <CalendarDays className="h-4 w-4" />
                    <span>Book a Ride</span>
                  </motion.button>
                </Link>

                {/* 2. How It Works Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('how-it-works')}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-[#152720] dark:border-slate-300 text-[#152720] dark:text-white font-bold text-xs sm:text-sm md:text-base hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex h-4 w-4 items-center justify-center text-[#152720] dark:text-white">
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </div>
                  <span>How It Works</span>
                </motion.button>
              </motion.div>

              {/* Trust Indicators: [ 🛡️ Verified Drivers ] [ 📍 Live Tracking ] [ 🔔 Ride Updates ] */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-[#0B2C22] dark:text-slate-200 text-xs sm:text-sm font-semibold"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0B2C22]/40 text-[#0B2C22] dark:text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <span>Verified Drivers</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0B2C22]/40 text-[#0B2C22] dark:text-emerald-400">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <span>Live Tracking</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0B2C22]/40 text-[#0B2C22] dark:text-emerald-400">
                    <Bell className="h-3.5 w-3.5" />
                  </div>
                  <span>Ride Updates</span>
                </div>
              </motion.div>

            </div>

            {/* Mobile / Tablet In-flow artwork (< lg) */}
            <motion.div
              variants={visualVariants}
              className="lg:hidden relative w-full h-[280px] sm:h-[360px] md:h-[420px] mt-2"
            >
              <Image
                src="/images/vango-hero-right-2x.png"
                alt="SchoolRide LK school ride yellow van with children in uniform"
                fill
                priority
                className="object-contain object-center"
              />
            </motion.div>
          </motion.div>

          {/* ======================================================== */}
          {/* BOTTOM 4 FEATURE CARDS (MATCHING REFERENCE EXACTLY)      */}
          {/* ======================================================== */}
          <motion.div
            variants={cardsContainerVariants}
            initial="hidden"
            animate="visible"
            className="w-full mt-6 sm:mt-8 lg:mt-10 z-20 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 xl:gap-6">
              
              {/* Card 1: Book a Ride */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/drivers"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-emerald-950/[0.07] dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(9,71,24,0.08)] hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect x="3" y="4" width="18" height="18" rx="3" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <path d="m9 16 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[15px] sm:text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors leading-snug">
                      Book a Ride
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4E6258] dark:text-slate-300 leading-relaxed font-normal">
                      Reserve a school ride in a few simple steps.
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Card 2: View Routes */}
              <motion.div variants={cardItemVariants}>
                <button
                  onClick={() => scrollToSection('routes')}
                  className="w-full text-left group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-emerald-950/[0.07] dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(9,71,24,0.08)] hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <circle cx="6" cy="19" r="3" />
                      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                      <circle cx="18" cy="5" r="3" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[15px] sm:text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors leading-snug">
                      View Routes
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4E6258] dark:text-slate-300 leading-relaxed font-normal">
                      Check available routes and pickup points.
                    </p>
                  </div>
                </button>
              </motion.div>

              {/* Card 3: Child Safety */}
              <motion.div variants={cardItemVariants}>
                <button
                  onClick={() => scrollToSection('safety')}
                  className="w-full text-left group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-emerald-950/[0.07] dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(9,71,24,0.08)] hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[15px] sm:text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors leading-snug">
                      Child Safety
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4E6258] dark:text-slate-300 leading-relaxed font-normal">
                      Background-checked drivers and safety guidelines.
                    </p>
                  </div>
                </button>
              </motion.div>

              {/* Card 4: Track in Real Time */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/parent/rides/live"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-emerald-950/[0.07] dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(9,71,24,0.08)] hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                      <line x1="12" x2="12.01" y1="18" y2="18" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[15px] sm:text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors leading-snug">
                      Track in Real Time
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4E6258] dark:text-slate-300 leading-relaxed font-normal">
                      Get live ride updates and arrival alerts.
                    </p>
                  </div>
                </Link>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. INSTANT SCHOOL VAN FINDER (INTERACTIVE SEARCH BAR)     */}
      {/* ======================================================== */}
      <section className="py-8 bg-gradient-to-b from-[#FAFDF9] via-[#F4FAF5] to-[#FAFDF9] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-emerald-100/60 dark:border-slate-800/80 relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-5 sm:p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_8px_30px_rgba(9,71,24,0.06)]"
          >
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              <div className="space-y-1 pr-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#16A34A] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#E3D13E]" /> Quick Route Matcher
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#0B2C22] dark:text-white">
                  Find Verified Vans Serving Your School
                </h3>
              </div>

              {/* District & School Filter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 max-w-3xl">
                {/* District */}
                <div className="relative">
                  <label className="block text-[11px] font-bold text-[#4E6258] dark:text-slate-400 mb-1">
                    Province / District
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 dark:border-slate-700 bg-[#FAFDF9] dark:bg-slate-800 text-sm font-semibold text-[#0B2C22] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  >
                    <option value="All">All Districts (Sri Lanka)</option>
                    <option value="Colombo">Colombo (Western)</option>
                    <option value="Kandy">Kandy (Central)</option>
                  </select>
                </div>

                {/* School Input */}
                <div className="relative">
                  <label className="block text-[11px] font-bold text-[#4E6258] dark:text-slate-400 mb-1">
                    Child's School
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Royal, Visakha, Ananda"
                      value={schoolSearchQuery}
                      onChange={(e) => handleSchoolSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-emerald-200 dark:border-slate-700 bg-[#FAFDF9] dark:bg-slate-800 text-sm font-semibold text-[#0B2C22] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                    />
                    <School className="absolute left-2.5 top-3 h-4 w-4 text-[#4E6258] pointer-events-none" />
                  </div>
                </div>

                {/* Pickup Area */}
                <div className="relative">
                  <label className="block text-[11px] font-bold text-[#4E6258] dark:text-slate-400 mb-1">
                    Home / Pickup Town
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Nugegoda, Rajagiriya"
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-emerald-200 dark:border-slate-700 bg-[#FAFDF9] dark:bg-slate-800 text-sm font-semibold text-[#0B2C22] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                    />
                    <MapPin className="absolute left-2.5 top-3 h-4 w-4 text-[#4E6258] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 lg:pt-0 shrink-0">
                <Link href="/drivers">
                  <button className="w-full lg:w-auto px-6 py-3 rounded-xl bg-[#094718] hover:bg-[#073713] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <Search className="h-4 w-4" />
                    <span>Search Verified Fleet</span>
                  </button>
                </Link>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. LIVE TRUST & STATS MARQUEE (SMOOTH SCROLL ANIMATION)  */}
      {/* ======================================================== */}
      <section className="py-10 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-900/60">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2C22] dark:text-white">
                250<span className="text-[#8CB02C]">+</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#4E6258] dark:text-slate-300">
                Verified Van Operators
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2C22] dark:text-white">
                18,500<span className="text-[#8CB02C]">+</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#4E6258] dark:text-slate-300">
                Safe Morning Trips
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2C22] dark:text-white">
                48<span className="text-[#8CB02C]">+</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#4E6258] dark:text-slate-300">
                Premier Schools Covered
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2C22] dark:text-white">
                99.8<span className="text-[#8CB02C]">%</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#4E6258] dark:text-slate-300">
                On-Time School Arrivals
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. HOW IT WORKS (WITH MATCHING IMAGERY & VISUAL STEPS)   */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center space-y-14">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionFadeUp}
            className="max-w-2xl mx-auto space-y-3"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-[#EBF7EE] text-[#0B4626] text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#BCE6C9] inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
              Simple 3-Step Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
              How <span className="text-[#8CB02C]">SchoolRide LK</span> Works for Families
            </h2>
            <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300 leading-relaxed">
              Coordinating safe, punctual school transportation across Sri Lanka has never been simpler.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
            {/* Step 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={sectionFadeUp}
              className="p-7 rounded-[26px] border border-emerald-950/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-lg shadow-md border border-[#22C55E]/40">
                    01
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-[#EAF6ED] px-3 py-1 rounded-full border border-[#D0EAD6]">
                    Search &amp; Filter
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
                  Discover <span className="text-[#8CB02C]">Verified</span> Van Drivers
                </h3>
                <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                  Select your child's school and district. View verified NIC identity, commercial driving credentials, vehicle capacity, and genuine reviews from fellow parents.
                </p>

                {/* Miniature Visual Badge */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#094718] dark:text-emerald-400">Royal College Route</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800">14 Verified Vans</span>
                  </div>
                  <p className="text-[11px] text-[#4E6258] dark:text-slate-400">Malabe → Battaramulla → Rajagiriya → Colombo 07</p>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-100/80 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#094718] dark:text-emerald-400">
                  48+ Schools Mapped
                </span>
                <Link href="/drivers" className="text-xs font-bold text-[#094718] dark:text-emerald-400 hover:underline inline-flex items-center gap-1">
                  Browse Directory <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={sectionFadeUp}
              className="p-7 rounded-[26px] border border-emerald-950/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-lg shadow-md border border-[#22C55E]/40">
                    02
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-[#EAF6ED] px-3 py-1 rounded-full border border-[#D0EAD6]">
                    Direct Booking
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
                  Confirm <span className="text-[#8CB02C]">Monthly Seat</span> in LKR
                </h3>
                <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                  Provide your private pickup and dropoff locations. The driver confirms seat availability, route compatibility, and agreed monthly fees in Sri Lankan Rupees.
                </p>

                {/* Miniature Visual Badge */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#094718] dark:text-emerald-400">Monthly Seat Rate</span>
                    <span className="font-extrabold text-[#0B2C22] dark:text-white">LKR 8,500 / mo</span>
                  </div>
                  <p className="text-[11px] text-[#4E6258] dark:text-slate-400">Zero middleman fee • Direct driver settlement</p>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-100/80 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#094718] dark:text-emerald-400">
                  Zero Commission Markups
                </span>
                <Link href="/drivers" className="text-xs font-bold text-[#094718] dark:text-emerald-400 hover:underline inline-flex items-center gap-1">
                  Check Rates <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={sectionFadeUp}
              className="p-7 rounded-[26px] border border-emerald-950/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-lg shadow-md border border-[#22C55E]/40">
                    03
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-[#EAF6ED] px-3 py-1 rounded-full border border-[#D0EAD6]">
                    Live Telemetry
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
                  Track Live Trips <span className="text-[#8CB02C]">Every Morning</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                  Follow your child's van on an interactive GPS map. Receive automated push updates when your child is picked up and safely inside the school gate.
                </p>

                {/* Miniature Visual Badge */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#094718] dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" /> Live Telemetry
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#16A34A]">38 km/h • Safe Speed</span>
                  </div>
                  <p className="text-[11px] text-[#4E6258] dark:text-slate-400">Boarded 7:12 AM • ETA School Gate: 8 mins</p>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-100/80 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#094718] dark:text-emerald-400">
                  Sub-second Telemetry
                </span>
                <Link href="/parent/rides/live" className="text-xs font-bold text-[#094718] dark:text-emerald-400 hover:underline inline-flex items-center gap-1">
                  Live Demo <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. CHILD SAFETY & 5-TIER VERIFICATION (MATCHING IMAGES)  */}
      {/* ======================================================== */}
      <section id="safety" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-950 relative overflow-hidden">
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#094718] dark:text-emerald-300 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                <span>5-Tier Safety &amp; Verification Charter</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
                Trust earned through <span className="text-[#8CB02C]">rigorous inspection</span>.
              </h2>

              <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300 leading-relaxed">
                We believe child safety requires verifiable criteria, not just slogans. Every school van operator on SchoolRide LK must submit proof of identity, legal credentials, and vehicle fitness before accepting student bookings.
              </p>

              {/* Safety Tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setActiveSafetyTab('driver')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSafetyTab === 'driver'
                      ? 'bg-[#094718] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#4E6258] border border-emerald-100'
                  }`}
                >
                  1. Driver Background
                </button>
                <button
                  onClick={() => setActiveSafetyTab('vehicle')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSafetyTab === 'vehicle'
                      ? 'bg-[#094718] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#4E6258] border border-emerald-100'
                  }`}
                >
                  2. Vehicle Roadworthiness
                </button>
                <button
                  onClick={() => setActiveSafetyTab('telemetry')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSafetyTab === 'telemetry'
                      ? 'bg-[#094718] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#4E6258] border border-emerald-100'
                  }`}
                >
                  3. Speed &amp; Telemetry
                </button>
                <button
                  onClick={() => setActiveSafetyTab('attendance')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSafetyTab === 'attendance'
                      ? 'bg-[#094718] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#4E6258] border border-emerald-100'
                  }`}
                >
                  4. Attendance Alerts
                </button>
              </div>

              {/* Tab Content Box */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-950/[0.08] shadow-sm space-y-3">
                {activeSafetyTab === 'driver' && (
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#0B2C22] dark:text-white flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-[#16A34A]" /> Police Records &amp; NIC Identity Verification
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                      Every driver submits their government National Identity Card (NIC) and Heavy Passenger Commercial Driver's License. Our team cross-references background credentials and previous passenger transport experience before granting approved status.
                    </p>
                  </div>
                )}
                {activeSafetyTab === 'vehicle' && (
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#0B2C22] dark:text-white flex items-center gap-2">
                      <Car className="h-5 w-5 text-[#16A34A]" /> Annual Revenue License &amp; Passenger Insurance
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                      All vans are required to maintain active Provincial Revenue Licenses and valid commercial passenger liability insurance. Vans must be equipped with working seatbelts, first aid kits, and emergency door releases.
                    </p>
                  </div>
                )}
                {activeSafetyTab === 'telemetry' && (
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#0B2C22] dark:text-white flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-[#16A34A]" /> Live GPS Tracking &amp; Strict Speed Limiter Telemetry
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                      School vans stream live speed and location coordinates directly to parents. The system automatically triggers warnings if speeds exceed 45 km/h in school safety corridors or if sudden route deviations occur.
                    </p>
                  </div>
                )}
                {activeSafetyTab === 'attendance' && (
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#0B2C22] dark:text-white flex items-center gap-2">
                      <Bell className="h-5 w-5 text-[#16A34A]" /> Instant Doorstep Pickup &amp; School Gate Chimes
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                      Parents receive an instant notification when the van arrives at their gate, when the student boards, and the moment the van stops safely at the school entrance.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <Link href="/safety">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer">
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
                    <div className="h-10 w-10 rounded-xl bg-[#094718] text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B2C22] dark:text-white">Daily Doorstep Attendance</h4>
                      <p className="text-xs text-[#4E6258] dark:text-slate-300">Automated boarding confirmation sent to parents</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#094718] text-xs font-bold border border-emerald-200">
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
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF7EE] text-[#094718] border border-[#BCE6C9] uppercase">
                    Fleet Standard
                  </span>
                  <h4 className="text-sm font-bold text-[#0B2C22] dark:text-white">Toyota HiAce Commuter &amp; Caravan Fleet</h4>
                  <p className="text-xs text-[#4E6258] dark:text-slate-300">High-roof passenger vans with factory AC &amp; certified safety belts.</p>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. LIVE GPS TELEMETRY & PARENT EXPERIENCE SHOWCASE       */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900 relative">
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
                    <h4 className="text-base font-extrabold text-[#0B2C22] dark:text-white">
                      Royal College Morning Run #04
                    </h4>
                    <p className="text-xs text-[#4E6258] dark:text-slate-400">
                      Driver: Sunil Wickramasinghe • WP ND-8422
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center px-3 py-1.5 rounded-xl bg-[#EAF6ED] border border-[#D0EAD6]">
                      <span className="block text-[10px] font-bold text-[#4E6258] uppercase">Speed</span>
                      <span className="font-mono text-sm font-black text-[#094718]">{simulatedLiveSpeed} km/h</span>
                    </div>
                    <div className="text-center px-3 py-1.5 rounded-xl bg-[#FAFDF9] border border-emerald-200">
                      <span className="block text-[10px] font-bold text-[#4E6258] uppercase">ETA Gate</span>
                      <span className="font-mono text-sm font-black text-[#0B2C22]">8 mins</span>
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#094718] dark:text-emerald-300 text-xs font-bold border border-emerald-200">
                <Navigation className="h-4 w-4" />
                <span>Live GPS Telemetry</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
                Never wonder where <br />
                <span className="text-[#8CB02C]">the school van</span> is.
              </h2>

              <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300 leading-relaxed">
                Gone are the days of standing outside in rain or sun wondering if the school van has already passed. The SchoolRide LK parent portal streams real-time GPS coordinates directly to your mobile screen.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAFDF9] dark:bg-slate-850 border border-emerald-900/[0.06] shadow-sm">
                  <div className="h-10 w-10 rounded-xl bg-[#094718] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2C22] dark:text-white">Precision Doorstep ETA Countdown</h4>
                    <p className="text-xs text-[#4E6258] dark:text-slate-300 mt-0.5">
                      Get a 10-minute and 2-minute proximity chime before the van pulls up to your gate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAFDF9] dark:bg-slate-850 border border-emerald-900/[0.06] shadow-sm">
                  <div className="h-10 w-10 rounded-xl bg-[#094718] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2C22] dark:text-white">Safe Speed Limit Monitoring</h4>
                    <p className="text-xs text-[#4E6258] dark:text-slate-300 mt-0.5">
                      Automated telemetry logs van speed continuously to guarantee drivers adhere to school zone limits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAFDF9] dark:bg-slate-850 border border-emerald-900/[0.06] shadow-sm">
                  <div className="h-10 w-10 rounded-xl bg-[#094718] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2C22] dark:text-white">Direct One-Touch Driver Hotline</h4>
                    <p className="text-xs text-[#4E6258] dark:text-slate-300 mt-0.5">
                      Call or send quick sick-leave notices directly through the parent dashboard with a single tap.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/parent/rides/live">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer">
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
      <section id="routes" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#094718] text-xs font-bold border border-emerald-200">
                Island-Wide Coverage
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
                Covering <span className="text-[#8CB02C]">Leading Schools</span> Across Sri Lanka
              </h2>
              <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300">
                Connecting top national, private, and international campuses with verified neighborhood van networks.
              </p>
            </div>

            {/* District Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Colombo', 'Kandy'].map((district) => (
                <button
                  key={district}
                  onClick={() => handleDistrictFilter(district)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedDistrict === district
                      ? 'bg-[#094718] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#4E6258] dark:text-slate-300 border border-emerald-200 dark:border-slate-800 hover:bg-emerald-50'
                  }`}
                >
                  {district === 'All' ? 'All Districts' : district}
                </button>
              ))}
            </div>
          </div>

          {/* School Cards Grid with Progressive Skeleton Transition */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isFiltering ? (
              <>
                <SchoolCardSkeleton />
                <SchoolCardSkeleton />
                <SchoolCardSkeleton />
              </>
            ) : filteredSchools.length === 0 ? (
              <div className="col-span-full py-12 text-center text-[#4E6258] dark:text-slate-400">
                <p className="text-sm font-semibold">No schools found matching your search. Try adjusting your query or district.</p>
              </div>
            ) : (
              filteredSchools.map((school) => (
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
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF6ED] text-[#094718] border border-[#D0EAD6]">
                      {school.badge}
                    </span>
                    <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
                      <Bus className="h-3.5 w-3.5" /> {school.vansCount} Active Vans
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#0B2C22] dark:text-white">
                    {school.name}
                  </h3>
                  <p className="text-xs text-[#4E6258] dark:text-slate-400 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#16A34A]" /> {school.location}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-emerald-100/60 dark:border-slate-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#4E6258] dark:text-slate-400 block">
                      Popular Commute Routes:
                    </span>
                    {school.popularRoutes.map((route, i) => (
                      <div key={i} className="text-xs text-[#0B2C22] dark:text-slate-200 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                        <span>{route}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-100/60 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] text-[#4E6258] dark:text-slate-400 block font-semibold">Typical Monthly Fee</span>
                    <span className="text-xs font-bold text-[#094718] dark:text-emerald-400">{school.monthlyRate}</span>
                  </div>
                  <Link href="/drivers">
                    <button className="px-4 py-2 rounded-xl bg-[#094718] text-white text-xs font-bold hover:bg-[#073713] transition-colors cursor-pointer">
                      View Vans
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. FEATURED FLEET & VERIFIED DRIVERS (PORTRAIT PHOTO)    */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#094718] text-xs font-bold border border-emerald-200">
                Verified School Fleet
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
                Meet Sri Lanka's <span className="text-[#8CB02C]">Most Trusted Drivers</span>
              </h2>
              <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300">
                Vetted professionals with stellar safety records, licensed passenger vehicles, and genuine parental endorsements.
              </p>
            </div>

            <Link href="/drivers">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#094718] text-[#094718] dark:border-emerald-400 dark:text-emerald-300 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-colors cursor-pointer">
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
                  <span className="px-3.5 py-1.5 rounded-full bg-[#094718] text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#8CB02C]" /> Top Rated Driver
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0B2C22] dark:text-white">
                      Sunil Wickramasinghe
                    </h3>
                    <p className="text-xs text-[#4E6258] dark:text-slate-400">
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
                    <span className="text-[10px] uppercase font-bold text-[#4E6258] block">Vehicle</span>
                    <span className="text-xs font-bold text-[#0B2C22] dark:text-white">Toyota HiAce GL (14-Seat AC)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-[#4E6258] block">Monthly Rate</span>
                    <span className="text-xs font-bold text-[#094718] dark:text-emerald-400">LKR 8,500 / month</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold text-[#094718]">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">✓ Police Clearance</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">✓ Revenue License 2026</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">✓ GPS Live Telemetry</span>
                </div>

                <div className="pt-2">
                  <Link href="/drivers">
                    <button className="w-full py-3 rounded-xl bg-[#094718] hover:bg-[#073713] text-white font-bold text-sm shadow-md transition-colors cursor-pointer">
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
                        <h3 className="text-lg font-extrabold text-[#0B2C22] dark:text-white">
                          {driver.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF6ED] text-[#094718] border border-[#D0EAD6]">
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-[#4E6258] dark:text-slate-400">
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
                      <span className="text-[#4E6258] dark:text-slate-400 block text-[11px]">Vehicle:</span>
                      <span className="font-bold text-[#0B2C22] dark:text-white">{driver.vehicle}</span>
                    </div>
                    <div>
                      <span className="text-[#4E6258] dark:text-slate-400 block text-[11px]">Plate:</span>
                      <span className="font-mono font-bold text-[#0B2C22] dark:text-white">{driver.plate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-emerald-100/60 dark:border-slate-800">
                    <span className="font-extrabold text-sm text-[#094718] dark:text-emerald-400">{driver.fee} / month</span>
                    <Link href="/drivers">
                      <button className="px-4 py-2 rounded-xl bg-[#094718] text-white text-xs font-bold hover:bg-[#073713] transition-colors cursor-pointer">
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
      <section className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center space-y-12">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionFadeUp}
            className="max-w-2xl mx-auto space-y-3"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#094718] text-xs font-bold border border-emerald-200">
              Parent Community Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
              Loved by <span className="text-[#8CB02C]">Sri Lankan Families</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300">
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
                  <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-100/60 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#0B2C22] dark:text-white">{t.name}</h4>
                    <span className="text-[10px] font-bold text-[#16A34A] bg-[#EAF6ED] px-2 py-0.5 rounded-full">Verified</span>
                  </div>
                  <p className="text-xs text-[#094718] dark:text-emerald-400 font-semibold">{t.role}</p>
                  <p className="text-[11px] text-[#4E6258] dark:text-slate-400">{t.district}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. FREQUENTLY ASKED QUESTIONS (FRAMER MOTION ACCORDION) */}
      {/* ======================================================== */}
      <section id="faq" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 text-center space-y-12">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionFadeUp}
            className="space-y-3"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#094718] text-xs font-bold border border-emerald-200">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
              Frequently Asked <span className="text-[#8CB02C]">Questions</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300 max-w-xl mx-auto">
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
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0B2C22] dark:text-white hover:text-[#094718] transition-colors cursor-pointer"
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
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed border-t border-emerald-100/60 dark:border-slate-800 pt-3">
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
      {/* ======================================================== */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-[#051A10] via-[#094718] to-[#0B2C22] text-white text-center relative overflow-hidden">
        
        {/* Soft decorative background circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-lime-400/10 blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-emerald-200">
            <Sparkles className="h-4 w-4 text-[#E3D13E]" />
            <span>Join Sri Lanka's Verified School Transport Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
            Ready to give your child a <br />
            <span className="text-[#8CB02C]">safer, stress-free</span> commute?
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
            Connect with verified school van drivers in your neighborhood, view transparent monthly rates, and track morning journeys in real-time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-3 max-w-lg mx-auto">
            <Link href="/drivers" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#094718] font-black text-sm sm:text-base shadow-lg hover:bg-emerald-50 transition-all cursor-pointer">
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

    </div>
  );
}
