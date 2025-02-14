import { HeroSection } from "@/components/HeroSection"
import { TechModelViewer } from "@/components/TechModelViewer"
import { FeaturedProjects } from "@/components/FeaturedProjects"
import { BlogPosts } from "@/components/BlogPosts"
import { CodeSnippet } from "@/components/CodeSnippet"
import { TechStack } from "@/components/TechStack"
import { MemoryGame } from "@/components/MemoryGame"
import { SkillsProgress } from "@/components/SkillsProgress"
import { Testimonials } from "@/components/Testimonials"
import { CallToAction } from "@/components/CallToAction"
import { RevealSection } from "@/components/RevealSection"

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />

      <RevealSection>
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Tech Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <TechModelViewer />
            <CodeSnippet />
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section className="container mx-auto px-4">
          <SkillsProgress />
        </section>
      </RevealSection>

      <RevealSection>
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">My Tech Stack</h2>
          <TechStack />
        </section>
      </RevealSection>

      <RevealSection>
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <FeaturedProjects />
        </section>
      </RevealSection>

      <RevealSection>
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Blog Posts</h2>
          <BlogPosts />
        </section>
      </RevealSection>

      <RevealSection>
        <section className="container mx-auto px-4">
          <Testimonials />
        </section>
      </RevealSection>

      <RevealSection>
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Test Your Memory</h2>
          <MemoryGame />
        </section>
      </RevealSection>

      <RevealSection>
        <CallToAction />
      </RevealSection>
    </div>
  )
}

