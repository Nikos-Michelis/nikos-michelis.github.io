import { useEffect, useState } from "react"

/** Cycles through `items`, returning the current one. */
export function useRotatingText<T>(items: readonly T[], interval = 2600) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), interval)
    return () => clearInterval(id)
  }, [items.length, interval])

  return items[index % items.length]
}
