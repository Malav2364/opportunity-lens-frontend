import { Geist, Geist_Mono } from "next/font/google";
import {ThemeProvider} from '../providers/theme-provider';
import { Toaster } from "@/components/ui/sonner";
import './globals.css';
import { MobileNav } from "@/components/mobile-nav";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://opportunitylens.app";
const analyticsId =
  process.env.NEXT_PUBLIC_GA_ID ||
  process.env.NEXT_PUBLIC_GTAG_ID ||
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const defaultTitle = "AI Learning Platform for Students | Opportunity Lens";
const defaultDescription =
  "Opportunity Lens is an AI learning platform for students and learners, with skill assessment, personalized learning paths, AI career guidance, and skill gap analysis.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Opportunity Lens",
  },
  description: defaultDescription,
  keywords: [
    "learning platform",
    "student learning platform",
    "online learning platform",
    "personalized learning platform",
    "ai learning",
    "ai learning website",
    "ai learning platform",
    "ai based learning platform",
    "best ai learning platform",
    "guidance based learning platform",
    "customized learning platform",
    "personalized skill plans",
    "customized learning paths",
    "ai career guidance",
    "career guidance platform",
    "skill gap analysis",
    "adaptive learning",
    "learning path generator",
    "career roadmap",
    "project based learning",
    "ai project architect",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "education",
  creator: "Opportunity Lens",
  publisher: "Opportunity Lens",
  openGraph: {
    type: "website",
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName: "Opportunity Lens",
    images: [
      {
        url: "/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Opportunity Lens learning platform for personalized skill paths",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/opengraph-image.svg"],
  },
  icons: {
    icon: "/logo.svg",
    apple: "/apple-touch-icon.svg",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {analyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${analyticsId}');
              `}
            </Script>
          </>
        ) : null}
        <ThemeProvider>
          {children}
          <MobileNav />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
