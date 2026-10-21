import { asset } from "@/lib/asset"
import type { TimelineEntry } from "@/types/cv"

/** Newest first */
export const EDUCATION: TimelineEntry[] = [
  {
    id: "uth-msc",
    title: "Masters Degree",
    org: "University of Thessaly",
    period: "Oct 2023 - Jul 2025",
    logo: asset("education/digital-systems.png"),
    grade: "8.15",
    description:
      "I have completed my Master's degree in Digital Systems at the University of Thessaly. As part of my studies, I developed MoonkeyEU, a fullstack web application for exploring past and upcoming space launches.",
    link: { label: "MoonkeyEU", href: "https://www.moonkeyeu.com" },
  },
  {
    id: "uth-bsc",
    title: "Bachelors Degree",
    org: "University of Thessaly",
    period: "Oct 2019 - Jul 2023",
    logo: asset("education/digital-systems.png"),
    grade: "7.63",
    description:
      "I graduated from the University of Thessaly, where I studied in the Department of Digital Systems. My studies focused on the intersection of software engineering, information systems, and digital technologies.",
    link: { label: "CardShop e-commerce", href: "https://github.com/Nikos-Michelis/CardShop" }
  },
]
