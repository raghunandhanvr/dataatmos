"use client"

import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "@/components/ui/icons/chevron-down"
import { CpuIcon } from "@/components/ui/icons/cpu"
import { HomeIcon } from "@/components/ui/icons/home"
import { MessageCircleIcon } from "@/components/ui/icons/message-circle"
import { useSession } from "@/lib/auth/auth-client"
import { useSidebarContext } from "@/lib/providers/sidebar-provider"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  NavbarBase,
  NavbarContent,
  NavbarGithubLink,
  NavbarLeft,
  NavbarLogo,
  NavbarRight,
  NavbarThemeSwitcher,
} from "./navbar-base"
import { ProfileDropdown } from "./profile-dropdown"

export default function TopNavbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const user = session?.user
  const isConsole = pathname.startsWith("/console")
  const isAuth = pathname.startsWith("/auth")
  const isMarketing = ["/", "/pricing"].includes(pathname)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (mobileNavOpen && !target.closest(".mobile-nav-container")) {
        setMobileNavOpen(false)
      }
    }

    if (mobileNavOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileNavOpen])

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen(prev => !prev)
  }, [])

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false)
  }, [])

  return (
    <>
      <NavbarBase
        isAuth={isAuth}
        isMarketing={isMarketing}
        isConsole={isConsole}
      >
        <NavbarContent>
          <NavbarLeft>
            <NavbarLogo href={user ? "/console" : "/"} />

            {isConsole && (
              <div className="md:hidden mobile-nav-container">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">/</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 gap-2 hover:bg-sidebar-accent/50"
                    onClick={toggleMobileNav}
                  >
                    <ConsoleMenuButton />
                    <ChevronDownIcon
                      size={8}
                      className={`transition-transform ${mobileNavOpen ? "rotate-180" : ""}`}
                    />
                  </Button>
                </div>
              </div>
            )}
          </NavbarLeft>

          <NavbarRight>
            {mounted && user && isMarketing && (
              <div className="hidden sm:block text-sm text-muted-foreground">
                Welcome back, <span className="font-medium">{user.name}</span>
              </div>
            )}

            {mounted && (
              <>
                {user && (isMarketing || isAuth) && (
                  <Button size="sm" asChild>
                    <Link href="/console" className="flex items-center gap-2">
                      <CpuIcon size={15} />
                      Console
                    </Link>
                  </Button>
                )}

                {!user && (
                  <Button size="sm" asChild>
                    <Link href={isAuth ? "/" : "/auth"} className="flex items-center gap-2">
                      {isAuth ? <HomeIcon size={15} /> : <CpuIcon size={15} />}
                      {isAuth ? "Home" : "Console"}
                    </Link>
                  </Button>
                )}
              </>
            )}

            <NavbarGithubLink />
            <NavbarThemeSwitcher />

            {user && isConsole && <ProfileDropdown user={user} />}
          </NavbarRight>
        </NavbarContent>
      </NavbarBase>

      {/* Mobile Navigation Dropdown */}
      {isConsole && mobileNavOpen && <ConsoleMobileNav onClose={closeMobileNav} />}
    </>
  )
}

// Component for console menu button
function ConsoleMenuButton() {
  const { menuItems, currentPath } = useSidebarContext()
  const activeItem = menuItems.find(item => item.href === currentPath)
  const Icon = activeItem?.icon || CpuIcon

  return (
    <>
      <Icon size={12} />
      {activeItem?.label || "Menu"}
    </>
  )
}

// Component for console mobile navigation
function ConsoleMobileNav({ onClose }: { onClose: () => void }) {
  const { menuItems, currentPath } = useSidebarContext()

  return (
    <div className="absolute top-14 left-0 right-0 bg-surface-secondary/95 backdrop-blur border-b border-border md:hidden">
      <div className="px-4 py-2 space-y-1">
        {menuItems.map(item => {
          const Icon = item.icon
          const isActive = currentPath === item.href

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              }`}
            >
              <Icon size={12} />
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
