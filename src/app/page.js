import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Facebook, 
  Twitter, 
  PlayCircle, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  Users, 
  Code2, 
  TrendingUp,
  Calendar,
  Download,
  BookOpen,
  BrainCircuit,
  Send,
  Sparkles,
  Target,
  Share2,
} from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import Image from "next/image"
import Link from "next/link";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://opportunitylens.app";
const shareText = "Opportunity Lens is a learning platform that uses AI to build personalized skill plans, learning paths, and career guidance.";
const shareUrl = siteUrl;
const demoRoutes = {
  start: "/login",
  login: "/login",
  quiz: "/demo/quiz",
  learningPaths: "/demo/learning-paths",
  architect: "/demo/architect",
  dashboard: "/demo/dashboard",
};

const learningPillars = [
  {
    title: "AI-guided skill assessment",
    description:
      "Opportunity Lens analyzes current skills, goals, and gaps so each recommendation is based on evidence instead of generic course lists.",
    icon: BrainCircuit,
  },
  {
    title: "Personalized learning paths",
    description:
      "Learners get a focused path that explains what to learn first, what to practice next, and which skills matter for their target role.",
    icon: Target,
  },
  {
    title: "Career-ready progress",
    description:
      "Every roadmap adapts to pace, strengths, and outcomes, helping students, career switchers, and teams turn learning into visible growth.",
    icon: Sparkles,
  },
];

const faqItems = [
  {
    question: "Is Opportunity Lens a learning platform?",
    answer:
      "Yes. Opportunity Lens is a learning platform built around skill assessment, personalized learning paths, AI guidance, and practical next-step recommendations.",
  },
  {
    question: "How are personalized learning paths created?",
    answer:
      "The platform reviews a learner's goals, quiz results, strengths, and skill gaps, then turns that context into a customized learning path with clear priorities.",
  },
  {
    question: "Can Opportunity Lens help with AI career guidance?",
    answer:
      "Yes. Opportunity Lens connects skill gaps with role-focused recommendations, practice tasks, and learning resources so learners can prepare for career goals with less guesswork.",
  },
  {
    question: "Who is the platform for?",
    answer:
      "It is designed for students, self-taught learners, career switchers, early-career professionals, and teams that need structured upskilling and measurable progress.",
  },
];

const internalResources = [
  { href: demoRoutes.start, label: "Start free" },
  { href: demoRoutes.login, label: "Log in" },
  { href: demoRoutes.quiz, label: "Take a quiz" },
  { href: demoRoutes.learningPaths, label: "View learning paths" },
  { href: demoRoutes.architect, label: "Explore architect" },
  { href: demoRoutes.dashboard, label: "Open dashboard" },
];

const visualPanels = [
  {
    title: "Assess the learner",
    description: "A guided setup captures goals, current level, and skill confidence before the platform recommends anything.",
    image: "/signupOl.svg",
    alt: "Opportunity Lens onboarding screen preview",
  },
  {
    title: "Map the gaps",
    description: "Quiz results and topic history become a clear picture of strengths, weak areas, and next priorities.",
    image: "/brain-imag.png",
    alt: "Opportunity Lens skill intelligence visual",
  },
  {
    title: "Return with context",
    description: "Each session brings learners back to their plan, progress, and next action instead of a blank dashboard.",
    image: "/loginOL.svg",
    alt: "Opportunity Lens returning learner screen preview",
  },
];

const learningSteps = [
  {
    title: "Assess current skills",
    description:
      "Start with quizzes and skill checks that reveal where a learner is confident and where support is needed.",
  },
  {
    title: "Build a learning path",
    description:
      "Turn those results into a personalized plan that prioritizes the highest-impact skills first.",
  },
  {
    title: "Practice with purpose",
    description:
      "Follow projects, resources, and recommendations tied to real goals instead of jumping between random tutorials.",
  },
  {
    title: "Track progress",
    description:
      "Review scores, completed skills, and recommended next steps so improvement stays visible and actionable.",
  },
];

const shareLinks = {
  x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Opportunity Lens",
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Opportunity Lens",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
      description:
        "A learning platform for personalized skill plans, AI career guidance, skill gap analysis, and customized learning paths.",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Learning Platform for Personalized Skill Paths | Opportunity Lens",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#software` },
      primaryImageOfPage: `${siteUrl}/opengraph-image.svg`,
      inLanguage: "en",
    },
    {
      "@type": ["SoftwareApplication", "LearningResource"],
      "@id": `${siteUrl}/#software`,
      name: "Opportunity Lens",
      url: siteUrl,
      applicationCategory: "EducationalApplication",
      applicationSubCategory: "Learning platform",
      operatingSystem: "Web",
      isAccessibleForFree: true,
      learningResourceType: [
        "Skill assessment",
        "Personalized learning path",
        "AI career guidance",
        "Skill gap analysis",
      ],
      audience: [
        { "@type": "Audience", audienceType: "Students" },
        { "@type": "Audience", audienceType: "Career switchers" },
        { "@type": "Audience", audienceType: "Teams" },
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      publisher: { "@id": `${siteUrl}/#organization` },
      description:
        "Opportunity Lens is an AI learning platform that creates customized learning paths, skill gap insights, and next-step recommendations for learners.",
      featureList: [
        "AI-guided skill assessment",
        "Personalized learning paths",
        "Customized skill plans",
        "Career guidance recommendations",
        "Learning progress tracking",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Learning Platform",
          item: siteUrl,
        },
      ],
    },
  ],
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-100 selection:text-blue-900">
      <Script
        id="homepage-learning-platform-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
              <Link href="#features" className="hover:text-foreground transition-colors">Learning Platform</Link>
              <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href={demoRoutes.login} className="text-sm font-medium hover:text-primary hidden sm:block">
              Log In
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6" asChild>
              <Link href={demoRoutes.start}>Start Your Journey</Link>
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
                A learning platform that shows <br className="hidden md:block" />
                <span className="text-blue-600">what to learn next.</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Opportunity Lens combines skill assessment, AI guidance, and personalized learning paths so learners can move from confusion to measurable skill growth.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-base w-full sm:w-auto" asChild>
                  <Link href={demoRoutes.start}>Get Started Free</Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 text-base gap-2 w-full sm:w-auto" asChild>
                  <Link href={demoRoutes.learningPaths}>
                    <PlayCircle className="w-5 h-5" />
                    See How It Works
                  </Link>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground pt-4">
                Built for students, career switchers, and teams
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
                    opportunitylens.com
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 md:p-8 bg-slate-50/50 dark:bg-slate-950/50">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-bold">Personalized Skill Plan</h3>
                      <p className="text-sm text-muted-foreground">Updated today</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Export Plan
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
                      <p className="text-sm font-medium text-muted-foreground mb-2">SKILL GAPS</p>
                      <div className="text-3xl font-bold">66</div>
                      <div className="flex items-center text-green-600 text-sm mt-1 font-medium">
                        <TrendingUp className="w-4 h-4 mr-1" /> +5.2%
                      </div>
                    </Card>
                    <Card className="p-6 shadow-sm">
                      <p className="text-sm font-medium text-muted-foreground mb-2">PLAN PROGRESS</p>
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
                        <h4 className="font-semibold">Learning Progress</h4>
                        <Badge variant="secondary" className="bg-slate-900 text-white hover:bg-slate-800">12 skills</Badge>
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
                        <h4 className="font-semibold">Focus Areas</h4>
                        <span className="text-muted-foreground">...</span>
                      </div>
                      <div className="mb-5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 p-3">
                        <Image
                          src="/brain-imag.png"
                          alt="AI skill map preview"
                          width={360}
                          height={180}
                          className="h-28 w-full object-contain"
                          priority
                        />
                      </div>
                      <div className="space-y-6">
                        {[
                          { label: "Technology", val: 45, color: "bg-blue-500" },
                          { label: "Projects", val: 28, color: "bg-cyan-400" },
                          { label: "Interviews", val: 15, color: "bg-purple-400" },
                          { label: "Portfolio", val: 12, color: "bg-slate-400" }
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
                          <p className="text-xs font-semibold text-green-800 dark:text-green-300">Path Updated</p>
                          <p className="text-[10px] text-green-600 dark:text-green-400">3 new next steps found</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Workflow Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-12">
              <Badge variant="secondary" className="mb-4 bg-blue-50 text-blue-700 border-blue-100">
                Product preview
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                See the platform in action
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Opportunity Lens turns onboarding, assessment, and returning sessions into one connected learning loop. These previews use the same visual language as the app so visitors can understand the experience before signing in.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visualPanels.map((panel) => (
                <div key={panel.title} className="overflow-hidden rounded-xl border bg-background shadow-sm">
                  <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-6">
                    <Image
                      src={panel.image}
                      alt={panel.alt}
                      width={420}
                      height={315}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{panel.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{panel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Badge variant="secondary" className="mb-4 bg-blue-50 text-blue-700 border-blue-100">
                Learning platform
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Personalized learning paths built from real skill gaps
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Opportunity Lens is an AI learning platform for people who want direction, not another overwhelming course catalog. It helps learners understand what they know today, what they should learn next, and how to close the gap with a customized path that adapts to their goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {learningPillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <Card key={pillar.title} className="p-8 border shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  How Opportunity Lens guides learning
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {learningSteps.map((step) => (
                    <div key={step.title} className="border-l-2 border-blue-600 pl-5">
                      <h4 className="font-bold mb-2">{step.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="p-8 border shadow-sm">
                <h3 className="text-2xl font-bold mb-4">Start your skill plan</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Use Opportunity Lens to assess your current level, generate a personalized learning path, and keep every next step connected to your learning goals.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {internalResources.map((item) => (
                    <Link key={`${item.href}-${item.label}`} href={item.href} className="inline-flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </Card>
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
                Join learners who use Opportunity Lens to find skill gaps, follow personalized learning paths, and prepare for their next career move.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-base w-full sm:w-auto" asChild>
                  <Link href={demoRoutes.start}>Get Started Free</Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-background h-12 px-8 text-base gap-2 w-full sm:w-auto" asChild>
                  <Link href={demoRoutes.learningPaths}>
                    <PlayCircle className="w-5 h-5" />
                    See How It Works
                  </Link>
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
                See how Opportunity Lens helps students, professionals, and teams build useful skills with clearer direction.
              </p>
            </div>
            
            <TestimonialsCarousel />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Badge variant="secondary" className="mb-4 bg-blue-50 text-blue-700 border-blue-100">
                Learning FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Questions about Opportunity Lens as a learning platform
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Clear answers for learners comparing AI learning platforms, personalized skill plans, and career guidance tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqItems.map((item) => (
                <Card key={item.question} className="p-8 border shadow-sm">
                  <h3 className="text-lg font-bold mb-3">{item.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                </Card>
              ))}
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
                A learning platform for personalized skill plans, AI guidance, skill gap analysis, and career-ready progress.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={shareLinks.x} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm hover:bg-slate-50 transition-colors">
                  <Twitter className="w-4 h-4" />
                  Share on X
                </a>
                <a href={shareLinks.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm hover:bg-slate-50 transition-colors">
                  <Facebook className="w-4 h-4" />
                  Share on Facebook
                </a>
                <a href={shareLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm hover:bg-slate-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share on LinkedIn
                </a>
                <a href={shareLinks.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm hover:bg-slate-50 transition-colors">
                  <Send className="w-4 h-4" />
                  Share on WhatsApp
                </a>
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
                <li><Link href="#about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                <li><Link href={demoRoutes.dashboard} className="hover:text-blue-600 transition-colors">Dashboard</Link></li>
                <li><Link href={demoRoutes.learningPaths} className="hover:text-blue-600 transition-colors">Learning Paths</Link></li>
                <li><Link href={demoRoutes.architect} className="hover:text-blue-600 transition-colors">Architecture</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-sm uppercase tracking-wider">Support</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#faq" className="hover:text-blue-600 transition-colors">Learning FAQ</Link></li>
                <li><Link href={demoRoutes.quiz} className="hover:text-blue-600 transition-colors">Take a Quiz</Link></li>
                <li><Link href={demoRoutes.architect} className="hover:text-blue-600 transition-colors">Project Architect</Link></li>
                <li><Link href={demoRoutes.start} className="hover:text-blue-600 transition-colors">Start Free</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2024 Opportunity Lens Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href={demoRoutes.login} className="hover:text-foreground">Privacy Policy</Link>
              <Link href={demoRoutes.start} className="hover:text-foreground">Terms of Service</Link>
              <Link href="/#faq" className="hover:text-foreground">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
