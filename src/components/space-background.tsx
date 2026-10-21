import { AnimatePresence, motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react"

import { usePointerParallax } from "@/hooks/usePointerParallax"
import { useShootingStars } from "@/hooks/useShootingStars"

/** Comet path from the original site */
const COMET_PATH =
  "M192.39.66c-33.66,31.46-93.3,81.16-129,108.88L3.42,156c-5,3.89-4.29,11.28.74,15.4s12.84-.83,13.1-1.07C51.09,138.62,82.6,104.72,116.64,73c8.89-8.29,66.23-59.5,77.47-70.13C196.17,1,194.24-1.08,192.39.66Z"

/** Same positions / delays as the original comet-rain */
const COMETS = [
  { left: "30vw", width: "5vmin", delay: "0ms" },
  { left: "57vw", width: "6vmin", delay: "9s" },
  { left: "83vw", width: "5vmin", delay: "6s" },
  { top: "13vh", width: "5vmin", delay: "22s" },
  { top: "34vh", width: "6vmin", delay: "5s" },
  { top: "67vh", width: "5vmin", delay: "14s" },
]

function Comet({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} style={style} viewBox="0 0 195 173.05" width="195" height="173.05">
      <path d={COMET_PATH} />
    </svg>
  )
}

export function SpaceBackground() {
  const reduceMotion = useReducedMotion() ?? false
  const { stars, remove } = useShootingStars(!reduceMotion)
  const pointer = usePointerParallax()
  const { scrollY } = useScroll()

  // two star layers move at different speeds with the pointer and scroll
  const nearX = useTransform(pointer.x, (v) => v * 30)
  const farX = useTransform(pointer.x, (v) => v * 12)
  const nearY = useTransform([pointer.y, scrollY], ([p, s]: number[]) => p * 30 - s * 0.15)
  const farY = useTransform([pointer.y, scrollY], ([p, s]: number[]) => p * 12 - s * 0.05)
  const glow = useMotionTemplate`radial-gradient(500px circle at ${pointer.clientX}px ${pointer.clientY}px, hsl(265 38% 89% / 0.07), transparent 70%)`

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-cosmos-300">
      {/* nebula tint */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,hsl(290_34%_20%/0.7),transparent_55%),radial-gradient(ellipse_at_85%_80%,hsl(265_38%_40%/0.18),transparent_50%)]" />

      <motion.div className="starfield starfield--far" style={reduceMotion ? undefined : { x: farX, y: farY }} />
      <motion.div className="starfield starfield--near" style={reduceMotion ? undefined : { x: nearX, y: nearY }} />

      <motion.div className="absolute inset-0" style={{ background: glow }} />

      {/* gradient used by every comet */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="comet-gradient" x1="194.94" y1="4.2" x2="11.72" y2="161.98" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="var(--peach)" />
          </linearGradient>
        </defs>
      </svg>

      {COMETS.map((c, i) => (
        <Comet key={i} className="comet" style={{ left: c.left, top: c.top, width: c.width, animationDelay: c.delay }} />
      ))}

      <AnimatePresence>
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute"
            style={{ left: s.x, top: s.y, width: s.size }}
            initial={{ opacity: 0, x: "-10%", y: "-90%" }}
            animate={{ opacity: [0, 1, 1, 0], x: "-700%", y: "650%" }}
            transition={{ duration: 1.1, ease: "easeIn", times: [0, 0.1, 0.7, 1] }}
            onAnimationComplete={() => remove(s.id)}
          >
            <Comet className="h-auto w-full fill-[url(#comet-gradient)] drop-shadow-[0_0_8px_hsl(25_43%_79%/0.8)]" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
