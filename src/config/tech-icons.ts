import type { IconType } from "react-icons"
import {
  SiAndroid,
  SiApachekafka,
  SiArduino,
  SiCplusplus,
  SiFirebase,
  SiGrafana,
  SiJson,
  SiNginx,
  SiPrometheus,
  SiRedis,
  SiStripe,
} from "react-icons/si"

/** brand logo as an icon component or as an image */
export type TechIcon = { icon: IconType } | { image: string }

/**
 * Fallback logos for project tags that don't match a skill (skills use their own icon),
 * matched by tag name (case-insensitive). Tags not listed here render as text only.
 */
const TECH_ICONS: Record<string, TechIcon> = {
  android: { icon: SiAndroid },
  arduino: { icon: SiArduino },
  "c++": { icon: SiCplusplus },
  firebase: { icon: SiFirebase },
  grafana: { icon: SiGrafana },
  json: { icon: SiJson },
  kafka: { icon: SiApachekafka },
  loki: { icon: SiGrafana },
  nginx: { icon: SiNginx },
  prometheus: { icon: SiPrometheus },
  redis: { icon: SiRedis },
  stripe: { icon: SiStripe },
}

export function techIcon(tag: string): TechIcon | undefined {
  return TECH_ICONS[tag.trim().toLowerCase()]
}
