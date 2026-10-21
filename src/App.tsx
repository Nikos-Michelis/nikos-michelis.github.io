import { Suspense } from "react"

import { About } from "@/components/about"
import { ErrorBoundary } from "@/components/error-boundary"
import { Contact } from "@/components/contact"
import { BackToTop, Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { Projects } from "@/components/projects"
import { Resume } from "@/components/resume"
import { Skills } from "@/components/skills"
import { SpaceBackground } from "@/components/space-background"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function App() {
  return (
    <TooltipProvider>
      <SpaceBackground />
      <ErrorBoundary>
        {/* sections read data via hooks/useCv, which suspend until the service resolves.
            Navbar is inside too: it observes the section elements, so they must exist when it mounts. */}
        <Suspense fallback={null}>
          <Navbar />
          {/* clip slide-in animations here: on phones, content past the right edge widens the whole page */}
          <main className="overflow-x-clip">
            <Hero />
            <About />
            <Resume />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </Suspense>
      </ErrorBoundary>
      <BackToTop />
      <Toaster theme="dark" position="bottom-center" />
    </TooltipProvider>
  )
}
