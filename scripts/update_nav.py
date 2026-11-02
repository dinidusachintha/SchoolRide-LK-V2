import re

nav_path = r'C:\Users\user\Desktop\Project\SchoolRide-LK-V2\apps\web\src\components\navbar.tsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace header styling
text = text.replace(
    '<header className="sticky top-0 z-40 w-full border-b border-border/80 bg-card/80 backdrop-blur-md transition-all">',
    '<header className="sticky top-0 z-40 w-full border-b border-emerald-100/60 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md transition-all">'
)

# Replace the logo block
old_logo_pattern = re.compile(r'\{\/\* Brand Logo \*\/\}[\s\S]*?<\/Link>')
new_logo = '''{/* VanGo Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
            <svg className="h-9 w-9 text-[#094718] shrink-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="22" height="13" rx="3" fill="#094718" />
              <path d="M24 13L29.5 17V24H24V13Z" fill="#094718" />
              <rect x="6" y="13" width="6" height="4.5" rx="1" fill="white" />
              <rect x="14" y="13" width="6" height="4.5" rx="1" fill="white" />
              <path d="M22 14.5H25.5L28 17.5H22V14.5Z" fill="white" />
              <circle cx="10" cy="24.5" r="3.5" fill="#f3c53c" stroke="#094718" strokeWidth="1.5" />
              <circle cx="24" cy="24.5" r="3.5" fill="#f3c53c" stroke="#094718" strokeWidth="1.5" />
              <circle cx="10" cy="24.5" r="1.2" fill="#094718" />
              <circle cx="24" cy="24.5" r="1.2" fill="#094718" />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-baseline gap-1">
              <span className="font-black tracking-tight text-xl text-[#094718] dark:text-emerald-400 leading-none">
                Van<span className="text-[#84cc16] dark:text-[#a3e635]">Go</span>
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-[#094718] dark:text-emerald-300 uppercase tracking-widest border border-emerald-200/60">
                LK
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-500 tracking-tight leading-none mt-0.5">
              School Ride Service
            </p>
          </div>
        </Link>'''
text = old_logo_pattern.sub(new_logo, text, count=1)

# Replace desktop navigation links
old_nav_pattern = re.compile(r'<nav className="hidden md:flex items-center[\s\S]*?<\/nav>')
nav_replacement = '''<nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <Link
            href="/"
            className={`transition-colors hover:text-[#094718] dark:hover:text-emerald-400 ${
              pathname === '/' ? 'text-[#094718] dark:text-emerald-400 font-bold' : ''
            }`}
          >
            Home
          </Link>
          <Link
            href="/#how-it-works"
            className="transition-colors hover:text-[#094718] dark:hover:text-emerald-400"
          >
            How it Works
          </Link>
          <Link
            href="/#routes"
            className="transition-colors hover:text-[#094718] dark:hover:text-emerald-400"
          >
            Routes
          </Link>
          <Link
            href="/safety"
            className={`transition-colors hover:text-[#094718] dark:hover:text-emerald-400 ${
              pathname === '/safety' ? 'text-[#094718] dark:text-emerald-400 font-bold' : ''
            }`}
          >
            Safety
          </Link>
          <Link
            href="/#about"
            className="transition-colors hover:text-[#094718] dark:hover:text-emerald-400"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="transition-colors hover:text-[#094718] dark:hover:text-emerald-400"
          >
            Contact
          </Link>

          {user?.role === 'PARENT' && (
            <Link
              href="/parent/dashboard"
              className="px-3 py-1 rounded-full bg-emerald-50 text-[#094718] dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-xs border border-emerald-200/60 hover:bg-emerald-100 transition-colors"
            >
              Parent Portal
            </Link>
          )}

          {user?.role === 'DRIVER' && (
            <Link
              href="/driver/dashboard"
              className="px-3 py-1 rounded-full bg-emerald-50 text-[#094718] dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-xs border border-emerald-200/60 hover:bg-emerald-100 transition-colors"
            >
              Driver Console
            </Link>
          )}

          {user?.role === 'ADMIN' && (
            <Link
              href="/admin/dashboard"
              className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              Admin
            </Link>
          )}
        </nav>'''
text = old_nav_pattern.sub(nav_replacement, text, count=1)

# Replace logged-out buttons
old_btn_pattern = re.compile(r'\{\/\* Mobile Menu Toggle Button \*\/\}')
new_buttons = '''{/* Unauthenticated Pill Buttons */}
          ) : (
            <div className="flex items-center gap-2.5">
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
            </div>
          )}

          {/* Mobile Menu Toggle Button */}'''

# Find the logged out section
text = re.sub(
    r'\)\s*:\s*\(\s*<div className="flex items-center gap-2">[\s\S]*?<\/div>\s*\)\}\s*\{\/\* Mobile Menu Toggle Button \*\/\}',
    new_buttons,
    text
)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(text)
print('Successfully modernized navbar.tsx!')

