import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Maximize2 } from "lucide-react"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useCarouselIndex } from "@/hooks/useCarouselIndex"
import { cn } from "@/lib/utils"

export type GalleryImage = { src: string; caption?: string }

/** brighter arrows for the lightbox, which sits on a dark backdrop */
const LIGHTBOX_ARROW = "size-10 bg-lavender text-cosmos-300 shadow-lg hover:bg-star-200"
const ARROW = "z-10 size-8 border-0 bg-cosmos-300/70 text-star-200 backdrop-blur hover:bg-lavender hover:text-cosmos-300 disabled:opacity-0"

function Dots({ count, index, onSelect }: { count: number; index: number; onSelect: (i: number) => void }) {
  if (count < 2) return null
  return (
    <div className="flex justify-center gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to image ${i + 1}`}
          aria-current={i === index}
          onClick={() => onSelect(i)}
          className={cn("h-1.5 rounded-full transition-all", i === index ? "w-5 bg-lavender" : "w-1.5 bg-star-300/40 hover:bg-star-300/70")}
        />
      ))}
    </div>
  )
}

type LightboxProps = {
  images: GalleryImage[]
  title: string
  open: boolean
  startIndex: number
  onOpenChange: (open: boolean) => void
  /** reports the slide shown when the lightbox closes */
  onIndexChange: (index: number) => void
}

function Lightbox({ images, title, open, startIndex, onOpenChange, onIndexChange }: LightboxProps) {
  const [api, setApi] = useState<CarouselApi>()
  const { index, count } = useCarouselIndex(api)

  // arrow keys work wherever focus is inside the lightbox. Capture phase, because the
  // dialog stops keydown from bubbling; skip when focus is inside the carousel, which
  // handles its own arrow keys.
  useEffect(() => {
    if (!open || !api) return
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as Element | null)?.closest("[data-slot=carousel]")) return
      if (e.key === "ArrowLeft") api.scrollPrev()
      if (e.key === "ArrowRight") api.scrollNext()
    }
    window.addEventListener("keydown", onKey, true)
    return () => window.removeEventListener("keydown", onKey, true)
  }, [open, api])

  useEffect(() => onIndexChange(index), [index, onIndexChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        // opened from inside another dialog, so its backdrop must be forced to render
        overlayProps={{ forceRender: true, className: "bg-cosmos-400/85 supports-backdrop-filter:backdrop-blur-md" }}
        className="w-[95vw] max-w-[95vw] gap-3 bg-transparent p-0 ring-0 sm:max-w-5xl [&>[data-slot=dialog-close]]:z-20 [&>[data-slot=dialog-close]]:bg-cosmos-300/80">
        <DialogTitle className="sr-only">{title} — images</DialogTitle>
        <Carousel setApi={setApi} opts={{ startIndex, loop: images.length > 1 }}>
          <CarouselContent className="ml-0">
            {images.map((img) => (
              <CarouselItem key={img.src} className="flex flex-col items-center justify-center gap-3 pl-0">
                <motion.img
                  src={img.src}
                  alt={img.caption ?? title}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="max-h-[75svh] w-auto max-w-full rounded-xl bg-cosmos-300 object-contain shadow-[0_20px_80px_hsl(265_38%_20%/0.8)]"
                />
                {img.caption && <p className="text-center text-sm text-star-200">{img.caption}</p>}
              </CarouselItem>
            ))}
          </CarouselContent>
          {count > 1 && (
            <>
              <CarouselPrevious className={cn(ARROW, LIGHTBOX_ARROW, "left-2")} />
              <CarouselNext className={cn(ARROW, LIGHTBOX_ARROW, "right-2")} />
            </>
          )}
        </Carousel>
        {count > 1 && (
          <div className="flex flex-col items-center gap-2">
            <Dots count={count} index={index} onSelect={(i) => api?.scrollTo(i)} />
            <span className="text-xs tabular-nums text-muted-foreground">
              {index + 1} / {count}
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

type ImageGalleryProps = {
  images: GalleryImage[]
  title: string
  className?: string
}

/** Swipeable image slider; any image can be expanded into a full-screen slider. */
export function ImageGallery({ images, title, className }: ImageGalleryProps) {
  const [api, setApi] = useState<CarouselApi>()
  const { index, count } = useCarouselIndex(api)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const caption = images[index]?.caption

  const openLightbox = () => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Carousel setApi={setApi} opts={{ loop: images.length > 1 }} className="group/gallery h-56 overflow-hidden bg-cosmos-300">
        <CarouselContent className="ml-0 h-56">
          {images.map((img, i) => (
            <CarouselItem key={img.src} className="h-56 pl-0">
              <button
                type="button"
                onClick={openLightbox}
                aria-label={`View ${img.caption ?? title} full size`}
                className="block size-full cursor-zoom-in"
              >
                <img
                  src={img.src}
                  alt={img.caption ?? title}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="size-full object-contain transition-transform duration-500 group-hover/gallery:scale-105"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {count > 1 && (
          <>
            <CarouselPrevious className={cn(ARROW, "left-3 sm:opacity-0 sm:group-hover/gallery:opacity-100")} />
            <CarouselNext className={cn(ARROW, "right-3 sm:opacity-0 sm:group-hover/gallery:opacity-100")} />
            <span className="absolute top-3 left-3 z-10 rounded-full bg-cosmos-300/70 px-2 py-0.5 text-[0.7rem] tabular-nums text-star-200 backdrop-blur">
              {index + 1} / {count}
            </span>
          </>
        )}

        {caption && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-cosmos-400/90 to-transparent px-4 pt-6 pb-2.5 pr-14 text-xs text-star-200">
            {/* long captions would cover the image on phones; the lightbox shows them in full */}
            <span className="line-clamp-2 sm:line-clamp-none">{caption}</span>
          </div>
        )}

        <button
          type="button"
          onClick={openLightbox}
          aria-label={`Expand ${images[index]?.caption ?? title}`}
          className="glass absolute right-3 bottom-3 z-10 flex size-9 items-center justify-center rounded-full bg-cosmos-300/70 text-star-200 transition-all hover:scale-110 hover:bg-lavender hover:text-cosmos-300 sm:opacity-0 sm:group-hover/gallery:opacity-100 sm:focus-visible:opacity-100"
        >
          <Maximize2 className="size-4" />
        </button>
      </Carousel>

      <Dots count={count} index={index} onSelect={(i) => api?.scrollTo(i)} />

      <Lightbox
        images={images}
        title={title}
        open={lightboxOpen}
        startIndex={lightboxIndex}
        onOpenChange={(open) => {
          setLightboxOpen(open)
          // keep the inline slider on the image last viewed in the lightbox
          if (!open) api?.scrollTo(lightboxIndex, true)
        }}
        onIndexChange={setLightboxIndex}
      />
    </div>
  )
}
