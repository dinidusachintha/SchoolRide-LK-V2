'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Car,
  KeyRound,
  CheckCircle2,
  Star
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
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);

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
      setErrorMessage('Please enter both email and password.');
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

  // Quick switch helpers for testing
  const selectQuickRole = (roleEmail: string, rolePass: string, roleName: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setSelectedRole(roleName);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-black text-white flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden select-none">
      
      {/* Centered Max-Width Showcase Container */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Visual Brand Showcase Card (Desktop Only) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex lg:col-span-5 flex-col justify-between h-full min-h-[580px] rounded-[32px] overflow-hidden border border-white/[0.16] shadow-[0_24px_64px_rgba(0,0,0,0.7)] bg-white/[0.04] backdrop-blur-2xl relative p-8 text-left"
        >
          {/* Background Image with Crisp Dark Overlay */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/safety-parent-child.jpg"
              alt="Safe School Travel in Sri Lanka"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center brightness-[0.45] contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          {/* Top Brand Pill & Mission */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <div className="bg-[#14532D] px-3.5 py-1.5 rounded-xl inline-flex items-center shadow-md">
                <Image
                  src="/logo.png"
                  alt="SchoolRide LK"
                  width={150}
                  height={30}
                  className="h-7 w-auto object-contain"
                />
              </div>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" />
              <span>Verified School Transport Network</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              Safe, Reliable &amp; <br />
              <span className="text-[#16A34A]">Punctual Rides</span> for <br />
              Your Children.
            </h2>
          </div>

          {/* Bottom Floating Glass Card Showcase */}
          <div className="space-y-3 pt-6">
            <div className="p-4 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.18] shadow-lg space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Live Telemetry Active</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#FACC15]">
                  <Star className="h-3.5 w-3.5 fill-[#FACC15]" />
                  <span>4.98 Rating</span>
                </div>
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-normal">
                Sub-second GPS vehicle speed, doorstep ETA alerts, and strict school zone limit enforcement.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-white/70 px-1">
              <span className="flex items-center gap-1.5">✓ 100% Vetted Drivers</span>
              <span className="flex items-center gap-1.5">✓ Police Cleared</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: The Main Glassmorphic Sign-In Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 w-full max-w-md mx-auto"
        >
          <div className="relative rounded-[32px] overflow-hidden border border-white/[0.18] shadow-[0_24px_64px_rgba(0,0,0,0.7)] bg-white/[0.06] backdrop-blur-2xl p-6 sm:p-9 text-left">
            
            {/* Top Specular Rim Light */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            {/* Mobile Logo & Header */}
            <div className="space-y-3 pb-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="inline-block group">
                  <div className="bg-[#14532D] px-3.5 py-1.5 rounded-xl inline-flex items-center shadow-md">
                    <Image
                      src="/logo.png"
                      alt="SchoolRide LK"
                      width={140}
                      height={28}
                      className="h-6.5 w-auto object-contain"
                    />
                  </div>
                </Link>

                <div className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-white/80">
                  Secure Portal
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Welcome back
                </h1>
                <p className="text-xs sm:text-sm text-white/70 mt-1 font-normal">
                  Sign in to access real-time tracking, student rosters &amp; bookings.
                </p>
              </div>
            </div>

            {/* 1-Click Instant Demo Role Selector */}
            <div className="pt-5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white/90 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#FACC15]" />
                  <span>Quick Demo Profiles:</span>
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-wider">1-Click Sign In</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* 1. Parent Role */}
                <button
                  type="button"
                  onClick={() => selectQuickRole('parent@schoolride.lk', 'Password123!', 'Parent')}
                  className={`p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                    selectedRole === 'Parent'
                      ? 'border-[#FACC15] bg-white/[0.14] text-white shadow-[0_0_16px_rgba(250,204,21,0.25)]'
                      : 'border-white/15 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/30 text-white/90'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <User className="h-3 w-3 text-emerald-400" />
                    <span>Parent</span>
                  </div>
                  <div className="text-[10px] text-white/60 truncate mt-0.5">Chathura</div>
                </button>

                {/* 2. Driver Role */}
                <button
                  type="button"
                  onClick={() => selectQuickRole('sunil.driver@schoolride.lk', 'Password123!', 'Driver')}
                  className={`p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                    selectedRole === 'Driver'
                      ? 'border-[#FACC15] bg-white/[0.14] text-white shadow-[0_0_16px_rgba(250,204,21,0.25)]'
                      : 'border-white/15 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/30 text-white/90'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Car className="h-3 w-3 text-[#FACC15]" />
                    <span>Driver</span>
                  </div>
                  <div className="text-[10px] text-white/60 truncate mt-0.5">Uncle Sunil</div>
                </button>

                {/* 3. Admin Role */}
                <button
                  type="button"
                  onClick={() => selectQuickRole('admin@schoolride.lk', 'AdminPassword123!', 'Admin')}
                  className={`p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                    selectedRole === 'Admin'
                      ? 'border-[#FACC15] bg-white/[0.14] text-white shadow-[0_0_16px_rgba(250,204,21,0.25)]'
                      : 'border-white/15 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/30 text-white/90'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <KeyRound className="h-3 w-3 text-emerald-400" />
                    <span>Admin</span>
                  </div>
                  <div className="text-[10px] text-white/60 truncate mt-0.5">Platform</div>
                </button>
              </div>
            </div>

            {/* Main Login Form */}
            <form onSubmit={handleSubmit} className="pt-5 space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-200 flex items-center gap-2.5">
                  <ShieldAlert className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Email Input Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@schoolride.lk"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.06] border border-white/20 text-white placeholder:text-white/40 focus:border-[#FACC15] focus:bg-white/[0.1] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#FACC15] hover:underline font-semibold"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/[0.06] border border-white/20 text-white placeholder:text-white/40 focus:border-[#FACC15] focus:bg-white/[0.1] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none transition-all text-sm font-medium font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-sm sm:text-base shadow-lg hover:shadow-[0_0_24px_rgba(250,204,21,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-[#14532D] border-t-transparent animate-spin" />
                      <span>Authenticating...</span>
                    </span>
                  ) : (
                    <>
                      <span>Sign In to Portal</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Bottom Register Redirection */}
              <div className="pt-2 text-center text-xs text-white/70">
                <span>Don&apos;t have an account yet? </span>
                <Link
                  href="/register"
                  className="text-[#FACC15] font-bold hover:underline"
                >
                  Create an account
                </Link>
              </div>
            </form>

            {/* Bottom Security Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-[11px] text-white/50 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" /> 256-bit SSL Encrypted
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400" /> Sri Lanka National Gateway
              </span>
            </div>

          </div>
        </motion.div>

      </div>

    </div>
  );
}
