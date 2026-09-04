export const SITE_URL = "https://dataatmos.ai"

export const GITHUB_URL = "https://github.com/DataAtmos"
export const X_URL = "https://x.com/dataatmos"

export type MarketingPage = {
  path: string
  title: string
  description: string
  changeFrequency: "weekly" | "monthly"
  priority: number
}

// Add a row here when a new public page lands under app/(marketing).
export const marketingPages: MarketingPage[] = [
  {
    path: "/",
    title: "Data Atmos",
    description:
      "Managed databases, real-time analytics, data connectors and AI workloads in one platform. Run it in your AWS account or on our hosted service. Fully managed either way.",
    changeFrequency: "weekly",
    priority: 1,
  },
]

export function marketingUrl(path: string) {
  if (path === "/") {
    return SITE_URL
  }

  return `${SITE_URL}${path}`
}
