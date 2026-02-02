"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, GraduationCap, ClipboardList, User } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  // Don't show on landing page or auth pages
  const excludedPaths = ["/", "/login", "/signup", "/register"];
  if (excludedPaths.includes(pathname)) return null;

  const navItems = [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      icon: LayoutDashboard 
    },
    { 
      name: "Assessment", 
      href: "/test", 
      icon: ClipboardList 
    },
    { 
      name: "Learning", 
      href: "/learn", 
      icon: GraduationCap 
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border/40 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "fill-primary/10" : ""}`} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
