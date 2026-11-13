import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from 'sonner';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://schoolride.lk'),
  title: {
    default: 'SchoolRide LK — Safe & Verified School Transportation in Sri Lanka',
    template: '%s | SchoolRide LK',
  },
  description:
    'Connect with verified school van drivers across Colombo, Kandy, Galle, Gampaha and all Sri Lankan districts. Real-time GPS ride tracking, verified documents, and child safety.',
  keywords: [
    'school van sri lanka',
    'school ride lk',
    'colombo school transport',
    'verified school van driver',
    'child ride tracking sri lanka',
  ],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_LK',
    siteName: 'SchoolRide LK',
    title: 'SchoolRide LK — Safe & Verified School Transportation in Sri Lanka',
    description:
      'NTCA-registered school van operators, live GPS ride tracking, verified documents, and parent arrival alerts across Sri Lanka.',
    images: [{ url: '/images/hero-school-full-bg.jpg', width: 1200, height: 630, alt: 'SchoolRide LK School Van Network' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SchoolRide LK — Safe School Transport in Sri Lanka',
    description:
      'Verified school vans, live GPS telemetry, and digital seat bookings across Sri Lanka.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`min-h-screen flex flex-col font-sans bg-background text-foreground antialiased ${dmSans.className}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#FACC15] focus:text-[#071426] focus:font-extrabold focus:text-xs focus:shadow-xl"
        >
          Skip to main content
        </a>
        <AuthProvider>
          <Navbar />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <Toaster richColors position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
