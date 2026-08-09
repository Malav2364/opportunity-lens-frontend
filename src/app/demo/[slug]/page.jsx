import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  Database,
  FileCode,
  Folder,
  Hammer,
  Lock,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const demoPages = {
  "start-free": {
    navLabel: "Start free",
    eyebrow: "Public onboarding demo",
    title: "Start with a learner profile, not a blank account",
    description:
      "This page shows how Opportunity Lens turns sign-up details into useful learning context before a learner ever opens the dashboard.",
  },
  login: {
    navLabel: "Log in",
    eyebrow: "Returning learner demo",
    title: "Bring learners back to their next best action",
    description:
      "A returning session should resume the learner's plan, recent scores, and immediate priority instead of asking them to start over.",
  },
  quiz: {
    navLabel: "Take a quiz",
    eyebrow: "Assessment demo",
    title: "Assess skill level before recommending a path",
    description:
      "This preview shows how a quiz can collect evidence, identify gaps, and feed a customized learning path.",
  },
  "learning-paths": {
    navLabel: "Learning paths",
    eyebrow: "Skill tree demo",
    title: "A real-looking learning path from quiz results",
    description:
      "This public demo mirrors the learning path experience with a static skill tree so visitors can see how modules unlock over time.",
  },
  architect: {
    navLabel: "Architect",
    eyebrow: "Project blueprint demo",
    title: "Turn mastered skills into a portfolio project",
    description:
      "The architect view shows how verified skills can become a practical project blueprint with structure, data model, and build plan.",
  },
  dashboard: {
    navLabel: "Dashboard",
    eyebrow: "Progress dashboard demo",
    title: "Show progress, gaps, and the next step in one place",
    description:
      "This dashboard preview demonstrates how Opportunity Lens organizes scores, learning goals, and suggested challenges.",
  },
};

const demoNav = [
  ["start-free", demoPages["start-free"].navLabel],
  ["login", demoPages.login.navLabel],
  ["quiz", demoPages.quiz.navLabel],
  ["learning-paths", demoPages["learning-paths"].navLabel],
  ["architect", demoPages.architect.navLabel],
  ["dashboard", demoPages.dashboard.navLabel],
];

const demoModules = [
  {
    title: "React fundamentals",
    status: "completed",
    chapters: [
      { title: "Components and props", topics: ["Reusable UI", "Props flow", "Composition"] },
      { title: "State and events", topics: ["useState", "Forms", "Event handlers"] },
    ],
  },
  {
    title: "Data-driven UI",
    status: "active",
    chapters: [
      { title: "Rendering collections", topics: ["Lists", "Keys", "Empty states"] },
      { title: "Async interfaces", topics: ["Loading states", "Errors", "Optimistic UI"] },
    ],
  },
  {
    title: "Full-stack project readiness",
    status: "locked",
    chapters: [
      { title: "API routes", topics: ["Request shape", "Validation", "Persistence"] },
      { title: "Portfolio polish", topics: ["README", "Demo data", "Deployment"] },
    ],
  },
];

const demoQuizzes = [
  { title: "React State Assessment", difficulty: "Medium", score: 76, skills: ["React", "Hooks"] },
  { title: "API Fundamentals", difficulty: "Easy", score: 88, skills: ["REST", "HTTP"] },
  { title: "Data Modeling", difficulty: "Hard", score: 61, skills: ["Schema", "MongoDB"] },
];

const statCards = [
  { label: "Average score", value: "75%", icon: BarChart3, tone: "text-blue-600 bg-blue-50" },
  { label: "Skill gaps found", value: "6", icon: Target, tone: "text-amber-600 bg-amber-50" },
  { label: "Path progress", value: "42%", icon: TrendingUp, tone: "text-emerald-600 bg-emerald-50" },
];

export function generateStaticParams() {
  return Object.keys(demoPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = demoPages[slug];

  if (!page) {
    return {};
  }

  return {
    title: `${page.navLabel} Demo for AI Learning Paths`,
    description: page.description,
    alternates: {
      canonical: `/demo/${slug}`,
    },
    openGraph: {
      type: "article",
      title: `${page.navLabel} Demo for AI Learning Paths | Opportunity Lens`,
      description: page.description,
      url: `/demo/${slug}`,
      images: [
        {
          url: "/opengraph-image.svg",
          width: 1200,
          height: 630,
          alt: "Opportunity Lens AI learning platform demo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.navLabel} Demo for AI Learning Paths | Opportunity Lens`,
      description: page.description,
      images: ["/opengraph-image.svg"],
    },
  };
}

export default async function DemoPage({ params }) {
  const { slug } = await params;
  const page = demoPages[slug];

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-background dark:text-slate-100">
      <header className="border-b bg-white/90 backdrop-blur dark:bg-background/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <Image src="/logo.svg" alt="Opportunity Lens" width={22} height={22} className="invert brightness-0" />
            </span>
            <span>Opportunity Lens</span>
          </Link>
          <nav className="flex gap-2 overflow-x-auto pb-1 text-sm md:pb-0">
            {demoNav.map(([itemSlug, label]) => (
              <Link
                key={itemSlug}
                href={`/demo/${itemSlug}`}
                className={cn(
                  "whitespace-nowrap rounded-full border px-4 py-2 transition-colors",
                  itemSlug === slug
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600 dark:bg-card dark:text-slate-300"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300">
              {page.eyebrow}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{page.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {page.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
                <Link href="/demo/learning-paths">
                  View learning path <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">
                  Back to homepage
                </Link>
              </Button>
            </div>
          </div>
          <HeroPreview slug={slug} />
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16">
          {slug === "start-free" && <StartFreeDemo />}
          {slug === "login" && <LoginDemo />}
          {slug === "quiz" && <QuizDemo />}
          {slug === "learning-paths" && <LearningPathDemo />}
          {slug === "architect" && <ArchitectDemo />}
          {slug === "dashboard" && <DashboardDemo />}
        </section>
      </main>
    </div>
  );
}

function HeroPreview({ slug }) {
  const label = demoPages[slug].navLabel;

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-2xl dark:bg-card">
      <div className="flex items-center gap-2 border-b bg-slate-100 px-4 py-3 dark:bg-slate-900">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-auto rounded-md bg-white px-3 py-1 font-mono text-xs text-slate-500 dark:bg-background">
          opportunitylens.com/demo/{slug}
        </span>
      </div>
      <div className="grid gap-5 p-5 md:grid-cols-[1fr_0.75fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">{label}</p>
              <h2 className="text-2xl font-bold">Learning plan preview</h2>
            </div>
            <Sparkles className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
            {["Assess current level", "Find the gaps", "Recommend next step"].map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-xl border p-3">
                  <Icon className="mb-2 h-4 w-4 text-blue-600" />
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex min-h-64 items-center justify-center rounded-xl bg-blue-50 p-5 dark:bg-blue-950/30">
          <Image src="/brain-imag.png" alt="Opportunity Lens skill map" width={420} height={320} className="max-h-64 object-contain" priority />
        </div>
      </div>
    </div>
  );
}

function StartFreeDemo() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="space-y-4 p-6">
            <CardTitle>Create your learner profile</CardTitle>
            <CardDescription>Dummy form fields show the context Opportunity Lens can collect.</CardDescription>
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input value="Maya Patel" readOnly />
              <Label>Goal</Label>
              <Input value="Frontend developer internship" readOnly />
              <Label>Current focus</Label>
              <Input value="React, APIs, portfolio projects" readOnly />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Preview onboarding</Button>
          </div>
          <div className="flex items-center justify-center bg-slate-100 p-6 dark:bg-slate-900">
            <Image src="/signupOl.svg" alt="Signup workflow illustration" width={380} height={320} className="max-h-80 object-contain" />
          </div>
        </CardContent>
      </Card>

      <ProcessList
        title="What happens after sign-up"
        items={[
          ["Profile parsed", "Goals, available time, and preferred topics become the starting context."],
          ["Baseline quiz suggested", "The platform recommends the first assessment instead of dropping the user into a generic dashboard."],
          ["Learning path prepared", "The first path is created around the learner's target role and confidence level."],
        ]}
      />
    </div>
  );
}

function LoginDemo() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="space-y-4 p-6">
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Dummy login state for a returning learner.</CardDescription>
            <div className="rounded-xl border bg-slate-50 p-4 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">MP</div>
                <div>
                  <p className="font-semibold">Maya Patel</p>
                  <p className="text-sm text-slate-500">React path - 42% complete</p>
                </div>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/demo/dashboard">Resume dashboard</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center bg-slate-100 p-6 dark:bg-slate-900">
            <Image src="/loginOL.svg" alt="Login workflow illustration" width={360} height={320} className="max-h-80 object-contain" />
          </div>
        </CardContent>
      </Card>

      <ProcessList
        title="Session context restored"
        items={[
          ["Recent score loaded", "Last quiz performance updates the current skill gap list."],
          ["Next step highlighted", "The learner sees the module or project that matters right now."],
          ["Progress synced", "Dashboard, learning path, and architect all use the same skill context."],
        ]}
      />
    </div>
  );
}

function QuizDemo() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>React State Assessment</CardTitle>
              <CardDescription>Question 3 of 10 - medium difficulty</CardDescription>
            </div>
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Medium</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-xl border bg-slate-50 p-5 dark:bg-slate-900">
            <p className="text-lg font-semibold">Which hook is most appropriate for storing a selected quiz answer?</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {["useState", "useMemo", "useRef", "useLayoutEffect"].map((answer, index) => (
              <button
                key={answer}
                className={cn(
                  "rounded-xl border p-4 text-left font-medium transition-colors",
                  index === 0 ? "border-blue-600 bg-blue-50 text-blue-700" : "bg-white hover:border-blue-200 dark:bg-card"
                )}
              >
                <span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span>
                {answer}
              </button>
            ))}
          </div>
          <Progress value={30} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How this becomes guidance</CardTitle>
          <CardDescription>Dummy analysis generated from quiz answers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            ["Strong", "Components, props, simple state"],
            ["Needs work", "Async state, error handling, derived data"],
            ["Recommended next", "Data-driven UI module in the learning path"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
              <p className="mt-1 font-semibold">{value}</p>
            </div>
          ))}
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href="/demo/learning-paths">See generated path</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function LearningPathDemo() {
  return (
    <div className="rounded-2xl border bg-white px-4 py-10 shadow-sm dark:bg-card">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-50">Generated from quiz results</Badge>
        <h2 className="text-3xl font-bold">Your Learning Adventure</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Master each skill node to progress. Completed modules unlock the next branch, while locked modules preview what comes later.
        </p>
      </div>
      <DemoSkillTree />
    </div>
  );
}

function DemoSkillTree() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-8">
      <div className="absolute bottom-8 left-1/2 top-8 hidden w-1 -translate-x-1/2 bg-slate-200 md:block dark:bg-slate-800" />
      <div className="space-y-12 md:space-y-20">
        {demoModules.map((module, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={module.title}
              className={cn("relative flex flex-col items-center gap-6 md:flex-row", isLeft ? "md:flex-row" : "md:flex-row-reverse")}
            >
              <div className="w-full md:w-1/2">
                <ModulePreview module={module} align={isLeft ? "right" : "left"} />
              </div>
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 bg-white shadow-lg dark:bg-card">
                {module.status === "completed" && <Check className="h-8 w-8 text-green-600" />}
                {module.status === "active" && <Star className="h-8 w-8 fill-blue-600 text-blue-600" />}
                {module.status === "locked" && <Lock className="h-7 w-7 text-slate-400" />}
              </div>
              <div className="hidden w-1/2 md:block" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModulePreview({ module, align }) {
  const statusStyles = {
    completed: "border-t-green-500",
    active: "border-t-blue-500",
    locked: "border-t-slate-300 opacity-80",
  };

  return (
    <Card className={cn("border-t-4 shadow-sm", statusStyles[module.status], align === "right" ? "md:ml-auto" : "md:mr-auto", "max-w-md")}>
      <CardContent className="p-5">
        <Badge variant="secondary" className="mb-3 uppercase">
          {module.status}
        </Badge>
        <h3 className="text-xl font-bold">{module.title}</h3>
        <div className="mt-4 space-y-3">
          {module.chapters.map((chapter) => (
            <div key={chapter.title} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <BookOpen className="h-4 w-4 text-blue-600" />
                {chapter.title}
              </div>
              <div className="flex flex-wrap gap-2 pl-6">
                {chapter.topics.map((topic) => (
                  <span key={topic} className="rounded border bg-white px-2 py-1 text-xs text-slate-600 dark:bg-card dark:text-slate-300">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ArchitectDemo() {
  const files = ["app/dashboard/page.jsx", "components/skill-card.jsx", "lib/progress-model.js", "README.md"];
  const tables = ["learners", "skill_scores", "project_milestones"];

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20">Verified project blueprint</Badge>
        <h2 className="text-3xl font-bold">SkillPath Studio</h2>
        <p className="mt-2 max-w-2xl text-blue-100">
          A portfolio app that proves React state, API handling, and data modeling through a guided learning dashboard.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <BlueprintCard title="Structure" icon={Folder} items={files} />
        <BlueprintCard title="Data model" icon={Database} items={tables} />
        <BlueprintCard title="Build plan" icon={Hammer} items={["Create demo data", "Build dashboard UI", "Add progress states", "Deploy and document"]} />
      </div>
    </div>
  );
}

function BlueprintCard({ title, icon: Icon, items }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-blue-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-lg border bg-slate-50 px-3 py-2 text-sm dark:bg-slate-900">
            <FileCode className="h-4 w-4 text-slate-400" />
            <span>{item}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function DashboardDemo() {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-start justify-between p-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-4xl font-bold">{stat.value}</p>
                  <p className="mt-2 text-sm text-emerald-600">Improving this week</p>
                </div>
                <div className={cn("rounded-xl p-3", stat.tone)}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Choose your next challenge</CardTitle>
            <CardDescription>Dummy quizzes generated from weak areas.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {demoQuizzes.map((quiz) => (
              <div key={quiz.title} className="rounded-xl border p-4">
                <Badge variant="secondary">{quiz.difficulty}</Badge>
                <h3 className="mt-3 font-bold">{quiz.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{quiz.skills.join(", ")}</p>
                <Progress value={quiz.score} className="mt-4" />
                <p className="mt-2 text-xs text-slate-500">Current score: {quiz.score}%</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current focus</CardTitle>
            <CardDescription>What the platform would recommend today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Study", "Async state patterns"],
              ["Practice", "Build a search and filter UI"],
              ["Project", "Add progress tracking to SkillPath Studio"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start gap-3 rounded-xl border p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProcessList({ title, items }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Static preview of the information pipeline.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map(([label, description], index) => (
          <div key={label} className="flex gap-4 rounded-xl border p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {index + 1}
            </span>
            <div>
              <h3 className="font-bold">{label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
