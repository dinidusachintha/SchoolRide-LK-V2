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
  ArrowUpRight,
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
  Info,
  MessageSquarePlus,
  Quote,
  X,
  Send,
  ThumbsUp
} from 'lucide-react';

// Animation Variants (Ultra-Smooth Spring Easing)
const emilSpring = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const visualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.93, x: 40, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const sectionFadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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

// Initial Verified Parent Testimonials Dataset
const initialTestimonials = [
  {
    id: 1,
    name: 'Dr. Anoma Wijesekera',
    initial: 'A',
    avatarBg: 'bg-[#1976D2]',
    school: 'Visakha Vidyalaya, Colombo 05',
    district: 'Nugegoda & Bambalapitiya Route',
    rating: 5,
    category: 'Live GPS Tracking',
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
    category: 'Driver Safety & Vetting',
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
    category: 'Live GPS Tracking',
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
    category: 'Punctuality & Routes',
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
    category: 'Female Matron Care',
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
    category: 'Live GPS Tracking',
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
    category: 'Driver Safety & Vetting',
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
    category: 'Punctuality & Routes',
    date: '1 month ago',
    shortText: 'Exceptional service quality. Monthly billing and online seat management through the dashboard saved us so much time. Both our kids travel safely...',
    fullText: 'Exceptional service quality. Monthly billing and online seat management through the dashboard saved us so much time. Both our kids travel safely every weekday.',
  },
];

// Verified School Fleet Dataset (Matching Industrial / Heritage Template Layout with Web Details)
const fleetTabsData = {
  mission: {
    tabLabel: 'OUR MISSION',
    eyebrow: 'WHO WE ARE',
    headlineMain: 'We work for your children ',
    headlineAccent: 'since 2018.',
    headlineSub: "Meet Sri Lanka's Most Trusted Drivers",
    image: '/images/school-van-hero-showcase.jpg',
    secondaryImage: '/images/verified-driver-portrait.jpg',
    secondaryAlt: 'Verified SchoolRide LK driver Sunil Wickramasinghe',
    description:
      'Over 450+ Toyota HiAce and Nissan Caravan commuter vans independently inspected for school transport safety across Colombo, Kandy, Galle, and Gampaha. Dedicated to safe, punctual, and comfortable daily journeys for every student.',
    bullets: [
      '24/7 Call Services & Parent Desk Available',
      '100% Police Cleared & Background Vetted',
      'Dual Factory A/C & Guaranteed Clean Seating',
    ],
    badgeTitle: 'Sunil Wickramasinghe (14 Yrs Exp)',
    badgeSub: 'Toyota HiAce GL • Colombo Routes',
  },
  vision: {
    tabLabel: 'OUR VISION',
    eyebrow: 'SAFETY CHARTER',
    headlineMain: 'Standardized fleet comfort & ',
    headlineAccent: 'safety.',
    headlineSub: '5-Tier Charter & Telemetry Compliance',
    image: '/images/school-van-hero-showcase.jpg',
    secondaryImage: '/images/van-vehicle-focus.jpg',
    secondaryAlt: 'Inspected Toyota HiAce school commuter van',
    description:
      'Our fleet operates on a strict zero-tolerance safety charter. Every school van is speed-governed at 40 km/h in school zones, continuously tracked via GPS telemetry, and supervised by verified attendants.',
    bullets: [
      'Automated 40 km/h School Zone Speed Governors',
      'Real-Time OBD-II Live GPS & Route Telemetry',
      'Mandatory Annual Mechanical & Fitness Testing',
    ],
    badgeTitle: 'Gamini Fernando (9 Yrs Exp)',
    badgeSub: 'Nissan Caravan High-Roof • Kandy Routes',
  },
  history: {
    tabLabel: 'OUR HISTORY',
    eyebrow: 'COMMUNITY TRUST',
    headlineMain: 'Modernizing student transit ',
    headlineAccent: 'nationwide.',
    headlineSub: 'Trusted by 18,500+ Sri Lankan Families',
    image: '/images/school-van-hero-showcase.jpg',
    secondaryImage: '/images/service-driver-safety.jpg',
    secondaryAlt: 'Friendly school van driver with student and parent',
    description:
      'Founded in Colombo to replace informal, unmonitored van arrangements with licensed, predictable transport. Every driver uncle is trained in defensive driving, child safeguarding, and first-aid response.',
    bullets: [
      'Verified NTCA School Passenger Route Permits',
      'Trained Female Matron Attendants Onboard',
      'Automated Parent SMS & Gate Arrival Alerts',
    ],
    badgeTitle: 'Pradeep Kumara (11 Yrs Exp)',
    badgeSub: 'Toyota Commuter Bus • Gampaha Routes',
  },
};


function LiveSpeedBadge() {
  const [speed, setSpeed] = React.useState(38);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const newSpeed = prev + delta;
        return newSpeed >= 32 && newSpeed <= 42 ? newSpeed : 38;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center px-4 py-2 rounded-2xl bg-yellow-50 dark:bg-yellow-950/60 border border-yellow-300 dark:border-yellow-700/80 shadow-xs">
      <span className="block text-[10px] font-black text-[#713F12] dark:text-yellow-300 uppercase tracking-wider">
        Van Speed
      </span>
      <span className="font-mono text-base font-black text-[#CA8A04] dark:text-[#FACC15]">
        {speed} km/h
      </span>
    </div>
  );
}


// Services Dataset for mobile slideshow & desktop grid
const servicesData = [
  {
    id: 'daily-commute',
    title: 'Daily School Commute.',
    description:
      'Book verified daily morning & afternoon school runs on fixed punctual routes with GPS live tracking and seat reservations.',
    image: '/images/schoolkids.png',
    alt: 'Daily School Commute',
    link: '/drivers',
  },
  {
    id: 'city-activity',
    title: 'City & Activity Rides.',
    description:
      'Dedicated after-school transit for tuition classes, sports practice, swimming meets, and tournaments with vetted local drivers who know every shortcut.',
    image: '/images/service-city-activity.jpg',
    alt: 'City & Activity Rides',
    link: '/drivers',
  },
  {
    id: 'dedicated-termpass',
    title: 'Dedicated Term Pass.',
    description:
      'Reserve a guaranteed seat for the entire school term with automated real-time GPS tracking, parent gate-arrival alerts, and caring female matron attendants.',
    image: '/images/service-dedicated-termpass.jpg',
    alt: 'Dedicated Term Pass',
    link: '/drivers',
  },
];

// Verified School Fleet Dataset for right-side driver slideshow
const verifiedFleetDrivers = [
  {
    id: 'sunil',
    name: 'Sunil Wickramasinghe',
    initials: 'SW',
    experience: '14 Years Safe Commute',
    suburb: 'Colombo Routes',
    rating: '4.98',
    reviewsCount: 142,
    vehicle: 'Toyota HiAce GL (14-Seat AC)',
    plate: 'WP NA-4521',
    seatsOpen: '2 Seats Open',
    monthlyRate: 'LKR 8,500',
    amenities: ['Dual Factory A/C', 'First-Aid Kit', 'GPS Live Telemetry', 'Police Cleared'],
    schoolsServed: ['Royal College', 'Visakha Vidyalaya', 'Thurstan College'],
    ctaText: 'Book Seat with Driver Sunil',
  },
  {
    id: 'gamini',
    name: 'Gamini Fernando',
    initials: 'GF',
    experience: '9 Years Safe Driving',
    suburb: 'Kandy City & Peradeniya',
    rating: '4.95',
    reviewsCount: 118,
    vehicle: 'Nissan Caravan High-Roof',
    plate: 'CP NA-3901',
    seatsOpen: '2 Seats Open',
    monthlyRate: 'LKR 7,800',
    amenities: ['High-Roof Seating', 'Dual A/C', 'Emergency SOS Chime', 'Police Cleared'],
    schoolsServed: ['Kingswood College', 'Dharmaraja College', 'Mahamaya Girls'],
    ctaText: 'Book Seat with Driver Gamini',
  },
  {
    id: 'pradeep',
    name: 'Pradeep Kumara',
    initials: 'PK',
    experience: '11 Years Safe Driving',
    suburb: 'Gampaha & Colombo North',
    rating: '4.99',
    reviewsCount: 156,
    vehicle: 'Toyota Commuter Bus',
    plate: 'WP NB-7140',
    seatsOpen: '3 Seats Open',
    monthlyRate: 'LKR 9,200',
    amenities: ['High Capacity Seating', 'Dual A/C', 'Speed Monitored', 'Police Cleared'],
    schoolsServed: ['Bandaranayake College', 'Holy Cross Gampaha', 'Ananda College'],
    ctaText: 'Book Seat with Driver Pradeep',
  },
  {
    id: 'nalin',
    name: 'Nalin Jayasinghe',
    initials: 'NJ',
    experience: '8 Years Safe Driving',
    suburb: 'Dehiwala & Mount Lavinia',
    rating: '4.97',
    reviewsCount: 94,
    vehicle: 'Toyota HiAce Super GL',
    plate: 'WP NA-5820',
    seatsOpen: '1 Seat Open',
    monthlyRate: 'LKR 8,000',
    amenities: ['Luxury Interior', 'Seatbelts Guaranteed', 'Live GPS Tracking', 'Police Cleared'],
    schoolsServed: ["S. Thomas' College", "St. Peter's College", 'Visakha Vidyalaya'],
    ctaText: 'Book Seat with Driver Nalin',
  },
];

export default function HomePage() {
  // Mobile Services Slideshow state
  const [activeServiceSlide, setActiveServiceSlide] = React.useState(0);
  const [isServiceHovered, setIsServiceHovered] = React.useState(false);

  React.useEffect(() => {
    if (isServiceHovered) return;
    const interval = setInterval(() => {
      setActiveServiceSlide((prev) => (prev + 1) % servicesData.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isServiceHovered]);

  // Fleet Driver Slideshow state
  const [activeFleetSlide, setActiveFleetSlide] = React.useState(0);
  const [isFleetHovered, setIsFleetHovered] = React.useState(false);

  React.useEffect(() => {
    if (isFleetHovered) return;
    const interval = setInterval(() => {
      setActiveFleetSlide((prev) => (prev + 1) % verifiedFleetDrivers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isFleetHovered]);

  const [selectedDistrict, setSelectedDistrict] = React.useState('All');
  const [schoolSearchQuery, setSchoolSearchQuery] = React.useState('');
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);
  const [isSchoolsDropdownOpen, setIsSchoolsDropdownOpen] = React.useState(false);
  const [activeSafetyTab, setActiveSafetyTab] = React.useState<'driver' | 'vehicle' | 'telemetry' | 'attendance'>('attendance');

  // Feedback & Parent Reviews states
  const [feedbackCategory, setFeedbackCategory] = React.useState<string>('All');
  const [feedbackList, setFeedbackList] = React.useState(initialTestimonials);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = React.useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false);
  const [feedbackRating, setFeedbackRating] = React.useState(5);
  const [feedbackHoverRating, setFeedbackHoverRating] = React.useState<number | null>(null);
  const [feedbackForm, setFeedbackForm] = React.useState({
    name: '',
    school: '',
    route: '',
    category: 'Live GPS Tracking',
    comment: '',
  });

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.name.trim() || !feedbackForm.comment.trim()) return;

    const newFeedback = {
      id: Date.now(),
      name: feedbackForm.name.trim(),
      initial: feedbackForm.name.trim().charAt(0).toUpperCase() || 'P',
      avatarBg: 'bg-[#00897B]',
      school: feedbackForm.school.trim() || 'Colombo School Network',
      district: feedbackForm.route.trim() || 'Verified School Route',
      rating: feedbackRating,
      date: 'Just now',
      category: feedbackForm.category,
      isNew: true,
      shortText: feedbackForm.comment.trim().length > 140
        ? feedbackForm.comment.trim().slice(0, 140) + '...'
        : feedbackForm.comment.trim(),
      fullText: feedbackForm.comment.trim(),
    };

    setFeedbackList(prev => [newFeedback, ...prev]);
    setFeedbackSubmitted(true);
    if (reviewsCarouselRef.current) {
      reviewsCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setTimeout(() => {
      setIsFeedbackModalOpen(false);
      setFeedbackSubmitted(false);
      setFeedbackForm({
        name: '',
        school: '',
        route: '',
        category: 'Live GPS Tracking',
        comment: '',
      });
      setFeedbackRating(5);
    }, 1800);
  };

  const filteredFeedbackList = React.useMemo(() => {
    if (feedbackCategory === 'All') return feedbackList;
    return feedbackList.filter(item => item.category === feedbackCategory);
  }, [feedbackList, feedbackCategory]);

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
      experience: '14 Years Safe Commute',
      district: 'Colombo South & Suburbs',
      vehicle: 'Toyota HiAce Super GL',
      plate: 'WP ND-8422',
      seats: '14 Seats (Dual A/C)',
      rating: 4.98,
      reviews: 142,
      trips: 1840,
      routes: ['Malabe', 'Battaramulla', 'Rajagiriya', 'Colombo 07'],
      policeChecked: true,
      revenueLicenseValid: true,
      fee: 'Rs. 8,500',
      status: '2 Seats Left',
      badge: 'Top Rated Operator',
      image: '/images/verified-driver-portrait.jpg',
    },
    {
      id: 'd2',
      name: 'Gamini Fernando',
      experience: '9 Years Safe Commute',
      district: 'Kandy Central & Peradeniya',
      vehicle: 'Nissan Caravan High-Roof',
      plate: 'CP NA-3901',
      seats: '16 Seats (Dual A/C)',
      rating: 4.95,
      reviews: 98,
      trips: 1220,
      routes: ['Peradeniya', 'Getambe', 'Kandy Town', 'Trinity Gate'],
      policeChecked: true,
      revenueLicenseValid: true,
      fee: 'Rs. 7,800',
      status: '1 Seat Left',
      badge: 'Certified Route Lead',
      image: '/images/service-school-commute.jpg',
    },
    {
      id: 'd3',
      name: 'Pradeep Kumara',
      experience: '11 Years Safe Commute',
      district: 'Gampaha & Colombo North',
      vehicle: 'Toyota Commuter Bus',
      plate: 'WP NB-7140',
      seats: '18 Seats (Factory A/C)',
      rating: 4.99,
      reviews: 164,
      trips: 2150,
      routes: ['Kadawatha', 'Kiribathgoda', 'Kelaniya', 'Colombo 10'],
      policeChecked: true,
      revenueLicenseValid: true,
      fee: 'Rs. 9,200',
      status: '3 Seats Left',
      badge: 'Premier Fleet Driver',
      image: '/images/service-school-route.jpg',
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
              <button className="btn-glass-yellow-3d px-4 py-1.5 text-xs">
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
      {/* 1. HERO SECTION: CLEAN WHITE THEME (NO BG IMAGE / NO FADE) */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden w-full bg-[#FFFFFF] dark:bg-slate-950 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 border-b border-slate-200/90 dark:border-slate-800">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          
          {/* Main 2-Column Split-Screen Hero Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-6 xl:gap-10">
            
            {/* LEFT COLUMN: Narrative, Headline, Description, Action Buttons, Trust Points */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5 xl:col-span-5 space-y-6 sm:space-y-7 text-left"
            >
              {/* Star Eyebrow Tag: [ ☆ SAFE • RELIABLE • ON-TIME SCHOOL RUNS ACROSS SRI LANKA ] */}
              <motion.div variants={badgeVariants} className="inline-block">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm font-extrabold tracking-wider uppercase text-slate-800 dark:text-slate-200 shadow-xs">
                  <Star className="h-4 w-4 text-[#EAB308] fill-[#EAB308]" />
                  <span>Safe • Reliable • On-Time School Runs Across Sri Lanka</span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[56px] font-black tracking-tight text-slate-950 dark:text-white leading-[1.08]">
                  Safe, Smart &amp; Reliable <br />
                  <span className="text-[#CA8A04] dark:text-[#FACC15]">School Transport</span> <br />
                  For Every Journey.
                </h1>
              </motion.div>

              {/* Subheading Paragraph */}
              <motion.p
                variants={itemVariants}
                className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-normal"
              >
                Connect with NTCA-licensed school van operators across Sri Lanka. Real-time GPS ride tracking, verified female child attendants, and automated parent arrival alerts for complete peace of mind.
              </motion.p>

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
                    className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
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
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold text-xs sm:text-sm md:text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
                  >
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Live Ride Demo</span>
                  </motion.button>
                </Link>

                {/* Call Hotline */}
                <a
                  href="tel:+94112345678"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  <Phone className="h-4 w-4 text-[#CA8A04] dark:text-[#FACC15]" />
                  <span>Call (+94) 11 234 5678</span>
                </a>
              </motion.div>

              {/* Subtle Trust Indicators */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>NTCA Registered Drivers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Live GPS Tracking</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#CA8A04] dark:text-[#FACC15]" />
                  <span>Female Matron Onboard</span>
                </div>
              </motion.div>

            </motion.div>

            {/* RIGHT COLUMN: Clean Yellow School Van & Students Showcase */}
            <motion.div
              variants={visualVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 xl:col-span-7 relative w-full flex items-center justify-center lg:justify-end min-h-[420px] sm:min-h-[500px] lg:min-h-[580px] xl:min-h-[640px]"
            >
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }} className="relative w-full max-w-[680px] sm:max-w-[760px] lg:max-w-[880px] xl:max-w-[980px] 2xl:max-w-[1060px] aspect-[925/547]">
                <Image
                  src="/images/hero-school-van-kids-trans-hd.png"
                  alt="SchoolRide LK Safe School Commuter Van with Sri Lankan Students"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain object-center lg:object-right-bottom scale-100 sm:scale-105 lg:scale-110 xl:scale-115 transition-transform duration-500 drop-shadow-xl transform-gpu" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. QUICK ROUTE MATCHER (DARK NAVY BLUE THEME)            */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 bg-[#0B1528] text-white border-b border-blue-900/30 relative overflow-hidden">
        {/* Subtle Ambient Navy Glow Accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8 rounded-[28px] bg-[#0F1D38]/80 backdrop-blur-xl border border-blue-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
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
                <p className="text-xs text-blue-100/70 font-normal">
                  Filter by province, school, or pickup corridor across Sri Lanka.
                </p>
              </div>

              {/* 3 Dark Navy Glass Effect Cards for Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 max-w-3xl">
                
                {/* 1. District Glass Card */}
                <div className="relative p-2.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/[0.12] hover:border-blue-400/40 transition-all">
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Province / District
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictFilter(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-white/20 bg-white/[0.1] text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15] cursor-pointer"
                  >
                    <option value="All" className="bg-[#0B1528] text-white">All Districts (Sri Lanka)</option>
                    <option value="Colombo" className="bg-[#0B1528] text-white">Colombo (Western)</option>
                    <option value="Gampaha" className="bg-[#0B1528] text-white">Gampaha (Western)</option>
                    <option value="Kalutara" className="bg-[#0B1528] text-white">Kalutara (Western)</option>
                    <option value="Kandy" className="bg-[#0B1528] text-white">Kandy (Central)</option>
                    <option value="Galle" className="bg-[#0B1528] text-white">Galle (Southern)</option>
                    <option value="Kurunegala" className="bg-[#0B1528] text-white">Kurunegala (North Western)</option>
                  </select>
                </div>

                {/* 2. School Glass Card */}
                <div className="relative p-2.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/[0.12] hover:border-blue-400/40 transition-all">
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Child's School
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Royal, Visakha, Ananda"
                      value={schoolSearchQuery}
                      onChange={(e) => handleSchoolSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-white/20 bg-white/[0.1] text-sm font-semibold text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                    <School className="absolute left-2.5 top-2.5 h-4 w-4 text-white/60 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Pickup Town Glass Card */}
                <div className="relative p-2.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/[0.12] hover:border-blue-400/40 transition-all">
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Home / Pickup Town
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Nugegoda, Malabe"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-white/20 bg-white/[0.1] text-sm font-semibold text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-white/60 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2 lg:pt-0 shrink-0">
                <Link href="/drivers">
                  <button className="btn-glass-yellow-3d w-full lg:w-auto px-8 py-3.5 text-sm sm:text-base">
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
                    <button className="btn-glass-yellow-3d px-7 sm:px-8 py-3.5 text-xs sm:text-sm md:text-base">
                      <CalendarDays className="h-4 w-4" />
                      <span>Book a School Ride Now</span>
                    </button>
                  </Link>

                  {/* Button 2: Outline Pill (Register as Van Driver) */}
                  <Link href="/register?role=DRIVER">
                    <button className="btn-glass-yellow-3d px-7 sm:px-8 py-3.5 text-xs sm:text-sm md:text-base">
                      <Bus className="h-4 w-4" />
                      <span>Register as Van Driver</span>
                    </button>
                  </Link>

                  {/* Button 3: Call Hotline Pill */}
                  <a
                    href="tel:+94112345678"
                    className="btn-glass-yellow-3d px-5 py-3.5 text-xs sm:text-sm"
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
                    src="/images/banner-student-window-hd.jpg"
                    alt="Happy Sri Lankan school student smiling safely with seatbelt from the yellow school van window"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    quality={92}
                    className="object-cover object-center lg:object-[65%_center] filter contrast-[1.03]"
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
      {/* 3. LIVE TRUST & STATS MARQUEE (DARK NAVY FADE & SCHOOL THEME) */}
      {/* ======================================================== */}
      <section className="relative w-full py-8 sm:py-10 lg:py-12 bg-[#0B1528] text-white border-y border-blue-900/30 overflow-hidden flex items-center">
        {/* Cinematic Background Image (School Theme Vehicle on Right, Dark Motion Road) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fleet-stats-motion-bg.jpg"
            alt="SchoolRide LK verified school commuter fleet"
            fill
            priority
            sizes="100vw"
            quality={92}
            className="object-cover object-right lg:object-[85%_center] filter brightness-[0.82] contrast-[1.08]"
          />

          {/* Seamless Dark Navy Blue Fade: Solid dark navy on left & center, revealing school van on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528] via-[#0B1528]/95 via-50% to-[#0B1528]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-[#0B1528]/75 pointer-events-none" />

          {/* Ambient Navy & Gold Glow Accents */}
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center"
          >
            {/* Stat 1: Verified Van Operators */}
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="py-4 px-3 sm:py-5 sm:px-4 rounded-2xl bg-[#0B1528]/85 backdrop-blur-xl border border-blue-500/25 hover:border-[#FACC15]/50 hover:bg-[#0E1E3A]/90 transition-all duration-300 flex flex-col items-center justify-center space-y-1.5 group shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-[#FACC15] group-hover:bg-[#FACC15]/20 group-hover:border-[#FACC15]/40 transition-all">
                <UserCheck className="w-4 h-4" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight font-mono">
                <StatCounter target={250} suffix="+" />
              </span>
              <p className="text-[11px] sm:text-xs font-semibold text-blue-100/80 group-hover:text-white transition-colors">
                Verified Van Operators
              </p>
            </motion.div>

            {/* Stat 2: Safe Morning Trips */}
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="py-4 px-3 sm:py-5 sm:px-4 rounded-2xl bg-[#0B1528]/85 backdrop-blur-xl border border-blue-500/25 hover:border-[#FACC15]/50 hover:bg-[#0E1E3A]/90 transition-all duration-300 flex flex-col items-center justify-center space-y-1.5 group shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-[#FACC15] group-hover:bg-[#FACC15]/20 group-hover:border-[#FACC15]/40 transition-all">
                <Bus className="w-4 h-4" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight font-mono">
                <StatCounter target={18500} suffix="+" />
              </span>
              <p className="text-[11px] sm:text-xs font-semibold text-blue-100/80 group-hover:text-white transition-colors">
                Safe Morning Trips
              </p>
            </motion.div>

            {/* Stat 3: Premier Schools Covered */}
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="py-4 px-3 sm:py-5 sm:px-4 rounded-2xl bg-[#0B1528]/85 backdrop-blur-xl border border-blue-500/25 hover:border-[#FACC15]/50 hover:bg-[#0E1E3A]/90 transition-all duration-300 flex flex-col items-center justify-center space-y-1.5 group shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-[#FACC15] group-hover:bg-[#FACC15]/20 group-hover:border-[#FACC15]/40 transition-all">
                <School className="w-4 h-4" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight font-mono">
                <StatCounter target={48} suffix="+" />
              </span>
              <p className="text-[11px] sm:text-xs font-semibold text-blue-100/80 group-hover:text-white transition-colors">
                Premier Schools Covered
              </p>
            </motion.div>

            {/* Stat 4: On-Time School Arrivals */}
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="py-4 px-3 sm:py-5 sm:px-4 rounded-2xl bg-[#0B1528]/85 backdrop-blur-xl border border-blue-500/25 hover:border-[#FACC15]/50 hover:bg-[#0E1E3A]/90 transition-all duration-300 flex flex-col items-center justify-center space-y-1.5 group shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-[#FACC15] group-hover:bg-[#FACC15]/20 group-hover:border-[#FACC15]/40 transition-all">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight font-mono">
                <StatCounter target={99.8} decimals={1} suffix="%" />
              </span>
              <p className="text-[11px] sm:text-xs font-semibold text-blue-100/80 group-hover:text-white transition-colors">
                On-Time School Arrivals
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. HOW TO REQUEST A RIDE & SERVICES (AIRY GLASS CARDS)   */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-[#F0F4F9] dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 border-b border-slate-200/90 dark:border-slate-800 relative overflow-hidden">
        {/* Soft Ambient Ethereal Glow Blobs for Glass Depth */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-sky-400/10 dark:bg-blue-600/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-400/10 dark:bg-sky-500/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-5 pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          
          {/* Section Header: Split Layout */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 sm:pb-14 text-left">
            <div className="space-y-3 max-w-2xl">
              {/* Eyebrow Badge: [ OUR SERVICES ] */}
              <div className="inline-block">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FACC15] text-[#14532D] font-extrabold text-xs uppercase tracking-wider shadow-sm">
                  OUR SERVICES
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                School Van Services Designed For Every Type Of Ride
              </h2>
            </div>

            {/* Right Subtitle Paragraph */}
            <div className="max-w-xl text-left">
              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                From daily morning school runs to afternoon sports activities and dedicated term passes, SchoolRide LK connects your family with verified, punctual drivers across Sri Lanka.
              </p>
            </div>
          </div>

          {/* Services Showcase: 1-Card Mobile Slideshow + 3-Card Desktop Grid */}
          
          {/* Mobile Slideshow: Only 1 Card visible at a time (md:hidden) */}
          <div
            className="block md:hidden relative"
            onMouseEnter={() => setIsServiceHovered(true)}
            onMouseLeave={() => setIsServiceHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeServiceSlide}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between rounded-[32px] overflow-hidden bg-gradient-to-b from-blue-50/30 via-white/60 to-white/85 dark:from-slate-900/40 dark:via-slate-900/60 dark:to-slate-950/85 backdrop-blur-xl border border-white/60 dark:border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.06)] min-h-[460px]"
              >
                {/* Top Specular Rim */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white dark:via-white/20 to-transparent pointer-events-none" />

                {/* Card Upper Image */}
                <div className="relative w-full h-56 overflow-hidden rounded-t-[32px] bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={servicesData[activeServiceSlide].image}
                    alt={servicesData[activeServiceSlide].alt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/40 to-transparent dark:from-slate-900/50 dark:to-transparent pointer-events-none" />
                  
                  {/* Slide Counter Badge */}
                  <div className="absolute top-3.5 right-3.5 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-full shadow-sm">
                    0{activeServiceSlide + 1} / 0{servicesData.length}
                  </div>
                </div>

                {/* Card Lower Content Area */}
                <div className="p-6 pt-4 flex flex-col justify-between flex-1 text-left">
                  <div className="space-y-2 mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                      {servicesData[activeServiceSlide].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                      {servicesData[activeServiceSlide].description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href={servicesData[activeServiceSlide].link}
                      className="btn-glass-yellow-3d px-5 py-2 text-xs font-bold"
                    >
                      <span>Explore</span>
                      <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                    </Link>

                    {/* Navigation Arrows for Mobile Slideshow */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setActiveServiceSlide((prev) =>
                            prev === 0 ? servicesData.length - 1 : prev - 1
                          )
                        }
                        aria-label="Previous Service"
                        className="w-8 h-8 rounded-full border border-slate-200 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveServiceSlide((prev) => (prev + 1) % servicesData.length)
                        }
                        aria-label="Next Service"
                        className="w-8 h-8 rounded-full border border-slate-200 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots below mobile card */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {servicesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveServiceSlide(idx)}
                  aria-label={`Go to service slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeServiceSlide === idx
                      ? 'w-6 bg-[#FACC15]'
                      : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop/Tablet 3-Column Grid (hidden md:grid) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardsContainerVariants}
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8"
          >
            {servicesData.map((svc) => (
              <motion.div
                key={svc.id}
                variants={cardItemVariants}
                whileHover={{ y: -7, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
                className="group relative flex flex-col justify-between rounded-[32px] sm:rounded-[36px] overflow-hidden bg-gradient-to-b from-blue-50/30 via-white/60 to-white/85 dark:from-slate-900/40 dark:via-slate-900/60 dark:to-slate-950/85 backdrop-blur-xl border border-white/60 dark:border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all duration-500"
              >
                {/* Top Specular Rim */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white dark:via-white/20 to-transparent pointer-events-none" />

                {/* Card Upper Image */}
                <div className="relative w-full h-60 sm:h-64 overflow-hidden rounded-t-[32px] sm:rounded-t-[36px] bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={svc.image}
                    alt={svc.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/40 to-transparent dark:from-slate-900/50 dark:to-transparent pointer-events-none" />
                </div>

                {/* Card Lower Content Area */}
                <div className="p-6 sm:p-7 md:p-8 pt-4 flex flex-col justify-between flex-1 text-left">
                  <div className="space-y-2 mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed line-clamp-3">
                      {svc.description}
                    </p>
                  </div>

                  <Link
                    href={svc.link}
                    className="btn-glass-yellow-3d px-5 py-2 text-xs sm:text-sm font-bold w-fit mt-auto"
                  >
                    <span>Explore</span>
                    <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. 5-TIER SAFETY & VERIFICATION CHARTER SHOWCASE CARD    */}
      {/* (UNIFIED MASTER CARD: IMAGE 1 TEMPLATE + IMAGE 2 DETAILS) */}
      {/* ======================================================== */}
      <section id="safety" className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 dark:border-slate-800 bg-[#FAFAFA] dark:bg-slate-950 relative overflow-hidden">
        {/* Navigation anchor support for #about links */}
        <div id="about" className="absolute -top-24 pointer-events-none" />

        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Framed Feature Showcase Card (Template from Image 1, Details from Image 2) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={sectionFadeUp}
            className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[560px]">
              
              {/* LEFT COLUMN: 5-Tier Safety & Verification Charter Details (Image 2) */}
              <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14 space-y-6 text-left">
                
                <div className="space-y-4">
                  {/* Eyebrow Badge matching Image 2 */}
                  <div className="inline-block">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEFCE8] dark:bg-yellow-950/40 text-[#854D0E] dark:text-[#FACC15] border border-[#FEF08A] dark:border-yellow-700/50 text-xs font-bold shadow-2xs">
                      <ShieldCheck className="h-4 w-4 text-[#CA8A04] dark:text-[#FACC15]" />
                      <span>5-Tier Safety &amp; Verification Charter</span>
                    </span>
                  </div>

                  {/* Headline matching Image 2 */}
                  <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-black font-serif text-slate-900 dark:text-white tracking-tight leading-[1.14]">
                    Trust earned through{' '}
                    <span className="text-[#CA8A04] dark:text-[#FACC15]">rigorous<br />inspection.</span>
                  </h2>

                  {/* Lead Narrative matching Image 2 */}
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl">
                    We believe child safety requires verifiable criteria, not just slogans. Every school van operator on SchoolRide LK must submit proof of identity, legal credentials, and vehicle fitness before accepting student bookings.
                  </p>
                </div>

                {/* 4 Interactive Safety Tabs (Yellow 3D Active Theme) */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveSafetyTab('driver')}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                        activeSafetyTab === 'driver'
                          ? 'bg-gradient-to-b from-[#FDE047] via-[#FACC15] to-[#EAB308] text-slate-950 font-black shadow-[0_1.5px_0_#CA8A04,0_4px_10px_rgba(250,204,21,0.22)] border border-yellow-200/80 -translate-y-0.5'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 hover:border-yellow-400/60 hover:text-yellow-700 dark:hover:text-yellow-300'
                      }`}
                    >
                      1. Driver Background
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSafetyTab('vehicle')}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                        activeSafetyTab === 'vehicle'
                          ? 'bg-gradient-to-b from-[#FDE047] via-[#FACC15] to-[#EAB308] text-slate-950 font-black shadow-[0_1.5px_0_#CA8A04,0_4px_10px_rgba(250,204,21,0.22)] border border-yellow-200/80 -translate-y-0.5'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 hover:border-yellow-400/60 hover:text-yellow-700 dark:hover:text-yellow-300'
                      }`}
                    >
                      2. Vehicle Roadworthiness
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSafetyTab('telemetry')}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                        activeSafetyTab === 'telemetry'
                          ? 'bg-gradient-to-b from-[#FDE047] via-[#FACC15] to-[#EAB308] text-slate-950 font-black shadow-[0_1.5px_0_#CA8A04,0_4px_10px_rgba(250,204,21,0.22)] border border-yellow-200/80 -translate-y-0.5'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 hover:border-yellow-400/60 hover:text-yellow-700 dark:hover:text-yellow-300'
                      }`}
                    >
                      3. Speed &amp; Telemetry
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSafetyTab('attendance')}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                        activeSafetyTab === 'attendance'
                          ? 'bg-gradient-to-b from-[#FDE047] via-[#FACC15] to-[#EAB308] text-slate-950 font-black shadow-[0_1.5px_0_#CA8A04,0_4px_10px_rgba(250,204,21,0.22)] border border-yellow-200/80 -translate-y-0.5'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 hover:border-yellow-400/60 hover:text-yellow-700 dark:hover:text-yellow-300'
                      }`}
                    >
                      4. Attendance Alerts
                    </button>
                  </div>

                  {/* Active Tab Description Box matching Image 2 */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-yellow-300/80 dark:border-yellow-700/60 bg-[#FFFDF5] dark:bg-yellow-950/20 shadow-xs min-h-[96px] flex items-center">
                    <AnimatePresence mode="wait">
                      {activeSafetyTab === 'attendance' && (
                        <motion.div
                          key="attendance"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-1.5 w-full"
                        >
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                            <Bell className="h-5 w-5 text-[#CA8A04] dark:text-[#FACC15] stroke-[2.2]" />
                            <span>Instant Doorstep Pickup &amp; School Gate Chimes</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            Parents receive an instant notification when the van arrives at their gate, when the student boards, and the moment the van stops safely at the school entrance.
                          </p>
                        </motion.div>
                      )}

                      {activeSafetyTab === 'driver' && (
                        <motion.div
                          key="driver"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-1.5 w-full"
                        >
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                            <UserCheck className="h-5 w-5 text-[#CA8A04] dark:text-[#FACC15] stroke-[2.2]" />
                            <span>Police Records &amp; NIC Identity Verification</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            Every driver submits their government National Identity Card (NIC) and Heavy Passenger Commercial Driver&apos;s License. Our team cross-references background credentials and previous passenger transport experience before granting approved status.
                          </p>
                        </motion.div>
                      )}

                      {activeSafetyTab === 'vehicle' && (
                        <motion.div
                          key="vehicle"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-1.5 w-full"
                        >
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                            <Car className="h-5 w-5 text-[#CA8A04] dark:text-[#FACC15] stroke-[2.2]" />
                            <span>Annual Revenue License &amp; Passenger Insurance</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            All vans are required to maintain active Provincial Revenue Licenses and valid commercial passenger liability insurance. Vans must be equipped with working seatbelts, first aid kits, and emergency door releases.
                          </p>
                        </motion.div>
                      )}

                      {activeSafetyTab === 'telemetry' && (
                        <motion.div
                          key="telemetry"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-1.5 w-full"
                        >
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                            <Gauge className="h-5 w-5 text-[#CA8A04] dark:text-[#FACC15] stroke-[2.2]" />
                            <span>Live GPS Tracking &amp; Strict Speed Limiter Telemetry</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            School vans stream live speed and location coordinates directly to parents. The system automatically triggers warnings if speeds exceed 40 km/h in school safety corridors or if sudden route deviations occur.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom Row: 3D Yellow Action Button + Fleet Safety Officer Signature */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  {/* 3D Yellow Glass Button matching Image 2 */}
                  <Link href="/safety">
                    <button className="btn-glass-yellow-3d px-6 py-3.5 text-xs sm:text-sm tracking-tight">
                      <div className="absolute inset-x-2 top-0.5 h-[44%] rounded-full bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none" />
                      <span className="relative z-10">View Complete Safety Protocol</span>
                      <ArrowRight className="relative z-10 h-4 w-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </Link>

                  {/* Officer Signature Block (from Image 1 template) */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs">
                        <Image
                          src="/images/safety-charter-driver-kids.jpg"
                          alt="Sunil Jayasuriya"
                          fill
                          sizes="36px"
                          className="object-cover object-[68%_22%]"
                        />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                          Sunil Jayasuriya
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block leading-tight">
                          Head of Fleet Safety
                        </span>
                      </div>
                    </div>

                    {/* Handwritten Cursive Signature Graphic */}
                    <div className="pl-3 border-l border-slate-200 dark:border-slate-700">
                      <svg
                        className="h-8 w-24 text-slate-700 dark:text-slate-300 stroke-current opacity-85"
                        viewBox="0 0 120 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Officer Signature"
                      >
                        <path
                          d="M8 24 C18 10, 22 34, 30 16 C38 32, 48 8, 56 22 C64 32, 70 18, 82 17 C92 16, 104 14, 100 28 C88 35, 52 32, 28 30"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Diagonal Van Showcase with Overlapping Rotating Stamp Badge */}
              <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-[560px] bg-white dark:bg-slate-900">
                <div className="safety-photo-slant relative w-full h-full min-h-[380px] lg:min-h-full overflow-hidden">
                  <Image
                    src="/images/safety-charter-driver-kids.jpg"
                    alt="Verified School Van Driver and Students Beside Commuter Van"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-[55%_center] group-hover:scale-103 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Safety Badge at Bottom Right */}
                  <div className="absolute bottom-5 right-5 z-10">
                    <div className="backdrop-blur-md bg-black/85 border border-white/10 px-3.5 py-1.5 rounded-full text-white shadow-md flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-bold tracking-tight">100% Verified Fleet Standard</span>
                    </div>
                  </div>
                </div>

                {/* Overlapping Rotating Circular Stamp Badge on the Slanted Seam */}
                <div
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center justify-center w-28 h-28 rounded-full bg-white dark:bg-slate-900 border-2 border-yellow-200/90 dark:border-yellow-700/80 shadow-xl"
                  style={{ left: '4%' }}
                >
                  <svg className="w-full h-full animate-[spin_18s_linear_infinite]" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id="stampCirclePathSafety"
                        d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
                        fill="none"
                      />
                    </defs>
                    <text className="text-[8.5px] font-black uppercase tracking-[0.22em] fill-[#CA8A04] dark:fill-[#FACC15]">
                      <textPath href="#stampCirclePathSafety">EXPLORE MORE • EXPLORE MORE • </textPath>
                    </text>
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full border border-yellow-200 dark:border-yellow-700/60 bg-yellow-50 dark:bg-yellow-950/60 flex items-center justify-center shadow-xs">
                      <ArrowUpRight className="w-5 h-5 text-[#CA8A04] dark:text-[#FACC15] stroke-[2.5]" />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. ISLAND-WIDE SCHOOL DIRECTORY (DARK NAVY BLUE THEME)   */}
      {/* ======================================================== */}
      <section id="routes" className="py-20 md:py-28 border-b border-blue-900/30 bg-[#0B1528] text-white relative overflow-hidden">
        
        {/* Subtle Ambient Navy Glow Accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
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
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={cardsContainerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <motion.div key={school.id} variants={cardItemVariants} whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }} className="p-6 rounded-[26px] bg-white/[0.06] backdrop-blur-xl border border-white/[0.14] text-white shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-xl hover:border-white/30 transition-all duration-300 space-y-4 flex flex-col justify-between"
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
                        <button className="btn-glass-yellow-3d px-4 py-1.5 text-xs font-black">
                          View Vans
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>

            {/* Dropdown Toggle Button below the 3 cards */}
            {!isFiltering && dropdownSchools.length > 0 && (
              <div className="flex flex-col items-center justify-center pt-2">
                <button
                  onClick={() => setIsSchoolsDropdownOpen(!isSchoolsDropdownOpen)}
                  className="btn-glass-yellow-3d px-8 py-3.5 text-xs sm:text-sm"
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
                            <button className="btn-glass-yellow-3d px-4 py-1.5 text-xs font-black">
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
      {/* LIVE GPS TELEMETRY & PARENT EXPERIENCE SHOWCASE (PREMIUM) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 relative overflow-hidden">
        
        {/* Soft Ambient Texture & Golden Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/5 blur-3xl rounded-full pointer-events-none" />
        
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
                    <LiveSpeedBadge />

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
                  <button className="btn-glass-yellow-3d px-8 py-3.5 sm:py-4 text-xs sm:text-sm md:text-base">
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
      {/* 8. VERIFIED PARENT & SCHOOL FEEDBACK SECTION             */}
      {/* ======================================================== */}
      <section id="feedback" className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 dark:border-slate-800 bg-[#FFFFFF] dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden">
        {/* Subtle Ambient Radial Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-10 pointer-events-none" />
        <div className="absolute -top-20 left-1/3 w-96 h-96 bg-blue-500/5 dark:bg-blue-600/5 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          {/* Top Dark Banner: "Ready To Book Your Next Ride?" (Dark Navy Blue Theme) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={sectionFadeUp}
            className="relative w-full rounded-2xl md:rounded-[28px] bg-[#0B1528] text-white overflow-hidden shadow-2xl border border-blue-900/40"
          >
            {/* Ambient Navy Glow Inside Banner */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between min-h-[140px] md:min-h-[160px] px-6 sm:px-10 md:px-14 py-8 md:py-6 gap-6">
              <div className="space-y-1.5 max-w-xl">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  Ready To Book Your Next Ride?
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/80 font-medium">
                  Verified drivers, live GPS tracking, and guaranteed student seating across Sri Lanka.
                </p>
              </div>

              
            </div>

            {/* School Van Vehicle graphic on the right edge */}
            <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[42%] md:w-[38%] pointer-events-none select-none">
              <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#0B1528] via-[#0B1528]/85 to-transparent z-10" />
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

          {/* SMOOTH SLIDING REVIEWS CAROUSEL */}
          <div
            className="relative group/carousel pt-1"
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
              {filteredFeedbackList.map((t) => {
                const isExpanded = expandedReviewId === t.id;
                return (
                  <div
                    key={t.id}
                    style={{ scrollSnapAlign: 'start' }}
                    className={`min-w-[290px] sm:min-w-[340px] max-w-[360px] flex-shrink-0 rounded-2xl bg-white dark:bg-slate-900 border ${
                      (t as any).isNew 
                        ? 'border-emerald-400 ring-2 ring-emerald-400/20' 
                        : 'border-slate-200/90 dark:border-slate-800'
                    } p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group`}
                  >
                    {/* Micro-dot pattern */}
                    <div
                      className="absolute inset-0 opacity-[0.35] pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(#94a3b8 1.1px, transparent 1.1px)',
                        backgroundSize: '14px 14px',
                      }}
                    />

                    <div className="relative z-10 space-y-3.5">
                      {/* New Review Flag */}
                      {(t as any).isNew && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Just Added • Verified Parent</span>
                        </div>
                      )}

                      {/* Card Top: Avatar, Name & Google G Logo */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 rounded-full ${t.avatarBg} text-white font-black text-sm flex items-center justify-center shadow-xs flex-shrink-0`}>
                            {t.initial}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-extrabold text-slate-950 dark:text-white truncate">
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

                      {/* Stars + Verified Check + Category Badge */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5 text-[#FACC15]">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#FACC15] text-[#FACC15]" />
                            ))}
                          </div>
                          <span
                            className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#1A73E8] text-white flex-shrink-0 shadow-xs"
                            title="Verified Google Review"
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                          </span>
                        </div>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {(t as any).category || 'Parent Review'}
                        </span>
                      </div>

                      {/* Route Info */}
                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#CA8A04] shrink-0" />
                        <span className="truncate">{t.district}</span>
                      </p>

                      {/* Review Text */}
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed pt-0.5">
                        {isExpanded ? t.fullText : t.shortText}
                      </p>
                    </div>

                    {/* Footer: Read more & Date */}
                    <div className="relative z-10 pt-3 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
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

            {/* Trustindex Verification Footer */}
            <div className="flex justify-between items-center pt-3 text-xs text-slate-500">
              <span className="text-xs text-slate-400">Swipe or click arrows to explore parent stories</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#00875A] text-white text-xs font-bold shadow-sm tracking-wide">
                <span>Verified by Trustindex</span>
                <Info className="w-3.5 h-3.5 opacity-80" />
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE LEAVE FEEDBACK MODAL DIALOG                  */}
        {/* ======================================================== */}
        <AnimatePresence>
          {isFeedbackModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !feedbackSubmitted && setIsFeedbackModalOpen(false)}
                className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden z-10 p-6 sm:p-8"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsFeedbackModalOpen(false)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {feedbackSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-950 dark:text-white">
                      Thank You For Your Feedback!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xs mx-auto leading-relaxed">
                      Your verified review has been posted. It helps other Sri Lankan parents make safer school transport choices.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4 sm:space-y-5">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#CA8A04] dark:text-[#FACC15]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>Verified Community Review</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                        Rate Your School Commute
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Help us maintain the highest safety standard for students across Sri Lanka.
                      </p>
                    </div>

                    {/* Star Rating Selector */}
                    <div className="space-y-1.5 pt-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        Your Overall Experience Rating
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFeedbackRating(star)}
                            onMouseEnter={() => setFeedbackHoverRating(star)}
                            onMouseLeave={() => setFeedbackHoverRating(null)}
                            className="p-1 transition-transform hover:scale-110 cursor-pointer"
                          >
                            <Star
                              className={`w-7 h-7 ${
                                star <= (feedbackHoverRating || feedbackRating)
                                  ? 'fill-[#FACC15] text-[#FACC15]'
                                  : 'text-slate-300 dark:text-slate-700'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-black text-slate-900 dark:text-white ml-2">
                          {(feedbackHoverRating || feedbackRating)} / 5 Stars
                        </span>
                      </div>
                    </div>

                    {/* Input: Parent Full Name */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priyantha Silva"
                        value={feedbackForm.name}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FACC15]"
                      />
                    </div>

                    {/* Two-column: School & Route */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          Child&apos;s School
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Royal College, Colombo 07"
                          value={feedbackForm.school}
                          onChange={(e) => setFeedbackForm({ ...feedbackForm, school: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FACC15]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          Commute Route
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Malabe &amp; Rajagiriya"
                          value={feedbackForm.route}
                          onChange={(e) => setFeedbackForm({ ...feedbackForm, route: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FACC15]"
                        />
                      </div>
                    </div>

                    {/* Category Selector */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Primary Topic
                      </label>
                      <select
                        value={feedbackForm.category}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FACC15]"
                      >
                        <option value="Live GPS Tracking">Live GPS Tracking &amp; Alerts</option>
                        <option value="Driver Safety &amp; Vetting">Driver Safety &amp; Vetting</option>
                        <option value="Female Matron Care">Female Matron Care</option>
                        <option value="Punctuality &amp; Routes">Punctuality &amp; Routes</option>
                      </select>
                    </div>

                    {/* Feedback Comments Textarea */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Your Feedback / Review *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Share your experience regarding driver punctuality, vehicle comfort, or the tracking experience..."
                        value={feedbackForm.comment}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FACC15] resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn-glass-yellow-3d w-full py-3.5 text-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Verified Feedback</span>
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* 11. VERIFIED SCHOOL FLEET / WHO WE ARE (DRIVER ROSTER)   */}
      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* VERIFIED SCHOOL FLEET (PREVIOUS SECTION TEMPLATE)        */}
            {/* ======================================================== */}
      {/* 11. VERIFIED SCHOOL FLEET / WHO WE ARE (DRIVER ROSTER)   */}
      {/* ======================================================== */}
      <section id="fleet" className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/90 dark:border-slate-800 bg-[#FFFFFF] dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden">
        
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-10 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
          
          {/* Header Row: Title & Eyebrow on Left (3rd image button removed as requested) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl text-left">
              <div className="inline-block">
                <span className="px-3.5 py-1 rounded-full border border-yellow-400/40 text-yellow-800 dark:text-[#FFC928] text-xs font-bold tracking-wider uppercase bg-yellow-50/90 dark:bg-yellow-950/40 shadow-2xs inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#CA8A04] dark:text-[#FFC928]" />
                  Verified School Fleet
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.15] text-slate-950 dark:text-white">
                Meet Sri Lanka&apos;s <span className="text-[#CA8A04] dark:text-[#FFC928]">Most Trusted</span>
                <br />
                <span className="text-[#CA8A04] dark:text-[#FFC928]">Drivers</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl">
                Vetted professionals with stellar safety records, licensed passenger vehicles, and genuine parental endorsements.
              </p>
            </div>
          </div>

          {/* Cards Grid: Left Fleet Showcase + Right Driver Slideshow */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left Column (Fleet Showcase Card - White Background) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-[0_20px_50px_-15px_rgba(11,21,40,0.06)] flex flex-col justify-between space-y-4 text-left"
            >
              {/* Photo Showcase Container */}
              <div className="relative w-full h-80 sm:h-96 lg:h-[390px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
                <Image
                  src="/images/verified-fleet-team.jpg"
                  alt="SchoolRide LK Verified Fleet Team"
                  fill
                  priority
                  className="object-cover object-center"
                />
                
                {/* Top-Left Top Rated Driver Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <div className="backdrop-blur-md bg-white/95 border border-[#F59E0B]/40 px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 text-slate-900 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#CA8A04]" />
                    <span>Top Rated Fleet</span>
                  </div>
                </div>

                {/* Bottom Overlay Pill with Fleet Standards */}
                <div className="absolute bottom-3.5 inset-x-3.5 z-10">
                  <div className="backdrop-blur-md bg-[#0B1528]/85 border border-white/20 px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold">250+ Vetted Operators</span>
                    </div>
                    <span className="text-[#FFC928] font-bold text-[11px]">Strict Safety Charter</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Fleet Charter Row */}
              <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Clearance</span>
                  <span className="text-xs font-extrabold text-[#0B1528] block mt-0.5">100% Police Vetted</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Comfort</span>
                  <span className="text-xs font-extrabold text-[#0B1528] block mt-0.5">Dual Factory A/C</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Speed Lock</span>
                  <span className="text-xs font-extrabold text-[#0B1528] block mt-0.5">40 km/h Governed</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Single Driver Details Card with Slideshow (White Background) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={sectionFadeUp}
              className="lg:col-span-6 rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-[0_20px_50px_-15px_rgba(11,21,40,0.06)] flex flex-col justify-between space-y-4 text-left relative"
              onMouseEnter={() => setIsFleetHovered(true)}
              onMouseLeave={() => setIsFleetHovered(false)}
            >
              {/* Top Header Row with Active Roster Tag & Slideshow Controls */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Verified Driver Roster
                  </span>
                </div>

                {/* Slideshow Controls: Counter + Prev / Next Arrows */}
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    0{activeFleetSlide + 1} / 0{verifiedFleetDrivers.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setActiveFleetSlide((prev) =>
                          prev === 0 ? verifiedFleetDrivers.length - 1 : prev - 1
                        )
                      }
                      aria-label="Previous Driver"
                      className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveFleetSlide((prev) => (prev + 1) % verifiedFleetDrivers.length)
                      }
                      aria-label="Next Driver"
                      className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Animated Single Driver Card Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFleetSlide}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4 flex-1 flex flex-col justify-between"
                >
                  {/* Driver Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#FFE57F] to-[#FACC15] text-slate-950 font-black text-lg flex items-center justify-center shadow-sm border border-amber-300">
                          {verifiedFleetDrivers[activeFleetSlide].initials}
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg sm:text-xl font-bold text-[#0B1528] tracking-tight">
                            {verifiedFleetDrivers[activeFleetSlide].name}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300/80 text-amber-900 text-[10px] font-bold inline-flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-amber-700" />
                            Verified
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {verifiedFleetDrivers[activeFleetSlide].experience} · {verifiedFleetDrivers[activeFleetSlide].suburb}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold shrink-0">
                      <Star className="w-3.5 h-3.5 fill-[#CA8A04] text-[#CA8A04]" />
                      <span>{verifiedFleetDrivers[activeFleetSlide].rating} ({verifiedFleetDrivers[activeFleetSlide].reviewsCount})</span>
                    </div>
                  </div>

                  {/* Vehicle Specs Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">VEHICLE</span>
                      <span className="text-xs sm:text-sm font-bold text-[#0B1528] block mt-0.5 truncate">
                        {verifiedFleetDrivers[activeFleetSlide].vehicle}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">PLATE & STATUS</span>
                      <div className="flex items-center justify-between gap-1 mt-0.5">
                        <span className="text-xs sm:text-sm font-mono font-bold text-[#0B1528]">
                          {verifiedFleetDrivers[activeFleetSlide].plate}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                          {verifiedFleetDrivers[activeFleetSlide].seatsOpen}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities & Schools */}
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-500 uppercase tracking-wider">Features</span>
                      <span className="text-slate-600 font-medium truncate max-w-[280px]">
                        {verifiedFleetDrivers[activeFleetSlide].amenities.join(' · ')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-200/60">
                      <span className="font-bold text-slate-500 uppercase tracking-wider">Schools</span>
                      <span className="text-slate-600 font-medium truncate max-w-[280px]">
                        {verifiedFleetDrivers[activeFleetSlide].schoolsServed.join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Monthly Fee & Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">MONTHLY SEAT FEE</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-lg sm:text-xl font-black text-[#0B1528]">
                          {verifiedFleetDrivers[activeFleetSlide].monthlyRate}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">/ month</span>
                      </div>
                    </div>

                    <Link href="/drivers">
                      <button className="btn-glass-yellow-3d px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 cursor-pointer">
                        {verifiedFleetDrivers[activeFleetSlide].ctaText} →
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Indicator Dots */}
              <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-100">
                {verifiedFleetDrivers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFleetSlide(idx)}
                    aria-label={`Go to driver ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeFleetSlide === idx
                        ? 'w-6 bg-[#FACC15]'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>


<section id="faq" className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200/90 dark:border-slate-800">
        
        {/* Background Artwork Layer (Ultra-HD School Van & Students Photo) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/faq-school-van-bg-hd.jpg"
            alt="SchoolRide LK verified driver and students with yellow school commuter van"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-right lg:object-[70%_center]"
          />
          {/* Subtle gradient wash behind the question card for crystal-clear readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent dark:from-slate-950/95 dark:via-slate-950/85 dark:to-transparent lg:w-[56%] pointer-events-none" />
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
                  <button className="btn-glass-yellow-3d px-8 py-3 text-xs sm:text-sm">
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