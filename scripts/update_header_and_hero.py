import os

# 1. Update apps/web/src/components/navbar.tsx
with open(r'SchoolRide-LK-V2\apps\web\src\components\navbar.tsx', 'r', encoding='utf-8') as f:
    nav = f.read()

# Replace header element and height
nav = nav.replace(
    'className="sticky top-0 z-40 w-full border-b border-slate-100/60 dark:border-slate-800 bg-white dark:bg-slate-900 backdrop-blur-md transition-all"',
    'className="sticky top-0 z-40 w-full border-b border-emerald-950/[0.04] dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-all shadow-[0_1px_8px_rgba(0,0,0,0.02)]"'
)

nav = nav.replace(
    'className="w-full max-w-[1600px] mx-auto flex h-16 items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16"',
    'className="w-full max-w-[1600px] mx-auto flex h-[72px] items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16"'
)

# Replace logo sizing
old_logo = '''        {/* Brand Logo */}
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
        </Link>'''

new_logo = '''        {/* Brand Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative flex items-center transition-transform duration-150 group-hover:scale-102">
            <Image
              src="/logo.png"
              alt="SchoolRide LK"
              width={220}
              height={40}
              priority
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            />
          </div>
        </Link>'''

nav = nav.replace(old_logo, new_logo)

# Replace nav links gap
nav = nav.replace(
    'className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700 dark:text-slate-200"',
    'className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-slate-700 dark:text-slate-200"'
)

# Replace action buttons
old_btns = '''            <div className="flex items-center gap-2.5">
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
            </div>'''

new_btns = '''            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="px-6 py-2.5 text-sm font-bold text-[#152720] dark:text-slate-100 border-2 border-[#152720]/80 dark:border-slate-300 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link href="/drivers">
                <button className="px-6 py-2.5 text-sm font-bold text-white bg-[#094718] hover:bg-[#073713] rounded-full shadow-sm hover:shadow-md transition-all duration-150 flex items-center gap-1.5 cursor-pointer">
                  Book a Ride
                </button>
              </Link>
            </div>'''

nav = nav.replace(old_btns, new_btns)

with open(r'SchoolRide-LK-V2\apps\web\src\components\navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(nav)

print('Updated navbar.tsx with matching logo size, 72px height & refined buttons!')

# 2. Update apps/web/src/app/page.tsx
with open(r'SchoolRide-LK-V2\apps\web\src\app\page.tsx', 'r', encoding='utf-8') as f:
    page = f.read()

# Replace min-h calculation
page = page.replace(
    'min-h-[calc(100vh-4rem)]',
    'min-h-[calc(100vh-72px)]'
)

# Replace desktop artwork height & placement
old_artwork = '''        {/* Desktop Full-Bleed Artwork: Pinned directly to Navbar Corner and Right Edge with ZERO space */}
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
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain object-right-top"
            />
          </div>
        </motion.div>'''

new_artwork = '''        {/* Desktop Full-Bleed Artwork: Pinned directly to Navbar Corner and Right Edge with ZERO space */}
        <motion.div
          variants={visualVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:block absolute top-0 right-0 w-[55%] xl:w-[53%] 2xl:w-[50%] h-[calc(100%-80px)] pointer-events-none z-0"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/vango-hero-right-2x.png"
              alt="SchoolRide LK school ride yellow van with children in uniform"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain object-right-top"
            />
          </div>
        </motion.div>'''

page = page.replace(old_artwork, new_artwork)

# Replace mobile artwork container
old_mobile = '''            {/* Mobile / Tablet In-flow artwork (< lg) */}
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
            </motion.div>'''

new_mobile = '''            {/* Mobile / Tablet In-flow artwork (< lg) */}
            <motion.div
              variants={visualVariants}
              className="lg:hidden relative w-full aspect-[1228/798] max-w-[600px] mx-auto mt-4"
            >
              <Image
                src="/images/vango-hero-right-2x.png"
                alt="SchoolRide LK school ride yellow van with children in uniform"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-contain object-center"
              />
            </motion.div>'''

page = page.replace(old_mobile, new_mobile)

with open(r'SchoolRide-LK-V2\apps\web\src\app\page.tsx', 'w', encoding='utf-8') as f:
    f.write(page)

print('Updated page.tsx with hero artwork matching size & natural aspect ratio!')

