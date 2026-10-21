import { EDUCATION } from "@/data/education"
import { EXPERIENCE } from "@/data/experience"
import { PROFILE } from "@/data/profile"
import { PROJECTS } from "@/data/projects"
import { SKILLS } from "@/data/skills"
import type { Profile, Project, Skill, TimelineEntry } from "@/types/cv"

/**
 * The only module that knows where CV data comes from.
 *
 * Today every getter resolves the local constants in `src/data`.
 * To load from an API or a JSON file instead, change the loader body, e.g.
 *
 *   getProjects: () => cached("projects", () => fetchJson<Project[]>("/api/projects")),
 *
 * Components and hooks don't need to change.
 */

// Promises are cached so React's `use()` gets the same promise on every render.
const cache = new Map<string, Promise<unknown>>()

function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  if (!cache.has(key)) cache.set(key, load())
  return cache.get(key) as Promise<T>
}

/** Helper for when the data moves to a JSON file or API. */
export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${url}`)
  return await res.json() as Promise<T>
}

export const cvService = {
  getProfile: (): Promise<Profile> => cached("profile", async () => PROFILE),
  getExperience: (): Promise<TimelineEntry[]> => cached("experience", async () => EXPERIENCE),
  getEducation: (): Promise<TimelineEntry[]> => cached("education", async () => EDUCATION),
  getSkills: (): Promise<Skill[]> => cached("skills", async () => SKILLS),
  getProjects: (): Promise<Project[]> => cached("projects", async () => PROJECTS),
}
