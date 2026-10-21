/**
 * Contact form endpoint (e.g. Formspree), set in `.env` (git-ignored) — see `.env.example`.
 * When empty, the form falls back to opening the visitor's email app.
 */
export const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim() || undefined
