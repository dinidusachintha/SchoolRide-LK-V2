import os

page_path = os.path.join('SchoolRide-LK-V2', 'apps', 'web', 'src', 'app', 'page.tsx')

with open(page_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Main container background -> White #FFFFFF, Main text -> Charcoal #1F2937
code = code.replace(
    'className="flex flex-col w-full bg-[#FAFDF9] dark:bg-slate-950 text-slate-900 dark:text-slate-100',
    'className="flex flex-col w-full bg-[#FFFFFF] dark:bg-slate-950 text-[#1F2937] dark:text-slate-100'
)

# 2. Section 1 (Hero) background -> Off White #F7FAF7
old_hero_bg = 'className="relative overflow-hidden w-full bg-gradient-to-b from-[#FAFDF9] via-[#F4FAF5]/70 to-[#FAFDF9] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-2 sm:pt-4 lg:pt-6 pb-8 sm:pb-12 lg:pb-14 border-b border-emerald-950/[0.04] dark:border-slate-800"'
new_hero_bg = 'className="relative overflow-hidden w-full bg-[#F7FAF7] dark:bg-slate-950 pt-4 sm:pt-6 lg:pt-8 pb-10 sm:pb-14 lg:pb-16 border-b border-slate-200/80 dark:border-slate-800"'
code = code.replace(old_hero_bg, new_hero_bg)

# Hero button adjustments: Book a ride is Primary Yellow #FACC15, How it works is Secondary Forest Green #14532D
code = code.replace(
    'className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs sm:text-sm md:text-base shadow-md shadow-[#094718]/15 hover:shadow-lg transition-all duration-200 cursor-pointer"',
    'className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"'
)

code = code.replace(
    'className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-[#152720] dark:border-slate-300 text-[#152720] dark:text-white font-bold text-xs sm:text-sm md:text-base hover:bg-emerald-50/60 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"',
    'className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-[#14532D] text-[#14532D] dark:text-white font-bold text-xs sm:text-sm md:text-base hover:bg-[#EAF6ED] transition-colors shadow-sm cursor-pointer"'
)

# Hero highlight colors: Children -> Fresh Green #16A34A, highlighter curve -> Yellow #FACC15
code = code.replace('text-[#8CB02C]', 'text-[#16A34A]')
code = code.replace('text-[#E3D13E]', 'text-[#FACC15]')
code = code.replace('bg-[#094718]', 'bg-[#14532D]')
code = code.replace('text-[#094718]', 'text-[#14532D]')
code = code.replace('text-[#0B2C22]', 'text-[#1F2937]')
code = code.replace('text-[#4E6258]', 'text-[#4B5563]')

# 3. Section 2: Quick Route Matcher -> White #FFFFFF background, Card white with subtle borders
old_sec2 = 'className="py-8 bg-gradient-to-b from-[#FAFDF9] via-[#F4FAF5] to-[#FAFDF9] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-emerald-100/60 dark:border-slate-800/80 relative"'
new_sec2 = 'className="py-10 bg-[#FFFFFF] dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 relative"'
code = code.replace(old_sec2, new_sec2)

# Card 2 subtle border & yellow button
code = code.replace(
    'className="p-5 sm:p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_8px_30px_rgba(9,71,24,0.06)]"',
    'className="p-6 sm:p-8 rounded-[28px] bg-white dark:bg-slate-850 border border-slate-200/90 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"'
)

# 4. Section 3: Why Choose Us -> Off White #F7FAF7 background
old_sec3 = 'className="py-10 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-900/60"'
new_sec3 = 'className="py-14 sm:py-20 border-b border-slate-200/80 dark:border-slate-800 bg-[#F7FAF7] dark:bg-slate-950"'
code = code.replace(old_sec3, new_sec3)

# 5. Section 4: How it Works -> White #FFFFFF background
old_sec4 = 'className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900"'
new_sec4 = 'className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800 bg-[#FFFFFF] dark:bg-slate-900"'
code = code.replace(old_sec4, new_sec4)

# 6. Section 5: Child Safety -> Off White #F7FAF7 background
old_sec5 = 'className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-950 relative overflow-hidden"'
new_sec5 = 'className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800 bg-[#F7FAF7] dark:bg-slate-950 relative overflow-hidden"'
code = code.replace(old_sec5, new_sec5)

# 7. Section 6: Live Telemetry -> White #FFFFFF background
old_sec6 = 'className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-white dark:bg-slate-900 relative"'
new_sec6 = 'className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800 bg-[#FFFFFF] dark:bg-slate-900 relative"'
code = code.replace(old_sec6, new_sec6)

# 8. Section 7: Island-Wide School Directory -> Off White #F7FAF7 background
old_sec7 = 'className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-950"'
new_sec7 = 'className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800 bg-[#F7FAF7] dark:bg-slate-950"'
code = code.replace(old_sec7, new_sec7)

# 9. Section 8: Meet Trusted Drivers -> White #FFFFFF background
# (already has bg-white, ensure border-slate-200)

# 10. Section 9: Testimonials -> Off White #F7FAF7 background
old_sec9 = 'className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-950"'
new_sec9 = 'className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800 bg-[#F7FAF7] dark:bg-slate-950"'
code = code.replace(old_sec9, new_sec9)

# 11. Section 10: FAQ Accordion -> White #FFFFFF background
# (already has bg-white)

# 12. Section 11: Call to Action Banner -> Forest Green #14532D background & Yellow Primary CTA
old_sec11 = 'className="py-20 md:py-24 bg-gradient-to-br from-[#051A10] via-[#094718] to-[#0B2C22] text-white text-center relative overflow-hidden"'
new_sec11 = 'className="py-20 md:py-24 bg-[#14532D] text-white text-center relative overflow-hidden shadow-xl"'
code = code.replace(old_sec11, new_sec11)

# Primary Buttons on page: change to Yellow #FACC15 with text-[#14532D] font-black
code = code.replace(
    'className="px-6 py-3 rounded-xl bg-[#094718] text-white font-bold text-xs sm:text-sm hover:bg-[#073713] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"',
    'className="px-6 py-3 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"'
)

code = code.replace(
    'className="px-4 py-2 rounded-xl bg-[#094718] text-white text-xs font-bold hover:bg-[#073713] transition-colors cursor-pointer"',
    'className="px-4 py-2 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-xs transition-colors cursor-pointer"'
)

code = code.replace(
    'className="w-full py-2.5 rounded-xl bg-[#094718] text-white text-xs font-bold hover:bg-[#073713] transition-colors cursor-pointer"',
    'className="w-full py-2.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-xs transition-colors cursor-pointer"'
)

# Final CTA buttons:
old_cta_btns = """            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <button className="px-8 py-3.5 rounded-full bg-white text-[#094718] font-bold text-sm hover:bg-emerald-50 transition-colors shadow-lg cursor-pointer">
                  Book a Safe School Ride
                </button>
              </Link>
              <Link href="/register">
                <button className="px-8 py-3.5 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-white font-bold text-sm hover:bg-emerald-900 transition-colors cursor-pointer">
                  Register as Van Operator
                </button>
              </Link>
            </div>"""

new_cta_btns = """            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <button className="px-8 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-sm transition-all shadow-lg hover:shadow-xl cursor-pointer">
                  Book a Safe School Ride
                </button>
              </Link>
              <Link href="/register">
                <button className="px-8 py-3.5 rounded-full bg-transparent border-2 border-white/80 text-white font-bold text-sm hover:bg-white/10 transition-colors cursor-pointer">
                  Register as Van Operator
                </button>
              </Link>
            </div>"""

code = code.replace(old_cta_btns, new_cta_btns)

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully updated page.tsx with the complete new color scheme!")

