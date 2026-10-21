import { use } from "react"

import { cvService } from "@/services/cv-service"

/*
 * Data hooks. They suspend until the service resolves, so they must be
 * rendered inside a <Suspense> boundary (see App.tsx).
 */

export const useProfile = () => use(cvService.getProfile())
export const useExperience = () => use(cvService.getExperience())
export const useEducation = () => use(cvService.getEducation())
export const useSkills = () => use(cvService.getSkills())
export const useProjects = () => use(cvService.getProjects())
