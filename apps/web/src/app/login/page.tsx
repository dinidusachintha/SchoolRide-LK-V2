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
  AlertCircle,
  CheckCircle2
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

  // 1-Click Demo Profiles
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
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B1528] flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden select-none">
      
      {/* Clean White Texture Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Main Container Card: Rounded Two-Column Split Layout */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10 my-4 sm:my-8 bg-white border border-slate-200/90 shadow-[0_25px_70px_rgba(11,21,40,0.08)] rounded-[32px] sm:rounded-[38px] overflow-hidden">
        
        {/* ======================================================== */}
        {/* LEFT PANEL: Showcase with White Background Van & Team    */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex lg:col-span-5 flex-col justify-between bg-gradient-to-b from-slate-50/70 via-white to-slate-50/40 text-[#0B1528] border-r border-slate-100 relative overflow-hidden"
        >
          {/* Top Content: Logo, Title, Subtitle & Feature Badges */}
          <div className="p-8 sm:p-10 space-y-6 relative z-10 text-left">
            
            {/* Dark Navy Brand Logo with Van Icon */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-7 rounded-lg border border-[#0B1528]/20 bg-[#0B1528] flex items-center justify-center p-0.5 shadow-sm">
                <svg viewBox="0 0 32 24" fill="none" className="w-6 h-4 text-[#FFC928]">
                  <path
                    d="M3 11C3 8 5 6 8 6H19C21 6 23 7.5 24 9.5L27 13C28 14.5 28.5 16 28.5 17.5V19C28.5 20 27.5 21 26.5 21H5C4 21 3 20 3 19V11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path d="M10 3H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M12 3V6M16 3V6" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 9H11V13H7V9ZM14 9H18V13H14V9ZM21 10L24 13H21V10Z" fill="currentColor" />
                  <circle cx="8" cy="21" r="2.5" fill="#0B1528" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="23" cy="21" r="2.5" fill="#0B1528" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-[#0B1528] font-sans flex items-center">
                <span>school</span>
                <span className="text-[#0B1528]">ride</span>
                <span className="text-[#CA8A04] font-black">.lk</span>
              </span>
            </Link>

            {/* Headline */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1528] text-[#FFC928] text-[11px] font-extrabold shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-[#FFC928]" />
                <span>Verified School Fleet</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0B1528] tracking-tight leading-tight">
                Safe &amp; Smart <br />
                School <span className="text-[#CA8A04]">Transport</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Real-time tracking, student rosters, bookings and more — all in one secure portal.
              </p>
            </div>

            {/* 3 Dark Navy & Gold Feature Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-[#0B1528] shadow-xs">
                <MapPin className="h-3.5 w-3.5 text-[#CA8A04]" />
                <span>Live GPS Tracking</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-[#0B1528] shadow-xs">
                <Users className="h-3.5 w-3.5 text-[#0B1528]" />
                <span>Student Rosters</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-[#0B1528] shadow-xs">
                <Calendar className="h-3.5 w-3.5 text-[#0B1528]" />
                <span>Easy Bookings</span>
              </div>
            </div>
          </div>

          {/* Bottom Integrated Photo with White Background */}
          <div className="relative w-full h-[280px] sm:h-[300px] mt-auto px-4 pb-4">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center">
              <Image
                src="/images/verified-fleet-team.jpg"
                alt="SchoolRide LK Verified Fleet and Drivers"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: Pure White Glass Sign In Card               */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 bg-white p-6 sm:p-10 flex flex-col justify-center text-left relative"
        >
          {/* Card Header: Brand Logo & Secure Portal Badge */}
          <div className="flex items-center justify-between pb-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-6 rounded-md bg-[#0B1528] flex items-center justify-center p-0.5 shadow-xs">
                <svg viewBox="0 0 32 24" fill="none" className="w-5 h-3.5 text-[#FFC928]">
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
              <span className="text-xl font-black tracking-tight text-[#0B1528] font-sans flex items-center">
                <span>school</span>
                <span>ride</span>
                <span className="text-[#CA8A04] font-black">.lk</span>
              </span>
            </Link>

            {/* Secure Portal Pill Badge in Dark Navy & Yellow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1528] text-[#FFC928] text-[11px] font-black shadow-xs">
              <Lock className="h-3 w-3 text-[#FFC928]" />
              <span>Secure Portal</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1 pt-1 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1528] tracking-tight">
              Welcome back
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Sign in to access real-time tracking, student rosters &amp; bookings.
            </p>
          </div>

          {/* Quick Demo Profiles (1-Click Sign In) */}
          <div className="space-y-2 pt-1 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0B1528] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#CA8A04]" />
                <span>Quick Demo Profiles</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                1-CLICK SIGN IN
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {/* 1. Parent Profile */}
              <button
                type="button"
                onClick={() => selectQuickRole('Parent')}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedRole === 'Parent'
                    ? 'bg-amber-50/60 border-[#FFC928] ring-2 ring-[#FFC928]/40 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-[#0B1528]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#0B1528] text-[#FFC928] flex items-center justify-center">
                    <User className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-extrabold text-[#0B1528]">Parent</span>
                </div>
                <p className="text-[10px] text-slate-500 truncate mt-1">
                  Chathura
                </p>
              </button>

              {/* 2. Driver Profile */}
              <button
                type="button"
                onClick={() => selectQuickRole('Driver')}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedRole === 'Driver'
                    ? 'bg-amber-50/60 border-[#FFC928] ring-2 ring-[#FFC928]/40 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-[#0B1528]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#0B1528] text-[#FFC928] flex items-center justify-center">
                    <Car className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-extrabold text-[#0B1528]">Driver</span>
                </div>
                <p className="text-[10px] text-slate-500 truncate mt-1">
                  Uncle Sunil
                </p>
              </button>

              {/* 3. Admin Profile */}
              <button
                type="button"
                onClick={() => selectQuickRole('Admin')}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedRole === 'Admin'
                    ? 'bg-amber-50/60 border-[#FFC928] ring-2 ring-[#FFC928]/40 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-[#0B1528]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#0B1528] text-[#FFC928] flex items-center justify-center">
                    <Settings className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-extrabold text-[#0B1528]">Admin</span>
                </div>
                <p className="text-[10px] text-slate-500 truncate mt-1">
                  Platform
                </p>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            
            {/* Error Alert if any */}
            {errorMessage && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1528] block">
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
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-white text-[#0B1528] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928] focus:border-[#FFC928] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#0B1528]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-[#0B1528] hover:text-[#CA8A04] transition-colors"
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
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-white text-[#0B1528] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928] focus:border-[#FFC928] transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button: Brand Yellow 3D with Dark Navy Text */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-glass-yellow-3d w-full py-3.5 sm:py-4 text-sm sm:text-base font-black justify-center shadow-md active:translate-y-0.5 transition-all mt-2 cursor-pointer disabled:opacity-70"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In to Portal'}</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </form>

          {/* Social Sign In Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase">
              <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => {
                selectQuickRole('Parent');
                toast.info('Signed in with Google test account (Chathura Bandara).');
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-[#0B1528] transition-all cursor-pointer shadow-2xs"
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
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-[#0B1528] transition-all cursor-pointer shadow-2xs"
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
          <div className="pt-6 text-center text-xs text-slate-500">
            Don&apos;t have an account yet?{' '}
            <Link
              href="/register"
              className="font-black text-[#0B1528] hover:text-[#CA8A04] transition-colors"
            >
              Create an account
            </Link>
          </div>
        </motion.div>

      </div>

    </div>
  );
}
