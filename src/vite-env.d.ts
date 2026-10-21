/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Form endpoint for the contact form (e.g. https://formspree.io/f/xxxxxxx). Optional. */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
