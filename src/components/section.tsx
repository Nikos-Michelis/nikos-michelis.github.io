import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type SectionProps = {
  id: string
  title: string
  subtitle?: string
  className?: string
  children: React.ReactNode
}

export function Section({ id, title, subtitle, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24", className)}>
      <motion.div
        className="mb-14 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-glow text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <motion.span
          className="mt-4 h-1 rounded-full bg-gradient-to-r from-lavender to-peach"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        {subtitle && <p className="mt-4 max-w-xl text-sm text-muted-foreground">{subtitle}</p>}
      </motion.div>
      {children}
    </section>
  )
}
