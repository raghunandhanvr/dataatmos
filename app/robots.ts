import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/marketing/site"

const privatePaths = ["/dashboard", "/auth", "/onboarding"]

const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      ...aiCrawlers.map(userAgent => ({
        userAgent,
        allow: "/",
        disallow: privatePaths,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
