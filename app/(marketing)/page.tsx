import { Hero } from "./_components/hero"
import { MarketingBlurb, MarketingSections } from "./_components/marketing-copy"

export default function Home() {
  return (
    <div className="h-full w-full">
      <Hero blurb={<MarketingBlurb />} sections={<MarketingSections />} />
    </div>
  )
}
