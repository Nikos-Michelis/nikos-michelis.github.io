/** Page sections, in order. `id` must match the section's element id. */
export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const

export type SectionId = (typeof NAV_LINKS)[number]["id"]
