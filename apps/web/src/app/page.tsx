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

// Animated Stat Counter Component
function StatCounter({
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1800,
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out expo curve for satisfying deceleration
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentVal = easeOut * target;
            setCount(currentVal);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [target, duration, hasAnimated]);

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {hasAnimated ? formatted : '0'}
      <span className="text-[#FACC15]">{suffix}</span>
    </span>
  );
}

export default function HomePage() {
  // Hero Section Highlighted Functions & Mode Switcher
  const [activeHeroTab, setActiveHeroTab] = React.useState<'matcher' | 'telemetry' | 'safety'>('matcher');
  const [heroPickupLocation, setHeroPickupLocation] = React.useState('');
  const [heroDropoffSchool, setHeroDropoffSchool] = React.useState('');
  const [heroSchedule, setHeroSchedule] = React.useState('Morning School Run (6:30 AM - 7:30 AM)');
  const [isHeroScheduleOpen, setIsHeroScheduleOpen] = React.useState(false);
  const [isHeroDistrictOpen, setIsHeroDistrictOpen] = React.useState(false);
  const [isHeroSchoolSuggestionsOpen, setIsHeroSchoolSuggestionsOpen] = React.useState(false);
  const [heroPriceEstimate, setHeroPriceEstimate] = React.useState<{
    pickup: string;
    dropoff: string;
    vanCount: number;
    monthlyRate: string;
    eta: string;
  } | null>({
    pickup: 'Malabe Junction, Battaramulla',
    dropoff: 'Royal College, Colombo 07',
    vanCount: 14,
    monthlyRate: 'LKR 8,500 / mo',
    eta: '25 min morning school run',
  });

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
      {/* 1. HERO SECTION: FULL SCHOOLING THEME WITH BLACK FADE     */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden w-full min-h-[660px] lg:min-h-[740px] bg-slate-950 text-white pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 border-b border-white/10">
        
        {/* Full-Bleed Schooling Theme Image Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-school-full-bg.jpg"
            alt="SchoolRide LK Safe School Commuter Van with Sri Lankan Students"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:object-[80%_center] filter contrast-[1.08] brightness-[0.95]"
          />

          {/* Cinematic Black Color Fade Vignettes */}
          {/* Horizontal Fade: Deep black on the left for maximum text & interactive card contrast, smooth fade to the right revealing the school van and students */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 via-50% to-black/40 sm:to-black/30" />

          {/* Vertical Fade: Gentle transition from navbar at top, deep seamless fade into next section at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent via-55% to-black/80 pointer-events-none" />

          {/* Luxury Ambient Glows */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-[#FACC15]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">

          {/* Highlighted Function Mode Switcher Pills */}
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 mb-6 sm:mb-8 overflow-x-auto no-scrollbar pb-1"
          >
            <button
              onClick={() => setActiveHeroTab('matcher')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeHeroTab === 'matcher'
                  ? 'bg-[#FACC15] text-slate-950 shadow-lg shadow-yellow-500/25 ring-2 ring-yellow-400/50'
                  : 'bg-black/60 hover:bg-black/80 text-white/90 border border-white/15 backdrop-blur-md'
              }`}
            >
              <Search className="h-4 w-4" />
              <span>1. Find School Van &amp; Route</span>
            </button>

            <button
              onClick={() => setActiveHeroTab('telemetry')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeHeroTab === 'telemetry'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                  : 'bg-black/60 hover:bg-black/80 text-white/90 border border-white/15 backdrop-blur-md'
              }`}
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>2. Live GPS Telemetry</span>
            </button>

            <button
              onClick={() => setActiveHeroTab('safety')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeHeroTab === 'safety'
                  ? 'bg-white text-slate-950 shadow-lg shadow-white/20 ring-2 ring-white/50'
                  : 'bg-black/60 hover:bg-black/80 text-white/90 border border-white/15 backdrop-blur-md'
              }`}
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>3. Safety &amp; Attendant Standard</span>
            </button>
          </motion.div>

          {/* Main 2-Column Split: Left Narrative & Core Functions, Right Interactive Command Center */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10 xl:gap-14">
            
            {/* LEFT COLUMN: Narrative, Headline, 4 Core Function Cards, Action Buttons */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 xl:col-span-7 space-y-5 sm:space-y-6 text-left"
            >
              {/* Star Eyebrow Tag: [ ☆ SAFE • RELIABLE • ON-TIME SCHOOL RUNS ACROSS SRI LANKA ] */}
              <motion.div variants={badgeVariants} className="inline-block">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white shadow-sm">
                  <Star className="h-4 w-4 text-[#FACC15] fill-[#FACC15]" />
                  <span>Safe • Reliable • On-Time School Runs Across Sri Lanka</span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-black tracking-tight text-white leading-[1.08]">
                  Safe, Smart &amp; Reliable <br />
                  <span className="text-[#FACC15]">School Transport</span> <br />
                  For Every Journey.
                </h1>
              </motion.div>

              {/* Subheading Paragraph */}
              <motion.p
                variants={itemVariants}
                className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl leading-relaxed font-normal"
              >
                Connect with NTCA-licensed school van operators across Sri Lanka. Real-time GPS ride tracking, verified female child attendants, and automated parent arrival alerts for complete peace of mind.
              </motion.p>

              {/* 4 HIGHLIGHTED FUNCTIONS (2x2 Glass Feature Grid) */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl pt-1">
                {/* Function 1: Police & NTCA Cleared */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/15 hover:border-[#FACC15]/40 transition-all group">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                      <ShieldCheck className="h-4 w-4 stroke-[2.2]" />
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-white">NTCA &amp; Police Cleared</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    100% verified credentials, clean criminal history &amp; van fitness inspection.
                  </p>
                </div>

                {/* Function 2: Live GPS Telemetry */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/15 hover:border-emerald-400/40 transition-all group">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                      <Navigation className="h-4 w-4 stroke-[2.2]" />
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-white">Live GPS &amp; ETA Alerts</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Automated WhatsApp / SMS alerts sent 500m before door-to-door arrival.
                  </p>
                </div>

                {/* Function 3: Supervised Child Attendant */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/15 hover:border-[#FACC15]/40 transition-all group">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-yellow-500/20 text-[#FACC15] border border-yellow-500/30 shrink-0">
                      <UserCheck className="h-4 w-4 stroke-[2.2]" />
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-white">Female Matron Onboard</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Supervised boarding, seatbelt verification &amp; primary school student care.
                  </p>
                </div>

                {/* Function 4: Digital Guaranteed Term Pass */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/15 hover:border-emerald-400/40 transition-all group">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                      <CalendarDays className="h-4 w-4 stroke-[2.2]" />
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-white">Guaranteed Seat Pass</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Permanent reserved seating with transparent monthly digital billing.
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons: Find School Van + Live Demo + Hotline */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3.5 pt-2"
              >
                {/* Primary Button: Find My School Van */}
                <Link href="/drivers">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm md:text-base shadow-lg shadow-yellow-500/25 transition-all duration-200 cursor-pointer"
                  >
                    <Bus className="h-4 w-4" />
                    <span>Find My School Van</span>
                  </motion.button>
                </Link>

                {/* Secondary Button: Live Demo Tracker */}
                <Link href="/parent/rides/live">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm md:text-base backdrop-blur-md transition-colors shadow-sm cursor-pointer"
                  >
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Live Ride Demo</span>
                  </motion.button>
                </Link>

                {/* Call Hotline */}
                <a
                  href="tel:+94112345678"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  <Phone className="h-4 w-4 text-[#FACC15]" />
                  <span>Call (+94) 11 234 5678</span>
                </a>
              </motion.div>

            </motion.div>

            {/* RIGHT COLUMN: Interactive Function Command Center */}
            <motion.div
              variants={visualVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5 xl:col-span-5 relative w-full"
            >
              {/* Card Container with Deep Glassmorphism & Neon Borders */}
              <div className="relative w-full rounded-[28px] sm:rounded-[32px] bg-slate-900/85 backdrop-blur-2xl border border-white/20 p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] text-white">

                {/* TAB 1: Quick Route & Price Calculator */}
                {activeHeroTab === 'matcher' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                          Instant Route &amp; Price Finder
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                        14 Vans Live
                      </span>
                    </div>

                    {/* Pickup Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span>Pickup Location / Junction</span>
                        <button
                          type="button"
                          onClick={handleUseCurrentLocation}
                          className="text-[#FACC15] hover:underline text-[11px] font-semibold cursor-pointer flex items-center gap-1"
                        >
                          <Navigation className="h-3 w-3" />
                          <span>Use My Location</span>
                        </button>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FACC15]" />
                        <input
                          type="text"
                          value={heroPickupLocation}
                          onChange={(e) => setHeroPickupLocation(e.target.value)}
                          placeholder="e.g. Malabe Junction, Battaramulla"
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] transition-all"
                        />
                      </div>
                    </div>

                    {/* Dropoff School Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span>School Destination</span>
                        <span className="text-slate-400 text-[11px]">Colombo &amp; Suburbs</span>
                      </label>
                      <div className="relative">
                        <School className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
                        <input
                          type="text"
                          value={heroDropoffSchool}
                          onChange={(e) => setHeroDropoffSchool(e.target.value)}
                          placeholder="e.g. Royal College, Colombo 07"
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                        />
                      </div>

                      {/* Quick School Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['Royal College', 'Visakha Vidyalaya', 'Ananda College', 'Musaeus College'].map((school) => (
                          <button
                            key={school}
                            type="button"
                            onClick={() => setHeroDropoffSchool(`${school}, Colombo`)}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-medium transition-colors cursor-pointer"
                          >
                            {school.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Commute Run Type Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Run Schedule</label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <select
                          value={heroSchedule}
                          onChange={(e) => setHeroSchedule(e.target.value)}
                          className="w-full pl-10 pr-8 py-2.5 sm:py-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#FACC15] appearance-none cursor-pointer"
                        >
                          <option value="Morning School Run (6:30 AM - 7:30 AM)" className="bg-slate-900 text-white">
                            Morning School Run (6:30 AM - 7:30 AM)
                          </option>
                          <option value="Afternoon Drop-Off (1:30 PM - 2:30 PM)" className="bg-slate-900 text-white">
                            Afternoon Drop-Off (1:30 PM - 2:30 PM)
                          </option>
                          <option value="Full Day Return Pass (Both Ways)" className="bg-slate-900 text-white">
                            Full Day Return Pass (Both Ways)
                          </option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      type="button"
                      onClick={handleSeePrices}
                      className="w-full py-3 sm:py-3.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <Search className="h-4 w-4" />
                      <span>Check Available Vans &amp; Fares</span>
                    </button>

                    {/* Instant Result Box */}
                    {heroPriceEstimate && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4" />
                            {heroPriceEstimate.vanCount} Verified Vans Available
                          </span>
                          <span className="text-sm font-black text-[#FACC15]">
                            {heroPriceEstimate.monthlyRate}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          {heroPriceEstimate.eta} • Direct door-to-door commute
                        </p>
                        <Link href="/drivers">
                          <button className="w-full mt-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                            <span>View Matching Drivers &amp; Book</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: Live GPS Telemetry Broadcast */}
                {activeHeroTab === 'telemetry' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                          Live Fleet Telemetry Broadcast
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                        GPS Active
                      </span>
                    </div>

                    {/* Vehicle & Driver Card */}
                    <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center gap-3.5">
                      <div className="h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                        <Bus className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-extrabold text-white truncate">Toyota HiAce Super GL</h4>
                          <span className="text-[11px] font-mono text-[#FACC15] font-bold">WP ND-8842</span>
                        </div>
                        <p className="text-xs text-slate-400">Driver: Uncle Sunil Perera • 12 Yrs Clean Record</p>
                      </div>
                    </div>

                    {/* Live Speed & Next Stop Telemetry */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Live Speed</span>
                        <div className="text-2xl font-black text-white pt-1">
                          {simulatedLiveSpeed} <span className="text-xs font-normal text-slate-400">km/h</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold">● Within 40 km/h School Limit</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Next Stop ETA</span>
                        <div className="text-2xl font-black text-[#FACC15] pt-1">
                          6 <span className="text-xs font-normal text-slate-400">mins</span>
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium">Vajira Road Junction</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 p-3 rounded-xl bg-black/50 border border-white/10">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-300">Morning Commute Progress</span>
                        <span className="text-emerald-400">4 of 8 Pickups Complete</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-1/2 transition-all duration-500" />
                      </div>
                    </div>

                    <Link href="/parent/rides/live">
                      <button className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
                        <Navigation className="h-4 w-4" />
                        <span>Launch Full-Screen GPS Live Tracker</span>
                      </button>
                    </Link>
                  </div>
                )}

                {/* TAB 3: Safety Standards & Attendant Verification */}
                {activeHeroTab === 'safety' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                          4-Tier Safety Verification
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                        100% Verified
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { title: 'Police Criminal Record Clearance', desc: 'Renewed annually with local police station clearance.' },
                        { title: 'NTCA Passenger Permit #SR-7821', desc: 'Valid passenger carriage license & school route rights.' },
                        { title: 'Vehicle Fitness & Dual A/C Check', desc: 'Dual air conditioning, fire extinguisher & child first-aid.' },
                        { title: 'Supervised Female Child Matron', desc: 'Assists children boarding and ensures seatbelt discipline.' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-start gap-3">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-xs font-bold text-white">{item.title}</h5>
                            <p className="text-[11px] text-slate-400">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link href="/safety">
                      <button className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-1">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        <span>Read Complete Safety Protocol</span>
                      </button>
                    </Link>
                  </div>
                )}

              </div>
            </motion.div>

          </div>

          {/* Bottom Quick Metrics Strip */}
          <motion.div
            variants={cardsContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-10 sm:pt-12 border-t border-white/10 mt-10 sm:mt-12"
          >
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[#FACC15] block">18,500+</span>
              <span className="text-xs text-slate-300 font-medium">Students Commuted Daily</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-400 block">450+</span>
              <span className="text-xs text-slate-300 font-medium">Verified School Vans</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white block">99.8%</span>
              <span className="text-xs text-slate-300 font-medium">On-Time Arrival Record</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[#FACC15]">4.95</span>
                <div className="flex text-[#FACC15]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <span className="text-xs text-slate-300 font-medium">Verified Parent Ratings</span>
            </div>
          </motion.div>

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
      {/* 3. LIVE TRUST & STATS MARQUEE (COMPACT & SLEEK)          */}
      {/* ======================================================== */}
      <section className="py-7 sm:py-9 border-b border-white/10 bg-black text-white relative overflow-hidden">
        {/* Ambient Subtle Glow Behind Metrics */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[140px] bg-yellow-500/[0.06] blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[140px] bg-emerald-500/[0.04] blur-[90px] rounded-full pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center"
          >
            {/* Stat 1 */}
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="py-3.5 px-3 sm:py-4 sm:px-4 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#FACC15]/40 hover:bg-white/[0.07] transition-all duration-300 flex flex-col items-center justify-center space-y-1 group shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FACC15] group-hover:bg-[#FACC15]/15 transition-all">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                <StatCounter target={250} suffix="+" />
              </span>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                Verified Van Operators
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="py-3.5 px-3 sm:py-4 sm:px-4 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#FACC15]/40 hover:bg-white/[0.07] transition-all duration-300 flex flex-col items-center justify-center space-y-1 group shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FACC15] group-hover:bg-[#FACC15]/15 transition-all">
                <Bus className="w-3.5 h-3.5" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                <StatCounter target={18500} suffix="+" />
              </span>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                Safe Morning Trips
              </p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="py-3.5 px-3 sm:py-4 sm:px-4 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#FACC15]/40 hover:bg-white/[0.07] transition-all duration-300 flex flex-col items-center justify-center space-y-1 group shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FACC15] group-hover:bg-[#FACC15]/15 transition-all">
                <School className="w-3.5 h-3.5" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                <StatCounter target={48} suffix="+" />
              </span>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                Premier Schools Covered
              </p>
            </motion.div>

            {/* Stat 4 */}
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="py-3.5 px-3 sm:py-4 sm:px-4 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#FACC15]/40 hover:bg-white/[0.07] transition-all duration-300 flex flex-col items-center justify-center space-y-1 group shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FACC15] group-hover:bg-[#FACC15]/15 transition-all">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                <StatCounter target={99.8} decimals={1} suffix="%" />
              </span>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                On-Time School Arrivals
              </p>
            </motion.div>
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
        {/* About Anchor for Navigation */}
        <div id="about" className="absolute -top-20" />
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF08A] text-[#713F12] border border-yellow-300 dark:bg-amber-950/70 dark:text-[#FDE047] dark:border-yellow-600/40 text-xs font-bold shadow-xs">
                <ShieldCheck className="h-4 w-4 text-[#CA8A04] dark:text-[#FACC15]" />
                <span>5-Tier Safety &amp; Verification Charter</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2937] dark:text-white tracking-tight">
                Trust earned through <span className="text-[#CA8A04] dark:text-[#FACC15] underline decoration-[#FACC15]/40 underline-offset-8">rigorous inspection</span>.
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
                      ? 'bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 text-[#4B5563] dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-yellow-400'
                  }`}
                >
                  1. Driver Background
                </button>
                <button
                  onClick={() => setActiveSafetyTab('vehicle')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSafetyTab === 'vehicle'
                      ? 'bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 text-[#4B5563] dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-yellow-400'
                  }`}
                >
                  2. Vehicle Roadworthiness
                </button>
                <button
                  onClick={() => setActiveSafetyTab('telemetry')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSafetyTab === 'telemetry'
                      ? 'bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 text-[#4B5563] dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-yellow-400'
                  }`}
                >
                  3. Speed &amp; Telemetry
                </button>
                <button
                  onClick={() => setActiveSafetyTab('attendance')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSafetyTab === 'attendance'
                      ? 'bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 text-[#4B5563] dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-yellow-400'
                  }`}
                >
                  4. Attendance Alerts
                </button>
              </div>

              {/* Tab Content Box */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-yellow-500/20 shadow-sm space-y-3">
                {activeSafetyTab === 'driver' && (
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#1F2937] dark:text-white flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-[#CA8A04] dark:text-[#FACC15]" /> Police Records &amp; NIC Identity Verification
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed">
                      Every driver submits their government National Identity Card (NIC) and Heavy Passenger Commercial Driver&apos;s License. Our team cross-references background credentials and previous passenger transport experience before granting approved status.
                    </p>
                  </div>
                )}
                {activeSafetyTab === 'vehicle' && (
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#1F2937] dark:text-white flex items-center gap-2">
                      <Car className="h-5 w-5 text-[#CA8A04] dark:text-[#FACC15]" /> Annual Revenue License &amp; Passenger Insurance
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed">
                      All vans are required to maintain active Provincial Revenue Licenses and valid commercial passenger liability insurance. Vans must be equipped with working seatbelts, first aid kits, and emergency door releases.
                    </p>
                  </div>
                )}
                {activeSafetyTab === 'telemetry' && (
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#1F2937] dark:text-white flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-[#CA8A04] dark:text-[#FACC15]" /> Live GPS Tracking &amp; Strict Speed Limiter Telemetry
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed">
                      School vans stream live speed and location coordinates directly to parents. The system automatically triggers warnings if speeds exceed 45 km/h in school safety corridors or if sudden route deviations occur.
                    </p>
                  </div>
                )}
                {activeSafetyTab === 'attendance' && (
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#1F2937] dark:text-white flex items-center gap-2">
                      <Bell className="h-5 w-5 text-[#CA8A04] dark:text-[#FACC15]" /> Instant Doorstep Pickup &amp; School Gate Chimes
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed">
                      Parents receive an instant notification when the van arrives at their gate, when the student boards, and the moment the van stops safely at the school entrance.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <Link href="/safety">
                  <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer">
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
              {/* Primary Photo Showcase: 5-Tier Safety & Verification Charter */}
              <div className="relative rounded-[28px] overflow-hidden border-2 border-yellow-400/40 shadow-[0_12px_40px_rgba(250,204,21,0.12)] group">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src="/images/safety-verification-charter.jpg"
                    alt="SchoolRide LK 5-Tier Safety & Verification Charter Inspection"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Secondary Visual Strip: Inspected Fleet Van */}
              <div className="p-4 rounded-[22px] bg-white dark:bg-slate-900 border border-yellow-500/20 shadow-sm flex items-center gap-4">
                <div className="relative h-18 w-28 rounded-xl overflow-hidden shrink-0 border border-yellow-200 dark:border-yellow-900/40">
                  <Image
                    src="/images/van-vehicle-focus.jpg"
                    alt="Inspected yellow school van"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#FEF08A] text-[#713F12] border border-yellow-300 uppercase">
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
      {/* 7. ISLAND-WIDE SCHOOL DIRECTORY & POPULAR ROUTES         */}
      {/* ======================================================== */}
      <section id="routes" className="py-20 md:py-28 border-b border-white/10 bg-black text-white relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left"
          >
            <div className="space-y-3 max-w-2xl">
              <span className="px-3.5 py-1.5 rounded-full bg-[#FACC15]/15 text-[#FACC15] text-xs font-bold border border-[#FACC15]/30">
                Island-Wide Coverage
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Covering <span className="text-[#FACC15]">Leading Schools</span> Across Sri Lanka
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
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
                      ? 'bg-[#FACC15] text-slate-950 font-black shadow-md'
                      : 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 hover:text-white'
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
                      ? 'bg-[#FACC15] text-slate-950 font-black shadow-md'
                      : 'bg-white/10 text-[#FACC15] border border-[#FACC15]/40 hover:bg-white/20'
                  }`}
                >
                  <School className="h-3.5 w-3.5 text-[#FACC15]" />
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
                <div className="col-span-full py-12 text-center text-slate-400">
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
                    className="p-6 rounded-[26px] bg-white/[0.06] backdrop-blur-xl border border-white/[0.14] text-white shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-xl hover:border-white/30 hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-[#FACC15] border border-[#FACC15]/30">
                          {school.badge}
                        </span>
                        <span className="text-xs font-bold text-[#FACC15] flex items-center gap-1">
                          <Bus className="h-3.5 w-3.5" /> {school.vansCount} Active Vans
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-white">
                        {school.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#FACC15]" /> {school.location}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-white/10">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Popular Commute Routes:
                        </span>
                        {school.popularRoutes.map((route, i) => (
                          <div key={i} className="text-xs text-slate-200 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
                            <span>{route}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[10px] text-slate-400 block font-semibold">Typical Monthly Fee</span>
                        <span className="text-xs font-black text-[#FACC15]">{school.monthlyRate}</span>
                      </div>
                      <Link href="/drivers">
                        <button className="px-4 py-2 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 text-xs font-black transition-colors cursor-pointer">
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
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border-2 border-[#FACC15]/40 text-[#FACC15] font-bold text-xs sm:text-sm transition-all duration-200 shadow-md cursor-pointer group"
                  aria-expanded={isSchoolsDropdownOpen}
                >
                  <School className="h-4 w-4 text-[#FACC15] group-hover:scale-110 transition-transform" />
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
                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FACC15] flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#FACC15] animate-pulse" />
                      Other Mapped Schools ({dropdownSchools.length})
                    </span>
                    <span className="text-xs text-slate-400 hidden sm:inline">
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
                        className="p-6 rounded-[26px] bg-white/[0.06] backdrop-blur-xl border border-white/[0.14] text-white shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-xl hover:border-white/30 hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-[#FACC15] border border-[#FACC15]/30">
                              {school.badge}
                            </span>
                            <span className="text-xs font-bold text-[#FACC15] flex items-center gap-1">
                              <Bus className="h-3.5 w-3.5" /> {school.vansCount} Active Vans
                            </span>
                          </div>

                          <h3 className="text-lg font-extrabold text-white">
                            {school.name}
                          </h3>
                          <p className="text-xs text-slate-400 flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-[#FACC15]" /> {school.location}
                          </p>

                          <div className="space-y-1.5 pt-2 border-t border-white/10">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                              Popular Commute Routes:
                            </span>
                            {school.popularRoutes.map((route, i) => (
                              <div key={i} className="text-xs text-slate-200 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
                                <span>{route}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                          <div className="text-left">
                            <span className="text-[10px] text-slate-400 block font-semibold">Typical Monthly Fee</span>
                            <span className="text-xs font-black text-[#FACC15]">{school.monthlyRate}</span>
                          </div>
                          <Link href="/drivers">
                            <button className="px-4 py-2 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 text-xs font-black transition-colors cursor-pointer">
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
      {/* PARENT REVIEWS & TESTIMONIALS (WHITE BACKGROUND)         */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">

          {/* Top Dark Banner: "Ready To Book Your Next Ride?" (Card at top of section) */}
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
              className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth py-3 px-1 no-scrollbar [&::-webkit-scrollbar]:hidden select-none"
              style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
      {/* LIVE GPS TELEMETRY & PARENT EXPERIENCE SHOWCASE (PREMIUM) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 relative overflow-hidden">
        
        {/* Soft Ambient Texture & Golden Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-200/25 dark:bg-yellow-500/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: App Showcase Visual with Live Cockpit Telemetry */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-[32px] overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.1)] bg-slate-950 group">
                <div className="relative w-full h-[360px] sm:h-[430px]">
                  <Image
                    src="/images/live-tracking-mockup.jpg"
                    alt="Smartphone tracking app screen with live GPS route"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />
                  
                  {/* Floating Top Badge: GPS Satellite Lock */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md text-[#FACC15] border border-yellow-400/40 text-xs font-black shadow-lg">
                    <span className="flex h-2 w-2 rounded-full bg-[#FACC15] animate-ping" />
                    <span>Dialog 4G M2M Telemetry Lock</span>
                  </div>
                </div>

                {/* Interactive Telemetry Overlay Card */}
                <div className="p-5 sm:p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-black uppercase tracking-wider text-[#14532D] dark:text-emerald-400">
                        Live GPS Stream Active
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                      Royal College Morning Run #04
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Driver: Sunil Wickramasinghe • WP ND-8422
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Live Speed readout in Yellow */}
                    <div className="text-center px-4 py-2 rounded-2xl bg-yellow-50 dark:bg-yellow-950/60 border border-yellow-300 dark:border-yellow-700/80 shadow-xs">
                      <span className="block text-[10px] font-black text-[#713F12] dark:text-yellow-300 uppercase tracking-wider">
                        Van Speed
                      </span>
                      <span className="font-mono text-base font-black text-[#CA8A04] dark:text-[#FACC15]">
                        {simulatedLiveSpeed} km/h
                      </span>
                    </div>

                    {/* Gate ETA readout */}
                    <div className="text-center px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/80 shadow-xs">
                      <span className="block text-[10px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                        Gate ETA
                      </span>
                      <span className="font-mono text-base font-black text-[#14532D] dark:text-emerald-300">
                        8 mins
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Parent Tracking Features with Yellow Highlights */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF08A] text-[#713F12] text-xs font-black border border-yellow-300 shadow-xs">
                <Navigation className="h-4 w-4 text-[#CA8A04]" />
                <span>Live GPS Telemetry</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                Never wonder where <br />
                <span className="text-[#CA8A04] dark:text-[#FACC15] underline decoration-[#FACC15]/40 underline-offset-8">the school van</span> is.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Gone are the days of standing outside in rain or sun wondering if the school van has already passed. The SchoolRide LK parent portal streams real-time GPS coordinates directly to your mobile screen.
              </p>

              <div className="space-y-4 pt-2">
                {/* Feature 1 */}
                <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-yellow-400 dark:hover:border-yellow-600 hover:shadow-[0_8px_24px_rgba(250,204,21,0.12)] hover:-translate-y-0.5 shadow-xs transition-all duration-200">
                  <div className="h-11 w-11 rounded-2xl bg-[#FEF08A] text-[#713F12] border border-yellow-300 flex items-center justify-center shrink-0 shadow-xs">
                    <Clock className="h-5 w-5 text-[#713F12]" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-slate-950 dark:text-white">
                      Precision Doorstep <span className="text-[#CA8A04] dark:text-[#FACC15]">ETA Countdown</span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      Get a 10-minute and 2-minute proximity chime before the van pulls up to your residential gate.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-yellow-400 dark:hover:border-yellow-600 hover:shadow-[0_8px_24px_rgba(250,204,21,0.12)] hover:-translate-y-0.5 shadow-xs transition-all duration-200">
                  <div className="h-11 w-11 rounded-2xl bg-[#FEF08A] text-[#713F12] border border-yellow-300 flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck className="h-5 w-5 text-[#713F12]" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-slate-950 dark:text-white">
                      Safe Speed Limit <span className="text-[#CA8A04] dark:text-[#FACC15]">Monitoring &amp; Audit</span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      Automated telemetry logs van speed continuously to guarantee drivers adhere strictly to school zone speed limits.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-yellow-400 dark:hover:border-yellow-600 hover:shadow-[0_8px_24px_rgba(250,204,21,0.12)] hover:-translate-y-0.5 shadow-xs transition-all duration-200">
                  <div className="h-11 w-11 rounded-2xl bg-[#FEF08A] text-[#713F12] border border-yellow-300 flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="h-5 w-5 text-[#713F12]" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-slate-950 dark:text-white">
                      Direct One-Touch <span className="text-[#CA8A04] dark:text-[#FACC15]">Driver Hotline</span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      Call or send instant sick-leave pickup skip notices directly through the parent dashboard with a single tap.
                    </p>
                  </div>
                </div>
              </div>

              {/* Yellow Primary Action Button */}
              <div className="pt-2">
                <Link href="/parent/rides/live">
                  <button className="inline-flex items-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm md:text-base shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer">
                    <span>Launch Interactive Live Ride Demo</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* VERIFIED SCHOOL FLEET & DRIVERS (PREMIUM YELLOW THEME)   */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 relative overflow-hidden">
        
        {/* Soft Ambient Texture & Golden Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-200/20 dark:bg-yellow-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left"
          >
            <div className="space-y-3.5 max-w-2xl">
              <span className="px-3.5 py-1.5 rounded-full bg-[#FEF08A] text-[#713F12] text-xs font-black border border-yellow-300 shadow-xs inline-flex items-center gap-1.5">
                <Bus className="h-3.5 w-3.5 text-[#CA8A04]" />
                <span>Verified School Fleet</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                Meet Sri Lanka&apos;s <span className="text-[#CA8A04] dark:text-[#FACC15] underline decoration-[#FACC15]/40 underline-offset-8">Most Trusted Drivers</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal">
                Vetted professionals with stellar safety records, licensed passenger vehicles, and genuine parental endorsements.
              </p>
            </div>

            {/* Yellow Header Button */}
            <Link href="/drivers">
              <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer">
                <span>View Full Driver Roster</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </motion.div>

          {/* Featured Showcase: 1 Spotlight with Photo + 2 Companion Driver Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Spotlight Card with Driver Portrait */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 rounded-[32px] overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-[0_16px_50px_rgba(0,0,0,0.07)] bg-white dark:bg-slate-900 flex flex-col justify-between hover:border-yellow-400 dark:hover:border-yellow-600 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative w-full h-[280px] sm:h-[320px]">
                <Image
                  src="/images/verified-driver-portrait.jpg"
                  alt="Verified Sri Lankan school van driver Uncle Sunil"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                
                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#16A34A]" /> Top Rated Operator
                  </span>
                </div>

                {/* Rating Badge in Yellow */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 rounded-full bg-[#FEF08A] text-[#713F12] border border-yellow-300 text-xs font-black shadow-md flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>4.98 ★</span>
                    <span className="text-[10px] font-bold text-[#713F12]/80">(142)</span>
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                      Sunil Wickramasinghe
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      14 Years Safe Commute • Colombo South Corridors
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-black border border-emerald-300">
                    Tier 5
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.12]">
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-white/60 block">Vehicle</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Toyota HiAce GL (14 Seats AC)</span>
                  </div>
                  
                  {/* Monthly Rate in Yellow Highlight */}
                  <div className="p-3.5 rounded-2xl bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800/80">
                    <span className="text-[10px] uppercase font-black text-[#713F12] dark:text-yellow-300 block">Monthly Rate</span>
                    <span className="text-xs sm:text-sm font-black text-[#CA8A04] dark:text-[#FACC15] font-mono">
                      Rs. 18,000 / month
                    </span>
                  </div>
                </div>

                {/* Vetting Badges in Yellow */}
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold">
                  <span className="px-3 py-1 rounded-full bg-yellow-100/80 dark:bg-yellow-950/50 text-[#713F12] dark:text-yellow-300 border border-yellow-300/80 flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> Police Clearance
                  </span>
                  <span className="px-3 py-1 rounded-full bg-yellow-100/80 dark:bg-yellow-950/50 text-[#713F12] dark:text-yellow-300 border border-yellow-300/80 flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> NTCA License 2027
                  </span>
                  <span className="px-3 py-1 rounded-full bg-yellow-100/80 dark:bg-yellow-950/50 text-[#713F12] dark:text-yellow-300 border border-yellow-300/80 flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> GPS Satellite Lock
                  </span>
                </div>

                {/* Yellow Action Button */}
                <div className="pt-2">
                  <Link href="/drivers">
                    <button className="w-full py-3.5 sm:py-4 rounded-2xl bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-sm sm:text-base shadow-md hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2">
                      <span>Book Seat with Driver Sunil</span>
                      <ArrowRight className="h-4 w-4" />
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
                  className="p-6 sm:p-7 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-yellow-400 dark:hover:border-yellow-600 hover:shadow-lg shadow-xs space-y-4 text-left transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-slate-950 dark:text-white">
                          {driver.name}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-[#14532D] dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-400/30">
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {driver.experience} • {driver.district}
                      </p>
                    </div>

                    {/* Star Rating Badge in Yellow */}
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-yellow-100 text-[#713F12] border border-yellow-300 font-black text-xs shadow-2xs">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{driver.rating} ★</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
                      <span className="text-slate-500 dark:text-white/60 block text-[10px] uppercase font-bold">Vehicle</span>
                      <span className="font-bold text-slate-800 dark:text-white truncate block">{driver.vehicle}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
                      <span className="text-slate-500 dark:text-white/60 block text-[10px] uppercase font-bold">License Plate</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-white truncate block">{driver.plate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/10">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Monthly Pass</span>
                      <span className="font-black text-sm sm:text-base text-[#CA8A04] dark:text-[#FACC15] font-mono">
                        {driver.fee} / month
                      </span>
                    </div>

                    {/* Yellow Action Button */}
                    <Link href="/drivers">
                      <button className="px-5 py-2.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
                        <span>Check Seats</span>
                        <ArrowRight className="h-3.5 w-3.5" />
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
      {/* FREQUENTLY ASKED QUESTIONS (WHITE BACKGROUND TEMPLATE)   */}
      {/* ======================================================== */}
      <section id="faq" className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200/90 dark:border-slate-800">
        
        {/* Background Artwork Layer (School Van & Students Photo) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/faq-school-van-bg.jpg"
            alt="SchoolRide LK verified driver and students with yellow school van"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right lg:object-center"
          />
          {/* Gentle white gradient wash on left for card readability on all screens */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent dark:from-slate-950/95 dark:via-slate-950/85 dark:to-transparent lg:w-[62%] pointer-events-none" />
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="max-w-[580px] lg:max-w-[620px]">
            
            {/* Floating White Card Matching Template */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionFadeUp}
              className="rounded-[28px] sm:rounded-[36px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 sm:p-9 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-slate-200/90 dark:border-slate-800 space-y-6 text-left"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                Frequently Asked <br className="hidden sm:inline" />Questions
              </h2>

              {/* Accordion List Matching Template (+ / - Icons) */}
              <div className="space-y-1">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border-b border-slate-100 dark:border-slate-800/80 py-3 sm:py-3.5 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left flex items-center justify-between gap-3 group cursor-pointer"
                      >
                        <span
                          className={`text-xs sm:text-sm font-bold transition-colors ${
                            isOpen
                              ? 'text-[#CA8A04] dark:text-[#FACC15]'
                              : 'text-slate-900 dark:text-white group-hover:text-[#CA8A04]'
                          }`}
                        >
                          {faq.q}
                        </span>
                        <span
                          className={`flex-shrink-0 text-base font-extrabold transition-transform ${
                            isOpen
                              ? 'text-[#CA8A04] dark:text-[#FACC15]'
                              : 'text-[#EAB308]'
                          }`}
                        >
                          {isOpen ? '—' : '+'}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="pt-2.5 pb-1 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons: Contact Us Now! (Outline Pill) + Book Your Ride (Solid Yellow Pill) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="tel:+94112345678"
                  className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
                >
                  Contact Us Now!
                </a>

                <Link href="/drivers">
                  <button className="inline-flex items-center justify-center px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer">
                    Book Your Ride
                  </button>
                </Link>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}