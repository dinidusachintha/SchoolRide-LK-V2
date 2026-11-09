import re

page_path = r'SchoolRide-LK-V2/apps/web/src/app/page.tsx'

with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Locate the CTA block
s_cta_needle = "Join Sri Lanka's Verified School Transport Network"
idx_cta = content.find(s_cta_needle)
if idx_cta == -1:
    print('Failed to find CTA section!')
    exit(1)

s_cta_start = content.rfind('<section', 0, idx_cta)
s_cta_comment = content.rfind('{/* ======================================================== */}', 0, s_cta_start)
s_cta_end = content.find('</section>', idx_cta) + len('</section>')

cta_section_code = content[s_cta_comment:s_cta_end].strip()

# 2. Locate Section 2 (Quick Route Matcher)
s2_marker = '{/* ======================================================== */}\n      {/* 2. INSTANT SCHOOL VAN FINDER'
s3_marker = '{/* ======================================================== */}\n      {/* 3. LIVE TRUST & STATS MARQUEE'

idx_s2 = content.find(s2_marker)
idx_s3 = content.find(s3_marker)

if idx_s2 == -1 or idx_s3 == -1:
    print('Failed to find Section 2 or Section 3 markers!')
    exit(1)

# New Black Background Quick Route Matcher with White Glass Effect Cards
new_quick_matcher_code = '''{/* ======================================================== */}
      {/* 2. QUICK ROUTE MATCHER (BLACK BG & WHITE GLASS CARDS)     */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 bg-black text-white border-b border-white/10 relative overflow-hidden">
        {/* Soft Ambient Radial Accents */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-[#FACC15]/10 blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-[28px] bg-white/[0.08] backdrop-blur-xl border border-white/[0.18] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
              
              {/* Left Header Tag & Title */}
              <div className="space-y-1.5 pr-2 shrink-0">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#FACC15] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#FACC15]" /> Quick Route Matcher
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Find Verified Vans Serving Your School
                </h3>
                <p className="text-xs text-white/70 font-normal">
                  Filter by province, school, or pickup corridor across Sri Lanka.
                </p>
              </div>

              {/* 3 White Glass Effect Cards for Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 max-w-3xl">
                
                {/* 1. District Glass Card */}
                <div className="relative p-2.5 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/[0.15] hover:border-white/30 transition-all">
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Province / District
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictFilter(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-white/20 bg-white/[0.12] text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15] cursor-pointer"
                  >
                    <option value="All" className="bg-slate-900 text-white">All Districts (Sri Lanka)</option>
                    <option value="Colombo" className="bg-slate-900 text-white">Colombo (Western)</option>
                    <option value="Gampaha" className="bg-slate-900 text-white">Gampaha (Western)</option>
                    <option value="Kalutara" className="bg-slate-900 text-white">Kalutara (Western)</option>
                    <option value="Kandy" className="bg-slate-900 text-white">Kandy (Central)</option>
                    <option value="Galle" className="bg-slate-900 text-white">Galle (Southern)</option>
                    <option value="Kurunegala" className="bg-slate-900 text-white">Kurunegala (North Western)</option>
                  </select>
                </div>

                {/* 2. School Glass Card */}
                <div className="relative p-2.5 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/[0.15] hover:border-white/30 transition-all">
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Child's School
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Royal, Visakha, Ananda"
                      value={schoolSearchQuery}
                      onChange={(e) => handleSchoolSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-white/20 bg-white/[0.12] text-sm font-semibold text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                    <School className="absolute left-2.5 top-2.5 h-4 w-4 text-white/60 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Pickup Town Glass Card */}
                <div className="relative p-2.5 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/[0.15] hover:border-white/30 transition-all">
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Home / Pickup Town
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Nugegoda, Malabe"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-white/20 bg-white/[0.12] text-sm font-semibold text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-white/60 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2 lg:pt-0 shrink-0">
                <Link href="/drivers">
                  <button className="w-full lg:w-auto px-7 py-3.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <Search className="h-4 w-4 stroke-[2.5]" />
                    <span>Search Verified Fleet</span>
                  </button>
                </Link>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      '''

# Combined code to insert at Section 2:
# Quick Route Matcher + "Join Sri Lanka's Verified School Transport Network" Section
replacement_block = new_quick_matcher_code + cta_section_code + '\n\n      '

# First, remove the CTA section from the end of the file
content_without_old_cta = content[:s_cta_comment] + content[s_cta_end:]

# Now re-find Section 2 and Section 3 markers in the modified content
idx_s2_new = content_without_old_cta.find(s2_marker)
idx_s3_new = content_without_old_cta.find(s3_marker)

final_content = (
    content_without_old_cta[:idx_s2_new]
    + replacement_block
    + content_without_old_cta[idx_s3_new:]
)

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(final_content)

print('Successfully reordered sections and redesigned Quick Route Matcher with black background and white glass cards!')

