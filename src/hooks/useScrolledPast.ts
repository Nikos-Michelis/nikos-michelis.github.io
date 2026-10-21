import { useEffect, useState } from "react"
import { useScroll } from "motion/react"

/** True once the page is scrolled more than `threshold` px. */
export function useScrolledPast(threshold: number) {
  const { scrollY } = useScroll()
  const [past, setPast] = useState(() => scrollY.get() > threshold)

  useEffect(() => scrollY.on("change", (v) => setPast(v > threshold)), [scrollY, threshold])

  return past
}
