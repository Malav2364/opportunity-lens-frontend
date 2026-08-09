export const maxDuration = 60; // Set timeout to 60 seconds for this route segment

export const metadata = {
  title: "AI Project Architect for Portfolio Learning",
  description:
    "Generate project blueprints from your skills, tech stack, and interests with Opportunity Lens, an AI learning platform for portfolio-ready growth.",
  alternates: {
    canonical: "/architect",
  },
  openGraph: {
    type: "website",
    title: "AI Project Architect for Portfolio Learning | Opportunity Lens",
    description:
      "Turn mastered skills into practical portfolio projects with AI-guided structure, data models, and build plans.",
    url: "/architect",
    images: [
      {
        url: "/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Opportunity Lens AI project architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Project Architect for Portfolio Learning | Opportunity Lens",
    description:
      "Turn mastered skills into practical portfolio projects with AI-guided structure, data models, and build plans.",
    images: ["/opengraph-image.svg"],
  },
};

export default function ArchitectLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
