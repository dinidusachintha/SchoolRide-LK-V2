'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from './ui/button';
import { NotificationPopover } from './ui/notification-popover';
import { Shield, Bus, Menu, X, LogOut, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  const isActive = (path: string) => pathname === path;

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-900/40 bg-[#0B1528] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 shadow-[0_8px_32px_0_rgba(11,21,40,0.5)] supports-[backdrop-filter]:bg-[#0B1528]/95">
      {/* Frosted Glass Top Specular Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <div className="w-full max-w-[1600px] mx-auto flex h-[72px] items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16 relative">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative flex items-center transition-transform duration-150 group-hover:scale-102">
            <Image
              src="/logo.png"
              alt="SchoolRide LK"
              width={220}
              height={40}
              priority
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-white/85">
          <Link
            href="/"
            className={`transition-colors hover:text-[#FACC15] ${
              pathname === '/' ? 'text-[#FACC15] font-bold' : ''
            }`}
          >
            Home
          </Link>
          <Link
            href="/#how-it-works"
            className="transition-colors hover:text-[#FACC15]"
          >
            How it Works
          </Link>
          <Link
            href="/#routes"
            className="transition-colors hover:text-[#FACC15]"
          >
            Routes
          </Link>
          <Link
            href="/safety"
            className={`transition-colors hover:text-[#FACC15] ${
              pathname === '/safety' ? 'text-[#FACC15] font-bold' : ''
            }`}
          >
            Safety
          </Link>
          <Link
            href="/#about"
            className="transition-colors hover:text-[#FACC15]"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="transition-colors hover:text-[#FACC15]"
          >
            Contact
          </Link>

          {user?.role === 'PARENT' && (
            <Link
              href="/parent/dashboard"
              className="px-3 py-1 rounded-full bg-white/10 text-emerald-400 font-bold text-xs border border-white/20 hover:bg-white/20 transition-colors"
            >
              Parent Portal
            </Link>
          )}

          {user?.role === 'DRIVER' && (
            <Link
              href="/driver/dashboard"
              className="px-3 py-1 rounded-full bg-white/10 text-emerald-400 font-bold text-xs border border-white/20 hover:bg-white/20 transition-colors"
            >
              Driver Console
            </Link>
          )}

          {user?.role === 'ADMIN' && (
            <Link
              href="/admin/dashboard"
              className="px-3 py-1 rounded-full bg-[#FACC15]/20 text-[#FACC15] font-bold text-xs border border-[#FACC15]/40 hover:bg-[#FACC15]/30 transition-colors"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <NotificationPopover />

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer select-none text-left"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FACC15] text-[#14532D] font-black text-xs shadow-sm">
                    {user.fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-white leading-none">{user.fullName}</p>
                    <p className="text-[10px] text-white/70 mt-0.5 capitalize">{user.role.toLowerCase()}</p>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-white/70" />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.96 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 mt-2 w-52 rounded-xl border border-blue-900/50 bg-[#0B1528] backdrop-blur-2xl p-1.5 shadow-[0_16px_40px_rgba(11,21,40,0.6)] z-50 text-white"
                    >
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs font-semibold text-white truncate">{user.fullName}</p>
                        <p className="text-[10px] text-white/60 truncate">{user.email}</p>
                      </div>

                      {user.role === 'PARENT' && (
                        <>
                          <Link
                            href="/parent/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/parent/children"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            My Children
                          </Link>
                          <Link
                            href="/parent/bookings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Bookings
                          </Link>
                          <Link
                            href="/parent/complaints"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-amber-400 hover:bg-amber-400/10 transition-colors"
                          >
                            Report Concern
                          </Link>
                          <Link
                            href="/parent/settings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Settings & Profile
                          </Link>
                        </>
                      )}

                      {user.role === 'DRIVER' && (
                        <>
                          <Link
                            href="/driver/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/driver/console"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Route Console
                          </Link>
                          <Link
                            href="/driver/bookings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Incoming Requests
                          </Link>
                          <Link
                            href="/driver/vehicles"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Fleet Vehicles
                          </Link>
                          <Link
                            href="/driver/onboarding"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Verification Docs
                          </Link>
                          <Link
                            href="/driver/settings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Routes & Bio
                          </Link>
                        </>
                      )}

                      {user.role === 'ADMIN' && (
                        <>
                          <Link
                            href="/admin/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Control Overview
                          </Link>
                          <Link
                            href="/admin/verifications"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Driver Verifications
                          </Link>
                          <Link
                            href="/admin/users"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            User Moderation
                          </Link>
                          <Link
                            href="/admin/schools"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Schools Master DB
                          </Link>
                          <Link
                            href="/admin/complaints"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-amber-400 hover:bg-amber-400/10 transition-colors"
                          >
                            Safety Complaints
                          </Link>
                          <Link
                            href="/admin/audit-logs"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Security Audit Trail
                          </Link>
                        </>
                      )}

                      <div className="border-t border-white/10 my-1" />

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="px-5 sm:px-6 py-2.5 text-sm font-bold text-white border border-white/30 hover:border-white/70 bg-white/[0.08] hover:bg-white/[0.16] backdrop-blur-md rounded-full transition-all duration-150 cursor-pointer shadow-sm">
                  Sign In
                </button>
              </Link>
              <Link href="/drivers">
                <button className="btn-glass-yellow-3d px-5 sm:px-6 py-2.5 text-sm">
                  Book a Ride
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-blue-900/40 bg-[#0B1528] backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2.5 overflow-hidden text-white shadow-[0_16px_40px_rgba(11,21,40,0.6)]"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-white/90 hover:text-[#FACC15] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-white/90 hover:text-[#FACC15] transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="/#routes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-white/90 hover:text-[#FACC15] transition-colors"
            >
              Routes
            </Link>
            <Link
              href="/safety"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-white/90 hover:text-[#FACC15] transition-colors"
            >
              Safety
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-white/90 hover:text-[#FACC15] transition-colors"
            >
              About
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-white/90 hover:text-[#FACC15] transition-colors"
            >
              Contact
            </Link>

            {user?.role === 'PARENT' && (
              <div className="pt-2 border-t border-white/10 space-y-1">
                <Link
                  href="/parent/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-semibold text-[#FACC15]"
                >
                  Parent Dashboard
                </Link>
                <Link
                  href="/parent/rides/live"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-emerald-400"
                >
                  Live Ride Tracking
                </Link>
              </div>
            )}

            {user?.role === 'DRIVER' && (
              <div className="pt-2 border-t border-white/10 space-y-1">
                <Link
                  href="/driver/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-semibold text-[#FACC15]"
                >
                  Driver Portal
                </Link>
                <Link
                  href="/driver/console"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-emerald-400"
                >
                  Ride Console
                </Link>
              </div>
            )}

            {user?.role === 'ADMIN' && (
              <div className="pt-2 border-t border-white/10">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-semibold text-[#FACC15]"
                >
                  Admin Oversight
                </Link>
              </div>
            )}

            {!user && (
              <div className="pt-4 flex gap-3 border-t border-white/10">
                <Link href="/login" className="w-1/2" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-2.5 rounded-full border border-white/60 text-white font-bold text-sm hover:bg-white/10 transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link href="/drivers" className="w-1/2" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn-glass-yellow-3d w-full py-2.5 text-sm">
                    Book a Ride
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
