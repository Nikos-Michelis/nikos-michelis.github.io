import { motion } from "motion/react"
import { FaGithub, FaLinkedin } from "react-icons/fa6"
import { Mail } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useProfile } from "@/hooks/useCv"
import { cn } from "@/lib/utils"

export function SocialLinks({ className }: { className?: string }) {
  const { social, email } = useProfile()
  const links = [
    { label: "LinkedIn", href: social.linkedin, icon: FaLinkedin },
    { label: "GitHub", href: social.github, icon: FaGithub },
    { label: "Email", href: `mailto:${email}`, icon: Mail },
  ]

  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {links.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <Tooltip>
            <TooltipTrigger
              render={
                <motion.a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, rotate: -8, scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  className="glass flex size-11 items-center justify-center rounded-full text-xl text-star-300 transition-colors hover:border-lavender/60 hover:text-star-200 hover:shadow-[0_0_20px_hsl(265_38%_89%/0.35)]"
                />
              }
            >
              <Icon className="size-5" />
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  )
}
