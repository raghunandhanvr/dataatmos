import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/components/ui/icons/github"
import { Logo } from "@/components/ui/logo"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { cn } from "@/lib/utils/common"
import Link from "next/link"
import type React from "react"

export interface NavbarBaseProps {
  children?: React.ReactNode
  className?: string
  contentClassName?: string
  isAuth?: boolean
  isMarketing?: boolean
  isConsole?: boolean
  showBorder?: boolean
  maxWidthOnMarketing?: boolean
}

export function NavbarBase({
  children,
  className,
  contentClassName,
  isAuth = false,
  isMarketing = false,
  isConsole = false,
  showBorder = true,
  maxWidthOnMarketing = true,
}: NavbarBaseProps) {
  const shouldShowBorder = showBorder && !isAuth

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full bg-surface-secondary/95 backdrop-blur",
        shouldShowBorder && "border-b border-border",
        className
      )}
    >
      <div
        className={cn(
          "w-full",
          // Apply padding for all layouts including console
          "px-5 sm:px-6 lg:px-8",
          // Only apply max-width constraint for marketing and auth pages
          maxWidthOnMarketing && (isMarketing || isAuth) && "lg:max-w-7xl lg:mx-auto lg:px-0",
          contentClassName
        )}
      >
        {children}
      </div>
    </nav>
  )
}

export function NavbarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex h-14 items-center justify-between">{children}</div>
}

export function NavbarLeft({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3">{children}</div>
}

export function NavbarRight({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-4">{children}</div>
}

export function NavbarLogo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center">
      <Logo />
    </Link>
  )
}

export function NavbarGithubLink() {
  return (
    <Link
      href="https://github.com/dataatmos/dataatmos"
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      <GithubIcon size={16} />
      <span className="sr-only">GitHub</span>
    </Link>
  )
}

export function NavbarThemeSwitcher() {
  return <ThemeSwitcher />
}