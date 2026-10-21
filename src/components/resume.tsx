import { motion, useScroll, useSpring } from "motion/react"
import { useRef, useState } from "react"
import { ArrowRight, Briefcase, ExternalLink, GraduationCap } from "lucide-react"

import { Section } from "@/components/section"
import { SpotlightCard } from "@/components/spotlight-card"
import { TimelineDialog } from "@/components/timeline-dialog"
import { Badge } from "@/components/ui/badge"
import { CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEducation, useExperience } from "@/hooks/useCv"
import type { TimelineEntry } from "@/types/cv"
import { cn } from "@/lib/utils"

type TimelineProps = {
  entries: TimelineEntry[]
  kind: "Work" | "Education"
  icon: typeof Briefcase
}

function Timeline({ entries, kind, icon: Icon }: TimelineProps) {
  const ref = useRef<HTMLOListElement>(null)
  const [selected, setSelected] = useState<TimelineEntry | null>(null)
  const [open, setOpen] = useState(false)
  const openDetails = (entry: TimelineEntry) => {
    setSelected(entry)
    setOpen(true)
  }
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] })
  const lineScale = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <>
    <ol ref={ref} className="relative mx-auto max-w-4xl">
      {/* track + animated fill */}
      <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-border lg:left-1/2 lg:-translate-x-1/2" />
      <motion.div
        className="absolute top-0 bottom-0 left-5 w-0.5 origin-top bg-gradient-to-b from-lavender to-peach lg:left-1/2 lg:-translate-x-1/2"
        style={{ scaleY: lineScale }}
      />

      {entries.map((entry, i) => {
        const right = i % 2 === 0
        return (
          <motion.li
            key={entry.id}
            className="relative mb-10 pl-14 last:mb-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:pl-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              className="absolute top-6 left-0 z-10 flex size-10 items-center justify-center rounded-xl border border-lavender/30 bg-cosmos-200 text-lavender shadow-[0_0_20px_hsl(265_38%_89%/0.2)] lg:left-1/2 lg:-translate-x-1/2"
              variants={{ hidden: { scale: 0, rotate: -90 }, show: { scale: 1, rotate: 0 } }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Icon className="size-5" />
            </motion.div>

            <motion.div
              className={cn(right ? "lg:col-start-2" : "lg:col-start-1 lg:text-right")}
              variants={{ hidden: { opacity: 0, x: right ? 60 : -60 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <SpotlightCard onClick={() => openDetails(entry)} className="cursor-pointer">
                  <CardContent className="flex flex-col gap-3">
                    <div className={cn("flex flex-wrap items-center gap-2", !right && "lg:justify-end")}>
                      <Badge variant="outline" className="border-lavender/30 text-xs text-lavender">
                        {entry.period}
                      </Badge>
                      {entry.current && (
                        <Badge className="gap-1.5 bg-peach/90 text-cosmos-300">
                          <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cosmos-300/60" />
                            <span className="relative inline-flex size-2 rounded-full bg-cosmos-300" />
                          </span>
                          Current
                        </Badge>
                      )}
                      {entry.grade && <Badge variant="secondary">Grade: {entry.grade}</Badge>}
                    </div>
                    <h3 className="text-lg leading-snug font-bold text-star-200">{entry.title}</h3>
                    <div className={cn("flex items-center gap-3", !right && "lg:flex-row-reverse")}>
                      {entry.logo && <img src={entry.logo} alt="" className="size-9 rounded-md bg-white/90 object-contain p-0.5" />}
                      <span className="text-sm text-muted-foreground">{entry.org}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
                    {entry.link && (
                      <a
                        href={entry.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={cn("inline-flex items-center gap-1 self-start text-sm text-lavender underline-offset-4 hover:underline", !right && "lg:self-end")}
                      >
                        {entry.link.label} <ExternalLink className="size-3.5" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        openDetails(entry)
                      }}
                      className={cn(
                        "group/details inline-flex min-h-9 items-center gap-1.5 self-start rounded-full border border-lavender/30 px-4 py-1.5 text-xs text-lavender transition-colors hover:bg-lavender hover:text-cosmos-300",
                        !right && "lg:self-end",
                      )}
                    >
                      View details
                      <ArrowRight className="size-3.5 transition-transform group-hover/details:translate-x-0.5" />
                    </button>
                  </CardContent>
                </SpotlightCard>
              </motion.div>
            </motion.div>
          </motion.li>
        )
      })}
    </ol>
    <TimelineDialog entry={selected} kind={kind} open={open} onOpenChange={setOpen} />
    </>
  )
}

export function Resume() {
  const experience = useExperience()
  const education = useEducation()

  return (
    <Section id="resume" title="My Resume">
      <Tabs defaultValue="work" className="items-center gap-10">
        <TabsList className="glass h-11! w-full max-w-sm rounded-full p-1">
          <TabsTrigger value="work" className="gap-1.5 rounded-full px-2 text-xs data-active:bg-lavender! data-active:text-cosmos-300! sm:gap-2 sm:px-5 sm:text-sm">
            <Briefcase /> Work Experience
          </TabsTrigger>
          <TabsTrigger value="education" className="gap-1.5 rounded-full px-2 text-xs data-active:bg-lavender! data-active:text-cosmos-300! sm:gap-2 sm:px-5 sm:text-sm">
            <GraduationCap /> Education
          </TabsTrigger>
        </TabsList>
        <TabsContent value="work" className="w-full">
          <Timeline entries={experience} kind="Work" icon={Briefcase} />
        </TabsContent>
        <TabsContent value="education" className="w-full">
          <Timeline entries={education} kind="Education" icon={GraduationCap} />
        </TabsContent>
      </Tabs>
    </Section>
  )
}
