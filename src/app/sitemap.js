const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://opportunitylens.app";

const routes = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/architect", priority: 0.8, changeFrequency: "weekly" },
  { path: "/demo/start-free", priority: 0.75, changeFrequency: "monthly" },
  { path: "/demo/quiz", priority: 0.8, changeFrequency: "monthly" },
  { path: "/demo/learning-paths", priority: 0.85, changeFrequency: "monthly" },
  { path: "/demo/architect", priority: 0.75, changeFrequency: "monthly" },
  { path: "/demo/dashboard", priority: 0.75, changeFrequency: "monthly" },
];

export default function sitemap() {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
