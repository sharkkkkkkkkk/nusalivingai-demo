"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Layout, ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function GalleryPage() {
    const { t } = useLanguage()
    const homes = [
        {
            id: 1,
            name: "Eco-Modular Type 36",
            type: "Modular",
            price: "Rp 145.000.000",
            image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
            specs: { beds: 2, baths: 1, area: "36m²" },
            tags: ["Cepat Bangun", "Hemat Energi"]
        },
        {
            id: 2,
            name: "Villa Tropical Modern",
            type: "Konvensional",
            price: "Rp 350.000.000",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            specs: { beds: 3, baths: 2, area: "75m²" },
            tags: ["Natural Light", "Sustainable Material"]
        },
        {
            id: 3,
            name: "Smart Tiny House",
            type: "Modular",
            price: "Rp 95.000.000",
            image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
            specs: { beds: 1, baths: 1, area: "24m²" },
            tags: ["IoT Integrated", "Compact"]
        },
        {
            id: 4,
            name: "Family Residence 45",
            type: "Hybrid",
            price: "Rp 210.000.000",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
            specs: { beds: 2, baths: 1, area: "45m²" },
            tags: ["Tahan Gempa", "Bata Interlock"]
        },
        {
            id: 5,
            name: "Urban Loft Industrial",
            type: "Renovasi",
            price: "Rp 275.000.000",
            image: "https://images.unsplash.com/photo-1600566752355-35792bedcfe1?auto=format&fit=crop&w=800&q=80",
            specs: { beds: 2, baths: 2, area: "60m²" },
            tags: ["Open Plan", "Upcycled Material"]
        },
        {
            id: 6,
            name: "Rumah Tumbuh Sederhana",
            type: "Konvensional",
            price: "Rp 120.000.000",
            image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef2cf?auto=format&fit=crop&w=800&q=80",
            specs: { beds: 1, baths: 1, area: "30m²" },
            tags: ["Expandable", "Budget Friendly"]
        }
    ]

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t("gallery.title")}</h1>
                    <p className="text-muted-foreground mt-2">{t("gallery.subtitle")}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {homes.map((home) => (
                    <Card key={home.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-none shadow-sm ring-1 ring-slate-200">
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <img
                                src={home.image}
                                alt={home.name}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 flex flex-col gap-2">
                                <Badge className="bg-white/90 text-slate-900 hover:bg-white border-0 shadow-sm backdrop-blur-sm self-end">
                                    {home.type}
                                </Badge>
                            </div>
                        </div>
                        <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg line-clamp-1">{home.name}</CardTitle>
                            </div>
                            <div className="text-xl font-bold text-primary mt-1">{home.price}</div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                            <div className="flex gap-4 text-sm text-slate-600 mb-4">
                                <div className="flex items-center gap-1">
                                    <Bed className="w-4 h-4" />
                                    <span>{home.specs.beds} Beds</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Bath className="w-4 h-4" />
                                    <span>{home.specs.baths} Baths</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Layout className="w-4 h-4" />
                                    <span>{home.specs.area}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {home.tags.map((tag, i) => (
                                    <span key={i} className="text-[10px] bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button className="w-full gap-2" variant="outline">
                                {t("gallery.viewDetail")} <ArrowRight className="w-4 h-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
