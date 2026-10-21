import { Copy, Download, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { useProfile } from "@/hooks/useCv"

export function CvDialog() {
  const { email } = useProfile()
  const copy = useCopyToClipboard()

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="lg" className="h-11 gap-2 rounded-full px-6 shadow-[0_0_30px_hsl(265_38%_89%/0.35)] hover:scale-105 hover:shadow-[0_0_45px_hsl(265_38%_89%/0.55)]" />
        }
      >
        <Download className="transition-transform group-hover/button:translate-y-0.5" /> Download CV
      </DialogTrigger>
      <DialogContent className="glass bg-cosmos-200/90 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Want my full CV?</DialogTitle>
          <DialogDescription>
            For more information about my CV, please contact me by email and I'll send you the latest version.
          </DialogDescription>
        </DialogHeader>
        <button
          type="button"
          onClick={() => copy(email, "Email")}
          className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-muted px-4 py-3 text-left text-sm transition-colors hover:bg-accent"
        >
          <span className="truncate">{email}</span>
          <Copy className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:scale-110 group-hover:text-star-200" />
        </button>
        <DialogFooter className="border-border bg-transparent">
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          <Button nativeButton={false} render={<a href={`mailto:${email}?subject=CV%20request`} />} className="gap-2">
            <Mail /> Send email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
