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
  Gauge,
  ChevronLeft,
  ChevronRight,
  Check,
  Info
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

// Google Verified Reviews G-Logo SVG Component
const GoogleReviewIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-label="Google verified review">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

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

  // Parent Reviews Carousel states & controls
  const reviewsCarouselRef = React.useRef<HTMLDivElement>(null);
  const [expandedReviewId, setExpandedReviewId] = React.useState<number | null>(null);
  const [isCarouselHovered, setIsCarouselHovered] = React.useState(false);

  const scrollReviews = (direction: 'left' | 'right') => {
    if (reviewsCarouselRef.current) {
      const scrollAmount = 350;
      reviewsCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Smooth sliding auto-scroll effect (pauses on hover)
  React.useEffect(() => {
    if (isCarouselHovered) return;
    const timer = setInterval(() => {
      if (reviewsCarouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = reviewsCarouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          reviewsCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          reviewsCarouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [isCarouselHovered]);

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
      id: 1,
      name: 'Dr. Anoma Wijesekera',
      initial: 'A',
      avatarBg: 'bg-[#1976D2]',
      school: 'Visakha Vidyalaya, Colombo 05',
      district: 'Nugegoda & Bambalapitiya Route',
      rating: 5,
      date: '3 days ago',
      shortText: 'Having live GPS tracking gave our family total peace of mind every single morning. Our driver Uncle Sunil is punctual, verified, and caring...',
      fullText: 'Having live GPS tracking gave our family total peace of mind every single morning. Our driver Uncle Sunil is punctual, verified, and caring. SchoolRide LK has truly modernized school transportation in Sri Lanka! Highly recommended to every working parent.',
    },
    {
      id: 2,
      name: 'Roshan Samarasinghe',
      initial: 'R',
      avatarBg: 'bg-[#0288D1]',
      school: 'Royal College, Colombo 07',
      district: 'Rajagiriya & Battaramulla Route',
      rating: 5,
      date: '5 days ago',
      shortText: 'Before this platform, finding a reliable van from Rajagiriya was a hassle of phone calls and guesswork. With SchoolRide LK, I inspected the vehicle license...',
      fullText: 'Before this platform, finding a reliable van from Rajagiriya was a hassle of phone calls and guesswork. With SchoolRide LK, I inspected the vehicle license, safety equipment, and parent reviews before booking. Highly recommended.',
    },
    {
      id: 3,
      name: 'Chamari Jayawardena',
      initial: 'C',
      avatarBg: 'bg-[#C2185B]',
      school: "Trinity & Girls' High School",
      district: 'Kandy (Peradeniya Route)',
      rating: 5,
      date: '1 week ago',
      shortText: 'The automated arrival notifications when my daughter reaches the school gate are invaluable. The verification process gives real confidence...',
      fullText: 'The automated arrival notifications when my daughter reaches the school gate are invaluable. The verification process gives real confidence that drivers are vetted, background checked, and accountable.',
    },
    {
      id: 4,
      name: 'Malik Farook',
      initial: 'M',
      avatarBg: 'bg-[#7B1FA2]',
      school: 'Wesley College & Zahira',
      district: 'Dematagoda & Borella Route',
      rating: 5,
      date: '1 week ago',
      shortText: 'Excellent school van service! The seat allocation and route map are totally transparent. Driver Uncle Bandara arrives exactly at 6:40 AM...',
      fullText: 'Excellent school van service! The seat allocation and route map are totally transparent. Driver Uncle Bandara arrives exactly at 6:40 AM and handles school traffic patiently. The monthly billing is completely seamless.',
    },
    {
      id: 5,
      name: 'Nirosha Mendis',
      initial: 'N',
      avatarBg: 'bg-[#E65100]',
      school: 'Musaeus College, Colombo 07',
      district: 'Mount Lavinia & Dehiwala',
      rating: 5,
      date: '2 weeks ago',
      shortText: 'Finding a female-attendant assisted van for my primary grade daughter was our biggest worry. Through SchoolRide LK, we found a certified van in 10 minutes...',
      fullText: 'Finding a female-attendant assisted van for my primary grade daughter was our biggest worry. Through SchoolRide LK, we found a certified van in 10 minutes. Clean AC vehicle and very safe driving.',
    },
    {
      id: 6,
      name: 'Sanjeewa Fernando',
      initial: 'S',
      avatarBg: 'bg-[#00897B]',
      school: "St. Thomas' College, Mount Lavinia",
      district: 'Moratuwa & Ratmalana Route',
      rating: 5,
      date: '3 weeks ago',
      shortText: 'No more waiting by the roadside wondering where the van is. The real-time tracking map updates every few seconds. Best digital school transport service...',
      fullText: 'No more waiting by the roadside wondering where the van is. The real-time tracking map updates every few seconds. Best digital school transport service in Sri Lanka!',
    },
    {
      id: 7,
      name: 'Kavindi Perera',
      initial: 'K',
      avatarBg: 'bg-[#43A047]',
      school: 'Ananda College, Colombo 10',
      district: 'Kaduwela & Malabe Route',
      rating: 5,
      date: '1 month ago',
      shortText: 'Driver verification and vehicle fitness records visible before booking made the decision very easy. Punctual morning pickup and direct school gate drop-off...',
      fullText: 'Driver verification and vehicle fitness records visible before booking made the decision very easy. Punctual morning pickup and direct school gate drop-off without delays. Great experience.',
    },
    {
      id: 8,
      name: 'Dilshan Wickramasinghe',
      initial: 'D',
      avatarBg: 'bg-[#5E35B1]',
      school: "Bishop's College & Ladies' College",
      district: 'Kotte & Nawala Route',
      rating: 5,
      date: '1 month ago',
      shortText: 'Exceptional service quality. Monthly billing and online seat management through the dashboard saved us so much time. Both our kids travel safely...',
      fullText: 'Exceptional service quality. Monthly billing and online seat management through the dashboard saved us so much time. Both our kids travel safely every weekday.',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#FFFFFF] dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 overflow-x-hidden selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* ======================================================== */}
      {/* 0. TOP ANNOUNCEMENT BANNER (MATCHING TEMPLATE TOP BAR)     */}
      {/* ======================================================== */}
      <div className="w-full bg-[#FACC15] text-[#14532D] py-2 px-4 sm:px-8 border-b border-yellow-400/90 z-20">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-2">
            <span className="text-sm">⭐</span>
            <span>Sri Lanka&apos;s Verified School Transport Network — 2026 Morning &amp; After-School Routes Open</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/drivers">
              <button className="px-4 py-1.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 text-xs font-black transition-colors cursor-pointer shadow-sm">
                School Van
              </button>
            </Link>
            <a
              href="tel:+94112345678"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-900/60 text-slate-950 hover:bg-yellow-400 text-xs font-bold transition-colors"
            >
              <Phone className="h-3 w-3" />
              <span>Call (+94) 11 234 5678</span>
            </a>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. HERO SECTION (MATCHING LAPTOP SCREEN TEMPLATE)        */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden w-full bg-[#FFFFFF] dark:bg-slate-950 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 border-b border-slate-200/90 dark:border-slate-800">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          
          {/* Main 2-Column Split-Screen Hero Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8 xl:gap-14">
            
            {/* LEFT COLUMN: Narrative, 4-Line Headline, Trust Squircles, Description, Action Buttons */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-7 text-left"
            >
              {/* Star Eyebrow Tag: [ ☆ SAFE • RELIABLE • ON-TIME SCHOOL RUNS ACROSS SRI LANKA ] */}
              <motion.div variants={badgeVariants} className="inline-block">
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold tracking-wider uppercase text-slate-800 dark:text-slate-200">
                  <Star className="h-4 w-4 text-[#FACC15] fill-[#FACC15]" />
                  <span>Safe • Reliable • On-Time School Runs Across Sri Lanka</span>
                </div>
              </motion.div>

              {/* 4-Line Headline Matching Laptop Screen Exactly */}
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-black tracking-tight text-slate-950 dark:text-white leading-[1.08]">
                  Fast, Reliable, Safe <br />
                  School Van Transport <br />
                  Service For Every <br />
                  Journey
                </h1>
              </motion.div>

              {/* Trust Cluster: 3 Yellow Squircles + Rating Text + Hand-Drawn Golden Arrow */}
              <motion.div variants={itemVariants} className="flex items-center gap-3.5 pt-1 flex-wrap sm:flex-nowrap">
                {/* 3 Yellow Squircle Icons */}
                <div className="flex items-center gap-2">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#FACC15] text-slate-950 shadow-sm border border-yellow-300">
                    <Bus className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#FACC15] text-slate-950 shadow-sm border border-yellow-300">
                    <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#FACC15] text-slate-950 shadow-sm border border-yellow-300">
                    <Navigation className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>
                </div>

                {/* Rating & Review Counter */}
                <div className="flex flex-col justify-center">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    Over 18.5K+ Rides &amp;
                  </span>
                  <span className="text-xs sm:text-sm font-serif italic text-slate-600 dark:text-slate-300 leading-tight">
                    5.0-Star Ratings
                  </span>
                </div>

                {/* Hand-Drawn Golden Arrow Pointing at Vehicle */}
                <div className="hidden sm:flex items-center pl-1 text-[#EAB308]">
                  <svg
                    className="w-14 sm:w-16 h-8 overflow-visible"
                    viewBox="0 0 60 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 22 C 20 24, 38 18, 52 6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M44 4 L 54 6 L 49 14"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Subheading Paragraph */}
              <motion.p
                variants={itemVariants}
                className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed font-normal"
              >
                Sri Lanka&apos;s trusted school transport network since 2020 — daily school pickups, verified drivers, and real-time tracking for peace of mind. Book online in minutes or call and get connected in as little as 10 minutes.
              </motion.p>

              {/* Action Buttons: Call Outline Pill + School Van Solid Yellow Pill */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3.5 pt-2"
              >
                {/* Left Button: Call Hotline Pill (Matching Template Outline Pill) */}
                <a
                  href="tel:+94112345678"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold text-xs sm:text-sm md:text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
                >
                  <Phone className="h-4 w-4 text-slate-900 dark:text-white" />
                  <span>Call (+94) 11 234 5678</span>
                </a>

                {/* Right Button: "School Van" (Solid Yellow Pill #FACC15, replacing "Book Your Ride") */}
                <Link href="/drivers">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2.5 px-8 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <Bus className="h-4 w-4" />
                    <span>School Van</span>
                  </motion.button>
                </Link>
              </motion.div>

            </motion.div>

            {/* RIGHT COLUMN: Layered Architectural Backdrop Rectangle with Overlapping School Van */}
            <motion.div
              variants={visualVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 xl:col-span-6 relative w-full flex items-center justify-center lg:justify-end min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]"
            >
              <div className="relative w-full max-w-[580px] lg:max-w-[640px] h-[360px] sm:h-[440px] lg:h-[480px]">
                
                {/* 1. Architectural Building Backdrop Rectangle (Placed to the right, matching template) */}
                <div className="absolute top-0 right-0 w-[78%] sm:w-[82%] h-[82%] sm:h-[86%] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-100 z-10">
                  <Image
                    src="/images/modern-building-backdrop.jpg"
                    alt="Modern campus and architectural exterior backdrop"
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-cover object-center filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* 2. Foreground School Van Artwork Breaking Out of Frame on the Left */}
                <div className="absolute bottom-0 left-0 w-[96%] sm:w-[98%] h-[82%] sm:h-[86%] z-20 pointer-events-none">
                  <Image
                    src="/images/vango-hero-right-2x.png"
                    alt="SchoolRide LK verified school transport yellow van"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain object-left-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)]"
                  />
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. QUICK ROUTE MATCHER (BLACK BG & WHITE GLASS CARDS)     */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 bg-black text-white border-b border-white/10 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
      {/* JOIN SRI LANKA'S VERIFIED NETWORK (MATCHING CARD TEMPLATE) */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FFFFFF] dark:bg-slate-950 border-b border-slate-200/90 dark:border-slate-800 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          {/* Main Card Template Container */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden shadow-2xl bg-[#FACC15] border border-yellow-300 dark:border-yellow-500/30"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]">
              
              {/* Left Column: Yellow Content Area */}
              <div className="lg:col-span-7 xl:col-span-7 p-8 sm:p-12 lg:p-14 xl:p-16 flex flex-col justify-center space-y-4 sm:space-y-5 text-left relative z-10">
                {/* Eyebrow Tag: [ BOOK YOUR RIDE TODAY ] */}
                <div className="inline-block">
                  <span className="text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-slate-950">
                    BOOK YOUR RIDE TODAY
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight text-slate-950 leading-[1.12]">
                  Ready to give your child a <br className="hidden sm:inline" />
                  <span className="underline decoration-slate-950/20 underline-offset-4">safer, stress-free</span> commute?
                </h2>

                {/* Description Paragraph */}
                <p className="text-sm sm:text-base text-slate-900/90 font-medium leading-relaxed max-w-xl">
                  Connect with verified school van drivers in your neighborhood, view transparent monthly rates, and track morning journeys in real-time.
                </p>

                {/* Action Buttons: Solid Black Pill + Outline Pill + Hotline Call (Previous Functions Preserved) */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  {/* Button 1: Solid Black Pill (Book a School Ride Now) */}
                  <Link href="/drivers">
                    <button className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-black text-xs sm:text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                      <CalendarDays className="h-4 w-4" />
                      <span>Book a School Ride Now</span>
                    </button>
                  </Link>

                  {/* Button 2: Outline Pill (Register as Van Driver) */}
                  <Link href="/register?role=DRIVER">
                    <button className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full border-2 border-slate-950 hover:bg-slate-950 hover:text-white text-slate-950 font-black text-xs sm:text-sm md:text-base transition-all duration-200 cursor-pointer">
                      <Bus className="h-4 w-4" />
                      <span>Register as Van Driver</span>
                    </button>
                  </Link>

                  {/* Button 3: Call Hotline Pill */}
                  <a
                    href="tel:+94112345678"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-slate-950/20 bg-yellow-400/80 hover:bg-yellow-400 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-200"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call (+94) 11 234 5678</span>
                  </a>
                </div>

                {/* Trust Guarantee Badges Checklist */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs sm:text-sm font-black text-slate-950">
                  <span className="flex items-center gap-1.5">✓ 100% Inspected Drivers</span>
                  <span className="flex items-center gap-1.5">✓ Encrypted GPS Telemetry</span>
                  <span className="flex items-center gap-1.5">✓ Zero Booking Surcharges</span>
                </div>
              </div>

              {/* Right Column: Angled Photographic Showcase */}
              <div className="lg:col-span-5 xl:col-span-5 relative w-full h-[260px] sm:h-[320px] lg:h-full min-h-[260px] overflow-hidden">
                {/* Diagonal Slanted Cut on Desktop */}
                <div className="absolute inset-0 lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0%_100%)] w-full h-full bg-slate-900">
                  <Image
                    src="/images/banner-student-window.jpg"
                    alt="Happy student smiling safely from the yellow school van window"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center filter contrast-[1.03]"
                  />
                  {/* Subtle inner shadow gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. LIVE TRUST & STATS MARQUEE (SMOOTH SCROLL ANIMATION)  */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-20 border-b border-slate-200/80 dark:border-slate-800 bg-[#F7FAF7] dark:bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
      {/* 4. HOW TO REQUEST A RIDE & SERVICES (MATCHING TEMPLATE)  */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-[#FFFFFF] dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 border-b border-slate-200/90 dark:border-slate-800 relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          {/* Section Header: Split Layout Matching Template */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 sm:pb-14 text-left">
            <div className="space-y-3.5 max-w-2xl">
              {/* Eyebrow Badge: [ OUR SERVICES ] */}
              <div className="inline-block">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FACC15] text-[#14532D] font-extrabold text-xs uppercase tracking-wider shadow-sm">
                  OUR SERVICES
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                School Van Services Designed For Every Type Of Ride
              </h2>
            </div>

            {/* Right Subtitle Paragraph */}
            <div className="max-w-xl text-left">
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                From daily morning school runs to afternoon sports activities and dedicated term passes, SchoolRide LK connects your family with verified, punctual drivers across Sri Lanka.
              </p>
            </div>
          </div>

          {/* 3-Column Services Card Grid Matching Template Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            
            {/* Card 1: Daily School Commute */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardItemVariants}
              className="group flex flex-col justify-between bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(20,83,45,0.08)] hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                {/* Photo Header */}
                <div className="relative w-full aspect-[16/11] overflow-hidden rounded-t-3xl bg-slate-100">
                  <Image
                    src="/images/service-school-commute.jpg"
                    alt="Daily morning school commute with verified school van"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Overlapping Yellow Squircle Icon (Matching Template) */}
                <div className="-mt-7 ml-6 sm:ml-7 relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FACC15] text-slate-950 shadow-md border-2 border-white dark:border-slate-900 group-hover:rotate-3 transition-transform duration-300">
                  <Bus className="h-6 w-6 stroke-[2.2]" />
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 pt-4 space-y-2.5 text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    Daily School Commute
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    Book a verified daily morning and afternoon school run directly to top schools in Colombo, Kandy, Galle, and Gampaha. Transparent monthly pricing with zero surge fees.
                  </p>
                </div>
              </div>

              {/* Action Button: [ Book Now ] */}
              <div className="p-6 sm:p-7 pt-2 text-left">
                <Link href="/drivers">
                  <button className="inline-flex items-center justify-center px-7 py-2.5 rounded-full border border-slate-900/80 dark:border-white/80 text-slate-900 dark:text-white text-xs sm:text-sm font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors shadow-sm cursor-pointer">
                    Book Now
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Card 2: City & Extracurricular Runs */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardItemVariants}
              className="group flex flex-col justify-between bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(20,83,45,0.08)] hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                {/* Photo Header */}
                <div className="relative w-full aspect-[16/11] overflow-hidden rounded-t-3xl bg-slate-100">
                  <Image
                    src="/images/service-school-route.jpg"
                    alt="After-school and extracurricular city school van rides"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Overlapping Yellow Squircle Icon (Matching Template) */}
                <div className="-mt-7 ml-6 sm:ml-7 relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FACC15] text-slate-950 shadow-md border-2 border-white dark:border-slate-900 group-hover:rotate-3 transition-transform duration-300">
                  <School className="h-6 w-6 stroke-[2.2]" />
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 pt-4 space-y-2.5 text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    City &amp; Activity Rides
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    Need transport for afternoon tuition classes, sports practice, swimming meets, or school tournaments? Connect with vetted local drivers who know every school shortcut.
                  </p>
                </div>
              </div>

              {/* Action Button: [ Book Now ] */}
              <div className="p-6 sm:p-7 pt-2 text-left">
                <Link href="/drivers">
                  <button className="inline-flex items-center justify-center px-7 py-2.5 rounded-full border border-slate-900/80 dark:border-white/80 text-slate-900 dark:text-white text-xs sm:text-sm font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors shadow-sm cursor-pointer">
                    Book Now
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Card 3: Dedicated Term Pass & Child Safety */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardItemVariants}
              className="group flex flex-col justify-between bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(20,83,45,0.08)] hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                {/* Photo Header */}
                <div className="relative w-full aspect-[16/11] overflow-hidden rounded-t-3xl bg-slate-100">
                  <Image
                    src="/images/service-driver-safety.jpg"
                    alt="Dedicated term pass with verified driver and child safety"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Overlapping Yellow Squircle Icon (Matching Template) */}
                <div className="-mt-7 ml-6 sm:ml-7 relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FACC15] text-slate-950 shadow-md border-2 border-white dark:border-slate-900 group-hover:rotate-3 transition-transform duration-300">
                  <ShieldCheck className="h-6 w-6 stroke-[2.2]" />
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 pt-4 space-y-2.5 text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    Dedicated Term Pass
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    For complete peace of mind, reserve a dedicated seat for the school term with automated live GPS tracking, parent gate-arrival notifications, and driver emergency support.
                  </p>
                </div>
              </div>

              {/* Action Button: [ Book Now ] */}
              <div className="p-6 sm:p-7 pt-2 text-left">
                <Link href="/drivers">
                  <button className="inline-flex items-center justify-center px-7 py-2.5 rounded-full border border-slate-900/80 dark:border-white/80 text-slate-900 dark:text-white text-xs sm:text-sm font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors shadow-sm cursor-pointer">
                    Book Now
                  </button>
                </Link>
              </div>
            </motion.div>

          </div>

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
      <section className="py-20 md:py-28 border-b border-white/10 bg-black text-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: App Showcase Visual (Our Custom Subagent Image) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-[32px] overflow-hidden border border-white/[0.16] shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-white/[0.04] backdrop-blur-2xl">
                <div className="relative w-full h-[360px] sm:h-[420px]">
                  <Image
                    src="/images/live-tracking-mockup.jpg"
                    alt="Smartphone tracking app screen with live GPS route"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Interactive Telemetry Overlay Card */}
                <div className="p-5 bg-black/75 backdrop-blur-2xl border-t border-white/[0.14] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live Stream Connected</span>
                    </div>
                    <h4 className="text-base font-extrabold text-white">
                      Royal College Morning Run #04
                    </h4>
                    <p className="text-xs text-white/70">
                      Driver: Sunil Wickramasinghe • WP ND-8422
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center px-3.5 py-1.5 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/15">
                      <span className="block text-[10px] font-bold text-white/60 uppercase">Speed</span>
                      <span className="font-mono text-sm font-black text-[#FACC15]">{simulatedLiveSpeed} km/h</span>
                    </div>
                    <div className="text-center px-3.5 py-1.5 rounded-xl bg-emerald-500/15 backdrop-blur-md border border-emerald-400/30">
                      <span className="block text-[10px] font-bold text-emerald-300 uppercase">ETA Gate</span>
                      <span className="font-mono text-sm font-black text-emerald-300">8 mins</span>
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/30 shadow-sm">
                <Navigation className="h-4 w-4 text-[#16A34A]" />
                <span>Live GPS Telemetry</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Never wonder where <br />
                <span className="text-[#16A34A]">the school van</span> is.
              </h2>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed font-normal">
                Gone are the days of standing outside in rain or sun wondering if the school van has already passed. The SchoolRide LK parent portal streams real-time GPS coordinates directly to your mobile screen.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.14] hover:border-white/30 hover:bg-white/[0.1] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Precision Doorstep ETA Countdown</h4>
                    <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                      Get a 10-minute and 2-minute proximity chime before the van pulls up to your gate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.14] hover:border-white/30 hover:bg-white/[0.1] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Safe Speed Limit Monitoring</h4>
                    <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                      Automated telemetry logs van speed continuously to guarantee drivers adhere to school zone limits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.14] hover:border-white/30 hover:bg-white/[0.1] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct One-Touch Driver Hotline</h4>
                    <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                      Call or send quick sick-leave notices directly through the parent dashboard with a single tap.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/parent/rides/live">
                  <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer">
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
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left"
          >
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
          </motion.div>

          {/* School Cards Grid (Showing strictly 3 primary cards + dropdown for remaining) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
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
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. FEATURED FLEET & VERIFIED DRIVERS (PORTRAIT PHOTO)    */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 border-b border-white/10 bg-black text-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left"
          >
            <div className="space-y-3 max-w-2xl">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/30 shadow-sm">
                Verified School Fleet
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Meet Sri Lanka's <span className="text-[#16A34A]">Most Trusted Drivers</span>
              </h2>
              <p className="text-sm sm:text-base text-white/70">
                Vetted professionals with stellar safety records, licensed passenger vehicles, and genuine parental endorsements.
              </p>
            </div>

            <Link href="/drivers">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md font-bold text-xs sm:text-sm transition-colors cursor-pointer">
                <span>View Full Driver Roster</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </motion.div>

          {/* Featured Showcase: 1 Spotlight with Photo + 2 Companion Driver Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Spotlight Card with Generated Driver Portrait */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 rounded-[28px] overflow-hidden border border-white/[0.16] shadow-[0_16px_50px_rgba(0,0,0,0.6)] bg-white/[0.06] backdrop-blur-xl flex flex-col justify-between hover:border-white/30 transition-all"
            >
              <div className="relative w-full h-[280px] sm:h-[320px]">
                <Image
                  src="/images/verified-driver-portrait.jpg"
                  alt="Verified Sri Lankan school van driver Uncle Sunil"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#16A34A]" /> Top Rated Driver
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">
                      Sunil Wickramasinghe
                    </h3>
                    <p className="text-xs text-white/70">
                      14 Years Safe Commute • Colombo Routes
                    </p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400/15 backdrop-blur-md border border-amber-400/30 text-amber-300 font-bold text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                    <span>4.98</span>
                    <span className="text-xs text-amber-200/80">(142)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/[0.12]">
                    <span className="text-[10px] uppercase font-bold text-white/60 block">Vehicle</span>
                    <span className="text-xs font-bold text-white">Toyota HiAce GL (14-Seat AC)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/[0.12]">
                    <span className="text-[10px] uppercase font-bold text-white/60 block">Monthly Rate</span>
                    <span className="text-xs font-black text-[#FACC15]">LKR 8,500 / month</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold text-emerald-300">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 backdrop-blur-md border border-emerald-400/30">✓ Police Clearance</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 backdrop-blur-md border border-emerald-400/30">✓ Revenue License 2026</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 backdrop-blur-md border border-emerald-400/30">✓ GPS Live Telemetry</span>
                </div>

                <div className="pt-2">
                  <Link href="/drivers">
                    <button className="w-full py-3.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-sm shadow-md hover:shadow-lg transition-all cursor-pointer">
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
                  className="p-6 sm:p-7 rounded-[26px] bg-white/[0.06] backdrop-blur-xl border border-white/[0.16] hover:border-white/30 hover:bg-white/[0.09] shadow-[0_12px_36px_rgba(0,0,0,0.4)] space-y-4 text-left transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-extrabold text-white">
                          {driver.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-white/70">
                        {driver.experience} • {driver.district}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/15 backdrop-blur-md border border-amber-400/30 text-amber-300 font-bold text-xs">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                      <span>{driver.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-white/60 block text-[11px]">Vehicle:</span>
                      <span className="font-bold text-white">{driver.vehicle}</span>
                    </div>
                    <div>
                      <span className="text-white/60 block text-[11px]">Plate:</span>
                      <span className="font-mono font-bold text-white">{driver.plate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="font-black text-sm text-[#FACC15]">{driver.fee} / month</span>
                    <Link href="/drivers">
                      <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md text-xs font-bold transition-colors cursor-pointer">
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
      {/* 9. PARENT REVIEWS & TESTIMONIALS (TEMPLATE MATCHED)      */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-10">
          
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionFadeUp}
            className="max-w-2xl mx-auto text-center space-y-3"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold border border-emerald-200">
              Parent Community Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2937] dark:text-white tracking-tight">
              Loved by <span className="text-[#16A34A]">Sri Lankan Families</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300">
              Read how SchoolRide LK brings daily peace of mind to working parents across Colombo, Kandy, and Gampaha.
            </p>
          </motion.div>

          {/* Top Dark Banner: "Ready To Book Your Next Ride?" */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={sectionFadeUp}
            className="relative w-full rounded-2xl md:rounded-[28px] bg-[#0A1117] text-white overflow-hidden shadow-2xl border border-slate-800/80"
          >
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between min-h-[140px] md:min-h-[160px] px-6 sm:px-10 md:px-14 py-8 md:py-6 gap-6">
              <div className="space-y-1.5 max-w-xl">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  Ready To Book Your Next Ride?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Verified drivers, live GPS tracking, and guaranteed student seating across Sri Lanka.
                </p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <Link href="/drivers">
                  <button className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/50 hover:border-white bg-transparent hover:bg-white text-white hover:text-black text-sm md:text-base font-bold transition-all duration-200 shadow-md group cursor-pointer">
                    <span>Book Your Ride</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>

            {/* School Van Vehicle graphic on the right edge */}
            <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[42%] md:w-[38%] pointer-events-none select-none">
              <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#0A1117] via-[#0A1117]/85 to-transparent z-10" />
              <div className="relative w-full h-full">
                <Image
                  src="/images/banner-school-van-dark.jpg"
                  alt="SchoolRide LK Yellow School Van"
                  fill
                  className="object-cover object-left md:object-center transform translate-x-4 md:translate-x-6 scale-105"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Smooth Sliding Reviews Carousel */}
          <div
            className="relative group/carousel pt-2"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            {/* Navigation Chevron Left */}
            <button
              type="button"
              onClick={() => scrollReviews('left')}
              aria-label="Previous reviews"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.12)] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Navigation Chevron Right */}
            <button
              type="button"
              onClick={() => scrollReviews('right')}
              aria-label="Next reviews"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.12)] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Sliding cards track */}
            <div
              ref={reviewsCarouselRef}
              className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth py-3 px-1 no-scrollbar select-none"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {testimonials.map((t) => {
                const isExpanded = expandedReviewId === t.id;
                return (
                  <div
                    key={t.id}
                    style={{ scrollSnapAlign: 'start' }}
                    className="min-w-[280px] sm:min-w-[320px] max-w-[340px] flex-shrink-0 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
                  >
                    {/* Micro-dot pattern matching template */}
                    <div
                      className="absolute inset-0 opacity-[0.4] pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(#94a3b8 1.1px, transparent 1.1px)',
                        backgroundSize: '14px 14px',
                      }}
                    />

                    <div className="relative z-10 space-y-3.5">
                      {/* Card Top: Avatar, Name & Google G Logo */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 rounded-full ${t.avatarBg} text-white font-black text-sm flex items-center justify-center shadow-xs flex-shrink-0`}>
                            {t.initial}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                              {t.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {t.school}
                            </p>
                          </div>
                        </div>

                        {/* Official Google G Logo */}
                        <GoogleReviewIcon />
                      </div>

                      {/* 5 Yellow Stars + Blue Verified Check Badge */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5 text-[#FACC15]">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
                          ))}
                        </div>
                        <span
                          className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#1A73E8] text-white flex-shrink-0 shadow-xs"
                          title="Verified Google Review"
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                        </span>
                      </div>

                      {/* Review Text */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {isExpanded ? t.fullText : t.shortText}
                      </p>
                    </div>

                    {/* Footer: Read more & Date */}
                    <div className="relative z-10 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setExpandedReviewId(isExpanded ? null : t.id)}
                        className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white font-semibold cursor-pointer transition-colors"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {t.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Verified by Trustindex badge */}
            <div className="flex justify-end pt-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#00875A] text-white text-xs font-bold shadow-sm tracking-wide">
                <span>Verified by Trustindex</span>
                <Info className="w-3.5 h-3.5 opacity-80" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. FREQUENTLY ASKED QUESTIONS (FRAMER MOTION ACCORDION) */}
      {/* ======================================================== */}
      <section id="faq" className="py-20 md:py-28 border-b border-white/10 bg-black text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 text-center space-y-12 relative z-10">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionFadeUp}
            className="space-y-3"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/30 shadow-sm">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Frequently Asked <span className="text-[#16A34A]">Questions</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto">
              Everything you need to know about safety standards, vehicle checks, and monthly seat bookings.
            </p>
          </motion.div>

          <div className="space-y-3.5 text-left">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[22px] border border-white/[0.14] bg-white/[0.06] backdrop-blur-xl hover:border-white/30 hover:bg-white/[0.09] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-[#FACC15] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#FACC15] transition-transform duration-200 ${
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
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-white/80 leading-relaxed border-t border-white/10 pt-4 font-normal">
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

    </div>
  );
}
