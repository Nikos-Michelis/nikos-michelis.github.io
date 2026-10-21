import { motion } from "motion/react"

import { Card } from "@/components/ui/card"
import { useSpotlight } from "@/hooks/useSpotlight"
import { cn } from "@/lib/utils"

/** shadcn Card with a soft light that follows the cursor */
export function SpotlightCard({ className, children, ...props }: React.ComponentProps<typeof Card>) {
  const { background, handlers } = useSpotlight()

  return (
    <Card
      {...handlers}
      className={cn(
        "glass group/spot relative overflow-hidden ring-0 transition-[border-color,box-shadow] duration-300 hover:border-lavender/35 hover:shadow-[0_8px_40px_hsl(265_38%_60%/0.18)]",
        className,
      )}
      {...props}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background }} />
      {children}
    </Card>
  )
}
