import re

page_content = """'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronRight,
  HelpCircle,
  Bus,
  Calendar,
  CalendarDays,
  Play,
  Bell,
  Smartphone,
  Route,
  Sparkles,
  X,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { INITIAL_SCHOOLS } from '@schoolride/shared';

// Landing Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 14,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
    },
  },
};

const visualVariants = {
  hidden: { opacity: 0, scale: 0.92, x: 25 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 16,
      delay: 0.25,
    },
  },
};

const floatingCardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 85,
      damping: 15,
      delay: 0.45,
    },
  },
};

export default function HomePage() {
  const [selectedDistrict, setSelectedDistrict] = React.useState('Colombo');
  const [showVideoModal, setShowVideoModal] = React.useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#FAFDF9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (MATCHING VANGO DESIGN)                 */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 bg-gradient-to-b from-[#F2FBF4]/80 via-[#FAFDF9] to-[#FAFDF9] dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        
        {/* Soft Ambient Radial Background Glows */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[550px] h-[550px] bg-lime-300/15 dark:bg-lime-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-12 right-10 w-[600px] h-[600px] bg-emerald-400/15 dark:bg-emerald-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Decorative Floating Leaves (Matching image corners) */}
        <div className="absolute top-20 left-4 md:left-10 w-16 h-16 pointer-events-none opacity-40 animate-float-slow -z-0">
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-emerald-600 dark:text-emerald-400">
            <path d="M12 52C12 52 14 30 38 18C48 13 54 8 54 8C54 8 50 24 38 36C26 48 12 52 12 52Z" fill="currentColor" fillOpacity="0.35"/>
            <path d="M12 52C22 42 34 32 46 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
          </svg>
        </div>

        <div className="absolute bottom-36 left-2 md:left-8 w-20 h-20 pointer-events-none opacity-40 animate-float-reverse -z-0">
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-lime-600 dark:text-lime-400">
            <path d="M8 44C8 44 18 20 44 14C52 12 58 6 58 6C58 6 52 20 40 32C28 44 8 44 8 44Z" fill="currentColor" fillOpacity="0.4"/>
            <path d="M8 44C20 36 34 26 48 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
          </svg>
        </div>

        <div className="absolute bottom-24 right-4 md:right-8 w-24 h-24 pointer-events-none opacity-40 animate-float-slow -z-0">
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-emerald-500 dark:text-emerald-400">
            <path d="M54 50C54 50 48 26 24 16C14 12 6 8 6 8C6 8 12 24 24 36C36 48 54 50 54 50Z" fill="currentColor" fillOpacity="0.35"/>
            <path d="M54 50C42 40 28 30 16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left z-10">
              
              {/* Pill Badge: Safe • Reliable • On Time */}
              <motion.div variants={badgeVariants} className="inline-block">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF8EE] dark:bg-emerald-950/80 border border-[#A7E8B8] dark:border-emerald-800 text-xs sm:text-sm font-bold text-[#065F46] dark:text-emerald-300 shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-[#065F46] dark:text-emerald-400" />
                  <span>Safe • Reliable • On Time</span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={itemVariants} className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.14]">
                  Safe &amp; Convenient <br />
                  School Rides for <br />
                  <span className="relative inline-block mt-0.5">
                    Your{' '}
                    <span className="text-[#84cc16] dark:text-[#a3e635] relative">
                      Children
                      {/* Artistic curved highlight underline matching image */}
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3.5 text-[#F3C53C] dark:text-amber-400 -z-10 overflow-visible"
                        viewBox="0 0 160 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 10C45 3 115 2 157 9"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </span>
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-normal"
              >
                A trusted school transportation service with verified drivers, real-time tracking and complete safety care for your child.
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                {/* 1. Book a Ride Button (Deep Forest Green Pill) */}
                <Link href="/drivers">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 12px 24px -6px rgba(9, 71, 24, 0.35)' }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#094718] hover:bg-[#073612] text-white font-bold text-base shadow-md shadow-emerald-950/20 transition-all cursor-pointer"
                  >
                    <CalendarDays className="h-5 w-5" />
                    <span>Book a Ride</span>
                  </motion.button>
                </Link>

                {/* 2. How It Works Button (White with Dark Border Pill) */}
                <motion.button
                  whileHover={{ scale: 1.04, backgroundColor: 'rgba(248, 250, 252, 1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('how-it-works')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-300 text-slate-900 dark:text-white font-bold text-base shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900">
                    <Play className="h-2.5 w-2.5 fill-current ml-0.5" />
                  </div>
                  <span>How It Works</span>
                </motion.button>
              </motion.div>

              {/* Trust Features Row: [Verified Drivers] [Live Tracking] [Ride Updates] */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-6 pt-4 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#094718] dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Verified Drivers</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#094718] dark:text-emerald-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>Live Tracking</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#094718] dark:text-emerald-400">
                    <Bell className="h-4 w-4" />
                  </div>
                  <span>Ride Updates</span>
                </div>
              </motion.div>

            </div>

            {/* Right Column: Hero Visual with Organic Curved Frame */}
            <motion.div
              variants={visualVariants}
              className="lg:col-span-6 xl:col-span-6 relative w-full flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[580px] lg:max-w-[620px]">
                
                {/* Organic Green Frame Glow Backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#84cc16]/30 via-[#22c55e]/20 to-[#f3c53c]/20 rounded-[40px] blur-2xl opacity-70 -z-10" />

                {/* Main Organic Framed Card matching the uploaded visual */}
                <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border-4 border-white dark:border-slate-800 shadow-[0_20px_50px_rgba(9,71,24,0.14)] bg-white dark:bg-slate-900 group">
                  
                  {/* Organic Wave Border Layer on the Left */}
                  <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-[#84cc16]/25 to-transparent pointer-events-none z-10" />
                  
                  {/* High Quality Hero Visual Image */}
                  <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] overflow-hidden">
                    <Image
                      src="/images/hero-visual.jpg"
                      alt="Two school children with backpacks walking towards bright yellow VanGo school van"
                      fill
                      priority
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay for bottom blending */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Live Signal Active Pill */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border border-emerald-100 text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-100"
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span>Live GPS Telemetry</span>
                    </motion.div>

                    {/* Floating Driver Badge Pill at Bottom Left */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.65, type: 'spring' }}
                      className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border border-emerald-100/90"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#094718] text-white font-bold text-xs shadow-sm">
                        <Bus className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white">Toyota HiAce</span>
                          <span className="text-[10px] text-amber-500 font-bold">★ 4.95</span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Verified School Fleet</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>

          {/* ======================================================== */}
          {/* BOTTOM OVERLAPPING 4-FEATURE QUICK ACCESS BAR            */}
          {/* ======================================================== */}
          <motion.div
            variants={floatingCardVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 sm:mt-16 lg:mt-20 z-20 relative"
          >
            <div className="rounded-[28px] sm:rounded-[36px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-emerald-100 dark:border-slate-800 shadow-[0_20px_50px_-10px_rgba(9,71,24,0.08)] p-5 sm:p-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
                
                {/* 1. Book a Ride */}
                <Link
                  href="/drivers"
                  className="group flex items-start gap-4 p-2 sm:p-3 rounded-2xl hover:bg-[#F2FBF4] dark:hover:bg-slate-800/60 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#EAF8EE] dark:bg-emerald-950/80 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-110 group-hover:bg-[#094718] group-hover:text-white transition-all duration-200 shadow-sm">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-[#094718] dark:group-hover:text-emerald-400 transition-colors">
                      Book a Ride
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      Reserve a school ride in a few simple steps.
                    </p>
                  </div>
                </Link>

                {/* 2. View Routes */}
                <div
                  onClick={() => scrollToSection('routes')}
                  className="group flex items-start gap-4 p-2 sm:p-3 rounded-2xl hover:bg-[#F2FBF4] dark:hover:bg-slate-800/60 transition-all duration-200 cursor-pointer pt-4 sm:pt-2 lg:pl-6"
                >
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#EAF8EE] dark:bg-emerald-950/80 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-110 group-hover:bg-[#094718] group-hover:text-white transition-all duration-200 shadow-sm">
                    <Route className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-[#094718] dark:group-hover:text-emerald-400 transition-colors">
                      View Routes
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      Check available routes and pickup points.
                    </p>
                  </div>
                </div>

                {/* 3. Child Safety */}
                <Link
                  href="/safety"
                  className="group flex items-start gap-4 p-2 sm:p-3 rounded-2xl hover:bg-[#F2FBF4] dark:hover:bg-slate-800/60 transition-all duration-200 cursor-pointer pt-4 sm:pt-2 lg:pl-6"
                >
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#EAF8EE] dark:bg-emerald-950/80 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-110 group-hover:bg-[#094718] group-hover:text-white transition-all duration-200 shadow-sm">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-[#094718] dark:group-hover:text-emerald-400 transition-colors">
                      Child Safety
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      Background-checked drivers and safety guidelines.
                    </p>
                  </div>
                </Link>

                {/* 4. Track in Real Time */}
                <Link
                  href="/parent/rides/live"
                  className="group flex items-start gap-4 p-2 sm:p-3 rounded-2xl hover:bg-[#F2FBF4] dark:hover:bg-slate-800/60 transition-all duration-200 cursor-pointer pt-4 sm:pt-2 lg:pl-6"
                >
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#EAF8EE] dark:bg-emerald-950/80 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-110 group-hover:bg-[#094718] group-hover:text-white transition-all duration-200 shadow-sm">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-[#094718] dark:group-hover:text-emerald-400 transition-colors">
                      Track in Real Time
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      Get live ride updates and arrival alerts.
                    </p>
                  </div>
                </Link>

              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. HOW IT WORKS SECTION                                  */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#EBF8EE] text-[#094718] dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              How VanGo Works for Families
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Coordinating safe, punctual school transportation has never been simpler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Step 1 */}
            <div className="p-7 rounded-3xl border border-emerald-100/80 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-lg shadow-sm">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Discover Verified Van Operators
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Filter by your child\'s school, your district, vehicle capacity, and operating neighborhoods. Review verified driver profiles, safety equipment, and parent feedback.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-3xl border border-emerald-100/80 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-lg shadow-sm">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Submit &amp; Confirm Bookings
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Provide private pickup/dropoff details and schedule. The driver confirms seat availability, route compatibility, and agreed monthly fees in LKR.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-3xl border border-emerald-100/80 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-lg shadow-sm">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Track Live Trips Every Morning
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Follow your child\'s van on an interactive map. Receive real-time push updates when your child is picked up and safely dropped off at the school gate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. SAFETY & VERIFICATION STANDARD                        */}
      {/* ======================================================== */}
      <section id="safety" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#094718] dark:text-emerald-300 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                <span>Child Safety &amp; Verification Pillars</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Trust earned through rigorous inspection.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                We believe trust is built on verifiable requirements rather than marketing slogans. Every driver on VanGo must submit proof of identity, legal credentials, and vehicle roadworthiness before accepting student bookings.
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
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 shadow-sm space-y-2">
                <FileCheck className="h-8 w-8 text-[#094718] dark:text-emerald-400" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">100% Inspected</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">All NICs, licenses, and insurance policies audited by moderators.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 shadow-sm space-y-2">
                <Navigation className="h-8 w-8 text-[#094718] dark:text-emerald-400" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Real-time GPS</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Socket.io WebSocket streams with speed and heading telemetry.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 shadow-sm space-y-2">
                <Users className="h-8 w-8 text-[#094718] dark:text-emerald-400" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Parent Ratings</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Authentic feedback exclusively from enrolled student parents.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 shadow-sm space-y-2">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#EBF8EE] text-[#094718] dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              Island-Wide Reach
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              School Routes &amp; Pickup Areas
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
                className="p-5 rounded-3xl border border-emerald-100 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5">{school.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 leading-relaxed">
                    <MapPin className="h-3.5 w-3.5 text-[#094718] dark:text-emerald-400 shrink-0" />
                    {school.address}
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-emerald-100/60 dark:border-slate-700/60 mt-4">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          
          <div className="text-center space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#EBF8EE] text-[#094718] dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Everything you need to know about safety, booking, fees, and tracking.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-3xl border border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <HelpCircle className="h-5 w-5 text-[#094718] dark:text-emerald-400 shrink-0" />
                How are van drivers verified on VanGo?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                Drivers must upload valid government NIC identity cards, commercial driving licenses, vehicle revenue licenses, and passenger insurance documentation. Platform moderators review document clarity and expiry dates before a driver can be approved for public discovery.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <HelpCircle className="h-5 w-5 text-[#094718] dark:text-emerald-400 shrink-0" />
                Is my child\'s location information kept private?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                Yes. Exact home pickup coordinates and children\'s profiles are strictly private and never publicly searchable. Live GPS tracking is transmitted exclusively through secure authenticated sessions only to parents whose child is assigned to that active ride.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm">
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
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ready to find safe school transportation?
          </h2>
          <p className="text-base sm:text-lg text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Join families across Sri Lanka who rely on verified van operators for their children\'s daily journey to school.
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
"""

with open(r'C:\Users\user\Desktop\Project\SchoolRide-LK-V2\apps\web\src\app\page.tsx', 'w', encoding='utf-8') as f:
    f.write(page_content)

print('Updated page.tsx with VanGo Hero section successfully!')

