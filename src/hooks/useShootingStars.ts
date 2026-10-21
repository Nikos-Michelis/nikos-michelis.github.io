import { useCallback, useEffect, useState } from "react"

export type ShootingStar = { id: number; x: number; y: number; size: number }

/** Clicks on these never launch a star */
const INTERACTIVE = "a, button, input, textarea, select, [role='dialog'], [role='tab'], [data-no-comet]"
const MAX_STARS = 8

/** Launches a shooting star wherever the user clicks on empty space. */
export function useShootingStars(enabled = true) {
  const [stars, setStars] = useState<ShootingStar[]>([])

  useEffect(() => {
    if (!enabled) return
    const onDown = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest(INTERACTIVE)) return
      const star = { id: performance.now(), x: e.clientX, y: e.clientY, size: 40 + Math.random() * 30 }
      setStars((s) => [...s.slice(-MAX_STARS), star])
    }
    window.addEventListener("pointerdown", onDown)
    return () => window.removeEventListener("pointerdown", onDown)
  }, [enabled])

  const remove = useCallback((id: number) => setStars((s) => s.filter((star) => star.id !== id)), [])

  return { stars, remove }
}
