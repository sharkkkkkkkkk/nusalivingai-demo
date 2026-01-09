import Image from "next/image"

export function SolutionOverview() {
    return (
        <section className="py-20 md:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="space-y-4 max-w-4xl">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Satu Platform, Banyak Keputusan Penting
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            NusaLiving AI adalah platform perencanaan hunian berbasis AI yang membantu pengguna mengambil keputusan sejak tahap awal—mulai dari analisis lokasi, rekomendasi desain, hingga kesiapan pembiayaan.
                        </p>
                    </div>

                    <div className="w-full max-w-5xl mt-12">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-card shadow-sm">
                            <Image
                                src="/images/solution.png"
                                alt="Solution Diagram Flow"
                                fill
                                className="object-contain p-8"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
