import { useState } from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NAV_LINKS } from "@/config/navigation"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useScrolledPast } from "@/hooks/useScrolledPast"
import { cn } from "@/lib/utils"

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

export function Navbar() {
  const active = useActiveSection(SECTION_IDS)
  const scrolled = useScrolledPast(40)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled ? "border-b border-border bg-cosmos-300/70 backdrop-blur-lg" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="font-script text-2xl text-star-200 transition-transform hover:-rotate-6 hover:scale-110">
          MN
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  "relative block rounded-full px-4 py-1.5 text-sm transition-colors",
                  active === link.id ? "text-cosmos-300" : "text-muted-foreground hover:text-star-200",
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-lavender"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-cosmos-300/95 backdrop-blur-lg md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.li key={link.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={cn("block px-6 py-3 text-sm", active === link.id ? "text-star-200" : "text-muted-foreground")}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* scroll progress */}
      <motion.div className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-lavender to-peach" style={{ scaleX: progress }} />
    </motion.header>
  )
}
