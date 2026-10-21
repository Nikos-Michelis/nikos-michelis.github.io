import { asset } from "@/lib/asset"
import type { Profile } from "@/types/cv"

export const PROFILE: Profile = {
  name: "Michelis Nikolaos",
  shortName: "Nick",
  roles: ["FullStack Web Developer", "Spring Boot Developer", "React Developer", "DevOps Enthusiast"],
  email: "michelis.nikos36@gmail.com",
  website: "www.moonkeyeu.com",
  websiteUrl: "https://www.moonkeyeu.com",
  address: "Chalkida, Central Greece",
  image: asset("profile/profile-img.png"),
  social: {
    linkedin: "https://www.linkedin.com/in/nikolaos-michelis-91a921251/",
    github: "https://github.com/Nikos-Michelis",
  },
  about: [
    "Hi, I’m Nick! As a software engineer, I’m always eager to learn, experiment, and stay at the forefront of innovation.",
    "I work across full-stack development including DevOps and cloud. I'm a simple person, and I build my systems the same way, keeping them clean and easy to follow so they still make sense a year from now."
  ]
}