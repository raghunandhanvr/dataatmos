"use client"

import { Button } from "@/components/ui/button"
import { CpuIcon } from "@/components/ui/icons/cpu"
import { HomeIcon } from "@/components/ui/icons/home"
import { MessageCircleIcon } from "@/components/ui/icons/message-circle"
import { useSession } from "@/lib/auth/auth-client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  NavbarBase,
  NavbarContent,
  NavbarGithubLink,
  NavbarLeft,
  NavbarLogo,
  NavbarRight,
  NavbarThemeSwitcher,
} from "./navbar-base"

export default function DefaultNavbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  const user = session?.user
  const isAuth = pathname.startsWith("/auth")
  const isMarketing = ["/", "/pricing"].includes(pathname)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <NavbarBase isAuth={isAuth} isMarketing={isMarketing}>
      <NavbarContent>
        <NavbarLeft>
          <NavbarLogo href={user ? "/console" : "/"} />
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

          {isMarketing && (
            <a
              href="https://cal.com/raghuvr/data-atmos-demo?duration=30"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/30"
            >
              <MessageCircleIcon size={15} />
              Talk to us
            </a>
          )}

          <NavbarGithubLink />
          <NavbarThemeSwitcher />
        </NavbarRight>
      </NavbarContent>
    </NavbarBase>
  )
}