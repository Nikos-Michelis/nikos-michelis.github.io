/**
 * URL for a file in `public/assets/`, respecting Vite's `base`
 * (so it keeps working if the site is served from a sub-path).
 *
 *   asset("companies/hbc.png") → "/assets/companies/hbc.png"
 */
export const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`
