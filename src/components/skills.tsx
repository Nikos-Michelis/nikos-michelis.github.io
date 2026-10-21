import { useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "motion/react"
import { BadgeCheck } from "lucide-react"

import { Section } from "@/components/section"
import { SkillDialog, SkillIcon } from "@/components/skill-dialog"
import { useCountUp } from "@/hooks/useCountUp"
import { useSkills } from "@/hooks/useCv"
import { cn } from "@/lib/utils"
import { SKILL_CATEGORIES, type Skill, type SkillCategory } from "@/types/cv"

type Filter = "All" | SkillCategory
const FILTERS: Filter[] = ["All", ...SKILL_CATEGORIES]
const R = 52
const CIRC = 2 * Math.PI * R

function SkillRing({ skill, onOpen }: { skill: Skill; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const count = useCountUp(skill.level, inView)
  const proofCount = skill.proof?.length ?? 0
  const gradientId = `ring-${skill.name.replace(/\W/g, "")}`

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-label={`${skill.name} details`}
      layout
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      whileHover={{ y: -8, scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group glass relative flex cursor-pointer flex-col items-center gap-2 rounded-2xl p-5 hover:border-lavender/40 hover:shadow-[0_10px_40px_hsl(265_38%_60%/0.25)]"
    >
      {proofCount > 0 && (
        <span
          title={`Backed by ${proofCount} ${proofCount === 1 ? "project or role" : "projects / roles"}`}
          className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-peach/90 px-1.5 py-0.5 text-[0.7rem] font-bold text-cosmos-300"
        >
          <BadgeCheck className="size-3" />
          {proofCount}
        </span>
      )}
      <div className="relative size-32">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" stroke="var(--cosmos-100)" strokeWidth="6" />
          <motion.circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={inView ? { strokeDashoffset: CIRC * (1 - skill.level / 100) } : undefined}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="drop-shadow-[0_0_6px_hsl(265_38%_89%/0.5)]"
          />
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--lavender)" />
              <stop offset="100%" stopColor="var(--peach)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <SkillIcon
            skill={skill}
            className="size-8 text-star-300 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:text-peach"
          />
          <span className="text-sm font-bold tabular-nums text-star-200">{count}%</span>
        </div>
      </div>
      <span className="text-sm font-bold">{skill.name}</span>
      <span className="text-[0.7rem] tracking-widest text-muted-foreground uppercase">{skill.category}</span>
    </motion.button>
  )
}

export function Skills() {
  const skills = useSkills()
  const [filter, setFilter] = useState<Filter>("All")
  const [selected, setSelected] = useState<Skill | null>(null)
  const [open, setOpen] = useState(false)
  const visible = filter === "All" ? skills : skills.filter((s) => s.category === filter)

  return (
    <Section id="skills" title="Top Skills" subtitle="Click a skill for details, or filter by area.">
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm transition-colors",
              filter === f ? "text-cosmos-300" : "glass text-muted-foreground hover:text-star-200",
            )}
          >
            {filter === f && (
              <motion.span
                layoutId="skill-filter"
                className="absolute inset-0 -z-10 rounded-full bg-lavender"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {visible.map((skill) => (
            <SkillRing
              key={skill.name}
              skill={skill}
              onOpen={() => {
                setSelected(skill)
                setOpen(true)
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <SkillDialog skill={selected} open={open} onOpenChange={setOpen} />
    </Section>
  )
}
