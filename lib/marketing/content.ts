import { GITHUB_URL, marketingPages, marketingUrl, SITE_URL, X_URL } from "@/lib/marketing/site"

export const marketingPhrases = [
  "all your data needs.",
  "managed databases.",
  "real-time analytics.",
  "data connectors.",
  "AI workloads.",
] as const

export const marketingBlurb = [
  "Managed databases, real-time analytics, data connectors and AI workloads in one place. Run it inside your own AWS account, or use our hosted service. Fully managed by us either way.",
] as const

export const marketingLaunchPlain =
  "We are building. Our first release will support PostgreSQL on AWS in us-east-1 and ap-south-2, with analytics powered by ClickHouse. More databases, clouds and regions will follow."

export const marketingSections = [
  {
    heading: "What are we building?",
    paragraphs: [
      "A platform that combines managed databases and analytics, so you do not need separate services for databases, CDC, storage, warehousing and BI.",
      "You enable analytics on the tables you choose. Data Atmos synchronizes them automatically and lets you query them with SQL, on separate compute from your application workload.",
      "The transactional engine handles application workloads, the analytical engine handles queries, and object storage holds historical data. Each layer scales on its own, so you pay only for what each workload uses.",
      "Data is stored in open formats such as Iceberg and Parquet, inside your own cloud account. It follows a simple medallion architecture: Bronze for raw synchronized data, Silver for cleaned and transformed data, Gold for business ready datasets. Any compatible query engine, BI tool, notebook or AI workload can read it directly.",
      "We use native engines, not forks or emulations. Infrastructure runs in your account or on our hosted service, while provisioning, monitoring, maintenance and recovery are managed by us. Compute and storage are metered separately, so pricing stays transparent.",
    ],
  },
  {
    heading: "Why are we building this?",
    paragraphs: [
      "Analytics does not belong on production, so teams build a pipeline instead. A CDC service, object storage, a warehouse, an orchestrator, a BI tool, and the code that connects them.",
      "That stack has to be run by someone. Connectors break on schema changes. Syncs fall behind. Costs are spread across five vendors and hard to attribute. Small teams end up spending engineering time on infrastructure rather than on their product.",
      "We are building one platform that handles both workloads, keeps the data in open formats in your own cloud account, and removes the pipeline from the equation.",
    ],
  },
] as const

export function buildLlmsTxt() {
  const pages = marketingPages
    .map(page => `- [${page.title}](${marketingUrl(page.path)}): ${page.description}`)
    .join("\n")

  return `# Data Atmos

> Managed databases, real-time analytics, data connectors and AI workloads in one platform.

Data Atmos is a single platform for ${marketingPhrases.map(phrase => phrase.replace(/\.$/, "")).join(", ")}.

${marketingBlurb[0]}

${marketingLaunchPlain}

## Pages

${pages}

- [Full marketing copy](${SITE_URL}/llms-full.txt): Complete homepage text for assistants

## Links

- Site: ${SITE_URL}
- GitHub: ${GITHUB_URL}
- X: ${X_URL}
`
}

export function buildLlmsFullTxt() {
  const sections = marketingSections
    .map(section => `## ${section.heading}\n\n${section.paragraphs.join("\n\n")}`)
    .join("\n\n")

  return `# Data Atmos

> ${marketingPages[0]?.description ?? ""}

Data Atmos is a single platform for ${marketingPhrases.map(phrase => phrase.replace(/\.$/, "")).join(", ")}.

${marketingBlurb[0]}

${marketingLaunchPlain}

${sections}

## Links

- Home: ${SITE_URL}
- GitHub: ${GITHUB_URL}
- X: ${X_URL}
- Machine-readable index: ${SITE_URL}/llms.txt
- Sitemap: ${SITE_URL}/sitemap.xml
`
}

export function marketingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Data Atmos",
        url: SITE_URL,
        sameAs: [GITHUB_URL, X_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Data Atmos",
        description: marketingPages[0]?.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: marketingPages[0]?.title,
        description: marketingPages[0]?.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#software` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: "Data Atmos",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: SITE_URL,
        description: marketingPages[0]?.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        featureList: [
          "Managed PostgreSQL",
          "Real-time analytics with ClickHouse",
          "CDC and data connectors",
          "Bring your own AWS account or hosted service",
          "Open table formats (Iceberg, Parquet)",
          "Medallion architecture for AI and BI workloads",
        ],
      },
    ],
  }
}
