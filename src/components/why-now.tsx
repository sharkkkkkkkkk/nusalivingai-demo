import Image from "next/image"
import { CheckCircle } from "lucide-react"

export function WhyNow() {
    const reasons = [
        "Bidang hunian semakin terdorong oleh teknologi digital",
        "Modular housing semakin diterima pasar",
        "Harga rumah terus meningkat setiap tahun",
        "Gen Z membutuhkan hunian yang ringkas, cerdas, dan efisien"
    ]

    return (
        <section className="py-20 bg-slate-50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Mengapa Sekarang?</h2>
                        <div className="space-y-4">
                            {reasons.map((reason, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                                    <p className="text-lg text-muted-foreground">{reason}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm bg-background border">
                            <Image
                                src="/images/whynow.png"
                                alt="Housing Evolution Timeline"
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
