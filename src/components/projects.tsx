import { useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Check } from "lucide-react"
import { FaGithub } from "react-icons/fa6"

import { ImageGallery } from "@/components/image-gallery"
import { SkillIcon } from "@/components/skill-dialog"
import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ICONS } from "@/config/icons"
import { techIcon } from "@/config/tech-icons"
import { useProjects } from "@/hooks/useCv"
import { useSkillsByName } from "@/hooks/useSkillsByName"
import { useTilt } from "@/hooks/useTilt"
import { cn } from "@/lib/utils"
import type { Project, ProjectStatus, Skill } from "@/types/cv"

/** Same look as the "Skills used here" pills in the experience modal */
function TechBadge({ tag, skills }: { tag: string; skills: Map<string, Skill> }) {
  const skill = skills.get(tag.trim().toLowerCase())
  const tech = skill ? undefined : techIcon(tag)
  const iconClass = "size-3.5 transition-transform group-hover/tech:scale-125"

  return (
    <span className="group/tech inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs transition-colors hover:border-lavender/50 hover:text-star-200">
      {skill ? (
        <SkillIcon skill={skill} className={iconClass} />
      ) : tech ? (
        "image" in tech ? <img src={tech.image} alt="" className={iconClass} /> : <tech.icon className={iconClass} />
      ) : null}
      {tag}
    </span>
  )
}

function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  if (status === "in-progress")
    return (
      <Badge className={cn("gap-1.5 bg-peach/90 text-cosmos-300", className)}>
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-cosmos-300/60" />
          <span className="relative inline-flex size-2 rounded-full bg-cosmos-300" />
        </span>
        In progress
      </Badge>
    )
  return (
    <Badge variant="outline" className={cn("gap-1 border-lavender/40 bg-cosmos-300/70 text-lavender backdrop-blur", className)}>
      <Check className="size-3" />
      Completed
    </Badge>
  )
}

function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const Icon = project.icon && ICONS[project.icon]
  if (project.image)
    return (
      <img
        src={project.image}
        alt=""
        loading="lazy"
        className={cn("size-full object-cover", className)}
      />
    )
  return (
    <div className={cn("flex size-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,var(--cosmos-100),var(--cosmos-300))]", className)}>
      {Icon && <Icon className="size-16 text-lavender/80" />}
    </div>
  )
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const { rotateX, rotateY, handlers } = useTilt()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="perspective-[1000px]"
    >
      <motion.button
        type="button"
        onClick={onOpen}
        {...handlers}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.97 }}
        className="group glass relative block h-72 w-full overflow-hidden rounded-2xl text-left transition-shadow hover:shadow-[0_20px_50px_hsl(265_38%_60%/0.3)]"
      >
        <ProjectVisual project={project} className="transition-transform duration-500 group-hover:scale-110" />

        {/* gradient + text */}
        <div className="absolute inset-0 bg-gradient-to-t from-cosmos-400/95 via-cosmos-300/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5" style={{ transform: "translateZ(40px)" }}>
          <Badge variant="outline" className="mb-2 border-lavender/40 bg-cosmos-300/60 text-lavender">
            {project.type}
          </Badge>
          <h3 className="text-lg font-bold text-star-200">{project.name}</h3>
          <p className="mt-1 line-clamp-2 max-h-0 text-xs text-muted-foreground opacity-0 transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100">
            {project.description}
          </p>
        </div>
        <StatusBadge status={project.status} className="absolute top-4 left-4" />
        <span className="absolute top-4 right-4 flex size-9 translate-y-2 items-center justify-center rounded-full bg-lavender text-cosmos-300 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </motion.button>
    </motion.div>
  )
}

/** cover image first, then the gallery */
function projectImages(project: Project) {
  return [...(project.image ? [{ src: project.image, caption: project.imageCaption }] : []), ...(project.gallery ?? [])]
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const isGithub = project?.href.includes("github.com")
  const images = project ? projectImages(project) : []
  const skillsByName = useSkillsByName()

  return (
    <Dialog open={project !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="glass max-h-[90svh] overflow-x-hidden overflow-y-auto p-0 sm:max-w-lg *:data-[slot=dialog-close]:z-10 *:data-[slot=dialog-close]:bg-cosmos-300/80 *:data-[slot=dialog-close]:text-star-200">
        {project && (
          <>
            {images.length > 0 ? (
              <ImageGallery images={images} title={project.name} />
            ) : (
              <div className="h-56 w-full overflow-hidden bg-cosmos-300">
                <ProjectVisual project={project} />
              </div>
            )}
            <div className="flex flex-col gap-4 px-5 pb-5">
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2 pr-8">
                  <DialogTitle className="text-xl text-star-200">{project.name}</DialogTitle>
                  <StatusBadge status={project.status} />
                </div>
                <DialogDescription className="leading-relaxed">{project.description}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.04 }}
                    whileHover={{ y: -2 }}
                  >
                    <TechBadge tag={t} skills={skillsByName} />
                  </motion.span>
                ))}
              </div>
              <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0">
                <Button nativeButton={false} render={<a href={project.href} target="_blank" rel="noopener noreferrer" />} className="gap-2">
                  {isGithub ? <FaGithub /> : <ArrowUpRight />}
                  {isGithub ? "View on GitHub" : "Visit website"}
                </Button>
              </DialogFooter>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function Projects() {
  const projects = useProjects()
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <Section id="projects" title="Projects" subtitle="Click a project to see more.">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} onOpen={() => setSelected(project)} />
        ))}
      </div>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
