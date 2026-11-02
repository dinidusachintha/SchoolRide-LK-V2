'use client';

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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { INITIAL_SCHOOLS } from '@schoolride/shared';

// Landing Animation Variants with Typed Spring Physics
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
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
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 85,
      damping: 16,
      delay: 0.15,
    },
  },
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
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

export default function HomePage() {
  const [selectedDistrict, setSelectedDistrict] = React.useState('Colombo');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      {/* 2. HOW IT WORKS SECTION (LIGHT GREEN & DARK GREEN FONTS) */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-3">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
            {/* Step 1 */}
            <div className="p-7 rounded-[24px] border border-emerald-900/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-lg shadow-md border border-[#22C55E]/40">
                  01
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-[#EAF6ED] px-3 py-1 rounded-full border border-[#D0EAD6]">
                  Discovery
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
                Discover <span className="text-[#8CB02C]">Verified</span> Van Drivers
              </h3>
              <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                Filter by your child's school, your district, vehicle capacity, and operating route. Inspect verified NIC identity, commercial license, and authentic parent ratings.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-[24px] border border-emerald-900/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-lg shadow-md border border-[#22C55E]/40">
                  02
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-[#EAF6ED] px-3 py-1 rounded-full border border-[#D0EAD6]">
                  Booking
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
                Submit &amp; Confirm <span className="text-[#8CB02C]">Monthly Seat</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                Provide private home pickup &amp; dropoff details. The driver confirms seat availability, route compatibility, and agreed monthly fees in Sri Lankan Rupees (LKR).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-[24px] border border-emerald-900/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-lg shadow-md border border-[#22C55E]/40">
                  03
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-[#EAF6ED] px-3 py-1 rounded-full border border-[#D0EAD6]">
                  Peace of Mind
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
                Track Live Trips <span className="text-[#8CB02C]">Every Morning</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                Follow your child's van on an interactive GPS map. Receive instant notifications when your child is picked up and safely inside the school gates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. SAFETY & VERIFICATION STANDARD                        */}
      {/* ======================================================== */}
      <section id="safety" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#094718] dark:text-emerald-300 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                <span>Child Safety &amp; Verification Pillars</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
                Trust earned through <span className="text-[#8CB02C]">rigorous inspection</span>.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                We believe trust is built on verifiable requirements rather than marketing slogans. Every driver on SchoolRide LK must submit proof of identity, legal credentials, and vehicle roadworthiness before accepting student bookings.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="h-6 w-6 rounded-full bg-[#094718] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Government Identity &amp; Driving License</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">National Identity Card (NIC) and valid commercial/heavy motor vehicle driving license verified by staff.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-6 w-6 rounded-full bg-[#094718] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Mandatory Safety Equipment Inspection</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Vehicles must have verified emergency exits, active fire extinguishers, and first-aid kits on board.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-6 w-6 rounded-full bg-[#094718] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Encrypted Private Telemetry</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Student addresses and live GPS coordinates are strictly accessible only to verified parents and operators.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
                <FileCheck className="h-8 w-8 text-[#094718] dark:text-emerald-400" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">100% Inspected</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">All NICs, licenses, and insurance policies audited by moderators.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
                <Navigation className="h-8 w-8 text-[#094718] dark:text-emerald-400" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Real-time GPS</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Socket.io WebSocket streams with speed and heading telemetry.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
                <Users className="h-8 w-8 text-[#094718] dark:text-emerald-400" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Parent Ratings</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Authentic feedback exclusively from enrolled student parents.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
                <HeartHandshake className="h-8 w-8 text-[#094718] dark:text-emerald-400" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Rapid Moderation</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Direct administrative dispute resolution with audit logs.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. ROUTES & SCHOOLS DIRECTORY                            */}
      {/* ======================================================== */}
      <section id="routes" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8 text-center">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#EBF8EE] text-[#094718] dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              Island-Wide Reach
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
              School Routes &amp; <span className="text-[#8CB02C]">Coverage Areas</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Discover school van operators with established coverage routes to premier national and provincial schools.
            </p>
          </div>

          {/* District selector pills */}
          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {['Colombo', 'Gampaha', 'Kandy', 'Galle'].map((district) => (
              <button
                key={district}
                onClick={() => setSelectedDistrict(district)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedDistrict === district
                    ? 'bg-[#094718] text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {district} District
              </button>
            ))}
          </div>

          {/* Filtered Schools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left pt-4">
            {INITIAL_SCHOOLS.filter((s) => s.district === selectedDistrict).map((school) => (
              <div
                key={school.id}
                className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">{school.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 leading-relaxed">
                    <MapPin className="h-3.5 w-3.5 text-[#094718] dark:text-emerald-400 shrink-0" />
                    {school.address}
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 mt-4">
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full">
                    Active Van Service
                  </span>
                  <Link
                    href={`/drivers?schoolId=${school.id}`}
                    className="text-xs font-bold text-[#094718] dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    View Vans <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <Link href="/drivers">
              <button className="px-6 py-3 rounded-full border-2 border-[#094718] text-[#094718] dark:text-emerald-400 font-bold text-sm hover:bg-[#094718] hover:text-white transition-all cursor-pointer">
                View All Sri Lankan Schools &amp; Districts
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. ABOUT & FAQ SECTION                                   */}
      {/* ======================================================== */}
      <section id="about" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10 text-left">
          
          <div className="text-center space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#EBF8EE] text-[#094718] dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
              Frequently Asked <span className="text-[#8CB02C]">Questions</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Everything you need to know about safety, booking, fees, and tracking.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <HelpCircle className="h-5 w-5 text-[#094718] dark:text-emerald-400 shrink-0" />
                How are van drivers verified on SchoolRide LK?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                Drivers must upload valid government NIC identity cards, commercial driving licenses, vehicle revenue licenses, and passenger insurance documentation. Platform moderators review document clarity and expiry dates before a driver can be approved for public discovery.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <HelpCircle className="h-5 w-5 text-[#094718] dark:text-emerald-400 shrink-0" />
                Is my child's location information kept private?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                Yes. Exact home pickup coordinates and children's profiles are strictly private and never publicly searchable. Live GPS tracking is transmitted exclusively through secure authenticated sessions only to parents whose child is assigned to that active ride.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <HelpCircle className="h-5 w-5 text-[#094718] dark:text-emerald-400 shrink-0" />
                How are monthly transportation fees handled?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                Drivers set their standard monthly rate per child in Sri Lankan Rupees (LKR) based on operating districts and route distance. Booking requests clearly confirm the agreed fee before confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. CALL TO ACTION & CONTACT FOOTER                       */}
      {/* ======================================================== */}
      <section id="contact" className="py-20 md:py-24 bg-[#094718] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#84cc16_1px,transparent_1px)] opacity-10 [background-size:24px_24px]" />
        
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ready to find safe school transportation for <span className="text-[#E3D13E]">your children</span>?
          </h2>
          <p className="text-base sm:text-lg text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Join families across Sri Lanka who rely on verified van operators for their children's daily journey to school.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/drivers">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#094718] font-black text-base shadow-lg hover:bg-emerald-50 transition-all cursor-pointer">
                Book a School Ride Now
              </button>
            </Link>
            <Link href="/register?role=DRIVER">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-900/60 border-2 border-white/60 text-white font-bold text-base hover:bg-emerald-900 transition-all cursor-pointer">
                Register as Van Driver
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
