path = r'SchoolRide-LK-V2\apps\web\src\components\footer.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

target = """import Link from 'next/link';
import Image from 'next/image';
import { Bus, Shield, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {"""

replacement = """'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bus, Shield, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }"""

if target in c:
    c = c.replace(target, replacement, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print('Updated footer.tsx!')
else:
    print('Target not found in footer.tsx')
