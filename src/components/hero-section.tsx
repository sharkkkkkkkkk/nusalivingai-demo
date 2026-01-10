import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-16 md:pt-24 lg:pt-32 pb-8 md:pb-12 lg:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
          <div className="flex flex-col items-start gap-4 md:w-1/2">
            <Badge variant="outline" className="px-3 py-1 text-sm bg-accent/20 text-primary border-primary/20">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Solusi Perumahan Cerdas AI</span>
              </span>
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
              Merancang Hunian Masa Depan, Lebih Cepat & Terjangkau dengan AI
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Platform cerdas untuk membantu masyarakat Indonesia merencanakan hunian yang aman, berkelanjutan, dan siap pembiayaan.
            </p>
            <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto mt-4">
              <Link href="/dashboard/planner" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2">
                  Mulai Rencanakan Hunian
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#solution" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  Lihat Cara Kerjanya
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-slate-200" />
                ))}
              </div>
              <p>Dipercaya oleh 1,000+ perencana</p>
            </div>
          </div>
          <div className="md:w-1/2 relative mt-8 md:mt-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 shadow-2xl shadow-slate-200/50 bg-slate-50">
              <Image
                src="/assets/hero-1.png"
                alt="NusaLiving AI Dashboard Planning Platform"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 right-0 transform translate-x-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
