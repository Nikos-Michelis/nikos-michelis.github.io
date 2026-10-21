import { AnimatePresence, motion } from "motion/react"
import { ChevronDown } from "lucide-react"

import { CvDialog } from "@/components/cv-dialog"
import { SocialLinks } from "@/components/social-links"
import { useProfile } from "@/hooks/useCv"
import { useRotatingText } from "@/hooks/useRotatingText"
import { useTilt } from "@/hooks/useTilt"

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

function ProfileImage({ src }: { src: string }) {
  const { rotateX, rotateY, handlers } = useTilt({ max: 14, stiffness: 200, damping: 18 })

  return (
    <div className="relative mb-10 [perspective:800px]">
      {/* orbit rings */}
      <motion.div
        className="absolute -inset-6 rounded-full border border-dashed border-lavender/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-1.5 left-1/2 size-3 rounded-full bg-peach shadow-[0_0_14px_var(--peach)]" />
      </motion.div>
      <motion.div
        className="absolute -inset-12 rounded-full border border-lavender/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute top-1/2 -right-1 size-2 rounded-full bg-lavender shadow-[0_0_12px_var(--lavender)]" />
      </motion.div>

      <motion.div
        {...handlers}
        style={{ rotateX, rotateY, backgroundImage: `url(${src})` }}
        whileHover={{ scale: 1.06 }}
        className="size-44 rounded-[20%] bg-cover bg-center shadow-[0_10px_40px_hsl(265_38%_60%/0.35)] ring-2 ring-lavender/30 sm:size-52"
        data-no-comet
      />
    </div>
  )
}

export function Hero() {
  const profile = useProfile()
  const role = useRotatingText(profile.roles)

  return (
    <section id="home" className="relative flex min-h-svh flex-col items-center justify-center px-4 pt-16 text-center">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
        className="flex flex-col items-center"
      >
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } }} transition={{ type: "spring", stiffness: 120 }}>
          <ProfileImage src={profile.image} />
        </motion.div>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 40, rotate: -5 }, show: { opacity: 1, y: 0, rotate: -5 } }}
          className="text-glow relative mb-6 px-2 font-script text-5xl leading-tight text-star-200 sm:text-6xl md:text-7xl"
        >
          <span className="absolute top-1/2 -left-10 hidden h-1 w-8 bg-star-200 sm:block" />
          {profile.name}
          <span className="absolute top-1/2 -right-10 hidden h-1 w-8 bg-star-200 sm:block" />
        </motion.h1>

        <motion.div variants={fadeUp} className="mb-8 h-8 text-lg sm:text-xl">
          <AnimatePresence mode="wait">
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.35 }}
              className="text-gradient inline-block font-bold"
            >
              {role}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.div variants={fadeUp}>
          <SocialLinks className="mb-8 justify-center" />
        </motion.div>

        <motion.div variants={fadeUp}>
          <CvDialog />
        </motion.div>

        <motion.p variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-10 text-xs text-muted-foreground/70">
          psst… click anywhere in the sky ✦
        </motion.p>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full p-2 text-muted-foreground hover:text-star-200"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ChevronDown className="size-7" />
      </motion.a>
    </section>
  )
}
