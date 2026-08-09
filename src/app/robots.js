const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://opportunitylens.app";
const siteHost = new URL(siteUrl).host;

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/learn",
          "/quiz",
          "/test",
        ],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
        ],
        allow: [
          "/",
          "/demo/",
          "/architect",
          "/sitemap.xml",
          "/llms.txt",
        ],
        disallow: [
          "/api/",
          "/dashboard",
          "/learn",
          "/quiz",
          "/test",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteHost,
  };
}
