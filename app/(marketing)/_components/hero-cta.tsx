"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { AntiMetalButton } from "@/components/ui/anti-metal-button"

export function HeroCta() {
  const { isLoaded, isSignedIn } = useAuth()
  const signedIn = Boolean(isLoaded && isSignedIn)

  return (
    <AntiMetalButton
      asChild
      className="h-7 min-h-7 sm:h-8 sm:min-h-8"
      label={signedIn ? "Go to Dashboard" : "Start for free"}
    >
      <Link href={signedIn ? "/dashboard" : "/auth"} />
    </AntiMetalButton>
  )
}
