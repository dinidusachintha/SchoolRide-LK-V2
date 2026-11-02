import re

# 1. Update drivers/page.tsx
with open(r'SchoolRide-LK-V2\apps\web\src\app\drivers\page.tsx', 'r', encoding='utf-8') as f:
    d_content = f.read()

d_content = d_content.replace(
    "import { Skeleton } from '@/components/ui/skeleton';",
    "import { Skeleton, DriverCardSkeleton } from '@/components/ui/skeleton';"
)

old_drivers_loading = """      {/* Driver Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-card space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
      ) : drivers.length === 0 ? ("""

new_drivers_loading = """      {/* Driver Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <DriverCardSkeleton key={i} />
          ))}
        </div>
      ) : drivers.length === 0 ? ("""

d_content = d_content.replace(old_drivers_loading, new_drivers_loading)
with open(r'SchoolRide-LK-V2\apps\web\src\app\drivers\page.tsx', 'w', encoding='utf-8') as f:
    f.write(d_content)

print('Updated drivers/page.tsx!')

# 2. Update page.tsx with skeleton scrolling & image optimizations
with open(r'SchoolRide-LK-V2\apps\web\src\app\page.tsx', 'r', encoding='utf-8') as f:
    p_content = f.read()

# Add import
if 'SchoolCardSkeleton' not in p_content:
    p_content = p_content.replace(
        "import Image from 'next/image';",
        "import Image from 'next/image';\nimport { SchoolCardSkeleton } from '@/components/ui/skeleton';"
    )

# Add isFiltering state & handler
old_state = """  const [selectedDistrict, setSelectedDistrict] = React.useState('All');
  const [schoolSearchQuery, setSchoolSearchQuery] = React.useState('');
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);"""

new_state = """  const [selectedDistrict, setSelectedDistrict] = React.useState('All');
  const [schoolSearchQuery, setSchoolSearchQuery] = React.useState('');
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const handleDistrictFilter = (district: string) => {
    setIsFiltering(true);
    setSelectedDistrict(district);
    setTimeout(() => setIsFiltering(false), 240);
  };

  const handleSchoolSearch = (val: string) => {
    setIsFiltering(true);
    setSchoolSearchQuery(val);
    setTimeout(() => setIsFiltering(false), 200);
  };"""

p_content = p_content.replace(old_state, new_state)

# Wire district dropdown in Section 2
p_content = p_content.replace(
    'onChange={(e) => setSelectedDistrict(e.target.value)}',
    'onChange={(e) => handleDistrictFilter(e.target.value)}'
)

# Wire school search in Section 2
p_content = p_content.replace(
    'onChange={(e) => setSchoolSearchQuery(e.target.value)}',
    'onChange={(e) => handleSchoolSearch(e.target.value)}'
)

# Wire district pills in Section 7
p_content = p_content.replace(
    'onClick={() => setSelectedDistrict(district)}',
    'onClick={() => handleDistrictFilter(district)}'
)

# Add skeleton cards grid in Section 7
old_grid = """          {/* School Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school) => ("""

new_grid = """          {/* School Cards Grid with Progressive Skeleton Transition */}
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
              filteredSchools.map((school) => ("""

p_content = p_content.replace(old_grid, new_grid)

# Close parentheses properly
old_close = """                </div>
              </motion.div>
            ))}
          </div>"""

new_close = """                </div>
              </motion.div>
            ))
            )}
          </div>"""

p_content = p_content.replace(old_close, new_close)

# Add sizes attributes to images for responsive optimization
p_content = p_content.replace(
    'alt="SchoolRide LK school ride yellow van with children in uniform"\n              fill\n              priority\n              className="object-contain object-right-top"',
    'alt="SchoolRide LK school ride yellow van with children in uniform"\n              fill\n              priority\n              sizes="(max-width: 1024px) 100vw, 55vw"\n              className="object-contain object-right-top"'
)

p_content = p_content.replace(
    'alt="Sri Lankan mother and daughter safely boarding school van"\n                    fill\n                    className="object-cover group-hover:scale-102 transition-transform duration-500"',
    'alt="Sri Lankan mother and daughter safely boarding school van"\n                    fill\n                    sizes="(max-width: 1024px) 100vw, 50vw"\n                    className="object-cover group-hover:scale-102 transition-transform duration-500"'
)

p_content = p_content.replace(
    'alt="Smartphone tracking app screen with live GPS route"\n                    fill\n                    className="object-cover"',
    'alt="Smartphone tracking app screen with live GPS route"\n                    fill\n                    sizes="(max-width: 1024px) 100vw, 50vw"\n                    className="object-cover"'
)

p_content = p_content.replace(
    'alt="Verified Sri Lankan school van driver Uncle Sunil"\n                  fill\n                  className="object-cover"',
    'alt="Verified Sri Lankan school van driver Uncle Sunil"\n                  fill\n                  sizes="(max-width: 1024px) 100vw, 50vw"\n                  className="object-cover"'
)

with open(r'SchoolRide-LK-V2\apps\web\src\app\page.tsx', 'w', encoding='utf-8') as f:
    f.write(p_content)

print('Updated page.tsx with skeleton scrolling & responsive image optimizations!')
