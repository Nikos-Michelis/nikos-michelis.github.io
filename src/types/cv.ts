import type { IconKey } from "@/config/icons"

/**
 * CV data contracts. Everything here is plain, JSON-serializable data
 * (icons are referenced by key, images by URL) so the same shapes work
 * for local constants today and an API / JSON file later.
 */

export type Profile = {
  name: string
  shortName: string
  /** phrases rotated under the name in the hero */
  roles: string[]
  email: string
  website: string
  websiteUrl: string
  address: string
  image: string
  social: {
    linkedin: string
    github: string
  }
  about: string[]
}

export type TimelineEntry = {
  id: string
  title: string
  org: string
  period: string
  current?: boolean
  logo?: string
  grade?: string
  description: string
  link?: { label: string; href: string }
  /* ---- optional details, shown in the timeline modal ---- */
  /** e.g. "Full-time", "Internship", "MSc" */
  employmentType?: string
  /** e.g. "1 yr 1 mo" */
  duration?: string
  location?: string
  /** e.g. "On-site", "Hybrid", "Remote" */
  workplace?: string
  /** one-line intro shown above the highlights */
  summary?: string
  /** what you did there, one bullet each */
  highlights?: string[]
}

export const SKILL_CATEGORIES = ["Backend", "Frontend", "DevOps", "Other"] as const
export type SkillCategory = (typeof SKILL_CATEGORIES)[number]

export type Skill = {
  name: string
  /** 0–100 */
  level: number
  category: SkillCategory
  /** use either an icon key or an image URL */
  icon?: IconKey
  image?: string
  /* ---- optional details, shown in the skill modal ---- */
  description?: string
  /** where the skill was gained — the evidence behind the level */
  proof?: SkillProof[]
}

export type SkillProof = {
  /** id of an entry in data/projects.ts, data/experience.ts or data/education.ts */
  ref: string
  /** what you did with this skill there */
  detail: string
}

/** A project, job or degree, normalised so skills can reference any of them */
export type CvSource = {
  id: string
  kind: "Project" | "Work" | "Education"
  name: string
  subtitle?: string
  href?: string
  image?: string
  icon?: IconKey
}

export type Project = {
  id: string
  name: string
  type: string
  status: ProjectStatus
  href: string
  /** cover image, shown on the card and first in the modal slider */
  image?: string
  /** caption for the cover image in the modal slider */
  imageCaption?: string
  /** shown on the card when there is no image */
  icon?: IconKey
  /** extra images for the modal slider (screenshots, diagrams…) */
  gallery?: ProjectImage[]
  description: string
  tags: string[]
}

export type ProjectStatus = "in-progress" | "completed"

export type ProjectImage = {
  src: string
  caption?: string
}
