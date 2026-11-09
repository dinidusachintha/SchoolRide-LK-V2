'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  User,
  ShieldCheck,
  Car,
  CheckCircle2,
  Bell
} from 'lucide-react';

interface HowToStep {
  id: number;
  image: string;
  imageAlt: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  detailTag?: string;
}

const PAGE_1_STEPS: HowToStep[] = [
  {
    id: 1,
    image: '/images/verified-driver-portrait.jpg',
    imageAlt: 'Verified school van driver credentials check',
    icon: User,
    title: 'Discover Verified Van Drivers',
    description:
      "Select your child's school and district. View verified NIC identity, commercial driving credentials, vehicle capacity, and genuine reviews from fellow parents.",
    detailTag: '48+ Schools Mapped across Sri Lanka',
  },
  {
    id: 2,
    image: '/images/fleet-van-wide.jpg',
    imageAlt: 'Confirm monthly seat in LKR directly with driver',
    icon: Car,
    title: 'Confirm Monthly Seat in LKR',
    description:
      'Provide your private pickup and dropoff locations. The driver confirms seat availability, route compatibility, and agreed monthly fees in Sri Lankan Rupees.',
    detailTag: 'Zero Commission Markups Guaranteed',
  },
  {
    id: 3,
    image: '/images/live-tracking-mockup.jpg',
    imageAlt: 'Parent tracking school van live every morning',
    icon: MapPin,
    title: 'Track Live Trips Every Morning',
    description:
      "Follow your child's van on an interactive GPS map. Receive automated push updates when your child is picked up and safely inside the school gate.",
    detailTag: 'Sub-second GPS Telemetry & SOS Alerting',
  },
];

const PAGE_2_STEPS: HowToStep[] = [
  {
    id: 4,
    image: '/images/safety-parent-child.jpg',
    imageAlt: 'Parent meeting driver and verifying school van',
    icon: ShieldCheck,
    title: 'Meet Your Driver in Person',
    description:
      "Inspect the driver's vehicle in person, check safety gear and seatbelts, and confirm your morning pickup time before the term starts.",
    detailTag: '100% Police & Document Cleared',
  },
  {
    id: 5,
    image: '/images/van-vehicle-focus.jpg',
    imageAlt: 'School van driver route and agreement',
    icon: CheckCircle2,
    title: 'Direct Monthly Driver Settlement',
    description:
      'Agreed monthly rates in Sri Lankan Rupees settled directly with the van owner with zero middleman or broker cuts.',
    detailTag: 'Direct LKR Settlement to Driver',
  },
  {
    id: 6,
    image: '/images/vango-hero-split-right.jpg',
    imageAlt: 'Children arriving safely at school gate',
    icon: Bell,
    title: 'Instant Gate Arrival Notifications',
    description:
      'Receive instant alerts when the school van approaches your doorstep and safely discharges students inside school gates.',
    detailTag: 'Automated Morning & Afternoon Alerts',
  },
];

export function HowItWorksSlideshow() {
  const [currentPage, setCurrentPage] = React.useState<1 | 2>(1);
  const [direction, setDirection] = React.useState<number>(1);

  const nextPage = () => {
    if (currentPage < 2) {
      setDirection(1);
      setCurrentPage(2);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setDirection(-1);
      setCurrentPage(1);
    }
  };

  const currentSteps = currentPage === 1 ? PAGE_1_STEPS : PAGE_2_STEPS;

  return (
    <div className="w-full space-y-10 sm:space-y-12 select-none">
      {/* Left-Aligned Headline directly matching reference image */}
      <div className="text-left space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF6ED] text-[#14532D] text-xs font-bold border border-[#BCE6C9]">
          <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
          <span>SIMPLE 3-STEP JOURNEY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-white tracking-tight leading-tight">
          How to request a ride
        </h2>
      </div>

      {/* 3 Step Cards Carousel / Grid */}
      <div className="relative overflow-hidden min-h-[420px] sm:min-h-[440px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start"
          >
            {currentSteps.map((step) => {
              const IconComponent = step.icon;

              return (
                <div key={step.id} className="group flex flex-col text-left">
                  {/* Top Photographic Card with rounded corners */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Overlapping White Square Icon Badge */}
                  <div className="-mt-7 ml-5 relative z-10 w-14 h-14 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-black shrink-0 transition-transform duration-200 group-hover:scale-105">
                    <IconComponent className="h-6 w-6 stroke-[2.2] text-black" />
                  </div>

                  {/* Step Title & Concise Important Details */}
                  <div className="pt-3 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      {step.description}
                    </p>
                    {step.detailTag && (
                      <div className="pt-1">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-emerald-400">
                          <span>✓</span>
                          <span>{step.detailTag}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Right Carousel Controls: 1/2 [ < ] [ > ] */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <span className="text-sm font-semibold text-slate-400 mr-2">
          {currentPage}/2
        </span>

        {/* Previous Button */}
        <button
          type="button"
          onClick={prevPage}
          disabled={currentPage === 1}
          aria-label="Previous step page"
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-all cursor-pointer ${
            currentPage === 1
              ? 'bg-slate-900/90 text-slate-600 border border-slate-800 cursor-not-allowed opacity-60'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-sm active:scale-95'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextPage}
          disabled={currentPage === 2}
          aria-label="Next step page"
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-all cursor-pointer ${
            currentPage === 2
              ? 'bg-slate-900/90 text-slate-600 border border-slate-800 cursor-not-allowed opacity-60'
              : 'bg-white hover:bg-slate-200 text-black shadow-md active:scale-95'
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
