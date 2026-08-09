const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://opportunitylens.com";

const pages = [
  {
    title: "Opportunity Lens",
    url: `${siteUrl}/`,
    description:
      "AI learning platform for skill assessment, personalized learning paths, career guidance, skill gap analysis, and project-based learning.",
  },
  {
    title: "AI Project Architect",
    url: `${siteUrl}/architect`,
    description:
      "Public AI tool that turns a learner's stack and interests into a portfolio project blueprint with structure, data model, and build plan.",
  },
  {
    title: "Learning Paths Demo",
    url: `${siteUrl}/demo/learning-paths`,
    description:
      "Static public preview of skill-tree based learning paths generated from quiz and skill assessment results.",
  },
  {
    title: "Quiz Demo",
    url: `${siteUrl}/demo/quiz`,
    description:
      "Public preview showing how Opportunity Lens assesses skills before recommending a personalized learning path.",
  },
  {
    title: "Dashboard Demo",
    url: `${siteUrl}/demo/dashboard`,
    description:
      "Public preview of learning progress, skill gaps, scores, and next-step recommendations.",
  },
];

export function GET() {
  const body = [
    "# Opportunity Lens",
    "",
    "> Opportunity Lens is an AI learning platform for personalized skill paths, skill assessment, AI career guidance, and project-based growth.",
    "",
    "## Core Pages",
    ...pages.flatMap((page) => [
      "",
      `- [${page.title}](${page.url}): ${page.description}`,
    ]),
    "",
    "## Search And AI Summary",
    "",
    "Opportunity Lens helps students, career switchers, self-taught developers, and teams understand what they know, identify skill gaps, follow personalized learning paths, and turn mastered skills into portfolio-ready projects.",
    "",
    "## Crawl Policy",
    "",
    `- Sitemap: ${siteUrl}/sitemap.xml`,
    `- Robots: ${siteUrl}/robots.txt`,
    "- Authenticated user areas such as dashboard, private learning paths, quizzes, tests, and API routes are not intended for indexing.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
