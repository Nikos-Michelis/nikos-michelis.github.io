import { AnimatePresence, motion } from "motion/react"
import { AlertCircle, CheckCircle2, Copy, Loader2, Mail, MapPin, Send } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa6"

import { Section } from "@/components/section"
import { SpotlightCard } from "@/components/spotlight-card"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CONTACT_FORM_ENDPOINT } from "@/config/contact"
import { MESSAGE_MAX, useContactForm, type ContactErrors } from "@/hooks/useContactForm"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { useProfile } from "@/hooks/useCv"
import { cn } from "@/lib/utils"

const FIELD = "border-border bg-cosmos-300/60 placeholder:text-muted-foreground/60 focus-visible:border-lavender/60"

function FieldError({ id, errors, field }: { id: string; errors: ContactErrors; field: keyof ContactErrors }) {
  return (
    <AnimatePresence>
      {errors[field] && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-xs text-destructive"
        >
          {errors[field]}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

function ContactLinks() {
  const profile = useProfile()
  const copy = useCopyToClipboard()
  const links = [
    { icon: Mail, label: "Email", value: profile.email, onClick: () => copy(profile.email, "Email"), action: Copy },
    { icon: FaLinkedin, label: "LinkedIn", value: "Connect with me", href: profile.social.linkedin },
    { icon: FaGithub, label: "GitHub", value: "See my code", href: profile.social.github },
    { icon: MapPin, label: "Location", value: profile.address },
  ]

  return (
    <div className="flex flex-col gap-3">
      {links.map(({ icon: Icon, label, value, onClick, href, action: Action }, i) => {
        const inner = (
          <>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lavender/10 text-lavender transition-transform group-hover/link:scale-110 group-hover/link:-rotate-6">
              <Icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-muted-foreground">{label}</span>
              <span className="block text-sm font-bold [overflow-wrap:anywhere] text-star-200">{value}</span>
            </span>
            {Action && <Action className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover/link:opacity-100" />}
          </>
        )
        const cls = "group/link glass flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-colors hover:border-lavender/40"
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ x: 4 }}
          >
            {onClick ? (
              <button type="button" onClick={onClick} aria-label={`Copy ${label}`} className={cls}>
                {inner}
              </button>
            ) : href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

function ContactForm() {
  const { email } = useProfile()
  const { values, errors, status, onChange, onSubmit, reset, sendsDirectly } = useContactForm({
    endpoint: CONTACT_FORM_ENDPOINT,
    to: email,
  })
  const invalid = (field: keyof ContactErrors) => (errors[field] ? { "aria-invalid": true, "aria-describedby": `${field}-error` } : {})

  return (
    <SpotlightCard className="h-full">
      <CardContent className="relative">
        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex min-h-80 flex-col items-center justify-center gap-4 text-center"
              role="status"
            >
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.1 }}
              >
                <CheckCircle2 className="size-14 text-peach" />
              </motion.span>
              <h3 className="text-xl font-bold text-star-200">{sendsDirectly ? "Message sent!" : "Almost there!"}</h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                {sendsDirectly
                  ? "Thanks for reaching out — I'll get back to you as soon as I can."
                  : "Your email app should have opened with the message ready — just hit send."}
              </p>
              <Button variant="outline" onClick={reset}>
                Send another message
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={onSubmit}
              noValidate
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" autoComplete="name" placeholder="Jane Doe" value={values.name} onChange={onChange} className={FIELD} {...invalid("name")} />
                  <FieldError id="name-error" errors={errors} field="name" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" value={values.email} onChange={onChange} className={FIELD} {...invalid("email")} />
                  <FieldError id="email-error" errors={errors} field="email" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="subject">
                  Subject <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input id="subject" name="subject" placeholder="Job opportunity, collaboration…" value={values.subject} onChange={onChange} className={FIELD} />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="message">Message</Label>
                  <span className={cn("text-[0.7rem] tabular-nums", values.message.length > MESSAGE_MAX ? "text-destructive" : "text-muted-foreground")}>
                    {values.message.length} / {MESSAGE_MAX}
                  </span>
                </div>
                <Textarea id="message" name="message" rows={6} placeholder="Hi Nick, …" value={values.message} onChange={onChange} className={cn(FIELD, "min-h-36 resize-y")} {...invalid("message")} />
                <FieldError id="message-error" errors={errors} field="message" />
              </div>

              {/* honeypot: invisible to people, tempting to bots */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={onChange} />
              </div>

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive"
                  >
                    <AlertCircle className="size-4 shrink-0" />
                    Something went wrong sending your message. Please try again, or email me at {email}.
                  </motion.p>
                )}
              </AnimatePresence>

              <Button type="submit" size="lg" disabled={status === "sending"} className="h-11 gap-2 self-end rounded-full px-6 shadow-[0_0_30px_hsl(265_38%_89%/0.3)] hover:scale-105">
                {status === "sending" ? <Loader2 className="animate-spin" /> : <Send className="transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />}
                {status === "sending" ? "Sending…" : "Send message"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </SpotlightCard>
  )
}

export function Contact() {
  return (
    <Section id="contact" title="Get In Touch" subtitle="Have a role, a project or just a question? My inbox is open.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ContactLinks />
        </div>
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  )
}
