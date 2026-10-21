import { useMemo } from "react"

import { useSkills } from "@/hooks/useCv"
import type { Skill } from "@/types/cv"

/** Skills keyed by lower-case name, plus each part of names like "MySQL - PostgreSQL" */
export function useSkillsByName() {
  const skills = useSkills()

  return useMemo(() => {
    const map = new Map<string, Skill>()
    for (const skill of skills) {
      const name = skill.name.toLowerCase()
      map.set(name, skill)
      for (const part of name.split(" - ")) if (!map.has(part)) map.set(part, skill)
    }
    return map
  }, [skills])
}
