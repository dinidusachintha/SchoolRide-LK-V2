'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/lib/api-client';
import { Input } from '@/components/ui/input';
import { KeyRound, ArrowLeft, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [resetToken, setResetToken] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const res = await api.post('/auth/forgot-password', { email: trimmed });
      setIsSubmitted(true);
      if (res?.resetToken) {
        setResetToken(res.resetToken);
      }
      toast.success('Password recovery instructions sent to your email.');
    } catch (err: any) {
      const msg = err?.message || 'Failed to request password reset.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[82vh] w-full dashboard-navy-yellow-bg flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="SchoolRide LK"
              width={180}
              height={36}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Reset Account Password
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/80">
            Enter your registered email address to receive single-use recovery instructions.
          </p>
        </div>

        <div className="glass-card-white rounded-[28px] p-6 sm:p-8 shadow-2xl">
          {isSubmitted ? (
            <div className="text-center space-y-4 py-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-black text-[#0B1528]">Check Your Inbox</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                If an account exists for <strong className="text-[#0B1528]">{email}</strong>, password recovery instructions have been dispatched.
              </p>

              {resetToken && (
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-left space-y-1.5">
                  <p className="font-mono text-[11px] font-bold text-slate-600">
                    Development Environment Reset Link:
                  </p>
                  <Link
                    href={`/reset-password?token=${encodeURIComponent(resetToken)}`}
                    className="block font-mono text-[11px] font-bold text-[#0B1528] underline break-all"
                  >
                    /reset-password?token={resetToken}
                  </Link>
                </div>
              )}

              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#0B1528] hover:bg-[#071426] text-white font-bold text-xs sm:text-sm transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 text-[#FACC15]" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {errorMessage && (
                <div role="alert" className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="forgot-email" className="block text-xs font-bold uppercase tracking-wider text-[#0B1528]">
                  Registered Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    placeholder="parent@schoolride.lk"
                    className="pl-10 rounded-2xl bg-white border-slate-200 text-[#0B1528] focus:ring-2 focus:ring-[#FACC15]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glass-yellow-3d w-full py-3 text-xs sm:text-sm font-black disabled:opacity-70"
              >
                <KeyRound className="h-4 w-4" />
                <span>{isSubmitting ? 'Sending Request...' : 'Send Recovery Instructions'}</span>
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-600 hover:text-[#0B1528] inline-flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
