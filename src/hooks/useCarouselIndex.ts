import { useEffect, useState } from "react"

import type { CarouselApi } from "@/components/ui/carousel"

/** Current slide index and slide count of a shadcn Carousel. */
export function useCarouselIndex(api: CarouselApi | undefined) {
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    const update = () => {
      setIndex(api.selectedScrollSnap())
      setCount(api.scrollSnapList().length)
    }
    update()
    api.on("select", update).on("reInit", update)
    return () => {
      api.off("select", update).off("reInit", update)
    }
  }, [api])

  return { index, count }
}
