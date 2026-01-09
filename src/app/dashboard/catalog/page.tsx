"use client"

import Link from "next/link"
import { ArrowLeft, ShoppingCart, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CatalogPage() {
    const products = [
        {
            id: 1,
            name: "Modul Kamar Utama A1",
            category: "Room Module",
            price: "Rp 15.000.000",
            image: "bg-slate-200",
            features: ["3x3 Meter", "Jendela UPVC", "Installasi Listrik"]
        },
        {
            id: 2,
            name: "Modul Kamar Mandi Kering",
            category: "Sanitary",
            price: "Rp 8.500.000",
            image: "bg-blue-100",
            features: ["1.5x2 Meter", "Closet Duduk", "Shower Set"]
        },
        {
            id: 3,
            name: "Paket Struktur Baja Ringan T36",
            category: "Structure",
            price: "Rp 25.000.000",
            image: "bg-slate-300",
            features: ["Rangka Atap", "Kolom Praktis", "Garansi 10 Th"]
        },
        {
            id: 4,
            name: "Panel Dinding EPS (Per m²)",
            category: "Material",
            price: "Rp 450.000",
            image: "bg-orange-100",
            features: ["Tahan Panas", "Kedap Suara", "Pemasangan Cepat"]
        },
        {
            id: 5,
            name: "Modul Dapur Compact",
            category: "Room Module",
            price: "Rp 12.000.000",
            image: "bg-green-100",
            features: ["Meja Beton", "Sink Stainless", "Upper Cabinet"]
        },
        {
            id: 6,
            name: "Smart Door Lock System",
            category: "IoT Device",
            price: "Rp 2.500.000",
            image: "bg-slate-800",
            features: ["Fingerprint", "App Control", "Battery Backup"]
        },
    ]

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Katalog Modular</h1>
                    <Button variant="outline" className="gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        <span className="hidden sm:inline">Keranjang (0)</span>
                    </Button>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4">
                    <Button variant="default" size="sm" className="rounded-full">Semua</Button>
                    <Button variant="secondary" size="sm" className="rounded-full">Room Modules</Button>
                    <Button variant="secondary" size="sm" className="rounded-full">Struktur</Button>
                    <Button variant="secondary" size="sm" className="rounded-full">Sanitary</Button>
                    <Button variant="secondary" size="sm" className="rounded-full">IoT</Button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className={`aspect-video w-full ${product.image} flex items-center justify-center text-muted-foreground/50`}>
                                <div className="text-4xl font-black opacity-10">IMG</div>
                            </div>
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                                </div>
                                <CardTitle className="text-lg">{product.name}</CardTitle>
                                <div className="text-xl font-bold text-primary mt-1">{product.price}</div>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm text-slate-500 space-y-1">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full gap-2 group">
                                    <Plus className="h-4 w-4 group-hover:scale-125 transition-transform" />
                                    Tambah ke Rencana
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
