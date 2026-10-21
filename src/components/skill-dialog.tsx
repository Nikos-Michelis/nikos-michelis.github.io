import { useRef } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Briefcase, FolderGit2, GraduationCap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { ICONS } from "@/config/icons"
import { useCountUp } from "@/hooks/useCountUp"
import { useSkillProof } from "@/hooks/useCvSources"
import type { CvSource, Skill } from "@/types/cv"

/** Icon or image for a skill */
export function SkillIcon({ skill, className }: { skill: Skill; className?: string }) {
  const Icon = skill.icon && ICONS[skill.icon]
  if (Icon) return <Icon className={className} />
  return skill.image ? <img src={skill.image} alt="" className={className} /> : null
}

function levelLabel(level: number) {
  if (level >= 85) return "Advanced"
  if (level >= 70) return "Proficient"
  if (level >= 50) return "Intermediate"
  return "Learning"
}

const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }

const KIND_ICON = { Project: FolderGit2, Work: Briefcase, Education: GraduationCap }

function SourceAvatar({ source }: { source: CvSource }) {
  const Icon = KIND_ICON[source.kind]
  return (
    <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border border-lavender/30 bg-cosmos-200 text-lavender shadow-[0_0_20px_hsl(265_38%_89%/0.2)] transition-transform group-hover/proof:scale-110 group-hover/proof:-rotate-6">
      <Icon className="size-5" />
    </span>
  )
}

function ProofItem({ source, detail }: { source: CvSource; detail: string }) {
  const body = (
    <>
      <SourceAvatar source={source} />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-bold text-star-200">{source.name}</span>
          <Badge variant="secondary" className="h-4 px-1.5 text-[0.7rem]">
            {source.kind}
          </Badge>
        </span>
        {source.subtitle && <span className="block text-[0.7rem] text-muted-foreground">{source.subtitle}</span>}
        <span className="mt-1 block text-xs leading-relaxed text-star-300">{detail}</span>
      </span>
      {source.href && (
        <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover/proof:translate-x-0.5 group-hover/proof:-translate-y-0.5 group-hover/proof:text-star-200" />
      )}
    </>
  )
  const cls = "group/proof flex gap-3 rounded-xl p-1.5 text-left transition-colors"
  return source.href ? (
    <a href={source.href} target="_blank" rel="noopener noreferrer" className={cls + " hover:bg-accent"}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  )
}

function SkillDetails({ skill }: { skill: Skill }) {
  const level = useCountUp(skill.level, true, 1)
  const proof = useSkillProof(skill)

  return (
    <motion.div
      className="flex flex-col gap-5"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
    >
      <DialogHeader className="flex-row items-center gap-4">
        <motion.div
          className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-lavender/30 bg-lavender/10 text-lavender shadow-[0_0_30px_hsl(265_38%_89%/0.25)]"
          initial={{ scale: 0.4, rotate: -120, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
        >
          <SkillIcon skill={skill} className="size-8" />
        </motion.div>
        <div className="flex min-w-0 flex-col gap-1.5 text-left">
          <DialogTitle className="text-xl text-star-200">{skill.name}</DialogTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-lavender/30 text-lavender">
              {skill.category}
            </Badge>
            <Badge className="bg-peach/90 text-cosmos-300">{levelLabel(skill.level)}</Badge>
          </div>
        </div>
      </DialogHeader>

      <motion.div variants={item}>
        <Progress value={level} aria-label={`${skill.name} level`} className="gap-2 [&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-lavender [&_[data-slot=progress-indicator]]:to-peach [&_[data-slot=progress-track]]:h-2">
          <span className="text-xs text-muted-foreground">Proficiency</span>
          <span className="ml-auto text-xs font-bold tabular-nums text-star-200">{level}%</span>
        </Progress>
      </motion.div>

      <motion.div variants={item}>
        <DialogDescription className="leading-relaxed">
          {skill.description ?? `${skill.name} is part of my ${skill.category.toLowerCase()} toolkit.`}
        </DialogDescription>
      </motion.div>

      <motion.div variants={item} className="flex flex-col gap-3">
        <span className="text-xs tracking-widest text-muted-foreground uppercase">How I gained it</span>
        {proof.length > 0 ? (
          <ol className="relative flex flex-col gap-3 before:absolute before:top-2 before:bottom-2 before:left-[25.5px] before:w-px before:bg-border">
            {proof.map(({ source, detail }, i) => (
              <motion.li
                key={source.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.1 }}
              >
                <ProofItem source={source} detail={detail} />
              </motion.li>
            ))}
          </ol>
        ) : (
          <p className="rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
            Details coming soon.
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}

type SkillDialogProps = {
  /** kept while closing so the content doesn't vanish mid-animation */
  skill: Skill | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SkillDialog({ skill, open, onOpenChange }: SkillDialogProps) {
  // focus the top of the content on open, not the first proof link (which can be far down on phones)
  const topRef = useRef<HTMLDivElement>(null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent initialFocus={topRef} className="glass max-h-[90svh] overflow-y-auto bg-cosmos-200/95 p-0 sm:max-w-lg">
        {/* key remounts the content so the animations replay for each skill */}
        <div ref={topRef} tabIndex={-1} className="p-6 outline-none">
          {skill && <SkillDetails key={skill.name} skill={skill} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
