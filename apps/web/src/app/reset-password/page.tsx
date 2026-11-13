'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Input } from '@/components/ui/input';
import { Lock, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!token) {
      const msg = 'Missing or invalid password reset token.';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (newPassword.length < 8) {
      const msg = 'New password must be at least 8 characters long.';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (newPassword !== confirmPassword) {
      const msg = 'Passwords do not match.';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/auth/reset-password', {
        token,
        newPassword,
      });

      setIsSuccess(true);
      toast.success('Your password has been successfully reset.');
    } catch (err: any) {
      const msg = err?.message || 'Failed to reset password. The link may have expired.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card-white rounded-[28px] p-6 sm:p-8 shadow-2xl">
      {isSuccess ? (
        <div className="text-center space-y-4 py-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-black text-[#0B1528]">Password Reset Complete</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Your account password has been updated securely. You can now sign in with your new credentials.
          </p>

          <div className="pt-2">
            <Link
              href="/login"
              className="btn-glass-yellow-3d w-full py-3 text-xs sm:text-sm font-black inline-flex items-center justify-center"
            >
              Sign In to Account
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {!token && (
            <div role="alert" className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
              <span>Reset token missing from URL. Request a new link from Forgot Password.</span>
            </div>
          )}

          {errorMessage && (
            <div role="alert" className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="reset-new-password" className="block text-xs font-bold uppercase tracking-wider text-[#0B1528]">
              New Password (Min 8 Characters) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="reset-new-password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="pl-10 rounded-2xl bg-white border-slate-200 text-[#0B1528] focus:ring-2 focus:ring-[#FACC15]"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reset-confirm-password" className="block text-xs font-bold uppercase tracking-wider text-[#0B1528]">
              Confirm New Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="reset-confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="pl-10 rounded-2xl bg-white border-slate-200 text-[#0B1528] focus:ring-2 focus:ring-[#FACC15]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !token}
            className="btn-glass-yellow-3d w-full py-3 text-xs sm:text-sm font-black disabled:opacity-60"
          >
            {isSubmitting ? 'Updating Password...' : 'Reset Password'}
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
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[82vh] w-full dashboard-navy-yellow-bg flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 relative z-10">
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
            Create New Password
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/80">
            Enter your new secure password to restore access to your SchoolRide LK account.
          </p>
        </div>

        <React.Suspense fallback={<div className="h-64 rounded-[28px] bg-white/50 animate-pulse" />}>
          <ResetPasswordForm />
        </React.Suspense>
      </div>
    </div>
  );
}
