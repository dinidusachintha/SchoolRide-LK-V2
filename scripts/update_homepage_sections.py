path = r'SchoolRide-LK-V2\apps\web\src\app\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

target = '''      {/* ======================================================== */}
      {/* 2. HOW IT WORKS SECTION                                  */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#EBF8EE] text-[#094718] dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2C22] dark:text-white tracking-tight">
              How VanGo Works for Families
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Coordinating safe, punctual school transportation has never been simpler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Step 1 */}
            <div className="p-7 rounded-2xl border border-slate-100 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#094718] text-white font-extrabold text-lg shadow-sm">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Discover Verified Van Operators
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Filter by your child's school, your district, vehicle capacity, and operating neighborhoods. Review verified driver profiles, safety equipment, and parent feedback.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-2xl border border-slate-100 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#094718] text-white font-extrabold text-lg shadow-sm">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Submit &amp; Confirm Bookings
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Provide private pickup/dropoff details and schedule. The driver confirms seat availability, route compatibility, and agreed monthly fees in LKR.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-2xl border border-slate-100 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#094718] text-white font-extrabold text-lg shadow-sm">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Track Live Trips Every Morning
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Follow your child's van on an interactive map. Receive real-time push updates when your child is picked up and safely dropped off at the school gate.
              </p>
            </div>
          </div>
        </div>
      </section>'''

replacement = '''      {/* ======================================================== */}
      {/* 2. HOW IT WORKS SECTION (LIGHT GREEN & DARK GREEN FONTS) */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-[#EBF7EE] text-[#0B4626] text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#BCE6C9] inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
              How <span className="text-[#8CB02C]">SchoolRide LK</span> Works for Families
            </h2>
            <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300 leading-relaxed">
              Coordinating safe, punctual school transportation across Sri Lanka has never been simpler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
            {/* Step 1 */}
            <div className="p-7 rounded-[24px] border border-emerald-900/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-lg shadow-md border border-[#22C55E]/40">
                  01
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-[#EAF6ED] px-3 py-1 rounded-full border border-[#D0EAD6]">
                  Discovery
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
                Discover <span className="text-[#8CB02C]">Verified</span> Van Drivers
              </h3>
              <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                Filter by your child's school, your district, vehicle capacity, and operating route. Inspect verified NIC identity, commercial license, and authentic parent ratings.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-[24px] border border-emerald-900/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-lg shadow-md border border-[#22C55E]/40">
                  02
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-[#EAF6ED] px-3 py-1 rounded-full border border-[#D0EAD6]">
                  Booking
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
                Submit &amp; Confirm <span className="text-[#8CB02C]">Monthly Seat</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                Provide private home pickup &amp; dropoff details. The driver confirms seat availability, route compatibility, and agreed monthly fees in Sri Lankan Rupees (LKR).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-[24px] border border-emerald-900/[0.08] dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-850 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#094718] text-white font-black text-lg shadow-md border border-[#22C55E]/40">
                  03
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-[#EAF6ED] px-3 py-1 rounded-full border border-[#D0EAD6]">
                  Peace of Mind
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
                Track Live Trips <span className="text-[#8CB02C]">Every Morning</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
                Follow your child's van on an interactive GPS map. Receive instant notifications when your child is picked up and safely inside the school gates.
              </p>
            </div>
          </div>
        </div>
      </section>'''

target_norm = target.replace('\r\n', '\n')
content_norm = c.replace('\r\n', '\n')
replacement_norm = replacement.replace('\r\n', '\n')

if target_norm in content_norm:
    new_c = content_norm.replace(target_norm, replacement_norm, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_c)
    print('Updated How it Works section successfully!')
else:
    print('Target not found for How it Works')
