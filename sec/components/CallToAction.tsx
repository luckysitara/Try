import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CallToAction() {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Build Something Amazing?</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          I'm always excited to take on new challenges and create innovative solutions. Let's collaborate and bring your
          ideas to life!
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </section>
  )
}

