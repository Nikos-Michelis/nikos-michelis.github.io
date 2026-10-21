import { useState, type ChangeEvent, type FormEvent } from "react"

export type ContactValues = {
  name: string
  email: string
  subject: string
  message: string
  /** honeypot — hidden from people, bots fill it in */
  company: string
}

type Field = Exclude<keyof ContactValues, "company">
export type ContactErrors = Partial<Record<Field, string>>
export type ContactStatus = "idle" | "sending" | "sent" | "error"

const EMPTY: ContactValues = { name: "", email: "", subject: "", message: "", company: "" }
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const MESSAGE_MAX = 2000

function validate(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (v.name.trim().length < 2) errors.name = "Please enter your name."
  if (!EMAIL.test(v.email.trim())) errors.email = "Please enter a valid email address."
  if (v.message.trim().length < 10) errors.message = "Your message should be at least 10 characters."
  else if (v.message.length > MESSAGE_MAX) errors.message = `Please keep it under ${MESSAGE_MAX} characters.`
  return errors
}

type Options = {
  /** form endpoint; when missing, the visitor's email app opens instead */
  endpoint?: string
  /** where the mail-app fallback sends to */
  to: string
}

/**
 * Contact form state, validation and sending.
 * With an `endpoint` (e.g. Formspree) messages are POSTed as JSON;
 * without one, a pre-filled `mailto:` link opens.
 */
export function useContactForm({ endpoint, to }: Options) {
  const [values, setValues] = useState<ContactValues>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<ContactStatus>("idle")

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    // after the first submit attempt, re-validate as the user types
    if (touched) setErrors(validate(next))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched(true)
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // a bot filled the honeypot: pretend it worked, send nothing
    if (values.company) {
      setStatus("sent")
      return
    }

    const subject = values.subject.trim() || `Message from ${values.name.trim()}`

    if (!endpoint) {
      const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus("sent")
      return
    }

    setStatus("sending")
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject,
          message: values.message.trim(),
          _replyto: values.email.trim(),
          _gotcha: values.company,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus("sent")
      setValues(EMPTY)
      setTouched(false)
    } catch {
      setStatus("error")
    }
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setTouched(false)
    setStatus("idle")
  }

  return { values, errors, status, onChange, onSubmit, reset, sendsDirectly: Boolean(endpoint) }
}
