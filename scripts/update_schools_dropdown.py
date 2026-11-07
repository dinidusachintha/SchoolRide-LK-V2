import os

page_path = os.path.join('SchoolRide-LK-V2', 'apps', 'web', 'src', 'app', 'page.tsx')

with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add state isSchoolsDropdownOpen if not present
state_target = "const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);"
state_addition = "\n  const [isSchoolsDropdownOpen, setIsSchoolsDropdownOpen] = React.useState(false);"

if "isSchoolsDropdownOpen" not in content:
    content = content.replace(state_target, state_target + state_addition, 1)

# 2. In handleDistrictFilter, close the dropdown when changing district
old_handler = """  const handleDistrictFilter = (district: string) => {
    setIsFiltering(true);
    setSelectedDistrict(district);
    setTimeout(() => setIsFiltering(false), 240);
  };"""

new_handler = """  const handleDistrictFilter = (district: string) => {
    setIsFiltering(true);
    setSelectedDistrict(district);
    setIsSchoolsDropdownOpen(false);
    setTimeout(() => setIsFiltering(false), 240);
  };"""

if old_handler in content:
    content = content.replace(old_handler, new_handler, 1)

# 3. Add more schools to schoolsData so that there are always plenty of campuses
extra_schools = """    {
      id: 7,
      name: "Bishop's College",
      district: 'Colombo',
      location: 'Colombo 03 (Boyd Place)',
      vansCount: 16,
      students: 260,
      badge: 'Private Girls',
      popularRoutes: ['Moratuwa → Wellawatte → Colombo 03', 'Kotte → Rajagiriya → Colombo 03', 'Kelaniya → Colombo 03'],
      monthlyRate: 'LKR 8,200 - 10,800',
    },
    {
      id: 8,
      name: 'Kingswood College',
      district: 'Kandy',
      location: 'Kandy (Peradeniya Road)',
      vansCount: 14,
      students: 210,
      badge: 'Premier Boys',
      popularRoutes: ['Galaha → Peradeniya → Kingswood', 'Pilimathalawa → Kandy', 'Katugastota → Kingswood'],
      monthlyRate: 'LKR 6,200 - 8,200',
    },
    {
      id: 9,
      name: 'Nalanda College',
      district: 'Colombo',
      location: 'Colombo 10 (Maradana)',
      vansCount: 20,
      students: 310,
      badge: 'Premier Boys',
      popularRoutes: ['Nittambuwa → Kadawatha → Colombo 10', 'Malabe → Battaramulla → Maradana', 'Pannipitiya → Maharagama → Colombo 10'],
      monthlyRate: 'LKR 7,500 - 9,600',
    },
  ];"""

st_peter_end = """      popularRoutes: ['Dehiwala → Wellawatte → Colombo 04', 'Nugegoda → Kirulapone → Colombo 04', 'Piliyandala → Bambalapitiya'],
      monthlyRate: 'LKR 7,800 - 10,000',
    },
  ];"""

if "Bishop's College" not in content and st_peter_end in content:
    content = content.replace(st_peter_end, st_peter_end.replace("  ];", extra_schools), 1)

# 4. Define visibleSchools and dropdownSchools right after filteredSchools
filter_block = """  const filteredSchools = schoolsData.filter((sch) => {
    const matchesDistrict = selectedDistrict === 'All' || sch.district === selectedDistrict;
    const matchesSearch = sch.name.toLowerCase().includes(schoolSearchQuery.toLowerCase()) ||
                          sch.location.toLowerCase().includes(schoolSearchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });"""

filter_block_expanded = """  const filteredSchools = schoolsData.filter((sch) => {
    const matchesDistrict = selectedDistrict === 'All' || sch.district === selectedDistrict;
    const matchesSearch = sch.name.toLowerCase().includes(schoolSearchQuery.toLowerCase()) ||
                          sch.location.toLowerCase().includes(schoolSearchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  const visibleSchools = filteredSchools.slice(0, 3);
  const dropdownSchools = filteredSchools.slice(3);"""

if "const visibleSchools" not in content and filter_block in content:
    content = content.replace(filter_block, filter_block_expanded, 1)

# 5. Update Section 7: Island-Wide Coverage to show only 3 cards and dropdown for the rest
old_routes_section_start = '<section id="routes"'
routes_pos = content.find(old_routes_section_start)
routes_end_pos = content.find('</section>', routes_pos) + len('</section>')

old_section = content[routes_pos:routes_end_pos]

new_section = """<section id="routes" className="py-20 md:py-28 border-b border-emerald-100/60 dark:border-slate-800 bg-[#F4FAF5] dark:bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#094718] text-xs font-bold border border-emerald-200">
                Island-Wide Coverage
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">
                Covering <span className="text-[#8CB02C]">Leading Schools</span> Across Sri Lanka
              </h2>
              <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300">
                Connecting top national, private, and international campuses with verified neighborhood van networks.
              </p>
            </div>

            {/* District Filter Pills & Quick Dropdown Button */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Colombo', 'Kandy'].map((district) => (
                <button
                  key={district}
                  onClick={() => handleDistrictFilter(district)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedDistrict === district
                      ? 'bg-[#094718] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#4E6258] dark:text-slate-300 border border-emerald-200 dark:border-slate-800 hover:bg-emerald-50'
                  }`}
                >
                  {district === 'All' ? 'All Districts' : district}
                </button>
              ))}

              {dropdownSchools.length > 0 && (
                <button
                  onClick={() => setIsSchoolsDropdownOpen(!isSchoolsDropdownOpen)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSchoolsDropdownOpen
                      ? 'bg-[#094718] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-[#094718] dark:text-emerald-400 border border-emerald-300 dark:border-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  <School className="h-3.5 w-3.5 text-[#16A34A]" />
                  <span>More Schools ({dropdownSchools.length})</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isSchoolsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          </div>

          {/* School Cards Grid (Showing strictly 3 primary cards + dropdown for remaining) */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isFiltering ? (
                <>
                  <SchoolCardSkeleton />
                  <SchoolCardSkeleton />
                  <SchoolCardSkeleton />
                </>
              ) : filteredSchools.length === 0 ? (
                <div className="col-span-full py-12 text-center text-[#4E6258] dark:text-slate-400">
                  <p className="text-sm font-semibold">No schools found matching your search. Try adjusting your query or district.</p>
                </div>
              ) : (
                visibleSchools.map((school) => (
                  <motion.div
                    key={school.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    variants={sectionFadeUp}
                    className="p-6 rounded-[26px] bg-white dark:bg-slate-900 border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF6ED] text-[#094718] border border-[#D0EAD6]">
                          {school.badge}
                        </span>
                        <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
                          <Bus className="h-3.5 w-3.5" /> {school.vansCount} Active Vans
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-[#0B2C22] dark:text-white">
                        {school.name}
                      </h3>
                      <p className="text-xs text-[#4E6258] dark:text-slate-400 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#16A34A]" /> {school.location}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-emerald-100/60 dark:border-slate-800">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#4E6258] dark:text-slate-400 block">
                          Popular Commute Routes:
                        </span>
                        {school.popularRoutes.map((route, i) => (
                          <div key={i} className="text-xs text-[#0B2C22] dark:text-slate-200 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                            <span>{route}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-emerald-100/60 dark:border-slate-800 flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[10px] text-[#4E6258] dark:text-slate-400 block font-semibold">Typical Monthly Fee</span>
                        <span className="text-xs font-bold text-[#094718] dark:text-emerald-400">{school.monthlyRate}</span>
                      </div>
                      <Link href="/drivers">
                        <button className="px-4 py-2 rounded-xl bg-[#094718] text-white text-xs font-bold hover:bg-[#073713] transition-colors cursor-pointer">
                          View Vans
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Dropdown Toggle Button below the 3 cards */}
            {!isFiltering && dropdownSchools.length > 0 && (
              <div className="flex flex-col items-center justify-center pt-2">
                <button
                  onClick={() => setIsSchoolsDropdownOpen(!isSchoolsDropdownOpen)}
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-[#094718] dark:border-emerald-500 text-[#094718] dark:text-emerald-300 font-bold text-xs sm:text-sm hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
                  aria-expanded={isSchoolsDropdownOpen}
                >
                  <School className="h-4 w-4 text-[#16A34A] group-hover:scale-110 transition-transform" />
                  <span>
                    {isSchoolsDropdownOpen
                      ? `Close Additional Schools (${dropdownSchools.length})`
                      : `View Other Schools in Dropdown (${dropdownSchools.length} More Campuses)`}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isSchoolsDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            )}

            {/* Expandable Dropdown Section with Smooth Animation */}
            <AnimatePresence>
              {isSchoolsDropdownOpen && dropdownSchools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden pt-2 space-y-4"
                >
                  <div className="pt-4 flex items-center justify-between border-t border-emerald-100/60 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
                      Other Mapped Schools ({dropdownSchools.length})
                    </span>
                    <span className="text-xs text-[#4E6258] dark:text-slate-400 hidden sm:inline">
                      All schools vetted with active van fleets
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dropdownSchools.map((school) => (
                      <motion.div
                        key={school.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 rounded-[26px] bg-white dark:bg-slate-900 border border-emerald-950/[0.08] dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF6ED] text-[#094718] border border-[#D0EAD6]">
                              {school.badge}
                            </span>
                            <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
                              <Bus className="h-3.5 w-3.5" /> {school.vansCount} Active Vans
                            </span>
                          </div>

                          <h3 className="text-lg font-extrabold text-[#0B2C22] dark:text-white">
                            {school.name}
                          </h3>
                          <p className="text-xs text-[#4E6258] dark:text-slate-400 flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-[#16A34A]" /> {school.location}
                          </p>

                          <div className="space-y-1.5 pt-2 border-t border-emerald-100/60 dark:border-slate-800">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4E6258] dark:text-slate-400 block">
                              Popular Commute Routes:
                            </span>
                            {school.popularRoutes.map((route, i) => (
                              <div key={i} className="text-xs text-[#0B2C22] dark:text-slate-200 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                                <span>{route}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-emerald-100/60 dark:border-slate-800 flex items-center justify-between">
                          <div className="text-left">
                            <span className="text-[10px] text-[#4E6258] dark:text-slate-400 block font-semibold">Typical Monthly Fee</span>
                            <span className="text-xs font-bold text-[#094718] dark:text-emerald-400">{school.monthlyRate}</span>
                          </div>
                          <Link href="/drivers">
                            <button className="px-4 py-2 rounded-xl bg-[#094718] text-white text-xs font-bold hover:bg-[#073713] transition-colors cursor-pointer">
                              View Vans
                            </button>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>"""

content = content[:routes_pos] + new_section + content[routes_end_pos:]

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated Island-Wide Coverage section with 3 cards limit + dropdown!")

