import re

page_path = r'SchoolRide-LK-V2/apps/web/src/app/page.tsx'

with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Check imports for Navigation, Clock, ChevronDown
if 'Navigation' not in content:
    content = content.replace('MapPin,', 'MapPin,\n  Navigation,')

# Add Hero States inside HomePage()
state_needle = 'export default function HomePage() {'
hero_states = '''export default function HomePage() {
  // Hero Section Template States (Uber "Go anywhere" layout on White Background)
  const [heroPickupLocation, setHeroPickupLocation] = React.useState('');
  const [heroDropoffSchool, setHeroDropoffSchool] = React.useState('');
  const [heroSchedule, setHeroSchedule] = React.useState('Pickup now');
  const [isHeroScheduleOpen, setIsHeroScheduleOpen] = React.useState(false);
  const [isHeroDistrictOpen, setIsHeroDistrictOpen] = React.useState(false);
  const [isHeroSchoolSuggestionsOpen, setIsHeroSchoolSuggestionsOpen] = React.useState(false);
  const [heroPriceEstimate, setHeroPriceEstimate] = React.useState<{
    pickup: string;
    dropoff: string;
    vanCount: number;
    monthlyRate: string;
    eta: string;
  } | null>(null);

  const handleUseCurrentLocation = () => {
    setHeroPickupLocation('Malabe Junction, Battaramulla');
  };

  const handleSeePrices = () => {
    const pickup = heroPickupLocation.trim() || 'Malabe, Battaramulla';
    const dropoff = heroDropoffSchool.trim() || 'Royal College, Colombo 07';
    setHeroPriceEstimate({
      pickup,
      dropoff,
      vanCount: 14,
      monthlyRate: 'LKR 8,500 / mo',
      eta: '25 min morning school run',
    });
  };
'''

if 'heroPickupLocation' not in content:
    content = content.replace(state_needle, hero_states, 1)

# Now replace Section 1
s1_start_marker = '{/* ======================================================== */}\n      {/* 1. HERO SECTION'
s2_start_marker = '{/* ======================================================== */}\n      {/* 2. INSTANT SCHOOL VAN FINDER'

idx1 = content.find(s1_start_marker)
idx2 = content.find(s2_start_marker)

if idx1 == -1 or idx2 == -1:
    print('Failed to find section markers! idx1:', idx1, 'idx2:', idx2)
    exit(1)

new_hero_section = '''{/* ======================================================== */}
      {/* 1. HERO SECTION (GO ANYWHERE TEMPLATE IN WHITE BACKGROUND) */}
      {/* ======================================================== */}
      <section className="relative w-full bg-[#FFFFFF] dark:bg-slate-950 pt-6 sm:pt-10 lg:pt-14 pb-10 sm:pb-14 lg:pb-16 border-b border-slate-200/80 dark:border-slate-800 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10 sm:space-y-12">

          {/* Top Split Row: Left Form & Right 4-Photo Collage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* ======================================================== */}
            {/* LEFT COLUMN: "Go anywhere" Search Form                    */}
            {/* ======================================================== */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 xl:col-span-5 space-y-5 text-left"
            >
              {/* 1. Location Indicator: 📍 Colombo, LK Change city */}
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setIsHeroDistrictOpen(!isHeroDistrictOpen)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1F2937] dark:text-slate-200 hover:text-[#14532D] transition-colors cursor-pointer select-none"
                >
                  <MapPin className="h-3.5 w-3.5 fill-[#1F2937] dark:fill-white text-[#1F2937] dark:text-white" />
                  <span>{selectedDistrict === 'All' ? 'Colombo, LK' : `${selectedDistrict}, LK`}</span>
                  <span className="text-[#6B7280] dark:text-slate-400 font-normal underline hover:text-[#1F2937] dark:hover:text-white transition-colors ml-0.5">
                    Change city
                  </span>
                </button>

                {/* Dropdown for Sri Lankan Districts */}
                {isHeroDistrictOpen && (
                  <div className="absolute left-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/90 dark:border-slate-800 py-2 z-50">
                    <div className="px-3.5 py-1 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                      Select District
                    </div>
                    {['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Galle', 'Kurunegala', 'Matara'].map((dist) => (
                      <button
                        key={dist}
                        type="button"
                        onClick={() => {
                          setSelectedDistrict(dist);
                          setIsHeroDistrictOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                          selectedDistrict === dist
                            ? 'text-[#14532D] dark:text-emerald-400 bg-[#EAF6ED] dark:bg-emerald-950/60 font-bold'
                            : 'text-[#1F2937] dark:text-slate-200'
                        }`}
                      >
                        {dist}, Sri Lanka
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Bold Headline: Go anywhere */}
              <div className="space-y-1.5">
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-black text-[#1F2937] dark:text-white tracking-tight leading-[1.08]">
                  Go anywhere
                </h1>
                <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                  Coordinating safe, punctual school transportation across Sri Lanka with verified neighborhood drivers.
                </p>
              </div>

              {/* 3. Timing Pill: 🕒 Pickup now ⌄ */}
              <div className="relative inline-block pt-0.5">
                <button
                  type="button"
                  onClick={() => setIsHeroScheduleOpen(!isHeroScheduleOpen)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3F4F6] dark:bg-slate-800 hover:bg-[#E5E7EB] dark:hover:bg-slate-700 text-[#1F2937] dark:text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer select-none"
                >
                  <Clock className="h-3.5 w-3.5 text-[#1F2937] dark:text-white" />
                  <span>{heroSchedule}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#4B5563] dark:text-slate-400" />
                </button>

                {/* Timing Dropdown */}
                {isHeroScheduleOpen && (
                  <div className="absolute left-0 mt-2 w-68 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/90 dark:border-slate-800 py-2 z-50">
                    <div className="px-3.5 py-1 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                      Schedule Type
                    </div>
                    {[
                      'Pickup now',
                      'Daily School Run (Morning & Afternoon)',
                      'Morning Pickup (6:30 AM - 7:30 AM)',
                      'Afternoon Return (1:30 PM - 3:00 PM)',
                      'Reserve for Term 2026',
                    ].map((sched) => (
                      <button
                        key={sched}
                        type="button"
                        onClick={() => {
                          setHeroSchedule(sched);
                          setIsHeroScheduleOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                          heroSchedule === sched
                            ? 'text-[#14532D] dark:text-emerald-400 bg-[#EAF6ED] dark:bg-emerald-950/60 font-bold'
                            : 'text-[#1F2937] dark:text-slate-200'
                        }`}
                      >
                        {sched}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Connected Route Inputs (Iconic Uber Connected Line on White Background) */}
              <div className="relative space-y-2 max-w-lg pt-1">
                {/* Vertical Connector Line */}
                <div className="absolute left-[18px] top-[22px] bottom-[22px] w-[2px] bg-slate-400 dark:bg-slate-600 z-10 flex flex-col justify-between items-center pointer-events-none">
                  {/* Top Dot (Solid Circle for Pickup) */}
                  <div className="h-2.5 w-2.5 rounded-full bg-[#1F2937] dark:bg-white ring-2 ring-[#F3F4F6] dark:ring-slate-800 -mt-0.5" />
                  {/* Bottom Dot (Solid Square for Dropoff) */}
                  <div className="h-2.5 w-2.5 bg-[#1F2937] dark:bg-white ring-2 ring-[#F3F4F6] dark:ring-slate-800 -mb-0.5" />
                </div>

                {/* Pickup Location Input */}
                <div className="relative pl-11 pr-11 py-3.5 bg-[#F3F4F6] dark:bg-slate-850 hover:bg-[#EAECEF] dark:hover:bg-slate-800 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-[#14532D] rounded-xl transition-all shadow-xs">
                  <input
                    type="text"
                    value={heroPickupLocation}
                    onChange={(e) => setHeroPickupLocation(e.target.value)}
                    placeholder="Pickup location"
                    className="w-full text-sm font-semibold text-[#1F2937] dark:text-white placeholder-[#6B7280] dark:placeholder-slate-400 bg-transparent outline-none"
                  />
                  {/* GPS Locator Arrow on right */}
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    title="Use current Sri Lanka location"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4B5563] dark:text-slate-400 hover:text-[#14532D] dark:hover:text-emerald-400 p-1 transition-colors cursor-pointer"
                  >
                    <Navigation className="h-4 w-4 fill-current rotate-45" />
                  </button>
                </div>

                {/* Dropoff Location Input */}
                <div className="relative pl-11 pr-4 py-3.5 bg-[#F3F4F6] dark:bg-slate-850 hover:bg-[#EAECEF] dark:hover:bg-slate-800 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-[#14532D] rounded-xl transition-all shadow-xs">
                  <input
                    type="text"
                    value={heroDropoffSchool}
                    onChange={(e) => {
                      setHeroDropoffSchool(e.target.value);
                      setIsHeroSchoolSuggestionsOpen(true);
                    }}
                    onFocus={() => setIsHeroSchoolSuggestionsOpen(true)}
                    placeholder="Dropoff location"
                    className="w-full text-sm font-semibold text-[#1F2937] dark:text-white placeholder-[#6B7280] dark:placeholder-slate-400 bg-transparent outline-none"
                  />
                </div>

                {/* School Quick Autocomplete Dropdown */}
                {isHeroSchoolSuggestionsOpen && (
                  <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-3 z-50 max-h-60 overflow-y-auto">
                    <div className="flex items-center justify-between px-2 pb-2 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                      <span>Suggested Schools</span>
                      <button
                        type="button"
                        onClick={() => setIsHeroSchoolSuggestionsOpen(false)}
                        className="text-[#14532D] dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                    <div className="space-y-1">
                      {schoolsData.slice(0, 5).map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setHeroDropoffSchool(`${s.name}, ${s.location}`);
                            setIsHeroSchoolSuggestionsOpen(false);
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-[#EAF6ED] dark:hover:bg-slate-800 transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <p className="text-xs font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400">
                              {s.name}
                            </p>
                            <p className="text-[11px] text-[#6B7280] dark:text-slate-400">
                              {s.location}
                            </p>
                          </div>
                          <span className="text-[11px] font-extrabold text-[#16A34A] bg-[#EAF6ED] dark:bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-200/60">
                            {s.vansCount} Vans
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Buttons Row: [ See prices ]   Log in to check your activity */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={handleSeePrices}
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#1F2937] hover:bg-black dark:bg-white dark:text-[#1F2937] dark:hover:bg-slate-200 text-white font-bold text-xs sm:text-sm md:text-base shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer"
                >
                  See prices
                </button>

                <Link
                  href="/login"
                  className="text-xs sm:text-sm font-semibold text-[#1F2937] dark:text-slate-200 underline hover:text-[#14532D] dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Log in to check your activity
                </Link>
              </div>

              {/* Dynamic Rate Estimate Drawer (Live Calculation) */}
              {heroPriceEstimate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-[#EAF6ED] dark:bg-emerald-950/60 border border-[#BCE6C9] dark:border-emerald-800 space-y-2 max-w-lg shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14532D] dark:text-emerald-300">
                    <span>{heroPriceEstimate.pickup} → {heroPriceEstimate.dropoff}</span>
                    <span className="text-base font-black text-[#14532D] dark:text-emerald-200">
                      {heroPriceEstimate.monthlyRate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#4B5563] dark:text-slate-300">
                    <span>{heroPriceEstimate.vanCount} Verified Vans • {heroPriceEstimate.eta}</span>
                    <Link
                      href={`/drivers?pickup=${encodeURIComponent(heroPriceEstimate.pickup)}&school=${encodeURIComponent(heroPriceEstimate.dropoff)}`}
                      className="font-bold text-[#14532D] dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>Book Seat Now</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}

            </motion.div>

            {/* ======================================================== */}
            {/* RIGHT COLUMN: 4-Photo Collage with Bottom Floating Card   */}
            {/* ======================================================== */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 xl:col-span-7 relative"
            >
              <div className="relative w-full max-w-[640px] mx-auto rounded-[32px] overflow-hidden p-1 sm:p-2 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                
                {/* 2x2 Photography Collage Grid */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                  
                  {/* Tile 1: Top-Left (Kids walking to school van) */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group shadow-sm">
                    <Image
                      src="/images/kids-walking-focus.jpg"
                      alt="Sri Lankan students with backpacks ready for school"
                      fill
                      priority
                      sizes="(max-width: 1024px) 50vw, 320px"
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Tile 2: Top-Right (Verified Driver Portrait) */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group shadow-sm">
                    <Image
                      src="/images/verified-driver-portrait.jpg"
                      alt="Verified SchoolRide LK driver"
                      fill
                      priority
                      sizes="(max-width: 1024px) 50vw, 320px"
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {/* Top Floating Mini-Badge */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-[10px] font-bold text-[#14532D] dark:text-emerald-400 shadow-xs">
                        <ShieldCheck className="h-3 w-3 text-[#16A34A]" />
                        100% Vetted
                      </span>
                    </div>
                  </div>

                  {/* Tile 3: Bottom-Left (Safety Parent & Child) */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group shadow-sm">
                    <Image
                      src="/images/safety-parent-child.jpg"
                      alt="Parent sending child to school safely"
                      fill
                      sizes="(max-width: 1024px) 50vw, 320px"
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Tile 4: Bottom-Right (School Van Fleet) */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group shadow-sm">
                    <Image
                      src="/images/vango-van-kids.jpg"
                      alt="Comfortable school van fleet in Sri Lanka"
                      fill
                      sizes="(max-width: 1024px) 50vw, 320px"
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                </div>

                {/* ======================================================== */}
                {/* FLOATING BANNER: "Ready to travel? Schedule ahead"        */}
                {/* ======================================================== */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 rounded-2xl bg-[#1F2937]/90 dark:bg-black/90 backdrop-blur-md text-white flex items-center justify-between gap-3 shadow-2xl border border-white/10 z-20">
                  <div className="text-left">
                    <p className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">
                      Ready to travel?
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-300 hidden sm:block pt-0.5">
                      Book verified school van seats in advance.
                    </p>
                  </div>
                  <Link href="/drivers">
                    <button
                      type="button"
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-[#1F2937] hover:bg-[#FACC15] hover:text-[#14532D] font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer shrink-0"
                    >
                      Schedule ahead
                    </button>
                  </Link>
                </div>

              </div>
            </motion.div>

          </div>

          {/* ======================================================== */}
          {/* BOTTOM 4 FEATURE CARDS (PRESERVING WEBSITE FUNCTIONALITY) */}
          {/* ======================================================== */}
          <motion.div
            variants={cardsContainerVariants}
            initial="hidden"
            animate="visible"
            className="w-full pt-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
              
              {/* Card 1: Book a Ride */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/drivers"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.08)] hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#16A34A] shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-sm sm:text-base font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400 transition-colors leading-snug flex items-center gap-1.5">
                      <span>Book a Ride</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#16A34A]" />
                    </h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
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
                  className="w-full text-left group flex items-center gap-4 p-4 sm:p-4.5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.08)] hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#16A34A] shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <Navigation className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-sm sm:text-base font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400 transition-colors leading-snug flex items-center gap-1.5">
                      <span>View Routes</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#16A34A]" />
                    </h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
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
                  className="w-full text-left group flex items-center gap-4 p-4 sm:p-4.5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.08)] hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#16A34A] shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-sm sm:text-base font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400 transition-colors leading-snug flex items-center gap-1.5">
                      <span>Child Safety</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#16A34A]" />
                    </h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                      Background-checked drivers and safety rules.
                    </p>
                  </div>
                </button>
              </motion.div>

              {/* Card 4: Track in Real Time */}
              <motion.div variants={cardItemVariants}>
                <Link
                  href="/parent/rides/live"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.08)] hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer block h-full"
                >
                  <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-[16px] bg-[#EAF6ED] dark:bg-emerald-950/80 border border-[#D0EAD6] dark:border-emerald-800/60 text-[#16A34A] shrink-0 group-hover:scale-105 group-hover:bg-[#E0F2E4] transition-all duration-200">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-sm sm:text-base font-bold text-[#1F2937] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-emerald-400 transition-colors leading-snug flex items-center gap-1.5">
                      <span>Track in Real Time</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#16A34A]" />
                    </h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
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

new_content = content[:idx1] + new_hero_section + content[idx2:]

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Successfully updated Section 1 in page.tsx!')

