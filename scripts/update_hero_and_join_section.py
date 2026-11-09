import re

page_path = r'SchoolRide-LK-V2/apps/web/src/app/page.tsx'

with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# ==============================================================================
# 1. NEW SPLIT-SCREEN HERO SECTION (USING CURRENT MODERN SANS-SERIF PROMPT STYLE)
# ==============================================================================
s1_start_marker = '{/* ======================================================== */}\n      {/* 1. HERO SECTION'
s2_start_marker = '{/* ======================================================== */}\n      {/* 2. QUICK ROUTE MATCHER'

idx_s1 = content.find(s1_start_marker)
idx_s2 = content.find(s2_start_marker)

if idx_s1 == -1 or idx_s2 == -1:
    print('Failed to find Section 1 or Section 2 markers!')
    exit(1)

new_split_screen_hero = '''{/* ======================================================== */}
      {/* 1. HERO SECTION (SPLIT-SCREEN HERO IN MODERN SANS STYLE)   */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden w-full bg-[#FFFFFF] dark:bg-slate-950 pt-2 sm:pt-4 lg:pt-6 pb-8 sm:pb-12 lg:pb-14 border-b border-slate-200/80 dark:border-slate-800">
        
        {/* Soft Organic Background Leaf Accents */}
        <div className="absolute top-1/4 left-0 w-10 sm:w-14 h-24 sm:h-28 pointer-events-none opacity-80 animate-float-slow -z-0">
          <Image
            src="/images/leaf-left-trans.png"
            alt="Foliage decoration"
            width={55}
            height={110}
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-10 right-0 w-12 sm:w-16 h-28 sm:h-36 pointer-events-none opacity-85 animate-float-reverse -z-0">
          <Image
            src="/images/leaf-right-trans.png"
            alt="Foliage decoration"
            width={65}
            height={130}
            className="object-contain"
          />
        </div>

        {/* Ambient Subtle Radial Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-100/35 dark:bg-emerald-950/20 blur-3xl pointer-events-none -z-0" />

        {/* Main Content Container */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 space-y-6 sm:space-y-8 lg:space-y-10">
          
          {/* Main 2-Column Split-Screen Hero Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6 xl:gap-10 pt-2 sm:pt-4">
            
            {/* LEFT COLUMN: Narrative, Headline, CTAs, Trust Metrics */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-6 text-left"
            >
              {/* Badge: [ 🛡️ Safe • Reliable • On Time ] */}
              <motion.div variants={badgeVariants} className="inline-block">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF7EE] dark:bg-emerald-950/80 border border-[#BCE6C9] dark:border-emerald-800 text-xs sm:text-sm font-bold text-[#14532D] dark:text-emerald-300 shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
                  <span>Safe • Reliable • On Time</span>
                </div>
              </motion.div>

              {/* Title: Safe & Convenient School Rides for Your Children (Clean Modern Sans-Serif Font) */}
              <motion.div variants={itemVariants} className="space-y-1">
                <h1 className="text-3.5xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] 2xl:text-[58px] font-black tracking-tight text-[#1F2937] dark:text-white leading-[1.12]">
                  Safe &amp; Convenient <br />
                  School Rides for <br />
                  <span className="relative inline-block mt-0.5">
                    Your{' '}
                    <span className="text-[#16A34A] relative inline-block">
                      Children
                      {/* Smooth Yellow Highlight Curve */}
                      <svg
                        className="absolute -bottom-2.5 left-0 w-full h-3.5 text-[#FACC15] overflow-visible pointer-events-none"
                        viewBox="0 0 100 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M2 9C28 2 74 2 98 9"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </span>
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.p
                variants={itemVariants}
                className="text-xs sm:text-sm md:text-base text-[#4B5563] dark:text-slate-300 max-w-lg leading-relaxed font-normal"
              >
                A trusted school transportation service with verified drivers, real-time tracking, and complete safety care for your child across Sri Lanka.
              </motion.p>

              {/* Action Buttons: [ 📅 Book a Ride ] [ ▶ How It Works ] */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3.5 pt-1"
              >
                {/* 1. Book a Ride Button (Primary Yellow #FACC15) */}
                <Link href="/drivers">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <CalendarDays className="h-4 w-4" />
                    <span>Book a Ride</span>
                  </motion.button>
                </Link>

                {/* 2. How It Works Button (Secondary Forest Green Outline) */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('how-it-works')}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-[#14532D] text-[#14532D] dark:text-white font-bold text-xs sm:text-sm md:text-base hover:bg-[#EAF6ED] transition-colors shadow-sm cursor-pointer"
                >
                  <div className="flex h-4 w-4 items-center justify-center text-[#14532D] dark:text-white">
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </div>
                  <span>How It Works</span>
                </motion.button>
              </motion.div>

              {/* Trust Indicators: [ 🛡️ Verified Drivers ] [ 📍 Live Tracking ] [ 🔔 Ride Updates ] */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-[#1F2937] dark:text-slate-200 text-xs sm:text-sm font-semibold"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF6ED] text-[#14532D] border border-[#D0EAD6]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" />
                  </div>
                  <span>Verified Drivers</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF6ED] text-[#14532D] border border-[#D0EAD6]">
                    <MapPin className="h-3.5 w-3.5 text-[#16A34A]" />
                  </div>
                  <span>Live Tracking</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF6ED] text-[#14532D] border border-[#D0EAD6]">
                    <Bell className="h-3.5 w-3.5 text-[#16A34A]" />
                  </div>
                  <span>Ride Updates</span>
                </div>
              </motion.div>

            </motion.div>

            {/* RIGHT COLUMN: Yellow School Van Artwork with Dynamic Floating Badges */}
            <motion.div
              variants={visualVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 xl:col-span-6 relative w-full flex items-center justify-center"
            >
              <div className="relative w-full aspect-[1228/798] max-w-[620px] lg:max-w-none">
                
                {/* School Ride Van Artwork */}
                <Image
                  src="/images/vango-hero-right-2x.png"
                  alt="SchoolRide LK school ride yellow van with children in uniform"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-center lg:object-right"
                />

                {/* Floating Micro-Badge 1: Live Telemetry Pulse */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.45 }}
                  className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20 flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-[0_8px_20px_rgba(20,83,45,0.12)]"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16A34A]"></span>
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-[#1F2937] dark:text-emerald-300">
                    Live GPS Active • 38 km/h
                  </span>
                </motion.div>

                {/* Floating Micro-Badge 2: 100% Verified Drivers */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.45 }}
                  className="absolute bottom-4 sm:bottom-6 left-2 sm:left-6 z-20 flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-[0_10px_24px_rgba(20,83,45,0.14)]"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#14532D]">
                    <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-[#1F2937] dark:text-white leading-tight">100% Vetted Drivers</p>
                    <p className="text-[10px] text-[#4B5563] dark:text-slate-400">Police &amp; Vehicle Cleared</p>
                  </div>
                </motion.div>

                {/* Floating Micro-Badge 3: Parent Trust Score */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.45 }}
                  className="absolute bottom-2 sm:bottom-4 right-2 sm:right-6 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                >
                  <Star className="h-3.5 w-3.5 fill-[#FACC15] text-[#FACC15]" />
                  <span className="text-[11px] sm:text-xs font-bold text-[#1F2937] dark:text-slate-200">
                    4.98 ★ <span className="text-[#4B5563] dark:text-slate-400 font-normal">(2,400+ Families)</span>
                  </span>
                </motion.div>

              </div>
            </motion.div>

          </div>

          {/* ======================================================== */}
          {/* BOTTOM 4 FEATURE CARDS (WHITE CARDS WITH SUBTLE BORDERS) */}
          {/* ======================================================== */}
          <motion.div
            variants={cardsContainerVariants}
            initial="hidden"
            animate="visible"
            className="w-full pt-2 sm:pt-4 z-20 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 xl:gap-6">
              
              {/* Card 1: Book a Ride */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/drivers"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.08)] hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#16A34A] shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <CalendarDays className="h-6 w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-[15px] sm:text-base font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400 transition-colors leading-snug flex items-center gap-1.5">
                      <span>Book a Ride</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#16A34A]" />
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                      Reserve a school ride in a few simple steps.
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Card 2: View Routes */}
              <motion.div variants={cardItemVariants}>
                <button
                  type="button"
                  onClick={() => scrollToSection('routes')}
                  className="w-full text-left group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.08)] hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#16A34A] shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <Navigation className="h-6 w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-[15px] sm:text-base font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400 transition-colors leading-snug flex items-center gap-1.5">
                      <span>View Routes</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#16A34A]" />
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                      Check available routes and pickup points.
                    </p>
                  </div>
                </button>
              </motion.div>

              {/* Card 3: Child Safety */}
              <motion.div variants={cardItemVariants}>
                <button
                  type="button"
                  onClick={() => scrollToSection('safety')}
                  className="w-full text-left group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.08)] hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#16A34A] shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <ShieldCheck className="h-6 w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-[15px] sm:text-base font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400 transition-colors leading-snug flex items-center gap-1.5">
                      <span>Child Safety</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#16A34A]" />
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                      Background-checked drivers and safety rules.
                    </p>
                  </div>
                </button>
              </motion.div>

              {/* Card 4: Track in Real Time */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/parent/rides/live"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 lg:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.08)] hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#16A34A] shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-[15px] sm:text-base font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400 transition-colors leading-snug flex items-center gap-1.5">
                      <span>Track in Real Time</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#16A34A]" />
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                      Follow your child's live van location on GPS map.
                    </p>
                  </div>
                </Link>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      '''

# Replace Section 1
content = content[:idx_s1] + new_split_screen_hero + content[idx_s2:]

# ==============================================================================
# 2. UPDATE "JOIN SRI LANKA'S VERIFIED SCHOOL TRANSPORT NETWORK" BACKGROUND WHITE
# ==============================================================================
join_needle = "Join Sri Lanka's Verified School Transport Network"
idx_join = content.find(join_needle)

if idx_join == -1:
    print('Failed to find Join Sri Lanka section!')
    exit(1)

sec_start = content.rfind('<section', 0, idx_join)
sec_end = content.find('</section>', idx_join) + len('</section>')

new_join_white_section = '''<section className="py-20 md:py-24 bg-[#FFFFFF] dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 text-center relative overflow-hidden">
        
        {/* Soft decorative background circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-100/40 dark:bg-emerald-950/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#FACC15]/10 blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF7EE] dark:bg-emerald-950/80 border border-[#BCE6C9] dark:border-emerald-800 text-xs sm:text-sm font-bold text-[#14532D] dark:text-emerald-300 shadow-sm">
            <Sparkles className="h-4 w-4 text-[#16A34A]" />
            <span>Join Sri Lanka's Verified School Transport Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1F2937] dark:text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Ready to give your child a <br />
            <span className="text-[#16A34A]">safer, stress-free</span> commute?
          </h2>

          <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Connect with verified school van drivers in your neighborhood, view transparent monthly rates, and track morning journeys in real-time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-3 max-w-lg mx-auto">
            <Link href="/drivers" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer">
                Book a School Ride Now
              </button>
            </Link>
            <Link href="/register?role=DRIVER" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-slate-900 border-2 border-[#14532D] text-[#14532D] dark:text-white font-bold text-sm sm:text-base hover:bg-[#EAF6ED] transition-all cursor-pointer">
                Register as Van Driver
              </button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-bold text-[#14532D] dark:text-emerald-400">
            <span className="flex items-center gap-1.5">✓ 100% Inspected Drivers</span>
            <span className="flex items-center gap-1.5">✓ Encrypted GPS Telemetry</span>
            <span className="flex items-center gap-1.5">✓ Zero Booking Surcharges</span>
          </div>
        </div>
      </section>'''

content = content[:sec_start] + new_join_white_section + content[sec_end:]

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully updated hero section to Split-Screen Hero and Join section background to White!')

