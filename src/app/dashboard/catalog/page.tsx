"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Filter, ShoppingCart, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/context/language-context"

export default function CatalogPage() {
    const [cartCount, setCartCount] = useState(0)
    const { toast, toasts } = useToast()
    const { t } = useLanguage()

    const products = [
        { id: 1, name: "Batu Bata Merah Jumbo", price: "Rp 800/pcs", category: "Struktur", image: "/images/catalog/bricks.jpg", stock: "Ready" },
        { id: 2, name: "Pasir Bangunan Halus", price: "Rp 250.000/m³", category: "Material Dasar", image: "/images/catalog/sand.jpg", stock: "Ready" },
        { id: 3, name: "Semen Portland 50kg", price: "Rp 65.000/sak", category: "Material Dasar", image: "/images/catalog/cement.jpg", stock: "Ready" },
        { id: 4, name: "Kaca Tempered 8mm", price: "Rp 450.000/m²", category: "Kusen & Kaca", image: "/images/catalog/glass.jpg", stock: "Pre-order" },
        { id: 5, name: "Kusen Aluminium Silver", price: "Rp 120.000/m", category: "Kusen & Kaca", image: "/images/catalog/aluminium.jpg", stock: "Ready" },
        { id: 6, name: "Panel Surya 450W", price: "Rp 2.500.000/unit", category: "Energi & IoT", image: "/images/catalog/solar_panel.jpg", stock: "Available" },
        { id: 7, name: "Smart Door Lock CCTV", price: "Rp 1.800.000/unit", category: "Energi & IoT", image: "/images/catalog/smart_lock.jpg", stock: "Ready" },
        { id: 8, name: "Bata Ringan Hebel", price: "Rp 650.000/m³", category: "Struktur", image: "/images/catalog/hebel.jpg", stock: "Low Stock" },
    ]

    const handleAddToCart = (productName: string) => {
        setCartCount(prev => prev + 1)
        toast({
            title: t("catalog.added"),
            description: `${productName} ${t("catalog.addedDesc")}`,
            duration: 2000,
        })
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t("catalog.title")}</h1>
                    <p className="text-muted-foreground">{t("catalog.subtitle")}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="relative">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {t("catalog.cart")} ({cartCount})
                        {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">{cartCount}</span>}
                    </Button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder={t("catalog.search")} className="pl-10" />
                </div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    {t("catalog.filter")}
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
                            <Button className="w-full mt-4 gap-2" size="sm" onClick={() => handleAddToCart(product.name)}>
                                <Plus className="w-4 h-4" />
                                {t("catalog.addToProject")}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map((t) => (
                    <div key={t.id} className="bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right fade-in duration-300">
                        <div className="bg-green-500 rounded-full p-1">
                            <Plus className="w-3 h-3 text-white" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">{t.title}</h4>
                            <p className="text-xs opacity-90">{t.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
