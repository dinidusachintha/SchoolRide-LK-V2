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
  hidden: { opacity: 0, y: -14, scale: 0.95 },
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
      delay: 0.2,
    },
  },
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.35,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
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
      {/* 1. HERO SECTION (1:1 REPLICA OF THE UPLOADED DESIGN)     */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden pt-6 pb-14 md:pt-10 md:pb-20 lg:pt-12 lg:pb-24 bg-[#FAFDF9] dark:bg-slate-950">
        
        {/* Soft Background Leaves matching the image edges */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-12 h-24 pointer-events-none opacity-80 animate-float-slow -z-0">
          <Image
            src="/images/leaf-left-trans.png"
            alt="Foliage decoration"
            width={50}
            height={90}
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-6 right-0 w-14 h-28 pointer-events-none opacity-85 animate-float-reverse -z-0">
          <Image
            src="/images/leaf-right-trans.png"
            alt="Foliage decoration"
            width={55}
            height={110}
            className="object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Row: Text on Left, Organic Visual on Right */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center"
          >
            {/* Left Column: Heading, Subtitle, Buttons, Trust Badges */}
            <div className="lg:col-span-6 space-y-6 text-left z-10">
              
              {/* Badge: [ 🛡️ Safe • Reliable • On Time ] */}
              <motion.div variants={badgeVariants} className="inline-block">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF7EE] border border-[#BCE6C9] text-xs sm:text-sm font-semibold text-[#0B4626] shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-[#0B4626]" />
                  <span>Safe • Reliable • On Time</span>
                </div>
              </motion.div>

              {/* Title: Safe & Convenient School Rides for Your Children */}
              <motion.div variants={itemVariants} className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold tracking-tight text-[#0B2C22] dark:text-white leading-[1.14]">
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
                className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300 max-w-lg leading-relaxed font-normal"
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
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-sm sm:text-base shadow-sm transition-colors cursor-pointer"
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
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-[#152720] dark:border-slate-300 text-[#152720] dark:text-white font-bold text-sm sm:text-base hover:bg-slate-50 transition-colors cursor-pointer"
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
                className="flex flex-wrap items-center gap-5 sm:gap-7 pt-2 text-[#0B2C22] dark:text-slate-200 text-xs sm:text-sm font-semibold"
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

            {/* Right Column: Exact Visual of Organic Wave + Children + Yellow Van */}
            <motion.div
              variants={visualVariants}
              className="lg:col-span-6 relative w-full flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[620px] aspect-[614/392]">
                <Image
                  src="/images/vango-hero-right-feathered.png"
                  alt="VanGo school ride service yellow van with children in uniform"
                  fill
                  priority
                  className="object-contain object-right"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ======================================================== */}
          {/* BOTTOM 4 FEATURE CARDS (IDENTICAL TO UPLOADED IMAGE)     */}
          {/* ======================================================== */}
          <motion.div
            variants={cardsContainerVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 sm:mt-14 lg:mt-16 z-20 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              {/* Card 1: Book a Ride */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/drivers"
                  className="group flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#ECF7EE] dark:bg-emerald-950/80 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors">
                      Book a Ride
                    </h4>
                    <p className="text-xs text-[#50635A] dark:text-slate-400 leading-relaxed font-normal">
                      Reserve a school ride in a few simple steps.
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Card 2: View Routes */}
              <motion.div variants={cardItemVariants}>
                <div
                  onClick={() => scrollToSection('routes')}
                  className="group flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 cursor-pointer h-full"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#ECF7EE] dark:bg-emerald-950/80 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Route className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors">
                      View Routes
                    </h4>
                    <p className="text-xs text-[#50635A] dark:text-slate-400 leading-relaxed font-normal">
                      Check available routes and pickup points.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Child Safety */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/safety"
                  className="group flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#ECF7EE] dark:bg-emerald-950/80 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors">
                      Child Safety
                    </h4>
                    <p className="text-xs text-[#50635A] dark:text-slate-400 leading-relaxed font-normal">
                      Background-checked drivers and safety guidelines.
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Card 4: Track in Real Time */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/parent/rides/live"
                  className="group flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#ECF7EE] dark:bg-emerald-950/80 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors">
                      Track in Real Time
                    </h4>
                    <p className="text-xs text-[#50635A] dark:text-slate-400 leading-relaxed font-normal">
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
      {/* 2. HOW IT WORKS SECTION                                  */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#EBF8EE] text-[#094718] dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2C22] dark:text-white tracking-tight">
              How VanGo Works for Families
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Coordinating safe, punctual school transportation has never been simpler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Step 1 */}
            <div className="p-7 rounded-2xl border border-slate-100 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#094718] text-white font-extrabold text-lg shadow-sm">
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
            <div className="p-7 rounded-2xl border border-slate-100 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#094718] text-white font-extrabold text-lg shadow-sm">
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
            <div className="p-7 rounded-2xl border border-slate-100 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#094718] text-white font-extrabold text-lg shadow-sm">
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

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2C22] dark:text-white tracking-tight">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#EBF8EE] text-[#094718] dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              Island-Wide Reach
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2C22] dark:text-white tracking-tight">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          
          <div className="text-center space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#EBF8EE] text-[#094718] dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2C22] dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Everything you need to know about safety, booking, fees, and tracking.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <HelpCircle className="h-5 w-5 text-[#094718] dark:text-emerald-400 shrink-0" />
                How are van drivers verified on VanGo?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                Drivers must upload valid government NIC identity cards, commercial driving licenses, vehicle revenue licenses, and passenger insurance documentation. Platform moderators review document clarity and expiry dates before a driver can be approved for public discovery.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <HelpCircle className="h-5 w-5 text-[#094718] dark:text-emerald-400 shrink-0" />
                Is my child\'s location information kept private?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                Yes. Exact home pickup coordinates and children\'s profiles are strictly private and never publicly searchable. Live GPS tracking is transmitted exclusively through secure authenticated sessions only to parents whose child is assigned to that active ride.
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

print('Updated page.tsx with exact replica hero section!')

