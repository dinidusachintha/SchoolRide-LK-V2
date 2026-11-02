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
    <header className="sticky top-0 z-40 w-full border-b border-slate-100/60 dark:border-slate-800 bg-white dark:bg-slate-900 backdrop-blur-md transition-all">
      <div className="w-full max-w-[1600px] mx-auto flex h-16 items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative flex items-center group-hover:scale-105 transition-transform duration-150">
            <Image
              src="/logo.png"
              alt="SchoolRide LK"
              width={180}
              height={36}
              priority
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <Link
            href="/"
            className={`transition-colors hover:text-[#094718] dark:hover:text-emerald-400 ${
              pathname === '/' ? 'text-[#094718] dark:text-emerald-400 font-bold' : ''
            }`}
          >
            Home
          </Link>
          <Link
            href="/#how-it-works"
            className="transition-colors hover:text-[#094718] dark:hover:text-emerald-400"
          >
            How it Works
          </Link>
          <Link
            href="/#routes"
            className="transition-colors hover:text-[#094718] dark:hover:text-emerald-400"
          >
            Routes
          </Link>
          <Link
            href="/safety"
            className={`transition-colors hover:text-[#094718] dark:hover:text-emerald-400 ${
              pathname === '/safety' ? 'text-[#094718] dark:text-emerald-400 font-bold' : ''
            }`}
          >
            Safety
          </Link>
          <Link
            href="/#about"
            className="transition-colors hover:text-[#094718] dark:hover:text-emerald-400"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="transition-colors hover:text-[#094718] dark:hover:text-emerald-400"
          >
            Contact
          </Link>

          {user?.role === 'PARENT' && (
            <Link
              href="/parent/dashboard"
              className="px-3 py-1 rounded-full bg-emerald-50 text-[#094718] dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-xs border border-emerald-200/60 hover:bg-emerald-100 transition-colors"
            >
              Parent Portal
            </Link>
          )}

          {user?.role === 'DRIVER' && (
            <Link
              href="/driver/dashboard"
              className="px-3 py-1 rounded-full bg-emerald-50 text-[#094718] dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-xs border border-emerald-200/60 hover:bg-emerald-100 transition-colors"
            >
              Driver Console
            </Link>
          )}

          {user?.role === 'ADMIN' && (
            <Link
              href="/admin/dashboard"
              className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20 hover:bg-primary/20 transition-colors"
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
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer select-none text-left"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20">
                    {user.fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-foreground leading-none">{user.fullName}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">{user.role.toLowerCase()}</p>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.96 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-floating z-50"
                    >
                      <div className="px-3 py-2 border-b border-border/60 mb-1">
                        <p className="text-xs font-semibold text-foreground truncate">{user.fullName}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                      </div>

                      {user.role === 'PARENT' && (
                        <>
                          <Link
                            href="/parent/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/parent/children"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            My Children
                          </Link>
                          <Link
                            href="/parent/bookings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            Bookings
                          </Link>
                          <Link
                            href="/parent/complaints"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-amber-600 hover:bg-muted/60 transition-colors"
                          >
                            Report Concern
                          </Link>
                          <Link
                            href="/parent/settings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
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
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/driver/console"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            Route Console
                          </Link>
                          <Link
                            href="/driver/bookings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            Incoming Requests
                          </Link>
                          <Link
                            href="/driver/vehicles"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            Fleet Vehicles
                          </Link>
                          <Link
                            href="/driver/onboarding"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            Verification Docs
                          </Link>
                          <Link
                            href="/driver/settings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
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
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            Control Overview
                          </Link>
                          <Link
                            href="/admin/verifications"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            Driver Verifications
                          </Link>
                          <Link
                            href="/admin/users"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            User Moderation
                          </Link>
                          <Link
                            href="/admin/schools"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            Schools Master DB
                          </Link>
                          <Link
                            href="/admin/complaints"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-amber-600 hover:bg-muted/60 transition-colors"
                          >
                            Safety Complaints
                          </Link>
                          <Link
                            href="/admin/audit-logs"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
                          >
                            Security Audit Trail
                          </Link>
                        </>
                      )}

                      <div className="border-t border-border/60 my-1" />

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
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
            <div className="flex items-center gap-2.5">
              <Link href="/login">
                <button className="px-5 py-2 text-sm font-bold text-slate-800 dark:text-slate-100 border border-slate-700/80 rounded-full hover:bg-slate-100/60 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link href="/drivers">
                <button className="px-5 py-2 text-sm font-bold text-white bg-[#094718] hover:bg-[#073612] rounded-full shadow-sm hover:shadow transition-all duration-150 flex items-center gap-1.5 cursor-pointer">
                  Book a Ride
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
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
            className="md:hidden border-b border-border bg-card px-4 pt-2 pb-6 space-y-2 overflow-hidden"
          >
            <Link
              href="/drivers"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-foreground hover:text-primary"
            >
              Find Van Drivers
            </Link>
            <Link
              href="/safety"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-foreground hover:text-primary"
            >
              Safety & Verification
            </Link>

            {user?.role === 'PARENT' && (
              <>
                <Link
                  href="/parent/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-primary"
                >
                  Parent Dashboard
                </Link>
                <Link
                  href="/parent/rides/live"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-emerald-600"
                >
                  Live Ride Tracking
                </Link>
              </>
            )}

            {user?.role === 'DRIVER' && (
              <>
                <Link
                  href="/driver/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-primary"
                >
                  Driver Portal
                </Link>
                <Link
                  href="/driver/console"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-primary"
                >
                  Ride Console
                </Link>
              </>
            )}

            {user?.role === 'ADMIN' && (
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-primary"
              >
                Admin Oversight
              </Link>
            )}

            {!user && (
              <div className="pt-4 flex gap-2">
                <Link href="/login" className="w-1/2">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" className="w-1/2">
                  <Button variant="primary" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
