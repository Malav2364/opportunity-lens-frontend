import { Geist, Geist_Mono } from "next/font/google";
import {ThemeProvider} from '../providers/theme-provider';
import { Toaster } from "@/components/ui/sonner";
import './globals.css';
import { MobileNav } from "@/components/mobile-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://opportunitylens.com"),
  title: {
    default: "AI Learning Platform for Personalized Skill Paths | Opportunity Lens",
    template: "%s | Opportunity Lens",
  },
  description:
    "Opportunity Lens is an AI learning platform for skill assessment, personalized learning paths, AI career guidance, skill gap analysis, and project-based growth.",
  keywords: [
    "learning platform",
    "online learning platform",
    "personalized learning platform",
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
    title: "AI Learning Platform for Personalized Skill Paths | Opportunity Lens",
    description:
      "Use Opportunity Lens to assess skills, generate personalized learning paths, find skill gaps, and get AI-guided recommendations for what to learn and build next.",
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
    title: "AI Learning Platform for Personalized Skill Paths | Opportunity Lens",
    description:
      "An AI learning platform for personalized skill plans, customized learning paths, skill gap insights, and AI career guidance.",
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
        <ThemeProvider>
          {children}
          <MobileNav />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
