import { marketingJsonLd } from "@/lib/marketing/content"

export function MarketingJsonLd() {
  return <script type="application/ld+json">{JSON.stringify(marketingJsonLd())}</script>
}
