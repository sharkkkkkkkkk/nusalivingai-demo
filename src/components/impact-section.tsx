import Image from "next/image"
import { Users, Building2, Leaf } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ImpactSection() {
    const impacts = [
        {
            title: "Untuk Masyarakat",
            items: [
                "Proses perencanaan hunian lebih cepat dan terukur",
                "Potensi penghematan biaya awal pembangunan"
            ],
            icon: Users,
            color: "text-blue-400"
        },
        {
            title: "Untuk Ekosistem",
            items: [
                "Digitalisasi tukang & arsitek lokal",
                "Developer kecil lebih siap pembiayaan"
            ],
            icon: Building2,
            color: "text-yellow-400"
        },
        {
            title: "Untuk Keberlanjutan",
            items: [
                "Efisiensi energi & material",
                "Mendukung SDGs dan pembangunan hunian berkelanjutan"
            ],
            icon: Leaf,
            color: "text-green-400"
        },
    ]

    return (
        <section className="py-20 md:py-32 bg-slate-900 text-slate-50 relative overflow-hidden">
            {/* Background illustration overlay */}
            <div className="absolute inset-0 z-0 opacity-10">
                <Image
                    src="/images/impact.png"
                    alt="Community Impact"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-slate-900/90 z-0" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-white">
                        Nilai & Dampak Nyata
                    </h2>
                    <p className="max-w-2xl mx-auto text-slate-300 text-lg">
                        Kami membangun dampak positif bagi seluruh pemangku kepentingan dalam ekosistem perumahan.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {impacts.map((impact, index) => (
                        <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 text-slate-100">
                            <CardHeader>
                                <div className={`mb-4 ${impact.color}`}>
                                    <impact.icon className="h-10 w-10" />
                                </div>
                                <CardTitle className="text-xl">{impact.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {impact.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-500 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
