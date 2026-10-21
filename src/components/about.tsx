import { motion } from "motion/react"
import { Copy, Globe, Mail, MapPin, User, type LucideIcon } from "lucide-react"

import { Section } from "@/components/section"
import { SocialLinks } from "@/components/social-links"
import { SpotlightCard } from "@/components/spotlight-card"
import { CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { useProfile } from "@/hooks/useCv"

type InfoItem = {
  icon: LucideIcon
  label: string
  value: string
  onClick?: () => void
  href?: string
}

const ROW = "group/info flex w-full items-center gap-4 rounded-lg p-2 text-left transition-colors hover:bg-accent"

function InfoRow({ icon: Icon, label, value, onClick, href }: InfoItem) {
  const inner = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-lavender/10 text-lavender transition-transform group-hover/info:scale-110 group-hover/info:rotate-6">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block text-sm font-bold [overflow-wrap:anywhere] text-star-200">{value}</span>
      </span>
      {onClick && <Copy className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover/info:opacity-100" />}
    </>
  )

  if (onClick)
    return (
      <button type="button" onClick={onClick} className={ROW} aria-label={`Copy ${label}`}>
        {inner}
      </button>
    )
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={ROW}>
        {inner}
      </a>
    )
  return <div className={ROW}>{inner}</div>
}

export function About() {
  const profile = useProfile()
  const copy = useCopyToClipboard()

  const info: InfoItem[] = [
    { icon: User, label: "Full Name", value: profile.name },
    { icon: Mail, label: "Email", value: profile.email, onClick: () => copy(profile.email, "Email") },
    { icon: Globe, label: "Website", value: profile.website, href: profile.websiteUrl },
    { icon: MapPin, label: "Address", value: profile.address },
  ]

  return (
    <Section id="about" title="About Me">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <SpotlightCard className="h-full">
            <CardContent className="flex flex-col gap-2">
              {info.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                >
                  <InfoRow {...item} />
                </motion.div>
              ))}
            </CardContent>
          </SpotlightCard>
        </motion.div>

        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SpotlightCard className="h-full">
            <CardContent className="flex h-full flex-col gap-4">
              <h3 className="text-2xl font-bold">
                Hello There!{" "}
                <motion.span
                  className="inline-block origin-[70%_70%]"
                  animate={{ rotate: [0, 18, -8, 18, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
                >
                  👋
                </motion.span>
              </h3>
              {profile.about.map((p) => (
                <p key={p.slice(0, 20)} className="text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              <Separator className="mt-auto" />
              <SocialLinks />
            </CardContent>
          </SpotlightCard>
        </motion.div>
      </div>
    </Section>
  )
}
