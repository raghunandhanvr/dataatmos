import { marketingBlurb, marketingSections } from "@/lib/marketing/content"
import { ApSouth2Word, AwsWord, ClickHouseWord, PostgresWord, UsEast1Word } from "./brand-word"

export function MarketingBlurb() {
  return (
    <div className="marketing-landing-blurb marketing-measure shrink-0 pb-2">
      {marketingBlurb.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        We are building. Our first release will support <PostgresWord /> on <AwsWord /> in{" "}
        <UsEast1Word /> and <ApSouth2Word />, with analytics powered by <ClickHouseWord />. More
        databases, clouds and regions will follow.
      </p>
    </div>
  )
}

export function MarketingSections() {
  return (
    <article className="marketing-copy marketing-measure">
      {marketingSections.map(section => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
    </article>
  )
}
