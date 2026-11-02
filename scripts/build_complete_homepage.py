page_content = """'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ShieldCheck,
  Search,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Users,
  Navigation,
  FileCheck,
  HeartHandshake,
  HelpCircle,
  Bus,
  Calendar,
  CalendarDays,
  Play,
  Bell,
  Smartphone,
  Route,
  ChevronDown,
  Sparkles,
  Phone,
  Radio,
  Star,
  Award,
  Car,
  Check,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { INITIAL_SCHOOLS } from '@schoolride/shared';

// Animation Variants with Typed Spring & Easing Physics
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 95,
      damping: 14,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 110,
      damping: 14,
    },
  },
};

const visualVariants: Variants = {
  hidden: { opacity: 0, x: 25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 85,
      damping: 16,
      delay: 0.12,
    },
  },
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.25,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 90,
      damping: 15,
    },
  },
};

const sectionFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HomePage() {
  const [selectedDistrict, setSelectedDistrict] = React.useState('Colombo');
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
      a: 'The driver console sends instant status alerts directly to the parent portal. You can view the van\\'s live position, current speed, and estimated time of arrival (ETA) at your doorstep or the school gate.',
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
      text: 'Having live GPS tracking gave our family total peace of mind every single morning. Our van driver Uncle Nimal is punctual, verified, and caring. SchoolRide LK has modernized school transportation in Sri Lanka!',
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
      role: 'Parent at Trinity & Girls\\' High School',
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
                      {/* Thick yellow/lime highlight curve directly matching image */}
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
          {/* BOTTOM 4 FEATURE CARDS (FULL WIDTH SPAN ACROSS BORDERS)  */}
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
                <div
                  onClick={() => scrollToSection('routes')}
                  className="group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-emerald-950/[0.07] dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(9,71,24,0.08)] hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M12 3a4.5 4.5 0 0 0-4.5 4.5c0 3 4.5 8.5 4.5 8.5s4.5-5.5 4.5-8.5A4.5 4.5 0 0 0 12 3z" />
                      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
                      <path d="M3.5 19.5h17" />
                      <circle cx="5" cy="19.5" r="1.5" fill="currentColor" />
                      <circle cx="19" cy="19.5" r="1.5" fill="currentColor" />
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
                </div>
              </motion.div>

              {/* Card 3: Child Safety */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/safety"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-emerald-950/[0.07] dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(9,71,24,0.08)] hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
                </Link>
              </motion.div>

              {/* Card 4: Track in Real Time */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/parent/rides/live"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-emerald-950/[0.07] dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(9,71,24,0.08)] hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect x="6" y="2" width="12" height="20" rx="3" />
                      <circle cx="12" cy="18" r="1" fill="currentColor" />
                      <line x1="10" y1="5" x2="14" y2="5" />
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
      {/* 2. LIVE TRUST & STATS MARQUEE (SMOOTH SCROLL ANIMATION)  */}
      {/* ======================================================== */}
      <section className="py-10 border-y border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-900/60">
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
      {/* 3. HOW IT WORKS SECTION (WITH MATCHING IMAGERY)          */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center space-y-12">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionFadeUp}
            className="max-w-2xl mx-auto space-y-3"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-[#EBF7EE] text-[#0B4626] text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#BCE6C9] inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
              Simple 3-Step Process
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
              className="p-7 rounded-[26px] border border-emerald-950/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4 flex flex-col justify-between"
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
                  Select your child\\'s school and district. View verified NIC identity, commercial driving credentials, vehicle capacity, and genuine reviews from fellow parents.
                </p>
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
              className="p-7 rounded-[26px] border border-emerald-950/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4 flex flex-col justify-between"
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
              className="p-7 rounded-[26px] border border-emerald-950/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4 flex flex-col justify-between"
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
                  Follow your child\\'s van on an interactive GPS map. Receive automated push updates when your child is picked up and safely inside the school gate.
                </p>
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
      {/* 4. SAFETY & VERIFICATION STANDARD (WITH MATCHING IMAGES) */}
      {/* ======================================================== */}
      <section id="safety" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#094718] dark:text-emerald-300 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                <span>Child Safety &amp; Verification Pillars</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
                Trust earned through <span className="text-[#8CB02C]">rigorous inspection</span>.
              </h2>

              <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300 leading-relaxed">
                We believe trust is built on verifiable requirements rather than marketing slogans. Every driver on SchoolRide LK must submit proof of identity, legal credentials, and vehicle roadworthiness before accepting student bookings.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-emerald-900/[0.06] shadow-sm">
                  <div className="h-7 w-7 rounded-full bg-[#094718] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2C22] dark:text-white">Government Identity &amp; Driving License Verification</h4>
                    <p className="text-xs text-[#4E6258] dark:text-slate-300 mt-0.5">National Identity Card (NIC) and valid commercial/heavy motor vehicle driving license verified by staff.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-emerald-900/[0.06] shadow-sm">
                  <div className="h-7 w-7 rounded-full bg-[#094718] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2C22] dark:text-white">Mandatory Safety Equipment &amp; Vehicle Fitness</h4>
                    <p className="text-xs text-[#4E6258] dark:text-slate-300 mt-0.5">Vehicles must have verified emergency exits, active fire extinguishers, and first-aid kits on board.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-emerald-900/[0.06] shadow-sm">
                  <div className="h-7 w-7 rounded-full bg-[#094718] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2C22] dark:text-white">Encrypted Private Telemetry &amp; Privacy Isolation</h4>
                    <p className="text-xs text-[#4E6258] dark:text-slate-300 mt-0.5">Student addresses and live GPS coordinates are strictly accessible only to verified parents and operators.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/safety">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer">
                    <span>View Complete Safety Charter</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right Side Visual Showcase Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 space-y-4"
            >
              {/* Feature Grid with Vehicle Image Snippet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-3">
                  <div className="h-12 w-12 rounded-2xl bg-[#EAF6ED] text-[#094718] flex items-center justify-center border border-[#D0EAD6]">
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#0B2C22] dark:text-white">100% Inspected</h4>
                  <p className="text-xs text-[#4E6258] dark:text-slate-300 leading-relaxed">
                    All NICs, commercial driving licenses, and passenger insurance policies audited by human moderators.
                  </p>
                </div>

                <div className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-3">
                  <div className="h-12 w-12 rounded-2xl bg-[#EAF6ED] text-[#094718] flex items-center justify-center border border-[#D0EAD6]">
                    <Navigation className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#0B2C22] dark:text-white">Real-time GPS</h4>
                  <p className="text-xs text-[#4E6258] dark:text-slate-300 leading-relaxed">
                    Encrypted WebSocket streams with speed, direction, and ETA telemetry updated sub-second.
                  </p>
                </div>

                <div className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-3">
                  <div className="h-12 w-12 rounded-2xl bg-[#EAF6ED] text-[#094718] flex items-center justify-center border border-[#D0EAD6]">
                    <Users className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#0B2C22] dark:text-white">Parent Ratings</h4>
                  <p className="text-xs text-[#4E6258] dark:text-slate-300 leading-relaxed">
                    Authentic feedback and punctuality scores posted exclusively by parents with verified enrollments.
                  </p>
                </div>

                <div className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-3">
                  <div className="h-12 w-12 rounded-2xl bg-[#EAF6ED] text-[#094718] flex items-center justify-center border border-[#D0EAD6]">
                    <HeartHandshake className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#0B2C22] dark:text-white">Rapid Moderation</h4>
                  <p className="text-xs text-[#4E6258] dark:text-slate-300 leading-relaxed">
                    Direct administrative dispute resolution with immutable audit logging and suspension enforcement.
                  </p>
                </div>
              </div>

              {/* Verified School Van Highlight Card with Matching Photo */}
              <div className="p-4 sm:p-5 rounded-[24px] bg-[#FAFDF9] dark:bg-slate-900 border border-[#BCE6C9] dark:border-emerald-800 flex items-center gap-4 shadow-sm">
                <div className="relative h-20 w-28 sm:h-24 sm:w-36 rounded-2xl overflow-hidden shrink-0 border border-emerald-200">
                  <Image
                    src="/images/van-vehicle-focus.jpg"
                    alt="Inspected yellow school van"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF7EE] text-[#094718] border border-[#BCE6C9] uppercase">
                    Fleet Standard
                  </span>
                  <h5 className="text-sm font-bold text-[#0B2C22] dark:text-white">
                    Toyota HiAce &amp; Nissan Caravan Standards
                  </h5>
                  <p className="text-xs text-[#4E6258] dark:text-slate-300">
                    Inspected passenger safety doors, air conditioning, and certified first aid on every registered vehicle.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. LIVE GPS TRACKING SHOWCASE (INTERACTIVE UI SIMULATOR) */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-[#EBF7EE] text-[#0B4626] text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#BCE6C9] inline-flex items-center gap-2">
              <Radio className="h-4 w-4 text-[#16A34A] animate-pulse" />
              Live Telemetry Simulation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
              Experience <span className="text-[#8CB02C]">Live Ride Tracking</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300">
              See what parents see every morning. Real-time GPS coordinates, vehicle speed, and automated gate arrival alerts.
            </p>
          </div>

          {/* Interactive Live Tracking UI Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionFadeUp}
            className="max-w-4xl mx-auto rounded-[28px] border border-emerald-950/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 p-5 sm:p-7 shadow-[0_12px_40px_rgba(9,71,24,0.06)] space-y-6"
          >
            {/* Simulator Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100/80 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#094718] text-white font-bold text-sm shadow-sm">
                  <Car className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-[#0B2C22] dark:text-white">Trip #SR-2026-COL</h4>
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF7EE] text-[#094718] border border-[#BCE6C9]">
                      <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-ping" />
                      IN TRANSIT (LIVE)
                    </span>
                  </div>
                  <p className="text-xs text-[#4E6258] dark:text-slate-300">
                    Route: Nugegoda ➔ Havelock Town ➔ Royal College &amp; Visakha Vidyalaya
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-[#0B2C22] dark:text-white">
                  Speed: <strong className="text-[#16A34A]">34 km/h</strong>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-[#0B2C22] dark:text-white">
                  ETA: <strong className="text-[#094718]">07:18 AM</strong>
                </span>
              </div>
            </div>

            {/* Simulated Live Route Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#094718] dark:text-emerald-400">06:45 AM • Picked Up</span>
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                </div>
                <p className="text-sm font-bold text-[#0B2C22] dark:text-white">Home: Nugegoda</p>
                <p className="text-xs text-[#4E6258] dark:text-slate-300">Kasun boarded van safely</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#094718] dark:text-emerald-400">07:02 AM • Picked Up</span>
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                </div>
                <p className="text-sm font-bold text-[#0B2C22] dark:text-white">Havelock Town</p>
                <p className="text-xs text-[#4E6258] dark:text-slate-300">Amaya boarded van safely</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#EBF7EE] dark:bg-emerald-950/60 border border-[#BCE6C9] dark:border-emerald-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#094718] dark:text-emerald-300">07:18 AM • Destination</span>
                  <Navigation className="h-4 w-4 text-[#16A34A] animate-pulse" />
                </div>
                <p className="text-sm font-bold text-[#0B2C22] dark:text-white">Royal College Gate</p>
                <p className="text-xs text-[#094718] dark:text-emerald-300 font-semibold">Approaching gate (200m away)</p>
              </div>
            </div>

            {/* Driver Profile Footer Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-emerald-100/80 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#094718] text-white font-bold flex items-center justify-center">
                  SP
                </div>
                <div>
                  <span className="font-bold text-[#0B2C22] dark:text-white block">Sunil Perera (Verified Driver)</span>
                  <span className="text-[#4E6258] dark:text-slate-300">Toyota HiAce GL (WP ND-4821) • A/C • Capacity: 14</span>
                </div>
              </div>

              <Link href="/parent/rides/live">
                <button className="px-5 py-2.5 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer inline-flex items-center gap-1.5">
                  <span>Open Full Live Tracking Portal</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. ROUTES & SCHOOLS DIRECTORY (FILTERABLE DISTRICT HUB)  */}
      {/* ======================================================== */}
      <section id="routes" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8 text-center">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionFadeUp}
            className="max-w-2xl mx-auto space-y-3"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-[#EBF7EE] text-[#0B4626] text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#BCE6C9]">
              Island-Wide Reach
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
              School Routes &amp; <span className="text-[#8CB02C]">Coverage Areas</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300">
              Discover school van operators with established coverage routes to premier national, private, and provincial schools.
            </p>
          </motion.div>

          {/* District selector pills */}
          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {['Colombo', 'Gampaha', 'Kandy', 'Galle'].map((district) => (
              <button
                key={district}
                onClick={() => setSelectedDistrict(district)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedDistrict === district
                    ? 'bg-[#094718] text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {district} District
              </button>
            ))}
          </div>

          {/* Filtered Schools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left pt-4">
            {INITIAL_SCHOOLS.filter((s) => s.district === selectedDistrict).map((school) => (
              <motion.div
                key={school.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={sectionFadeUp}
                className="p-5 rounded-[22px] border border-emerald-950/[0.08] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <GraduationCap className="h-4 w-4 text-[#094718] dark:text-emerald-400" />
                    <h4 className="text-base font-bold text-[#0B2C22] dark:text-white">{school.name}</h4>
                  </div>
                  <p className="text-xs text-[#4E6258] dark:text-slate-400 flex items-center gap-1.5 leading-relaxed">
                    <MapPin className="h-3.5 w-3.5 text-[#094718] dark:text-emerald-400 shrink-0" />
                    {school.address}
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-4">
                  <span className="text-[11px] font-bold text-[#094718] dark:text-emerald-400 bg-[#EBF7EE] dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-[#BCE6C9]">
                    Active Van Service
                  </span>
                  <Link
                    href={`/drivers?schoolId=${school.id}`}
                    className="text-xs font-bold text-[#094718] dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    View Drivers <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-4">
            <Link href="/drivers">
              <button className="px-7 py-3.5 rounded-full border-2 border-[#094718] text-[#094718] dark:text-emerald-400 font-bold text-sm hover:bg-[#094718] hover:text-white transition-all cursor-pointer">
                View All Sri Lankan Schools &amp; Districts
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. PARENT & OPERATOR REVIEWS & SOCIAL PROOF              */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12 text-center">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-[#EBF7EE] text-[#0B4626] text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#BCE6C9]">
              Verified Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
              Trusted by <span className="text-[#8CB02C]">Sri Lankan Families</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300">
              Hear directly from parents who coordinate their children\\'s school travel using SchoolRide LK.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={sectionFadeUp}
                className="p-7 rounded-[26px] border border-emerald-950/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#0B2C22] dark:text-slate-200 leading-relaxed italic">
                    \\"{t.text}\\"
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-100/80 dark:border-slate-800">
                  <h4 className="text-sm font-bold text-[#0B2C22] dark:text-white">{t.name}</h4>
                  <p className="text-xs text-[#094718] dark:text-emerald-400 font-semibold">{t.role}</p>
                  <p className="text-[11px] text-[#4E6258] dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {t.district}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. FREQUENTLY ASKED QUESTIONS (ACCORDION WITH ANIMATION) */}
      {/* ======================================================== */}
      <section id="about" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10 text-left">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-[#EBF7EE] text-[#0B4626] text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#BCE6C9]">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
              Frequently Asked <span className="text-[#8CB02C]">Questions</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300">
              Everything you need to know about safety standards, booking procedures, and real-time tracking.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-[20px] border border-emerald-950/[0.08] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0B2C22] dark:text-white flex items-center gap-3">
                      <HelpCircle className="h-4 w-4 text-[#094718] dark:text-emerald-400 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#094718] dark:text-emerald-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed border-t border-emerald-50 dark:border-slate-800 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. DUAL CALL TO ACTION (FOR PARENTS & DRIVERS)           */}
      {/* ======================================================== */}
      <section id="contact" className="py-20 md:py-28 bg-[#094718] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#84cc16_1px,transparent_1px)] opacity-10 [background-size:24px_24px]" />
        
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10 relative z-10">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/20 inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#F3C53C]" />
              Join the Nationwide Network
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Ready to find safe school transportation for <span className="text-[#E3D13E]">your children</span>?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-emerald-100 leading-relaxed max-w-2xl mx-auto">
              Join thousands of Sri Lankan families and verified van operators who make daily school journeys punctual, safe, and stress-free.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2 max-w-lg mx-auto">
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
        </div>
      </section>

    </div>
  );
}
"""

with open(r'SchoolRide-LK-V2\apps\web\src\app\page.tsx', 'w', encoding='utf-8') as f:
    f.write(page_content)

print('Saved completely updated HomePage in page.tsx!')
