import { useRef, useState } from "react"
import { motion } from "motion/react"
import { Briefcase, CalendarDays, Check, ExternalLink, GraduationCap, MapPin } from "lucide-react"

import { SkillDialog, SkillIcon } from "@/components/skill-dialog"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useSkills } from "@/hooks/useCv"
import type { Skill, TimelineEntry } from "@/types/cv"

const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }

function MetaRow({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon className="size-3.5 shrink-0 text-lavender" />
      {children}
    </span>
  )
}

function TimelineDetails({ entry, kind }: { entry: TimelineEntry; kind: "Work" | "Education" }) {
  const allSkills = useSkills()
  const skills = allSkills.filter((s) => s.proof?.some((p) => p.ref === entry.id))
  const [skill, setSkill] = useState<Skill | null>(null)
  const [skillOpen, setSkillOpen] = useState(false)
  const KindIcon = kind === "Work" ? Briefcase : GraduationCap

  return (
    <motion.div
      className="flex flex-col gap-5"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
    >
      <DialogHeader className="flex-row items-start gap-4 pr-8">
        <motion.div
          initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 15 }}
          className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-lavender/30 bg-white/90 text-cosmos-300 shadow-[0_0_30px_hsl(265_38%_89%/0.2)]"
        >
          {entry.logo ? <img src={entry.logo} alt="" className="size-full object-contain p-1.5" /> : <KindIcon className="size-7" />}
        </motion.div>
        <div className="flex min-w-0 flex-col gap-1.5 text-left">
          <DialogTitle className="text-lg leading-snug text-star-200">{entry.title}</DialogTitle>
          <span className="text-sm text-star-300">
            {entry.org}
            {entry.employmentType && <span className="text-muted-foreground"> · {entry.employmentType}</span>}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {entry.current && <Badge className="bg-peach/90 text-cosmos-300">Current</Badge>}
            {entry.grade && <Badge variant="secondary">Grade: {entry.grade}</Badge>}
          </div>
        </div>
      </DialogHeader>

      <motion.div variants={item} className="flex flex-col gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-2.5">
        <MetaRow icon={CalendarDays}>
          {entry.period}
          {entry.duration && <> · {entry.duration}</>}
        </MetaRow>
        {(entry.location || entry.workplace) && (
          <MetaRow icon={MapPin}>{[entry.location, entry.workplace].filter(Boolean).join(" · ")}</MetaRow>
        )}
      </motion.div>

      <motion.div variants={item}>
        <DialogDescription className="leading-relaxed">{entry.summary ?? entry.description}</DialogDescription>
      </motion.div>

      {entry.highlights && entry.highlights.length > 0 && (
        <motion.ul variants={item} className="flex flex-col gap-2.5">
          {entry.highlights.map((h, i) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="flex gap-2.5 text-sm leading-relaxed text-star-300"
            >
              <Check className="mt-1 size-4 shrink-0 text-peach" />
              {h}
            </motion.li>
          ))}
        </motion.ul>
      )}

      {skills.length > 0 && (
        <motion.div variants={item} className="flex flex-col gap-2">
          <span className="text-xs tracking-widest text-muted-foreground uppercase">Skills used here</span>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <button
                key={s.name}
                type="button"
                onClick={() => {
                  setSkill(s)
                  setSkillOpen(true)
                }}
                className="group/skill inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs transition-colors hover:border-lavender/50 hover:text-star-200"
              >
                <SkillIcon skill={s} className="size-3.5 transition-transform group-hover/skill:scale-125" />
                {s.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {entry.link && (
        <motion.a
          variants={item}
          href={entry.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 self-start text-sm text-lavender underline-offset-4 hover:underline"
        >
          {entry.link.label} <ExternalLink className="size-3.5" />
        </motion.a>
      )}

      <SkillDialog skill={skill} open={skillOpen} onOpenChange={setSkillOpen} />
    </motion.div>
  )
}

type TimelineDialogProps = {
  /** kept while closing so the content doesn't vanish mid-animation */
  entry: TimelineEntry | null
  kind: "Work" | "Education"
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TimelineDialog({ entry, kind, open, onOpenChange }: TimelineDialogProps) {
  // focus the top of the content on open, not the first button (which can be far down on phones)
  const topRef = useRef<HTMLDivElement>(null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent initialFocus={topRef} className="glass max-h-[90svh] overflow-y-auto bg-cosmos-200/95 p-0 sm:max-w-lg">
        <div ref={topRef} tabIndex={-1} className="p-6 outline-none">
          {entry && <TimelineDetails key={entry.id} entry={entry} kind={kind} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
