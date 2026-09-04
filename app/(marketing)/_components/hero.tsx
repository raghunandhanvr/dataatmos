import Link from "next/link"
import type { ReactNode } from "react"
import { Logo } from "@/components/ui/logo"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { GITHUB_URL, X_URL } from "@/lib/marketing/site"
import { HeroCta } from "./hero-cta"
import { HeroDithering } from "./hero-dithering"
import { HeroTitle } from "./hero-title"
import "./hero.css"

const socialLinkClass =
  "text-sm font-mono text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"

function HeroHeader() {
  return (
    <header className="flex w-full min-w-0 shrink-0 flex-nowrap items-center justify-between gap-3">
      <Link
        href="/"
        aria-label="Data Atmos home"
        className="inline-flex size-10 shrink-0 items-center justify-center leading-none sm:size-11"
      >
        <Logo className="size-10 sm:size-11" width={44} height={44} />
      </Link>
      <HeroCta />
    </header>
  )
}

export function Hero({ blurb, sections }: { blurb: ReactNode; sections: ReactNode }) {
  return (
    <div className="relative min-h-full h-full overflow-y-auto lg:overflow-hidden scrollbar-none flex flex-col lg:flex-row bg-background text-foreground">
      <div className="relative order-1 h-[10vh] min-h-[72px] w-full shrink-0 lg:order-2 lg:h-full lg:min-h-0 lg:w-1/2">
        <HeroDithering />
      </div>

      <div className="w-full shrink-0 lg:shrink lg:w-1/2 lg:h-full lg:overflow-y-auto scrollbar-none order-2 lg:order-1 px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
        <div className="marketing-copy marketing-landing-screen flex flex-col lg:min-h-full">
          <HeroHeader />

          <div className="marketing-hero-stage">
            <HeroTitle />
          </div>

          {blurb}
        </div>

        {sections}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClass}
            >
              <span className="sm:hidden">GitHub</span>
              <span className="hidden sm:inline">github.com/DataAtmos</span>
            </Link>
            <Link
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClass}
            >
              <span className="sm:hidden">X</span>
              <span className="hidden sm:inline">x.com/dataatmos</span>
            </Link>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}
