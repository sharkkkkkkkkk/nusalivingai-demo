"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Search, MapPin, Wifi, Car, Home, Filter, Sparkles, Star,
    Train, Building2, User, Share2, PlayCircle, ShieldCheck,
    Armchair, Utensils, Calendar
} from "lucide-react"
import { properties, Property } from "@/lib/property-data"
import Image from "next/image"

export default function FindPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
    const [activeFilter, setActiveFilter] = useState("Terbaru")

    const categories = [
        { name: "Terbaru", icon: Sparkles },
        { name: "Dekat KRL", icon: Train },
        { name: "Apartemen", icon: Building2 },
        { name: "Khusus Putri", icon: User },
        { name: "Promo", icon: Star },
    ]

    const filteredProperties = useMemo(() => {
        return properties.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.location.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesType = selectedType ? p.type === selectedType : true

            // Filter logic simulation based on categories
            let matchesCategory = true;
            if (activeFilter === "Dekat KRL") matchesCategory = p.transport.some(t => t.includes("KRL"));
            if (activeFilter === "Apartemen") matchesCategory = p.type === "Apartment";
            if (activeFilter === "Khusus Putri") matchesCategory = p.gender === "Putri";

            return matchesSearch && matchesType && matchesCategory
        })
    }, [searchTerm, selectedType, activeFilter])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)
    }

    return (
        <main className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <Navbar />

            <div className="flex-1 container mx-auto px-4 py-6 max-w-5xl">

                {/* Hero Section */}
                <div className="mb-8 space-y-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Temukan Hunianmu</h1>
                    <p className="text-muted-foreground">Cari kost coliving atau apartemen sesuai budget & preferensimu</p>

                    {/* Search Bar - Rukita Style */}
                    <div className="bg-white rounded-2xl shadow-sm border p-2 flex items-center gap-2 relative">
                        <div className="flex-1 flex flex-col px-4 py-2 border-r">
                            <label className="text-xs font-bold text-muted-foreground mb-1">Cari hunianmu</label>
                            <input
                                className="outline-none text-sm placeholder:text-gray-400 font-medium"
                                placeholder="Lokasi • Tanggal"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button size="lg" className="rounded-xl px-6 h-12 bg-primary hover:bg-primary/90 text-white shadow-md">
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Quick Categories */}
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => {
                                    setActiveFilter(cat.name)
                                    if (cat.name === 'Apartemen') setSelectedType('Apartment')
                                    else setSelectedType(null)
                                }}
                                className={`flex flex-col items-center gap-2 min-w-[70px] p-2 rounded-xl transition-all
                                    ${activeFilter === cat.name ? 'text-primary scale-105 font-semibold' : 'text-gray-500 hover:text-gray-900'}
                                `}
                            >
                                <div className={`p-3 rounded-2xl ${activeFilter === cat.name ? 'bg-primary/10' : 'bg-white border'}`}>
                                    <cat.icon className="h-6 w-6" />
                                </div>
                                <span className="text-xs whitespace-nowrap">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Property Grid */}
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    {filteredProperties.length} Pilihan Hunian
                    <span className="text-sm font-normal text-muted-foreground border-l pl-2 ml-2">Area {searchTerm || "Jakarta & Bandung"}</span>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                        <Card key={property.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white rounded-2xl cursor-pointer" onClick={() => setSelectedProperty(property)}>
                            <div className="relative h-60 w-full overflow-hidden">
                                <Image
                                    src={property.image}
                                    alt={property.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />

                                <div className="absolute top-3 left-3 flex gap-2">
                                    {property.managedBy === "NusaLiving" && (
                                        <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-emerald-700 flex items-center gap-1 shadow-sm uppercase tracking-wide">
                                            <ShieldCheck className="h-3 w-3" /> Managed by NusaLiving
                                        </div>
                                    )}
                                </div>

                                {property.isVideoAvailable && (
                                    <div className="absolute center inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-white/30 backdrop-blur rounded-full p-3">
                                            <PlayCircle className="h-10 w-10 text-white fill-white/20" />
                                        </div>
                                    </div>
                                )}

                                <div className="absolute bottom-3 left-3 text-white">
                                    <p className="text-xs font-medium bg-black/40 px-2 py-0.5 rounded-md inline-block mb-1 border border-white/20">
                                        {property.type} • {property.gender}
                                    </p>
                                    <p className="font-bold text-lg drop-shadow-md">
                                        {formatPrice(property.price)} <span className="text-xs font-normal opacity-90">/ bln</span>
                                    </p>
                                </div>
                            </div>

                            <CardContent className="p-4 space-y-3">
                                <div>
                                    <CardTitle className="text-base font-bold line-clamp-1 group-hover:text-primary transition-colors">
                                        {property.name}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-1 mt-1 text-xs">
                                        <MapPin className="h-3 w-3 shrink-0" />
                                        {property.location}
                                    </CardDescription>
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    {property.tags.slice(0, 2).map((tag, i) => (
                                        <Badge key={i} variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 border-0">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {property.transport.length > 0 && (
                                        <Badge variant="outline" className="text-[10px] border-emerald-200 text-emerald-700 bg-emerald-50">
                                            {property.transport[0]}
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Detail Dialog - Rukita Style */}
                <Dialog open={!!selectedProperty} onOpenChange={(open) => !open && setSelectedProperty(null)}>
                    <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white rounded-3xl gap-0">
                        {selectedProperty && (
                            <div className="flex flex-col md:flex-row h-[90vh] md:h-auto overflow-y-auto md:overflow-visible">
                                {/* Left Side: Images */}
                                <div className="w-full md:w-[55%] relative h-[300px] md:h-auto bg-gray-100">
                                    <Image
                                        src={selectedProperty.image}
                                        alt={selectedProperty.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-4 right-4">
                                        <Button size="sm" variant="secondary" className="backdrop-blur-md bg-white/80 hover:bg-white text-xs gap-2 shadow-sm">
                                            <Share2 className="h-3 w-3" /> Bagikan
                                        </Button>
                                    </div>
                                    <Button size="sm" variant="secondary" className="absolute bottom-4 left-4 backdrop-blur-md bg-white/80 hover:bg-white text-xs gap-2 shadow-sm">
                                        Lihat Foto Lengkap
                                    </Button>
                                </div>

                                {/* Right Side: Info */}
                                <div className="flex-1 flex flex-col">
                                    <ScrollArea className="flex-1 p-6">
                                        <div className="space-y-6">
                                            {/* Header */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="outline" className="text-xs uppercase tracking-wider">{selectedProperty.type}</Badge>
                                                    <span className="text-xs text-muted-foreground">• {selectedProperty.gender}</span>
                                                </div>
                                                <h2 className="text-2xl font-bold leading-tight mb-1">{selectedProperty.name}</h2>
                                                <p className="text-muted-foreground text-sm flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" /> {selectedProperty.location}
                                                </p>
                                            </div>

                                            {/* Managed By */}
                                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                                    <ShieldCheck className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-muted-foreground">Dikelola oleh</p>
                                                    <p className="font-bold text-sm text-slate-900">{selectedProperty.managedBy}</p>
                                                </div>
                                            </div>

                                            {/* Facilities */}
                                            <div>
                                                <h3 className="font-bold text-sm mb-3">Fasilitas Bersama</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {selectedProperty.features.map((f, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                                            {f.includes("WiFi") ? <Wifi className="h-4 w-4 text-gray-400" /> :
                                                                f.includes("Parkir") ? <Car className="h-4 w-4 text-gray-400" /> :
                                                                    f.includes("Kitchen") || f.includes("Dapur") ? <Utensils className="h-4 w-4 text-gray-400" /> :
                                                                        <Armchair className="h-4 w-4 text-gray-400" />
                                                            }
                                                            {f}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Transport */}
                                            {selectedProperty.transport.length > 0 && (
                                                <div>
                                                    <h3 className="font-bold text-sm mb-2">Akses Transportasi</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedProperty.transport.map((t, i) => (
                                                            <div key={i} className="flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md">
                                                                <Train className="h-3 w-3" /> {t}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </ScrollArea>

                                    {/* Action Bar */}
                                    <div className="p-4 border-t flex items-center gap-4 bg-white">
                                        <div className="flex-1">
                                            <p className="text-xs text-muted-foreground">Mulai dari</p>
                                            <p className="text-lg font-bold text-primary">{formatPrice(selectedProperty.price)}</p>
                                        </div>
                                        <Button variant="outline" className="flex flex-col h-auto py-2 text-xs gap-1 border-primary text-primary hover:bg-primary/5">
                                            <Calendar className="h-4 w-4" /> Kunjungan
                                        </Button>
                                        <Button className="px-6 font-bold shadow-lg shadow-emerald-200">
                                            Ajukan Sewa
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {filteredProperties.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <Home className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>Tidak ada hunian yang cocok dengan filter saat ini.</p>
                        <Button variant="link" onClick={() => { setSearchTerm(""); setSelectedType(null); setActiveFilter("Terbaru") }}>Reset semua filter</Button>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    )
}
