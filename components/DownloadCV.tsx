import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function DownloadCV() {
  return (
    <Button asChild>
      <a href="/path-to-your-cv.pdf" download>
        <Download className="mr-2 h-4 w-4" /> Download CV
      </a>
    </Button>
  )
}

