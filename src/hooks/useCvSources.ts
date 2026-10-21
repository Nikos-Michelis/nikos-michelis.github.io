import { useMemo } from "react"

import { useEducation, useExperience, useProjects } from "@/hooks/useCv"
import type { CvSource, Skill } from "@/types/cv"

/** Every project, job and degree, keyed by id */
export function useCvSources() {
  const projects = useProjects()
  const experience = useExperience()
  const education = useEducation()

  return useMemo(() => {
    const sources = new Map<string, CvSource>()
    for (const p of projects)
      sources.set(p.id, { id: p.id, kind: "Project", name: p.name, subtitle: p.type, href: p.href, image: p.image, icon: p.icon })
    for (const e of experience)
      sources.set(e.id, { id: e.id, kind: "Work", name: e.title, subtitle: `${e.org} · ${e.period}`, image: e.logo })
    for (const e of education)
      sources.set(e.id, { id: e.id, kind: "Education", name: e.title, subtitle: `${e.org} · ${e.period}`, href: e.link?.href, image: e.logo })
    return sources
  }, [projects, experience, education])
}

/** A skill's proof entries, resolved to the project / job / degree they reference */
export function useSkillProof(skill: Skill) {
  const sources = useCvSources()

  return useMemo(
    () =>
      (skill.proof ?? []).flatMap((proof) => {
        const source = sources.get(proof.ref)
        if (!source) {
          if (import.meta.env.DEV) console.warn(`Skill "${skill.name}": unknown proof ref "${proof.ref}"`)
          return []
        }
        return [{ ...proof, source }]
      }),
    [skill, sources],
  )
}
