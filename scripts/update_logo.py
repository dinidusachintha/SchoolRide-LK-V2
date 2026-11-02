import re

nav_path = r'C:\Users\user\Desktop\Project\SchoolRide-LK-V2\apps\web\src\components\navbar.tsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Add Image import if not present
if "import Image from 'next/image';" not in text:
    text = text.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport Image from 'next/image';")

# Replace the VanGo logo block with the new logo
old_logo_pattern = re.compile(r'\{\/\* VanGo Brand Logo \*\/\}[\s\S]*?<\/Link>')
new_logo = '''{/* Brand Logo */}
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

text = old_logo_pattern.sub(new_logo, text, count=1)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated navbar.tsx with new logo successfully!')

# Also update footer.tsx
footer_path = r'C:\Users\user\Desktop\Project\SchoolRide-LK-V2\apps\web\src\components\footer.tsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    f_text = f.read()

if "import Image from 'next/image';" not in f_text:
    f_text = f_text.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport Image from 'next/image';")

old_footer_logo = re.compile(r'<div className="flex items-center gap-2">[\s\S]*?<span className="font-bold text-lg text-foreground">SchoolRide LK<\/span>[\s\S]*?<\/div>')
new_footer_logo = '''<Link href="/" className="inline-block group">
              <Image
                src="/logo.png"
                alt="SchoolRide LK"
                width={160}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </Link>'''

f_text = old_footer_logo.sub(new_footer_logo, f_text, count=1)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(f_text)

print('Updated footer.tsx with new logo successfully!')

