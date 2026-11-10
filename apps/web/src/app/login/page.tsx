'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Car,
  Settings,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Users,
  Calendar,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<'Parent' | 'Driver' | 'Admin' | null>(null);

  // If already logged in, redirect to appropriate role portal
  React.useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') router.push('/admin/dashboard');
      else if (user.role === 'DRIVER') router.push('/driver/dashboard');
      else router.push('/parent/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email address and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const loggedInUser = await login(email, password);
      toast.success(`Welcome back, ${loggedInUser.fullName}!`);
      if (loggedInUser.role === 'ADMIN') router.push('/admin/dashboard');
      else if (loggedInUser.role === 'DRIVER') router.push('/driver/dashboard');
      else router.push('/parent/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please verify credentials.');
      toast.error(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Click Demo Profiles matching screenshot
  const selectQuickRole = (role: 'Parent' | 'Driver' | 'Admin') => {
    setSelectedRole(role);
    setErrorMessage(null);

    if (role === 'Parent') {
      setEmail('parent@schoolride.lk');
      setPassword('Password123!');
    } else if (role === 'Driver') {
      setEmail('sunil.driver@schoolride.lk');
      setPassword('Password123!');
    } else if (role === 'Admin') {
      setEmail('admin@schoolride.lk');
      setPassword('Password123!');
    }
  };

  return (
    <div className="min-h-screen bg-[#EAF5EF] dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden select-none">
      
      {/* Background Ambience: Mint & Yellow Bokeh + Subtle Foliage & Wave Swoosh */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/50 via-teal-100/30 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-gradient-to-tl from-yellow-200/40 via-emerald-100/30 to-transparent blur-3xl pointer-events-none rounded-full" />
      
      {/* Top-Left Blurred Green Foliage Accent */}
      <div className="absolute -top-12 -left-12 w-64 h-64 pointer-events-none opacity-80 z-0">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-emerald-600/60 filter blur-[1px]">
          <path d="M20,0 C60,40 40,120 0,160 C50,150 120,100 130,50 C140,20 100,0 20,0 Z" fill="currentColor" opacity="0.6"/>
          <path d="M0,40 C80,60 120,120 80,180 C120,160 160,80 140,20 C100,20 60,30 0,40 Z" fill="#15803D" opacity="0.4"/>
          <path d="M60,0 C120,30 140,110 100,160 C140,120 180,60 150,10 C120,0 90,0 60,0 Z" fill="#166534" opacity="0.5"/>
        </svg>
      </div>

      {/* Bottom-Right Golden Yellow Ribbon Wave Swoosh matching screenshot */}
      <div className="absolute -bottom-8 -right-8 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none z-0">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
          <path
            d="M0,400 C140,390 260,340 330,240 C370,180 395,100 400,0 L400,400 Z"
            fill="url(#yellow-gradient-mesh)"
            opacity="0.85"
          />
          <path
            d="M20,400 C150,390 270,335 340,230 C375,175 398,90 400,0"
            stroke="#FACC15"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.9"
          />
          <defs>
            <linearGradient id="yellow-gradient-mesh" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#FACC15" />
              <stop offset="60%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Container Card: Rounded Two-Column Split Layout */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10 my-4 sm:my-8 shadow-[0_25px_70px_rgba(15,80,45,0.12)] rounded-[32px] sm:rounded-[38px] overflow-hidden">
        
        {/* ======================================================== */}
        {/* LEFT PANEL: Rich Emerald Showcase with Kids & School Van */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex lg:col-span-6 flex-col justify-between bg-gradient-to-b from-[#137446] via-[#10693E] to-[#0D5733] text-white relative overflow-hidden"
        >
          {/* Top Yellow Arc Accent Curve matching screenshot */}
          <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <path d="M0,0 C60,0 100,40 100,100" stroke="#FACC15" strokeWidth="4" opacity="0.85" />
              <path d="M15,0 C65,0 100,35 100,85" stroke="#FDE047" strokeWidth="1.5" opacity="0.5" />
            </svg>
          </div>

          {/* Top Content: Logo, Title, Subtitle & 3 Feature Badges */}
          <div className="p-8 sm:p-10 space-y-6 relative z-10 text-left">
            
            {/* White Brand Logo with Van Icon */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-7 rounded-md border border-white/40 bg-white/10 flex items-center justify-center p-0.5">
                <svg viewBox="0 0 32 24" fill="none" className="w-6 h-4 text-white">
                  <path
                    d="M3 11C3 8 5 6 8 6H19C21 6 23 7.5 24 9.5L27 13C28 14.5 28.5 16 28.5 17.5V19C28.5 20 27.5 21 26.5 21H5C4 21 3 20 3 19V11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path d="M10 3H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M12 3V6M16 3V6" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 9H11V13H7V9ZM14 9H18V13H14V9ZM21 10L24 13H21V10Z" fill="currentColor" />
                  <circle cx="8" cy="21" r="2.5" fill="#0D5733" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="23" cy="21" r="2.5" fill="#0D5733" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-sans flex items-center">
                <span>school</span>
                <span>ride</span>
                <span className="text-white/80 font-normal">lk</span>
              </span>
            </Link>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Safe &amp; Smart <br />
                School <span className="text-[#FACC15]">Transport</span>
              </h1>
              <p className="text-sm text-white/90 leading-relaxed max-w-sm font-normal">
                Real-time tracking, student rosters, bookings and more — all in one secure portal.
              </p>
            </div>

            {/* 3 Translucent Feature Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {/* Pill 1: Live Tracking */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-xs">
                <MapPin className="h-3.5 w-3.5 text-[#FACC15]" />
                <span>Live Tracking</span>
              </div>

              {/* Pill 2: Student Rosters */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-xs">
                <Users className="h-3.5 w-3.5 text-white" />
                <span>Student Rosters</span>
              </div>

              {/* Pill 3: Easy Bookings */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-xs">
                <Calendar className="h-3.5 w-3.5 text-white" />
                <span>Easy Bookings</span>
              </div>
            </div>
          </div>

          {/* Bottom Integrated Photo of Children & School Van */}
          <div className="relative w-full h-[320px] mt-auto overflow-hidden">
            <Image
              src="/images/login-hero-kids.jpg"
              alt="Sri Lankan School Children with Van"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            {/* Smooth Top Gradient Transition to Emerald */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#10693E] via-[#10693E]/60 to-transparent pointer-events-none" />
            
            {/* Bottom-left leaf cluster decoration overlay */}
            <div className="absolute -bottom-6 -left-6 w-36 h-36 pointer-events-none opacity-85">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-800">
                <path d="M0,100 C20,60 60,40 100,50 C80,80 40,95 0,100 Z" fill="currentColor" />
                <path d="M0,80 C30,50 70,40 90,70 C65,85 30,95 0,80 Z" fill="#15803D" opacity="0.7" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: Pure White Premium Sign In Card            */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-10 flex flex-col justify-center text-left relative"
        >
          {/* Card Header: Brand Logo & Secure Portal Badge */}
          <div className="flex items-center justify-between pb-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-6 rounded-md border border-[#16A34A]/30 bg-[#E8F5E9] dark:bg-emerald-950/60 flex items-center justify-center p-0.5">
                <svg viewBox="0 0 32 24" fill="none" className="w-5 h-3.5 text-[#16A34A]">
                  <path
                    d="M3 11C3 8 5 6 8 6H19C21 6 23 7.5 24 9.5L27 13C28 14.5 28.5 16 28.5 17.5V19C28.5 20 27.5 21 26.5 21H5C4 21 3 20 3 19V11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path d="M10 3H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M12 3V6M16 3V6" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 9H11V13H7V9ZM14 9H18V13H14V9ZM21 10L24 13H21V10Z" fill="currentColor" />
                  <circle cx="8" cy="21" r="2.5" fill="white" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="23" cy="21" r="2.5" fill="white" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white font-sans flex items-center">
                <span className="text-[#16A34A]">school</span>
                <span>ride</span>
                <span className="text-slate-500 font-normal">lk</span>
              </span>
            </Link>

            {/* Secure Portal Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/60 text-[#16A34A] border border-emerald-200/80 dark:border-emerald-800 text-[11px] font-bold shadow-xs">
              <Lock className="h-3 w-3" />
              <span>Secure Portal</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1 pt-1 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
              Sign in to access real-time tracking, student rosters &amp; bookings.
            </p>
          </div>

          {/* Quick Demo Profiles (1-Click Sign In) */}
          <div className="space-y-2 pt-1 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#EAB308]" />
                <span>Quick Demo Profiles</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                1-CLICK SIGN IN
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {/* 1. Parent Profile */}
              <button
                type="button"
                onClick={() => selectQuickRole('Parent')}
                className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedRole === 'Parent'
                    ? 'bg-[#E8F5E9] border-[#16A34A] ring-2 ring-[#16A34A]/20 shadow-xs'
                    : 'bg-[#E8F5E9]/60 hover:bg-[#E8F5E9] border-emerald-200/80 text-slate-900 dark:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center">
                    <User className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">Parent</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1">
                  Chathura
                </p>
              </button>

              {/* 2. Driver Profile */}
              <button
                type="button"
                onClick={() => selectQuickRole('Driver')}
                className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedRole === 'Driver'
                    ? 'bg-[#FEF9C3] border-[#EAB308] ring-2 ring-[#EAB308]/20 shadow-xs'
                    : 'bg-[#FEF9C3]/60 hover:bg-[#FEF9C3] border-yellow-200/80 text-slate-900 dark:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-yellow-500/20 text-[#A16207] flex items-center justify-center">
                    <Car className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">Driver</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1">
                  Uncle Sunil
                </p>
              </button>

              {/* 3. Admin Profile */}
              <button
                type="button"
                onClick={() => selectQuickRole('Admin')}
                className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedRole === 'Admin'
                    ? 'bg-[#F3E8FF] border-purple-500 ring-2 ring-purple-500/20 shadow-xs'
                    : 'bg-[#F3E8FF]/60 hover:bg-[#F3E8FF] border-purple-200/80 text-slate-900 dark:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-700 flex items-center justify-center">
                    <Settings className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">Admin</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1">
                  Platform
                </p>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            
            {/* Error Alert if any */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@schoolride.lk"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-[#16A34A] hover:text-[#15803D] hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#15803D] to-[#16A34A] hover:from-[#14532D] hover:to-[#15803D] text-white font-extrabold text-sm sm:text-base shadow-md shadow-emerald-700/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In to Portal'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Social Sign In Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase">
              <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-semibold tracking-wider">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Auth Buttons matching screenshot */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => {
                selectQuickRole('Parent');
                toast.info('Signed in with Google test account (Chathura Bandara).');
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-2xs"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Microsoft Button */}
            <button
              type="button"
              onClick={() => {
                selectQuickRole('Driver');
                toast.info('Signed in with Microsoft test account (Sunil Wickramasinghe).');
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-2xs"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
              <span>Continue with Microsoft</span>
            </button>
          </div>

          {/* Registration Footer */}
          <div className="pt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Don&apos;t have an account yet?{' ' }
            <Link
              href="/register"
              className="font-bold text-[#16A34A] hover:text-[#15803D] hover:underline transition-colors"
            >
              Create an account
            </Link>
          </div>
        </motion.div>

      </div>

    </div>
  );
}
