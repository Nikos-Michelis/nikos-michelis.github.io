import { asset } from "@/lib/asset"
import type { TimelineEntry } from "@/types/cv"

/** Newest first */
export const EXPERIENCE: TimelineEntry[] = [
  {
    id: "ed-fullstack",
    title: "Junior Java Developer",
    org: "EUROPEAN DYNAMICS",
    period: "July 2026",
    employmentType: "Full-time",
    location: "Chalkida, Central Greece",
    workplace: "Remote",
    current: true,
    logo: asset("companies/ed.png"),
    description:
        "Developing and maintaining Java applications for a European Union agency in the financial sector as part of the European Dynamics engineering team.",
  },
  {
    id: "kepyes-fullstack",
    title: "Fullstack Software Engineer",
    org: "KE.PY.ES Hellenic Army IT Center",
    period: "Sep 2025 - Sep 2026",
    duration: "1 yr 1 mo",
    employmentType: "Full-time",
    location: "Athens, Attiki, Greece",
    workplace: "On-site",
    current: false,
    summary: "KE.PY.ES – Hellenic Army IT Center Software Engineer | Mandatory Military Service.",
    highlights: [
      "Development and maintenance of web applications using React, Spring Boot and Symfony.",
      "Actively participated in Agile ceremonies, including sprint planning, daily stand-ups, and retrospectives.",
      "Collaborated with cross-functional teams to deliver secure and scalable software.",
      "Applied clean code principles, including SOLID, DRY, and TDD, and conducted code reviews to ensure code quality, consistency, and maintainability.",
    ],
    logo: asset("companies/hellenic-army.png"),
    description:
      "Mandatory Military service fulfillment at KE.PY.ES, the Hellenic Army's IT Center, where I contribute as a Fullstack Software Engineer working on internal software tools.",
  },
  {
    id: "cchbc-intern",
    title: "IT Support - Digital Workplace Technology Intern",
    org: "Coca-Cola HBC",
    period: "Jul 2022 - Aug 2022",
    duration: "2 mos",
    employmentType: "Internship",
    location: "Schimatari, Central Greece, Greece",
    summary: "2-month internship in IT support.",
    highlights: [
      "Developed a digital signage broadcasting platform using HTML5, CSS, JavaScript, and NGINX RTMP, enabling centralized streaming of advertising content across the facility without USB transfers.",
      "Provided IT technical support to end users, troubleshooting hardware and software issues, assisting with system configuration, and ensuring smooth daily operations.",
      "Performed hardware maintenance and troubleshooting, including PC formatting and general equipment diagnostics.",
      "Gained hands-on experience with local network infrastructure, server racks, and network switch configuration.",
      "Configured and programmed network switches while applying fundamental networking concepts.",
    ],
    logo: asset("companies/hbc.png"),
    description:
      "I completed a 2-month internship as an IT Support – Digital Workplace Technology Intern at Coca-Cola HBC. During this time, I created a simple website using HTML5, CSS, and JavaScript, and set up an NGINX RTMP server to broadcast media files. I also gained hands-on experience with local network infrastructure, learned about server rack organization and explored network switch configuration and basic programming.",
  },
]
