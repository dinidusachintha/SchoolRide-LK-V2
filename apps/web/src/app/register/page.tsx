'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import {
  Users,
  Car,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Building2,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { SRI_LANKAN_DISTRICTS } from '@schoolride/shared';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const initialRole = searchParams.get('role') === 'DRIVER' ? 'DRIVER' : 'PARENT';
  const [activeRole, setActiveRole] = React.useState<'PARENT' | 'DRIVER'>(initialRole);

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [district, setDistrict] = React.useState('Colombo');
  const [city, setCity] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      if (activeRole === 'PARENT') {
        const payload = {
          fullName,
          email,
          phone,
          password,
          confirmPassword,
          district,
          city: city || district,
          role: 'PARENT',
        };
        const res = await api.post('/auth/register/parent', payload);
        api.setToken(res.accessToken);
        toast.success('Parent registration successful!');
        router.push('/parent/dashboard');
      } else {
        const payload = {
          fullName,
          email,
          phone,
          password,
          confirmPassword,
          district,
          role: 'DRIVER',
        };
        const res = await api.post('/auth/register/driver', payload);
        api.setToken(res.accessToken);
        toast.success('Driver account created! Please complete your onboarding.');
        router.push('/driver/onboarding');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed.');
      toast.error(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B1528] flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden select-none">
      
      {/* Clean White Texture Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Main Container Card: Rounded Two-Column Split Layout matching Login */}
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
                <span>Official Sri Lanka Registry</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0B1528] tracking-tight leading-tight">
                Safe &amp; Smart <br />
                School <span className="text-[#CA8A04]">Transport</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Join thousands of parents and verified van operators across Sri Lanka for safe, satellite-monitored student commutes.
              </p>
            </div>

            {/* 3 Dark Navy & Gold Feature Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-[#0B1528] shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-[#CA8A04]" />
                <span>5-Tier Verification</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-[#0B1528] shadow-xs">
                <MapPin className="h-3.5 w-3.5 text-[#0B1528]" />
                <span>Live GPS Telemetry</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-[#0B1528] shadow-xs">
                <Calendar className="h-3.5 w-3.5 text-[#0B1528]" />
                <span>Automated Roster</span>
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
        {/* RIGHT PANEL: Pure White Glass Registration Form Card     */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 bg-white p-6 sm:p-10 flex flex-col justify-center text-left relative"
        >
          {/* Card Header: Brand Logo & Free Registration Badge */}
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

            {/* Official Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1528] text-[#FFC928] text-[11px] font-black shadow-xs">
              <Sparkles className="h-3 w-3 text-[#FFC928]" />
              <span>Official Registry</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1 pt-1 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1528] tracking-tight">
              Create your account
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Select your role to get started with verified school transport.
            </p>
          </div>

          {/* Role Selector: Parent vs Van Operator */}
          <div className="space-y-2 pt-1 pb-4">
            <label className="text-xs font-bold text-[#0B1528] block">
              Choose Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Parent Option */}
              <button
                type="button"
                onClick={() => setActiveRole('PARENT')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  activeRole === 'PARENT'
                    ? 'bg-amber-50/60 border-[#FFC928] ring-2 ring-[#FFC928]/40 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-[#0B1528]'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  activeRole === 'PARENT' ? 'bg-[#0B1528] text-[#FFC928]' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#0B1528] block">Parent Account</span>
                  <span className="text-[10px] text-slate-500 block">Enroll children &amp; track rides</span>
                </div>
              </button>

              {/* Van Operator Option */}
              <button
                type="button"
                onClick={() => setActiveRole('DRIVER')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  activeRole === 'DRIVER'
                    ? 'bg-amber-50/60 border-[#FFC928] ring-2 ring-[#FFC928]/40 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-[#0B1528]'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  activeRole === 'DRIVER' ? 'bg-[#0B1528] text-[#FFC928]' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Car className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#0B1528] block">Van Operator</span>
                  <span className="text-[10px] text-slate-500 block">List van &amp; manage routes</span>
                </div>
              </button>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
            
            {/* Error Alert if any */}
            {errorMessage && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1528] block">
                Full Legal Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder={activeRole === 'PARENT' ? 'e.g. Chathura Silva' : 'e.g. Sunil Wickramasinghe'}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-white text-[#0B1528] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928] focus:border-[#FFC928] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Email Address & Mobile Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    placeholder="name@domain.lk"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-white text-[#0B1528] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928] focus:border-[#FFC928] transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0B1528] block">
                  Sri Lankan Mobile
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="077 123 4567"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-white text-[#0B1528] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928] focus:border-[#FFC928] transition-all shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* District & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0B1528] block">
                  Operating District
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-white text-[#0B1528] focus:outline-none focus:ring-2 focus:ring-[#FFC928] focus:border-[#FFC928] transition-all shadow-2xs cursor-pointer"
                  >
                    {SRI_LANKAN_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.province} Province)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0B1528] block">
                  City / Primary Town
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="e.g. Nugegoda / Kandy"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-white text-[#0B1528] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928] focus:border-[#FFC928] transition-all shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0B1528] block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Min 8 characters"
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

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0B1528] block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-white text-[#0B1528] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928] focus:border-[#FFC928] transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Yellow 3D CTA Button with Dark Navy Text */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-glass-yellow-3d w-full py-3.5 sm:py-4 text-sm sm:text-base font-black justify-center shadow-md active:translate-y-0.5 transition-all mt-2 cursor-pointer disabled:opacity-70"
            >
              <span>{isLoading ? 'Creating Account...' : (activeRole === 'PARENT' ? 'Register Parent Account' : 'Register as Van Operator')}</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </form>

          {/* Sign In Footer */}
          <div className="pt-6 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-black text-[#0B1528] hover:text-[#CA8A04] transition-colors"
            >
              Sign in to portal
            </Link>
          </div>
        </motion.div>

      </div>

    </div>
  );
}

export default function RegisterPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center p-8 bg-white"><div className="h-64 w-full max-w-md bg-slate-100 animate-pulse rounded-3xl" /></div>}>
      <RegisterContent />
    </React.Suspense>
  );
}
