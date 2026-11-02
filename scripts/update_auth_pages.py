import os

# 1. Update login/page.tsx
login_path = r'SchoolRide-LK-V2\apps\web\src\app\login\page.tsx'
with open(login_path, 'r', encoding='utf-8') as f:
    login_c = f.read()

# Add Image import if not present
if "import Image from 'next/image';" not in login_c:
    login_c = login_c.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport Image from 'next/image';")

# Replace the top header in login
old_login_header = '''        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-subtle mb-1">
            <Bus className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Sign in to SchoolRide LK</h1>
          <p className="text-xs text-muted-foreground">Access your verified school transportation dashboard</p>
        </div>'''

new_login_header = '''        <div className="text-center space-y-3">
          <Link href="/" className="inline-block hover:scale-105 transition-transform mb-2">
            <Image
              src="/logo.png"
              alt="SchoolRide LK"
              width={200}
              height={40}
              priority
              className="h-10 w-auto object-contain mx-auto"
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B2C22] dark:text-white tracking-tight">
            Sign In to <span className="text-[#8CB02C]">SchoolRide LK</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300">
            Access your verified school transportation portal &amp; real-time tracking
          </p>
        </div>'''

login_c = login_c.replace(old_login_header, new_login_header)

# Replace login button
old_btn = '<Button type="submit" variant="primary" className="w-full shadow-subtle" disabled={isLoading}>\n              {isLoading ? \'Authenticating...\' : \'Sign in to Dashboard\'}\n            </Button>'
new_btn = '<button type="submit" disabled={isLoading} className="w-full py-3.5 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50">\n              {isLoading ? \'Authenticating...\' : \'Sign in to Dashboard\'}\n            </button>'

login_c = login_c.replace(old_btn, new_btn)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(login_c)
print('Updated login/page.tsx successfully!')

# 2. Update register/page.tsx
reg_path = r'SchoolRide-LK-V2\apps\web\src\app\register\page.tsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    reg_c = f.read()

if "import Image from 'next/image';" not in reg_c:
    reg_c = reg_c.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport Image from 'next/image';")

old_reg_header = '''        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-subtle mb-1">
            <Bus className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Create SchoolRide LK Account</h1>
          <p className="text-xs text-muted-foreground">Join Sri Lanka's verified school transportation platform</p>
        </div>'''

new_reg_header = '''        <div className="text-center space-y-3">
          <Link href="/" className="inline-block hover:scale-105 transition-transform mb-2">
            <Image
              src="/logo.png"
              alt="SchoolRide LK"
              width={200}
              height={40}
              priority
              className="h-10 w-auto object-contain mx-auto"
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B2C22] dark:text-white tracking-tight">
            Create <span className="text-[#8CB02C]">SchoolRide LK</span> Account
          </h1>
          <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300">
            Join Sri Lanka\'s dedicated network of verified school van operators &amp; families
          </p>
        </div>'''

reg_c = reg_c.replace(old_reg_header, new_reg_header)

old_reg_btn = '<Button type="submit" variant="primary" className="w-full shadow-subtle" disabled={isLoading}>\n              {isLoading ? \'Creating Account...\' : \'Complete Registration\'}\n            </Button>'
new_reg_btn = '<button type="submit" disabled={isLoading} className="w-full py-3.5 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50">\n              {isLoading ? \'Creating Account...\' : \'Complete Registration\'}\n            </button>'

reg_c = reg_c.replace(old_reg_btn, new_reg_btn)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(reg_c)
print('Updated register/page.tsx successfully!')
