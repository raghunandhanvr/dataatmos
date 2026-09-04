"use client"

import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const Dithering = dynamic(() => import("@paper-design/shaders-react").then(mod => mod.Dithering), {
  ssr: false,
  loading: () => <div className="size-full bg-background" aria-hidden="true" />,
})

export function HeroDithering() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = !mounted || resolvedTheme !== "light"

  return (
    <Dithering
      style={{ height: "100%", width: "100%" }}
      colorBack={isDark ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 95%)"}
      colorFront="hsl(220, 100%, 70%)"
      shape="warp"
      type="4x4"
      size={2}
      offsetX={0}
      offsetY={0}
      scale={1.15}
      rotation={0}
      speed={0.22}
    />
  )
}
