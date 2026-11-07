'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Sparkles,
  UserCheck,
  Clock,
  Gauge,
  Phone,
  Navigation,
  Star,
  Car
} from 'lucide-react';

interface SlideData {
  id: number;
  stepNum: string;
  tag: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  keyPoints: string[];
  routeBadge: {
    title: string;
    badge: string;
    detail: string;
  };
  footerStat: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  imageAlt: string;
  showcaseBadge: string;
  showcaseDetails: {
    primaryTitle: string;
    subtitle: string;
    ratingOrMetric: string;
    extraTag: string;
  };
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    stepNum: '01',
    tag: 'SEARCH & FILTER',
    titlePrefix: 'Discover ',
    titleHighlight: 'Verified',
    titleSuffix: ' Van Drivers',
    description:
      "Select your child's school and district. View verified NIC identity, commercial driving credentials, vehicle capacity, and genuine reviews from fellow parents.",
    keyPoints: [
      'Government NIC and national police clearances verified by admin',
      'Filtered by Sri Lankan schools (Royal, Ananda, Visakha, Trinity, etc.)',
      'Community parent ratings and transparent safe-trip history',
    ],
    routeBadge: {
      title: 'Royal College Route',
      badge: '14 Verified Vans',
      detail: 'Malabe → Battaramulla → Rajagiriya → Colombo 07',
    },
    footerStat: '48+ Schools Mapped across Sri Lanka',
    ctaText: 'Browse Van Directory',
    ctaLink: '/drivers',
    image: '/images/verified-driver-portrait.jpg',
    imageAlt: 'Verified Sri Lankan school van driver',
    showcaseBadge: 'Police Checked & Verified',
    showcaseDetails: {
      primaryTitle: 'Sunil Wickramasinghe',
      subtitle: '14 Years Safe Driving • Toyota HiAce (WP ND-8422)',
      ratingOrMetric: '4.98 ★ (1,840+ trips)',
      extraTag: '2 Seats Available',
    },
  },
  {
    id: 2,
    stepNum: '02',
    tag: 'DIRECT BOOKING',
    titlePrefix: 'Confirm ',
    titleHighlight: 'Monthly Seat',
    titleSuffix: ' in LKR',
    description:
      'Provide your private pickup and dropoff locations. The driver confirms seat availability, route compatibility, and agreed monthly fees in Sri Lankan Rupees.',
    keyPoints: [
      'Direct parent-to-driver agreement with zero broker markups',
      'Transparent flat monthly rate in LKR agreed before booking',
      'Dedicated seat reservation with seatbelts and dual air conditioning',
    ],
    routeBadge: {
      title: 'Monthly Seat Rate',
      badge: 'LKR 8,500 / mo',
      detail: 'Zero middleman fee • Direct driver settlement',
    },
    footerStat: 'Zero Commission Markups Guaranteed',
    ctaText: 'Check Driver Rates',
    ctaLink: '/drivers',
    image: '/images/fleet-van-wide.jpg',
    imageAlt: 'Comfortable modern school van fleet',
    showcaseBadge: 'Zero Broker Fees',
    showcaseDetails: {
      primaryTitle: 'Direct Driver Agreement',
      subtitle: 'Battaramulla Junction → Colombo 07 Gate',
      ratingOrMetric: 'LKR 8,500 / Month',
      extraTag: 'Instant Seat Lock',
    },
  },
  {
    id: 3,
    stepNum: '03',
    tag: 'LIVE TELEMETRY',
    titlePrefix: 'Track Live Trips ',
    titleHighlight: 'Every Morning',
    titleSuffix: '',
    description:
      "Follow your child's van on an interactive GPS map. Receive automated push updates when your child is picked up and safely inside the school gate.",
    keyPoints: [
      'Sub-second live GPS vehicle location telemetry on map',
      'Automated push updates on child pickup and school gate arrival',
      'Speed monitoring strictly capped to 40 km/h in school corridors',
    ],
    routeBadge: {
      title: 'Live Telemetry',
      badge: '38 km/h • Safe Speed',
      detail: 'Boarded 7:12 AM • ETA School Gate: 8 mins',
    },
    footerStat: 'Sub-second GPS Telemetry & SOS Alerting',
    ctaText: 'Launch Live Demo',
    ctaLink: '/parent/rides/live',
    image: '/images/live-tracking-mockup.jpg',
    imageAlt: 'Live GPS school van tracking interface',
    showcaseBadge: 'Real-Time GPS Active',
    showcaseDetails: {
      primaryTitle: 'Morning School Run #104',
      subtitle: 'Approaching Gateway / Royal College • Safe Corridor',
      ratingOrMetric: '38 km/h • On Schedule',
      extraTag: 'ETA: 8 Mins',
    },
  },
];

const AUTOPLAY_DURATION = 6000; // 6 seconds per slide

export function HowItWorksSlideshow() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const currentSlide = SLIDES[currentIndex];

  const goToSlide = React.useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      setProgress(0);
    },
    [currentIndex]
  );

  const nextSlide = React.useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = React.useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  // Autoplay timer with progress bar
  React.useEffect(() => {
    if (!isPlaying || isHovered) return;

    const intervalTime = 50; // update every 50ms
    const step = (intervalTime / AUTOPLAY_DURATION) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, nextSlide]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Animation variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 240 : -240,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 240 : -240,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <div
      className="w-full space-y-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ======================================================== */}
      {/* 1. TOP STEP NAVIGATION TABS (WITH INTERACTIVE PROGRESS)  */}
      {/* ======================================================== */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 max-w-4xl mx-auto px-2">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              className={`group relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none overflow-hidden ${
                isActive
                  ? 'bg-[#094718] text-white shadow-md shadow-[#094718]/15 border border-[#094718]'
                  : 'bg-white dark:bg-slate-800 text-[#4E6258] dark:text-slate-300 hover:text-[#094718] dark:hover:text-white border border-emerald-950/[0.08] dark:border-slate-700 hover:border-emerald-300'
              }`}
            >
              <span
                className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[11px] sm:text-xs font-black transition-colors ${
                  isActive
                    ? 'bg-[#8CB02C] text-[#094718]'
                    : 'bg-emerald-100 dark:bg-slate-700 text-[#094718] dark:text-emerald-300 group-hover:bg-emerald-200'
                }`}
              >
                {slide.stepNum}
              </span>
              <span>{slide.tag}</span>

              {/* Progress bar inside active pill */}
              {isActive && isPlaying && !isHovered && (
                <span
                  className="absolute bottom-0 left-0 h-1 bg-[#8CB02C] transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN CINEMATIC SLIDESHOW SHOWCASE (INTERACTIVE STAGE) */}
      {/* ======================================================== */}
      <div className="relative rounded-[32px] border border-emerald-950/[0.08] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_12px_44px_rgba(9,71,24,0.06),0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-100/40 dark:bg-emerald-950/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#8CB02C]/10 blur-3xl pointer-events-none" />

        <div className="relative min-h-[520px] lg:min-h-[480px] p-6 sm:p-8 lg:p-12 flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80 || info.velocity.x > 400) {
                  prevSlide();
                } else if (info.offset.x < -80 || info.velocity.x < -400) {
                  nextSlide();
                }
              }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center cursor-grab active:cursor-grabbing"
            >
              {/* LEFT COLUMN: Slide Narrative & Details */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Step Header Badge */}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-xl shadow-md border border-[#22C55E]/40">
                    {currentSlide.stepNum}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-[#EAF6ED] dark:bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-[#D0EAD6] dark:border-emerald-800/60 inline-flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-[#16A34A]" />
                    {currentSlide.tag}
                  </span>
                  <span className="text-xs font-semibold text-[#4E6258] dark:text-slate-400 hidden sm:inline">
                    Step {currentSlide.id} of {SLIDES.length}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B2C22] dark:text-white tracking-tight leading-tight">
                  {currentSlide.titlePrefix}
                  <span className="text-[#8CB02C]">{currentSlide.titleHighlight}</span>
                  {currentSlide.titleSuffix}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300 leading-relaxed font-normal">
                  {currentSlide.description}
                </p>

                {/* Key Points Checklist */}
                <div className="space-y-2.5 pt-1">
                  {currentSlide.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0B2C22] dark:text-slate-200">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Miniature Visual Badge from Reference */}
                <div className="p-4 rounded-2xl bg-[#FAFDF9] dark:bg-slate-800/80 border border-emerald-100 dark:border-slate-700/80 space-y-1.5 shadow-sm max-w-xl">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-[#094718] dark:text-emerald-400">
                      {currentSlide.routeBadge.title}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[11px] font-bold text-emerald-800 dark:text-emerald-200 border border-emerald-200/60">
                      {currentSlide.routeBadge.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#4E6258] dark:text-slate-400">
                    {currentSlide.routeBadge.detail}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link href={currentSlide.ctaLink}>
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer">
                      <span>{currentSlide.ctaText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                  <span className="text-xs font-semibold text-[#094718] dark:text-emerald-400">
                    {currentSlide.footerStat}
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: Rich Visual Illustration Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[460px] rounded-[26px] overflow-hidden border border-emerald-950/[0.09] dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[0_12px_32px_rgba(0,0,0,0.08)] group">
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-emerald-50 dark:bg-slate-850">
                    <Image
                      src={currentSlide.image}
                      alt={currentSlide.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 460px"
                      className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Top floating pill */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-[#094718] dark:text-emerald-400 text-xs font-bold shadow-md border border-emerald-100">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" />
                        {currentSlide.showcaseBadge}
                      </span>
                    </div>

                    {/* Bottom floating badge inside image */}
                    <div className="absolute bottom-3.5 right-3.5">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#094718]/90 text-white backdrop-blur-md text-xs font-bold shadow-md">
                        {currentSlide.showcaseDetails.extraTag}
                      </span>
                    </div>
                  </div>

                  {/* Card bottom details */}
                  <div className="p-5 space-y-2 text-left bg-white dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base sm:text-lg font-bold text-[#0B2C22] dark:text-white leading-snug">
                        {currentSlide.showcaseDetails.primaryTitle}
                      </h4>
                      <span className="text-xs font-extrabold text-[#094718] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                        {currentSlide.showcaseDetails.ratingOrMetric}
                      </span>
                    </div>
                    <p className="text-xs text-[#4E6258] dark:text-slate-300">
                      {currentSlide.showcaseDetails.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* CAROUSEL CONTROLS BAR (PREV/NEXT, DOTS, AUTOPLAY TOGGLE) */}
        {/* ======================================================== */}
        <div className="border-t border-emerald-100/80 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Autoplay & Info */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#094718] dark:text-emerald-300 bg-white dark:bg-slate-800 border border-emerald-200/80 dark:border-slate-700 hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Autoplay</span>
                </>
              )}
            </button>
            <span className="text-xs text-[#4E6258] dark:text-slate-400 hidden sm:inline">
              Swipe or click arrows to explore steps
            </span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  idx === currentIndex
                    ? 'w-8 h-2.5 bg-[#094718] dark:bg-emerald-400'
                    : 'w-2.5 h-2.5 bg-emerald-200 dark:bg-slate-700 hover:bg-emerald-300'
                }`}
              />
            ))}
          </div>

          {/* Prev / Next Circular Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous step"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-emerald-200/80 dark:border-slate-700 text-[#094718] dark:text-emerald-300 hover:bg-[#094718] hover:text-white hover:border-[#094718] transition-all duration-150 shadow-sm cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next step"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-emerald-200/80 dark:border-slate-700 text-[#094718] dark:text-emerald-300 hover:bg-[#094718] hover:text-white hover:border-[#094718] transition-all duration-150 shadow-sm cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden image preloader for instantaneous slide transitions */}
      <div className="hidden" aria-hidden="true">
        {SLIDES.map((s) => (
          <Image key={s.id} src={s.image} alt="" width={10} height={10} priority />
        ))}
      </div>
    </div>
  );
}

