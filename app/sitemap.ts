import type { MetadataRoute } from "next"
import { marketingPages, marketingUrl } from "@/lib/marketing/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return marketingPages.map(page => ({
    url: marketingUrl(page.path),
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
