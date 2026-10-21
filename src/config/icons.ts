import type { IconType } from "react-icons"
import {
  FaAws,
  FaCss3Alt,
  FaChartLine,
  FaCreditCard,
  FaDatabase,
  FaDiagramProject,
  FaDocker,
  FaHtml5,
  FaJava,
  FaJs,
  FaLeaf, FaLinux,
  FaPenRuler,
  FaReact,
  FaSatellite,
  FaTerminal,
  FaUtensils,
} from "react-icons/fa6"
import { SiAnsible, SiTailwindcss, SiTypescript } from "react-icons/si"

/**
 * Icon registry: data refers to icons by key so it stays serializable.
 * To use a new icon, import it here and add a key.
 */
export const ICONS = {
  ansible: SiAnsible,
  aws: FaAws,
  css: FaCss3Alt,
  monitoring: FaChartLine,
  payment: FaCreditCard,
  database: FaDatabase,
  docker: FaDocker,
  system_design: FaDiagramProject,
  ui_ux: FaPenRuler,
  linux: FaLinux,
  html: FaHtml5,
  java: FaJava,
  javascript: FaJs,
  typescript: SiTypescript,
  react: FaReact,
  satellite: FaSatellite,
  spring: FaLeaf,
  tailwind: SiTailwindcss,
  terminal: FaTerminal,
  utensils: FaUtensils,
} satisfies Record<string, IconType>

export type IconKey = keyof typeof ICONS
