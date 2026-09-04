import type { Metadata } from "next"
import type { ReactNode } from "react"
import { SITE_URL } from "@/lib/marketing/site"
import { MarketingJsonLd } from "./_components/json-ld"

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
    types: {
      "text/plain": `${SITE_URL}/llms.txt`,
    },
  },
}

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <MarketingJsonLd />
      {children}
    </div>
  )
}
