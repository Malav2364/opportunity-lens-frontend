"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AvatarWithDropdown } from "@/components/ui/avatar-with-dropdown";
import BlurIn from "@/components/animTxt";

export function Header({ userImage }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Assessment", href: "/test" },
    { name: "Learning", href: "/learn" },
  ];

  return (
    <header className="mb-4 md:mb-8">
      <nav>
        <div className="flex justify-between p-2 sm:p-4 items-center h-16 rounded-xl bg-card shadow-sm border border-border/40">
          {/* Left: Logo */}
          <div className="flex gap-2 items-center">
            <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/logo.svg" alt="logo" className="h-8 hover:scale-105 transition-transform" />
              <BlurIn className="text-base md:text-lg font-medium">Opportunity Lens</BlurIn>
            </Link>
          </div>

          {/* Right: Navigation, Theme & Avatar */}
          <div className="flex gap-2 sm:gap-4 items-center">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-muted/30 p-1 rounded-lg border border-border/20 mr-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      isActive
                        ? "bg-background text-primary shadow-sm font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <ThemeToggle />
            <AvatarWithDropdown userImage={userImage} />
          </div>
        </div>
      </nav>
    </header>
  );
}
