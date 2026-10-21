import { useEffect } from "react"
import { useMotionValue, useSpring } from "motion/react"

/**
 * Pointer position as springy motion values.
 * `x`/`y` are normalized to -0.5…0.5, `clientX`/`clientY` are raw pixels.
 */
export function usePointerParallax() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const clientX = useMotionValue(-1000)
  const clientY = useMotionValue(-1000)
  const springX = useSpring(x, { stiffness: 40, damping: 20 })
  const springY = useSpring(y, { stiffness: 40, damping: 20 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5)
      y.set(e.clientY / window.innerHeight - 0.5)
      clientX.set(e.clientX)
      clientY.set(e.clientY)
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [x, y, clientX, clientY])

  return { x: springX, y: springY, clientX, clientY }
}
