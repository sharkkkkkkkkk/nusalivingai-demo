import Image from "next/image"
import { Check } from "lucide-react"

export function FinancingAlignment() {
    const benefits = [
        "Kesesuaian dengan Program KPR & FLPP",
        "Analisis Kelayakan Kredit Awal",
        "Dokumen Teknis untuk Pengajuan Pembiayaan",
        "Dukungan untuk Pembiayaan Hijau (Green Financing)"
    ]

    return (
        <section className="py-20 bg-background border-y">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
                            Dirancang untuk Mendukung Ekosistem Pembiayaan Perumahan
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            NusaLiving AI dirancang untuk mendukung kebutuhan perencanaan hunian yang selaras dengan ekosistem pembiayaan perumahan nasional, termasuk KPR, FLPP, dan pembiayaan hijau.
                        </p>
                        <ul className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="flex bg-green-100 text-green-600 rounded-full p-1">
                                        <Check className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 relative w-full aspect-[16/10] bg-slate-50 rounded-xl overflow-hidden border">
                        <Image
                            src="/images/financing.png"
                            alt="Financing & Housing Alignment"
                            fill
                            className="object-cover p-8 md:p-12 hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
