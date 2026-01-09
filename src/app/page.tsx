import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionOverview } from "@/components/solution-overview"
import { FeatureSection } from "@/components/feature-section"
import { FinancingAlignment } from "@/components/financing-alignment"
import { ImpactSection } from "@/components/impact-section"
import { WhyNow } from "@/components/why-now"
import { PlatformAccess } from "@/components/platform-access"
import { ClosingStatement } from "@/components/closing-statement"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans antialiased text-foreground">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <section id="solution">
        <SolutionOverview />
      </section>
      <section id="features">
        <FeatureSection />
      </section>
      <section id="financing">
        <FinancingAlignment />
      </section>
      <section id="impact">
        <ImpactSection />
      </section>
      <WhyNow />
      <PlatformAccess />
      <ClosingStatement />
      <Footer />
    </main>
  )
}
