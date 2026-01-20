"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Filter, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function CatalogPage() {
    const products = [
        { id: 1, name: "Batu Bata Merah Jumbo", price: "Rp 800/pcs", category: "Struktur", image: "/images/catalog/bricks.jpg", stock: "Ready" },
        { id: 2, name: "Pasir Bangunan Halus", price: "Rp 250.000/m³", category: "Material Dasar", image: "/images/catalog/sand.jpg", stock: "Ready" },
        { id: 3, name: "Semen Padang 50kg", price: "Rp 65.000/sak", category: "Material Dasar", image: "/images/catalog/cement.jpg", stock: "Ready" },
        { id: 4, name: "Kaca Tempered 8mm", price: "Rp 450.000/m²", category: "Kusen & Kaca", image: "/images/catalog/glass.jpg", stock: "Pre-order" },
        { id: 5, name: "Kusen Aluminium Silver", price: "Rp 120.000/m", category: "Kusen & Kaca", image: "/images/catalog/aluminium.jpg", stock: "Ready" },
        { id: 6, name: "Panel Surya 450W Monocrystalline", price: "Rp 2.500.000/unit", category: "Energi & IoT", image: "/images/catalog/solar_panel.jpg", stock: "Available" },
        { id: 7, name: "Smart Door Lock CCTV", price: "Rp 1.800.000/unit", category: "Energi & IoT", image: "/images/catalog/smart_lock.jpg", stock: "Ready" },
        { id: 8, name: "Bata Ringan Hebel (AAC)", price: "Rp 650.000/m³", category: "Struktur", image: "/images/catalog/hebel.jpg", stock: "Low Stock" },
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Material Catalog</h1>
                    <p className="text-muted-foreground">Katalog material modular dan berkelanjutan terstandarisasi.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Cart (0)
                    </Button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Cari material (semen, bata, panel...)" className="pl-10" />
                </div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div className="aspect-square bg-slate-100 relative overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <Badge className="absolute top-2 right-2 bg-white/90 text-slate-800 hover:bg-white border-none shadow-sm">{product.stock}</Badge>
                        </div>
                        <CardContent className="p-4">
                            <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
                            <CardTitle className="text-base line-clamp-1 mb-2">{product.name}</CardTitle>
                            <div className="font-bold text-lg text-primary">{product.price}</div>
                            <Button className="w-full mt-4" size="sm">Tambah ke Proyek</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
