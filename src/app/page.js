"use client"
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram, 
  PlayCircle, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  BarChart3, 
  Users, 
  Code2, 
  TrendingUp,
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export default function LandingPage() {
  const router = useRouter();
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      name: "Alex Morgan",
      role: "Data Scientist at TechFlow",
      initials: "AM",
      color: "bg-blue-100 text-blue-700",
      quote: "The clarity I got from Opportunity Lens is unmatched. It didn't just show me data charts, it showed me a clear career path I couldn't see before."
    },
    {
      name: "Priya Kapoor",
      role: "CS Graduate Student",
      initials: "PK",
      color: "bg-purple-100 text-purple-700",
      quote: "I was drowning in tutorials. This tool helped me focus on the 20% of skills that give 80% of the results. I finally feel like I'm making progress."
    },
    {
      name: "James Ross",
      role: "Engineering Lead",
      initials: "JR",
      color: "bg-green-100 text-green-700",
      quote: "Our team uses it to align on skill gaps. It's become essential for our quarterly learning goals and keeping everyone on the same page."
    },
    {
      name: "Sarah Chen",
      role: "Product Manager",
      initials: "SC",
      color: "bg-orange-100 text-orange-700",
      quote: "Finally, a tool that helps me understand the technical constraints my team faces. It's bridged the gap between product and engineering."
    },
    {
      name: "Michael Torres",
      role: "Junior Developer",
      initials: "MT",
      color: "bg-indigo-100 text-indigo-700",
      quote: "The roadmap feature is a lifesaver. I know exactly what to learn next to level up my career. Highly recommended for new devs."
    },
    {
      name: "Emily Watson",
      role: "Data Analyst",
      initials: "EW",
      color: "bg-pink-100 text-pink-700",
      quote: "The visualizations are top notch. I can easily spot trends and outliers in my data. It's made my job so much easier."
    }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1 rounded-md">
                <Image src="/logo.svg" alt="logo" width={20} height={20} className="invert brightness-0" />
              </div>
              <span className="font-bold text-lg tracking-tight">Opportunity Lens</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium hover:text-primary hidden sm:block">
              Log In
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6" onClick={() => router.push('/signup')}>
              Start Your  Journey
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
              
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                Turn complex data into <br className="hidden md:block" />
                <span className="text-blue-600">clear opportunities.</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Opportunity Lens helps you cut through the noise, visualize key metrics, and surface actionable insights — so you can make decisions with confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-base w-full sm:w-auto" onClick={() => router.push('/signup')}>
                  Get Started Free
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 text-base gap-2 w-full sm:w-auto">
                  <PlayCircle className="w-5 h-5" />
                  See How It Works
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground pt-4">
                Built for students, analysts, and early-stage teams
              </p>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative max-w-6xl mx-auto mt-12 perspective-1000">
              <div className="relative rounded-xl border bg-background shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-500">
                {/* Browser Chrome */}
                <div className="bg-muted/50 border-b px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="mx-auto bg-background/50 px-3 py-1 rounded-md text-xs text-muted-foreground font-mono">
                    app.opportunitylens.com
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 md:p-8 bg-slate-50/50 dark:bg-slate-950/50">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-bold">Q3 Sales Performance</h3>
                      <p className="text-sm text-muted-foreground">Updated 12 mins ago</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Export Report
                      </Button>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 shadow-sm">
                      <p className="text-sm font-medium text-muted-foreground mb-2">AVERAGE SCORE</p>
                      <div className="text-3xl font-bold">65%</div>
                      <div className="flex items-center text-green-600 text-sm mt-1 font-medium">
                        <TrendingUp className="w-4 h-4 mr-1" /> +12.5%
                      </div>
                    </Card>
                    <Card className="p-6 shadow-sm">
                      <p className="text-sm font-medium text-muted-foreground mb-2">ACTIVE CHALLENGES</p>
                      <div className="text-3xl font-bold">66</div>
                      <div className="flex items-center text-green-600 text-sm mt-1 font-medium">
                        <TrendingUp className="w-4 h-4 mr-1" /> +5.2%
                      </div>
                    </Card>
                    <Card className="p-6 shadow-sm">
                      <p className="text-sm font-medium text-muted-foreground mb-2">PASS RATE</p>
                      <div className="text-3xl font-bold">88.4%</div>
                      <div className="flex items-center text-red-500 text-sm mt-1 font-medium">
                        <TrendingUp className="w-4 h-4 mr-1 rotate-180" /> -1.1%
                      </div>
                    </Card>
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="p-6 lg:col-span-2 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-semibold">SCORE Trend</h4>
                        <Badge variant="secondary" className="bg-slate-900 text-white hover:bg-slate-800">$12.4k</Badge>
                      </div>
                      <div className="h-[200px] flex items-end justify-between gap-2 px-2">
                        {[35, 45, 30, 55, 40, 65, 50, 75, 60, 85, 70, 95].map((h, i) => (
                          <div key={i} className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-t-sm relative group">
                            <div 
                              className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm transition-all duration-500 group-hover:bg-blue-600"
                              style={{ height: `${h}%` }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-4 text-xs text-muted-foreground px-2">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                      </div>
                    </Card>

                    <Card className="p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-semibold">Top Sectors</h4>
                        <span className="text-muted-foreground">...</span>
                      </div>
                      <div className="space-y-6">
                        {[
                          { label: "Technology", val: 45, color: "bg-blue-500" },
                          { label: "Finance", val: 28, color: "bg-cyan-400" },
                          { label: "Healthcare", val: 15, color: "bg-purple-400" },
                          { label: "Retail", val: 12, color: "bg-slate-400" }
                        ].map((item) => (
                          <div key={item.label} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                <span>{item.label}</span>
                              </div>
                              <span className="font-medium">{item.val}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                              <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/50 flex items-center gap-3">
                        <div className="bg-green-100 dark:bg-green-900/50 p-1.5 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-green-800 dark:text-green-300">Optimization Complete</p>
                          <p className="text-[10px] text-green-600 dark:text-green-400">3 new insights found</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Learning skills is easy.<br />
                <span className="text-blue-600">Knowing what to learn next isn&apos;t.</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Most learners are stuck between tutorials, confusion, and zero real-world direction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="p-8 bg-background border-none shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">You don&apos;t know your real skill level</h3>
                <p className="text-muted-foreground mb-8">
                  Courses don&apos;t tell you what you&apos;re actually good or bad at. You finish a video, but can you build the thing?
                </p>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span>React</span>
                      <span>60%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[60%]" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Node.js</span>
                      <span>30%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 w-[30%]" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Skill Gap</span>
                    <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">i</div>
                  </div>
                </div>
              </Card>

              {/* Feature 2 */}
              <Card className="p-8 bg-background border-none shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 text-purple-600">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Learning paths are generic</h3>
                <p className="text-muted-foreground mb-8">
                  Everyone gets the same roadmap, regardless of strengths or gaps. It&apos;s one-size-fits-none.
                </p>
                <div className="flex justify-center gap-4 py-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm">
                        <Users className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="w-8 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Feature 3 */}
              <Card className="p-8 bg-background border-none shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-6 text-orange-600">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Open source feels intimidating</h3>
                <p className="text-muted-foreground mb-8">
                  You want to contribute, but don&apos;t know where to start or what issues match your skills.
                </p>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border space-y-3">
                  <div className="flex gap-1.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded w-16" />
                      <Badge variant="outline" className="text-[10px] h-4 px-1 text-blue-600 bg-blue-50 border-blue-100">Good First Issue</Badge>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-16 text-center max-w-5xl mx-auto border shadow-sm">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Stop learning in the dark.<br />
                <span className="text-blue-600">Light up your path.</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                Join over 10,000 data explorers who use Opportunity Lens to find their gaps, master their skills, and land their dream roles.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-base w-full sm:w-auto" onClick={() => router.push('/signup')}>
                  Get Started Free
                </Button>
                <Button variant="outline" size="lg" className="bg-background h-12 px-8 text-base gap-2 w-full sm:w-auto">
                  <PlayCircle className="w-5 h-5" />
                  See How It Works
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Don&apos;t just take our word for it</h2>
              <p className="text-lg text-muted-foreground">
                See how Opportunity Lens is helping analysts, students, and teams achieve their data goals.
              </p>
            </div>
            
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((item, i) => (
                <div key={i} className="min-w-[300px] md:min-w-[calc(33.333%-1.5rem)] snap-center">
                  <Card className="p-8 border-none shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-blue-500 text-blue-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-8 leading-relaxed">&quot;{item.quote}&quot;</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={item.color}>{item.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.role}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <Button variant="outline" size="icon" onClick={scrollLeft} className="rounded-full">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={scrollRight} className="rounded-full">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-1 rounded-md">
                  <Image src="/logo.svg" alt="logo" width={20} height={20} className="invert brightness-0" />
                </div>
                <span className="font-bold text-lg">Opportunity Lens</span>
              </div>
              <p className="text-muted-foreground max-w-xs mb-6">
                Turn complex data into clear opportunities. The all-in-one platform for modern data exploration, visualization, and predictive insights.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="hover:text-blue-600">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-blue-600">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-blue-600">
                  <Instagram className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* <div>
              <h3 className="font-bold mb-6 text-sm uppercase tracking-wider">Product</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Updates</Link></li>
              </ul>
            </div> */}
            
            <div>
              <h3 className="font-bold mb-6 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-sm uppercase tracking-wider">Support</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Community</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2024 Opportunity Lens Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

