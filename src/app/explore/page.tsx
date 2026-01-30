
"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MOCK_PROPERTIES, LIFESTYLE_INSIGHTS } from "@/lib/mock-data"
import { Property, UserPreferences } from "@/lib/types"
import { calculateScores } from "@/lib/utils-app"
import { MapPin, Search, Filter, Star, Info, ChevronDown, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function ExplorePage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredProperties, setFilteredProperties] = useState<Property[]>(MOCK_PROPERTIES)
    const [selectedInsight, setSelectedInsight] = useState<keyof typeof LIFESTYLE_INSIGHTS | null>(null)
    const [userPrefs, setUserPrefs] = useState<UserPreferences>({})
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Apply scores whenever prefs change or list updates
    const applyScores = (properties: Property[]) => {
        if (!userPrefs.income && !userPrefs.workLocation) return properties;

        return properties.map(p => ({
            ...p,
            scores: calculateScores(p, userPrefs)
        })).sort((a, b) => {
            // Sort by Smart Score (Average of all scores)
            const scoreA = (a.scores.affordability + a.scores.access + a.scores.genZFit + a.scores.comfort) / 4;
            const scoreB = (b.scores.affordability + b.scores.access + b.scores.genZFit + b.scores.comfort) / 4;
            return scoreB - scoreA;
        });
    }

    const handleSearch = () => {
        const lower = searchTerm.toLowerCase()
        const results = MOCK_PROPERTIES.filter(p =>
            p.title.toLowerCase().includes(lower) ||
            p.location.city.toLowerCase().includes(lower) ||
            p.location.district.toLowerCase().includes(lower) ||
            p.features.some(f => f.toLowerCase().includes(lower))
        )
        // Apply smart scoring to results
        const scoredResults = applyScores(results);
        setFilteredProperties(scoredResults)

        // Simple heuristic to show insight
        if (lower.includes("bsd")) setSelectedInsight("BSD");
        else if (lower.includes("selatan") || lower.includes("jaksel")) setSelectedInsight("Jakarta Selatan");
        else if (lower.includes("depok")) setSelectedInsight("Depok");
        else if (lower.includes("bandung")) setSelectedInsight("Bandung");
        else setSelectedInsight(null);
    }

    useEffect(() => {
        // Re-score when prefs change
        setFilteredProperties(prev => applyScores([...prev]));
    }, [userPrefs]);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* SEARCH HEADER */}
            <div className="bg-slate-900 py-12 px-4 transition-all duration-500 ease-in-out">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Temukan Hunian Impianmu
                    </h1>
                    <div className="bg-white p-2 rounded-xl shadow-2xl space-y-2">
                        <div className="flex gap-2">
                            <Input
                                className="border-0 shadow-none focus-visible:ring-0 text-lg flex-1"
                                placeholder="Cari: 'Apartemen dekat MRT' atau 'Rumah di BSD'"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <Button size="lg" className="bg-teal-600 hover:bg-teal-700" onClick={handleSearch}>
                                <Search className="mr-2 h-5 w-5" /> Cari
                            </Button>
                        </div>
                    </div>

                    {/* SMART FILTER SECTION */}
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-sm gap-2">
                                    <Filter className="w-4 h-4" />
                                    {userPrefs.income || userPrefs.workLocation ? "Filter Aktif" : "Smart Filter"}
                                    {(userPrefs.income || userPrefs.workLocation) && <span className="bg-teal-500 w-2 h-2 rounded-full" />}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Personalisasi Pencarianmu</DialogTitle>
                                    <DialogDescription>
                                        Isi preferensi ini agar AI bisa menghitung skor kecocokan hunian (Affordability & Access) khusus untukmu.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label>Pendapatan Bulanan (IDR)</Label>
                                        <Input
                                            type="number"
                                            placeholder="Contoh: 10000000"
                                            value={userPrefs.income || ''}
                                            onChange={(e) => setUserPrefs(prev => ({ ...prev, income: Number(e.target.value) }))}
                                        />
                                        <p className="text-xs text-slate-500">Digunakan untuk menghitung Affordability Score (Housing &lt; 30% Income).</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Lokasi Kantor / Kampus</Label>
                                        <Input
                                            placeholder="Contoh: SCBD, Sudirman, atau Depok"
                                            value={userPrefs.workLocation || ''}
                                            onChange={(e) => setUserPrefs(prev => ({ ...prev, workLocation: e.target.value }))}
                                        />
                                        <p className="text-xs text-slate-500">Digunakan untuk menghitung Access Score.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Moda Transportasi Utama</Label>
                                        <div className="flex gap-2">
                                            <Button
                                                variant={userPrefs.transportMode === 'public' ? 'default' : 'outline'}
                                                onClick={() => setUserPrefs(prev => ({ ...prev, transportMode: 'public' }))}
                                                className="flex-1"
                                            >
                                                Transport Publik
                                            </Button>
                                            <Button
                                                variant={userPrefs.transportMode === 'private' ? 'default' : 'outline'}
                                                onClick={() => setUserPrefs(prev => ({ ...prev, transportMode: 'private' }))}
                                                className="flex-1"
                                            >
                                                Kendaraan Pribadi
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={() => { setIsFilterOpen(false); handleSearch(); }}>
                                    Terapkan Filter & Hitung Skor
                                </Button>
                            </DialogContent>
                        </Dialog>

                        {/* Quick Filters */}
                        {['< 500 Juta', 'Sewa Bulanan', 'Dekat MRT', 'Gen Z Friendly', 'Rumah Tumbuh'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setSearchTerm(filter)}
                                className="px-4 py-1.5 rounded-full bg-white/10 text-slate-300 border border-white/20 text-sm hover:bg-white/20 hover:text-white transition-colors backdrop-blur-sm"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="container mx-auto py-10 px-4">
                {/* LIFESTYLE INSIGHT BANNER */}
                {selectedInsight && LIFESTYLE_INSIGHTS[selectedInsight] && (
                    <div className="mb-10 bg-teal-50 border border-teal-100 rounded-xl p-6 flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-top-4">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-teal-800 flex items-center gap-2">
                                <Info className="h-5 w-5" /> Insight Kawasan: {selectedInsight}
                            </h3>
                            <p className="text-teal-600 mt-2">{LIFESTYLE_INSIGHTS[selectedInsight].vibe}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {LIFESTYLE_INSIGHTS[selectedInsight].highlights.map((h, i) => (
                                    <Badge key={i} variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">{h}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/3 border-l pl-6 border-teal-200">
                            <p className="text-sm font-semibold text-slate-700 mb-2">Crowd:</p>
                            <p className="text-sm text-slate-600 mb-4">{LIFESTYLE_INSIGHTS[selectedInsight].crowd}</p>
                            <p className="text-sm font-semibold text-slate-700 mb-2">Tantangan:</p>
                            <ul className="text-sm text-slate-600 list-disc pl-4">
                                {LIFESTYLE_INSIGHTS[selectedInsight].challenges.map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* PROPERTY GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map(property => (
                        <Card key={property.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-slate-200">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                                    {property.type.toUpperCase()}
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                    <div className="bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded flex-1 text-center">
                                        Affordability: <span className="text-green-400 font-bold">{property.scores.affordability}%</span>
                                    </div>
                                    <div className="bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded flex-1 text-center">
                                        Gen Z Fit: <span className="text-purple-400 font-bold">{property.scores.genZFit}%</span>
                                    </div>
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-600 transition-colors">{property.title}</h3>
                                        <p className="text-slate-500 text-sm flex items-center mt-1">
                                            <MapPin className="w-3 h-3 mr-1" /> {property.location.district}, {property.location.city}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-slate-900">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(property.price)}
                                        </p>
                                        <p className="text-xs text-slate-500">/{property.pricePeriod}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-4 text-sm text-slate-600 mb-4 border-b border-slate-100 pb-4">
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold">{property.specs.bedrooms}</span> KT
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold">{property.specs.bathrooms}</span> KM
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold">{property.specs.area}</span> m²
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium text-slate-500">
                                        <span>Mobilitas Score</span>
                                        <span>{property.scores.access}/100</span>
                                    </div>
                                    <Progress value={property.scores.access} className="h-1.5" />
                                </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50 border-t items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                                        <img src={property.agent.avatar} alt="Agent" />
                                    </div>
                                    <span className="text-xs font-medium text-slate-600">{property.agent.name}</span>
                                </div>
                                <Link href={`/explore/${property.id}`} className="w-full sm:w-auto">
                                    <Button size="sm" variant="outline" className="text-xs hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200">
                                        Lihat Detail
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}
