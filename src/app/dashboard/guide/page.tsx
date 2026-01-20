"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Sun, Wind, Droplets, Zap } from "lucide-react"

export default function GuidePage() {
    const guides = [
        {
            title: "Prinsip Rumah Sehat",
            description: "Panduan dasar sirkulasi udara dan pencahayaan alami.",
            icon: Wind,
            color: "text-blue-500",
            bg: "bg-blue-50",
            image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
            tips: ["Pastikan ventilasi silang (Cross Ventilation) di ruang utama.", "Rasio jendela minimal 10% dari luas lantai.", "Gunakan cat dinding bebas VOC/Timbal."]
        },
        {
            title: "Efisiensi Energi",
            description: "Strategi hemat listrik untuk hunian modern.",
            icon: Zap,
            color: "text-yellow-500",
            bg: "bg-yellow-50",
            image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=400&q=80",
            tips: ["Gunakan lampu LED di seluruh ruangan.", "Pasang panel surya jika memungkinkan.", "Pilih peralatan elektronik 4-5 bintang energi."]
        },
        {
            title: "Material Berkelanjutan",
            description: "Memilih bahan bangunan yang ramah lingkungan.",
            icon: Leaf,
            color: "text-green-500",
            bg: "bg-green-50",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80",
            tips: ["Gunakan bata ringan (Hebel) pengganti bata merah bakar.", "Pilih kayu bersertifikat FSC legal.", "Manfaatkan material daur ulang untuk non-struktural."]
        },
        {
            title: "Konservasi Air",
            description: "Sistem pengelolaan air bersih dan kotor.",
            icon: Droplets,
            color: "text-cyan-500",
            bg: "bg-cyan-50",
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80",
            tips: ["Gunakan kran hemat air (aerator).", "Buat sumur resapan biopori di halaman.", "Panen air hujan untuk menyiram tanaman."]
        }
    ]

    return (
        <div className="space-y-8">
            <div className="max-w-4xl">
                <h1 className="text-3xl font-bold tracking-tight">Panduan Hunian Sehat & Berkelanjutan</h1>
                <p className="text-muted-foreground mt-2">Kumpulan tips praktis untuk mewujudkan rumah impian yang ramah lingkungan.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {guides.map((guide, index) => (
                    <Card key={index} className="overflow-hidden border-l-4 group" style={{ borderLeftColor: 'var(--primary)' }}>
                        <div className="h-40 overflow-hidden relative">
                            <img src={guide.image} alt={guide.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className={`absolute bottom-4 left-4 p-2 rounded-lg ${guide.bg} shadow-lg backdrop-blur-sm bg-opacity-90`}>
                                <guide.icon className={`w-6 h-6 ${guide.color}`} />
                            </div>
                        </div>
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div>
                                <CardTitle className="text-lg">{guide.title}</CardTitle>
                                <CardDescription>{guide.description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                <Sun className="w-4 h-4 text-orange-400" />
                                Tips Penerapan:
                            </h4>
                            <ul className="space-y-2">
                                {guide.tips.map((tip, i) => (
                                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                        <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] shrink-0 border-slate-300 bg-slate-50">
                                            {i + 1}
                                        </Badge>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
