import { useCallback } from "react"
import { toast } from "sonner"

/** Returns a function that copies text and shows a toast with the result. */
export function useCopyToClipboard() {
  return useCallback(async (text: string, label = "Text") => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copied to clipboard`, { description: text })
    } catch {
      toast.error("Couldn't copy — please copy it manually", { description: text })
    }
  }, [])
}
