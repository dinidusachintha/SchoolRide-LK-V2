page_path = r'SchoolRide-LK-V2\apps\web\src\app\page.tsx'

with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = '''          {/* ======================================================== */}
          {/* BOTTOM 4 FEATURE CARDS (FULL WIDTH SPAN ACROSS BORDERS)  */}
          {/* ======================================================== */}
          <motion.div
            variants={cardsContainerVariants}
            initial="hidden"
            animate="visible"
            className="w-full mt-6 sm:mt-8 lg:mt-10 z-20 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
              
              {/* Card 1: Book a Ride */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/drivers"
                  className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#ECF7EE] dark:bg-emerald-950/80 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm sm:text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors leading-snug">
                      Book a Ride
                    </h4>
                    <p className="text-xs text-[#50635A] dark:text-slate-400 leading-snug font-normal">
                      Reserve a school ride in a few simple steps.
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Card 2: View Routes */}
              <motion.div variants={cardItemVariants}>
                <div
                  onClick={() => scrollToSection('routes')}
                  className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 cursor-pointer h-full"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#ECF7EE] dark:bg-emerald-950/80 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Route className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm sm:text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors leading-snug">
                      View Routes
                    </h4>
                    <p className="text-xs text-[#50635A] dark:text-slate-400 leading-snug font-normal">
                      Check available routes and pickup points.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Child Safety */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/safety"
                  className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#ECF7EE] dark:bg-emerald-950/80 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm sm:text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors leading-snug">
                      Child Safety
                    </h4>
                    <p className="text-xs text-[#50635A] dark:text-slate-400 leading-snug font-normal">
                      Background-checked drivers and safety guidelines.
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Card 4: Track in Real Time */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/parent/rides/live"
                  className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#ECF7EE] dark:bg-emerald-950/80 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm sm:text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors leading-snug">
                      Track in Real Time
                    </h4>
                    <p className="text-xs text-[#50635A] dark:text-slate-400 leading-snug font-normal">
                      Get live ride updates and arrival alerts.
                    </p>
                  </div>
                </Link>
              </motion.div>

            </div>
          </motion.div>'''

replacement = '''          {/* ======================================================== */}
          {/* BOTTOM 4 FEATURE CARDS (FULL WIDTH SPAN ACROSS BORDERS)  */}
          {/* ======================================================== */}
          <motion.div
            variants={cardsContainerVariants}
            initial="hidden"
            animate="visible"
            className="w-full mt-6 sm:mt-8 lg:mt-10 z-20 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 xl:gap-6">
              
              {/* Card 1: Book a Ride */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/drivers"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-emerald-950/[0.07] dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(9,71,24,0.08)] hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect x="3" y="4" width="18" height="18" rx="3" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <path d="m9 16 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[15px] sm:text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors leading-snug">
                      Book a Ride
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4E6258] dark:text-slate-300 leading-relaxed font-normal">
                      Reserve a school ride in a few simple steps.
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Card 2: View Routes */}
              <motion.div variants={cardItemVariants}>
                <div
                  onClick={() => scrollToSection('routes')}
                  className="group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-emerald-950/[0.07] dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(9,71,24,0.08)] hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M12 3a4.5 4.5 0 0 0-4.5 4.5c0 3 4.5 8.5 4.5 8.5s4.5-5.5 4.5-8.5A4.5 4.5 0 0 0 12 3z" />
                      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
                      <path d="M3.5 19.5h17" />
                      <circle cx="5" cy="19.5" r="1.5" fill="currentColor" />
                      <circle cx="19" cy="19.5" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[15px] sm:text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors leading-snug">
                      View Routes
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4E6258] dark:text-slate-300 leading-relaxed font-normal">
                      Check available routes and pickup points.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Child Safety */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/safety"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-emerald-950/[0.07] dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(9,71,24,0.08)] hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[15px] sm:text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors leading-snug">
                      Child Safety
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4E6258] dark:text-slate-300 leading-relaxed font-normal">
                      Background-checked drivers and safety guidelines.
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Card 4: Track in Real Time */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/parent/rides/live"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-emerald-950/[0.07] dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(9,71,24,0.08)] hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#094718] dark:text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect x="6" y="2" width="12" height="20" rx="3" />
                      <circle cx="12" cy="18" r="1" fill="currentColor" />
                      <line x1="10" y1="5" x2="14" y2="5" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[15px] sm:text-base font-bold text-[#0B2C22] dark:text-white group-hover:text-[#094718] transition-colors leading-snug">
                      Track in Real Time
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4E6258] dark:text-slate-300 leading-relaxed font-normal">
                      Get live ride updates and arrival alerts.
                    </p>
                  </div>
                </Link>
              </motion.div>

            </div>
          </motion.div>'''

target_norm = target.replace('\r\n', '\n')
content_norm = content.replace('\r\n', '\n')
replacement_norm = replacement.replace('\r\n', '\n')

if target_norm in content_norm:
    new_content = content_norm.replace(target_norm, replacement_norm, 1)
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Cards successfully updated!')
else:
    print('Target not found for cards')
