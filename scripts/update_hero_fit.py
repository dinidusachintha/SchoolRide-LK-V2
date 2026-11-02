import os

page_path = r'SchoolRide-LK-V2\apps\web\src\app\page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = '''      {/* ======================================================== */}
      {/* 1. HERO SECTION (FULL FITTING TO BORDERS & SCREEN)       */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden w-full bg-[#FAFDF9] dark:bg-slate-950 flex flex-col justify-between pt-2 pb-6 sm:pb-8 lg:pb-10 min-h-[calc(100vh-4rem)]">
        
        {/* Soft Background Leaves at Screen Edges */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-10 sm:w-14 h-24 sm:h-28 pointer-events-none opacity-85 animate-float-slow -z-0">
          <Image
            src="/images/leaf-left-trans.png"
            alt="Foliage decoration"
            width={55}
            height={110}
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-2 right-0 w-12 sm:w-16 h-28 sm:h-36 pointer-events-none opacity-90 animate-float-reverse -z-0">
          <Image
            src="/images/leaf-right-trans.png"
            alt="Foliage decoration"
            width={65}
            height={130}
            className="object-contain"
          />
        </div>

        {/* Main Content & Artwork Row - Full Fitting */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex-1 flex flex-col justify-center">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-0 my-auto"
          >
            {/* Left Column: Heading, Subtitle, Buttons, Trust Badges */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-4 sm:space-y-5 lg:space-y-6 text-left z-10 py-2 sm:py-4">
              
              {/* Badge: [ 🛡️ Safe • Reliable • On Time ] */}
              <motion.div variants={badgeVariants} className="inline-block">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF7EE] border border-[#BCE6C9] text-xs sm:text-sm font-semibold text-[#0B4626] shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-[#0B4626]" />
                  <span>Safe • Reliable • On Time</span>
                </div>
              </motion.div>

              {/* Title: Safe & Convenient School Rides for Your Children */}
              <motion.div variants={itemVariants} className="space-y-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] font-extrabold tracking-tight text-[#0B2C22] dark:text-white leading-[1.12]">
                  Safe &amp; Convenient <br />
                  School Rides for <br />
                  <span className="relative inline-block mt-0.5">
                    Your{' '}
                    <span className="text-[#8CB02C] relative">
                      Children
                      {/* Thick yellow/lime highlight curve directly matching image */}
                      <span className="absolute left-0 -bottom-1.5 w-full h-[5px] bg-[#E3D13E] rounded-full" />
                    </span>
                  </span>
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.p
                variants={itemVariants}
                className="text-xs sm:text-sm md:text-base text-[#4E6258] dark:text-slate-300 max-w-lg leading-relaxed font-normal"
              >
                A trusted school transportation service with verified drivers, real-time tracking and complete safety care for your child.
              </motion.p>

              {/* Action Buttons: [ 📅 Book a Ride ] [ ▶ How It Works ] */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3.5 pt-1"
              >
                {/* 1. Book a Ride Button */}
                <Link href="/drivers">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs sm:text-sm md:text-base shadow-sm transition-colors cursor-pointer"
                  >
                    <CalendarDays className="h-4 w-4" />
                    <span>Book a Ride</span>
                  </motion.button>
                </Link>

                {/* 2. How It Works Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('how-it-works')}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-[#152720] dark:border-slate-300 text-[#152720] dark:text-white font-bold text-xs sm:text-sm md:text-base hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex h-4 w-4 items-center justify-center text-[#152720] dark:text-white">
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </div>
                  <span>How It Works</span>
                </motion.button>
              </motion.div>

              {/* Trust Indicators: [ 🛡️ Verified Drivers ] [ 📍 Live Tracking ] [ 🔔 Ride Updates ] */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-[#0B2C22] dark:text-slate-200 text-xs sm:text-sm font-semibold"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0B2C22]/40 text-[#0B2C22] dark:text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <span>Verified Drivers</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0B2C22]/40 text-[#0B2C22] dark:text-emerald-400">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <span>Live Tracking</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0B2C22]/40 text-[#0B2C22] dark:text-emerald-400">
                    <Bell className="h-3.5 w-3.5" />
                  </div>
                  <span>Ride Updates</span>
                </div>
              </motion.div>

            </div>

            {/* Right Column: Full Bleed Artwork Touching the Right Border */}
            <motion.div
              variants={visualVariants}
              className="lg:col-span-6 xl:col-span-7 relative w-full flex items-center justify-end -mr-4 sm:-mr-8 lg:-mr-12 xl:-mr-16"
            >
              <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[530px]">
                <Image
                  src="/images/vango-hero-right-2x.png"
                  alt="VanGo school ride service yellow van with children in uniform"
                  fill
                  priority
                  className="object-contain object-right"
                />
              </div>
            </motion.div>
          </motion.div>'''

replacement = '''      {/* ======================================================== */}
      {/* 1. HERO SECTION (FULL FITTING TO NAVBAR CORNERS & SCREEN)*/}
      {/* ======================================================== */}
      <section className="relative overflow-hidden w-full bg-[#FAFDF9] dark:bg-slate-950 flex flex-col justify-between pt-0 pb-6 sm:pb-8 lg:pb-10 min-h-[calc(100vh-4rem)]">
        
        {/* Soft Background Leaves at Screen Edges */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-10 sm:w-14 h-24 sm:h-28 pointer-events-none opacity-85 animate-float-slow -z-0">
          <Image
            src="/images/leaf-left-trans.png"
            alt="Foliage decoration"
            width={55}
            height={110}
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-2 right-0 w-12 sm:w-16 h-28 sm:h-36 pointer-events-none opacity-90 animate-float-reverse -z-0">
          <Image
            src="/images/leaf-right-trans.png"
            alt="Foliage decoration"
            width={65}
            height={130}
            className="object-contain"
          />
        </div>

        {/* Desktop Full-Bleed Artwork: Pinned directly to Navbar Corner and Right Edge with ZERO space */}
        <motion.div
          variants={visualVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:block absolute top-0 right-0 w-[56%] xl:w-[54%] 2xl:w-[51%] h-[calc(100%-130px)] max-h-[620px] pointer-events-none z-0"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/vango-hero-right-2x.png"
              alt="SchoolRide LK school ride yellow van with children in uniform"
              fill
              priority
              className="object-contain object-right-top"
            />
          </div>
        </motion.div>

        {/* Main Content & Artwork Row - Full Fitting */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex-1 flex flex-col justify-between z-10 relative">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 items-start gap-6 lg:gap-0 pt-3 sm:pt-4 lg:pt-6"
          >
            {/* Left Column: Heading, Subtitle, Buttons, Trust Badges */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-4 sm:space-y-5 lg:space-y-6 text-left py-2">
              
              {/* Badge: [ 🛡️ Safe • Reliable • On Time ] */}
              <motion.div variants={badgeVariants} className="inline-block">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF7EE] border border-[#BCE6C9] text-xs sm:text-sm font-semibold text-[#0B4626] shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-[#0B4626]" />
                  <span>Safe • Reliable • On Time</span>
                </div>
              </motion.div>

              {/* Title: Safe & Convenient School Rides for Your Children */}
              <motion.div variants={itemVariants} className="space-y-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] font-extrabold tracking-tight text-[#0B2C22] dark:text-white leading-[1.12]">
                  Safe &amp; Convenient <br />
                  School Rides for <br />
                  <span className="relative inline-block mt-0.5">
                    Your{' '}
                    <span className="text-[#8CB02C] relative">
                      Children
                      {/* Thick yellow/lime highlight curve directly matching image */}
                      <span className="absolute left-0 -bottom-1.5 w-full h-[5px] bg-[#E3D13E] rounded-full" />
                    </span>
                  </span>
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.p
                variants={itemVariants}
                className="text-xs sm:text-sm md:text-base text-[#4E6258] dark:text-slate-300 max-w-lg leading-relaxed font-normal"
              >
                A trusted school transportation service with verified drivers, real-time tracking and complete safety care for your child.
              </motion.p>

              {/* Action Buttons: [ 📅 Book a Ride ] [ ▶ How It Works ] */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3.5 pt-1"
              >
                {/* 1. Book a Ride Button */}
                <Link href="/drivers">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs sm:text-sm md:text-base shadow-sm transition-colors cursor-pointer"
                  >
                    <CalendarDays className="h-4 w-4" />
                    <span>Book a Ride</span>
                  </motion.button>
                </Link>

                {/* 2. How It Works Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('how-it-works')}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-[#152720] dark:border-slate-300 text-[#152720] dark:text-white font-bold text-xs sm:text-sm md:text-base hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex h-4 w-4 items-center justify-center text-[#152720] dark:text-white">
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </div>
                  <span>How It Works</span>
                </motion.button>
              </motion.div>

              {/* Trust Indicators: [ 🛡️ Verified Drivers ] [ 📍 Live Tracking ] [ 🔔 Ride Updates ] */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-[#0B2C22] dark:text-slate-200 text-xs sm:text-sm font-semibold"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0B2C22]/40 text-[#0B2C22] dark:text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <span>Verified Drivers</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0B2C22]/40 text-[#0B2C22] dark:text-emerald-400">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <span>Live Tracking</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0B2C22]/40 text-[#0B2C22] dark:text-emerald-400">
                    <Bell className="h-3.5 w-3.5" />
                  </div>
                  <span>Ride Updates</span>
                </div>
              </motion.div>

            </div>

            {/* Mobile / Tablet In-flow artwork (< lg) */}
            <motion.div
              variants={visualVariants}
              className="lg:hidden relative w-full h-[280px] sm:h-[360px] md:h-[420px] mt-2"
            >
              <Image
                src="/images/vango-hero-right-2x.png"
                alt="SchoolRide LK school ride yellow van with children in uniform"
                fill
                priority
                className="object-contain object-center"
              />
            </motion.div>
          </motion.div>'''

# Normalize line breaks for matching
target_norm = target.replace('\r\n', '\n')
content_norm = content.replace('\r\n', '\n')
replacement_norm = replacement.replace('\r\n', '\n')

if target_norm in content_norm:
    new_content = content_norm.replace(target_norm, replacement_norm, 1)
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Successfully updated page.tsx with full fitting hero layout!')
else:
    print('Error: Target not found in page.tsx')

