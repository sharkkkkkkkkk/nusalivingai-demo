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
                        <div className="relative w-full overflow-hidden rounded-xl border bg-card shadow-sm grid md:grid-cols-2 gap-0">
                            <div className="relative aspect-square md:aspect-auto h-[400px]">
                                <Image
                                    src="/images/platform.png"
                                    alt="Analytics Solution"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/20 flex flex-col justify-end p-8 text-white">
                                    <h3 className="text-2xl font-bold mb-2">Data-Driven Planning</h3>
                                    <p className="text-sm opacity-90">Keputusan berbasis data real-time untuk akurasi maksimal.</p>
                                </div>
                            </div>
                            <div className="relative aspect-square md:aspect-auto h-[400px]">
                                <Image
                                    src="/images/icons.png"
                                    alt="Eco Living Solution"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-slate-900/80 to-transparent flex flex-col justify-end p-8 text-white items-end text-right">
                                    <h3 className="text-2xl font-bold mb-2">Eco-Living Ecosystem</h3>
                                    <p className="text-sm opacity-90">Terintegrasi dengan material berkelanjutan dan energi hijau.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
