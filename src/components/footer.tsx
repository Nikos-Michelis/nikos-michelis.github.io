import { AnimatePresence, motion } from "motion/react"
import { ChevronUp } from "lucide-react"

import { SocialLinks } from "@/components/social-links"
import { Button } from "@/components/ui/button"
import { useProfile } from "@/hooks/useCv"
import { useScrolledPast } from "@/hooks/useScrolledPast"

const YEAR = new Date().getFullYear()

export function Footer() {
  const profile = useProfile()

  return (
    <footer className="relative border-t border-border bg-cosmos-300/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>
          Developed by <span className="text-star-200">{profile.name}</span>
        </p>
        <SocialLinks />
        <p>&copy; {YEAR} Copyright {profile.name}</p>
      </div>
    </footer>
  )
}

export function BackToTop() {
  const visible = useScrolledPast(400)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed right-5 bottom-5 z-40"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -4 }}
        >
          <Button
            size="icon-lg"
            aria-label="Back to top"
            className="size-11 rounded-full shadow-[0_0_25px_hsl(265_38%_89%/0.4)]"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ChevronUp className="size-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
