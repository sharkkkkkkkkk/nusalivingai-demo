
"use client"

import { notFound, useParams } from "next/navigation"
import { MOCK_PROPERTIES, LIFESTYLE_INSIGHTS } from "@/lib/mock-data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Bed, Bath, Ruler, CheckCircle, MessageSquare, Phone, ArrowLeft, Star, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PropertyDetailPage() {
    const params = useParams()
    const id = params.id as string
    const property = MOCK_PROPERTIES.find(p => p.id === id)

    if (!property) {
        return <div className="min-h-screen flex items-center justify-center">Property Not Found</div>
    }

    // Get insights based on location
    const insightKey = Object.keys(LIFESTYLE_INSIGHTS).find(k =>
        property.location.district.includes(k) || property.location.city.includes(k)
    ) as keyof typeof LIFESTYLE_INSIGHTS | undefined;

    const insight = insightKey ? LIFESTYLE_INSIGHTS[insightKey] : null;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="container mx-auto py-8 px-4">
                <Link href="/explore" className="inline-flex items-center text-slate-500 hover:text-teal-600 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Pencarian
                </Link>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* LEFT COLUMN - IMAGES & MAIN INFO */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery Mock (only Main Image for now) */}
                        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src={property.images[0]}
                                alt={property.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-white/90 text-slate-900 text-sm font-bold shadow-sm backdrop-blur">
                                    {property.type.toUpperCase()}
                                </Badge>
                            </div>
                        </div>

                        {/* Title & Price */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-100 pb-8">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{property.title}</h1>
                                <p className="text-slate-500 flex items-center text-lg">
                                    <MapPin className="w-5 h-5 mr-1 text-teal-600" /> {property.location.address}, {property.location.city}
                                </p>
                            </div>
                            <div className="text-left md:text-right">
                                <p className="text-3xl font-bold text-teal-700">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(property.price)}
                                </p>
                                <p className="text-slate-500 font-medium">/{property.pricePeriod}</p>
                            </div>
                        </div>

                        {/* Key Specs */}
                        <div className="grid grid-cols-3 gap-4 py-6 bg-slate-50 rounded-xl border border-slate-100 p-6">
                            <div className="flex flex-col items-center text-center">
                                <Bed className="w-8 h-8 text-teal-600 mb-2" />
                                <span className="font-bold text-xl text-slate-800">{property.specs.bedrooms}</span>
                                <span className="text-slate-500 text-sm">Kamar Tidur</span>
                            </div>
                            <div className="flex flex-col items-center text-center border-l border-slate-200">
                                <Bath className="w-8 h-8 text-teal-600 mb-2" />
                                <span className="font-bold text-xl text-slate-800">{property.specs.bathrooms}</span>
                                <span className="text-slate-500 text-sm">Kamar Mandi</span>
                            </div>
                            <div className="flex flex-col items-center text-center border-l border-slate-200">
                                <Ruler className="w-8 h-8 text-teal-600 mb-2" />
                                <span className="font-bold text-xl text-slate-800">{property.specs.area} m²</span>
                                <span className="text-slate-500 text-sm">Luas Bangunan</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Tentang Properti</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {property.description}
                            </p>
                        </div>

                        {/* Facilities */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Fasilitas Utama</h2>
                            <div className="flex flex-wrap gap-3">
                                {property.features.map((feature, i) => (
                                    <Badge key={i} variant="outline" className="px-4 py-2 text-sm border-slate-200 bg-slate-50 text-slate-700">
                                        <CheckCircle className="w-3 h-3 mr-2 text-teal-500" /> {feature}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Area Insight */}
                        {insight && (
                            <div className="bg-teal-50 border border-teal-100 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-teal-800 mb-2">Kenapa tinggal di area ini?</h3>
                                <p className="text-teal-700 mb-4 font-medium">{insight.vibe}</p>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <h4 className="font-semibold text-teal-900 mb-1">Highlights:</h4>
                                        <ul className="list-disc list-inside text-teal-700">
                                            {insight.highlights.map(h => <li key={h}>{h}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-teal-900 mb-1">Perhatikan:</h4>
                                        <ul className="list-disc list-inside text-teal-700">
                                            {insight.challenges.map(c => <li key={c}>{c}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN - SCORE & AGENT */}
                    <div className="space-y-6">
                        {/* AI SCORE CARD */}
                        <Card className="border-2 border-teal-100 shadow-xl overflow-hidden bg-white sticky top-24">
                            <CardHeader className="bg-slate-900 text-white pb-6 pt-6">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="fill-yellow-400 text-yellow-400 w-5 h-5" /> AI Housing Score
                                    </CardTitle>
                                    <div className="text-2xl font-bold text-teal-400">
                                        {Math.round((property.scores.affordability + property.scores.access + property.scores.genZFit + property.scores.comfort) / 4)}/100
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6 bg-white">
                                <div className="space-y-4">
                                    {[
                                        { label: "Affordability", value: property.scores.affordability, color: "bg-green-500" },
                                        { label: "Akses & Mobilitas", value: property.scores.access, color: "bg-blue-500" },
                                        { label: "Kenyamanan", value: property.scores.comfort, color: "bg-orange-500" },
                                        { label: "Gen Z Fit", value: property.scores.genZFit, color: "bg-purple-500" },
                                    ].map((metric) => (
                                        <div key={metric.label}>
                                            <div className="flex justify-between text-sm font-medium mb-1.5">
                                                <span className="text-slate-700">{metric.label}</span>
                                                <span className="text-slate-900">{metric.value}%</span>
                                            </div>
                                            <Progress value={metric.value} className={`h-2 [&>div]:${metric.color}`} />
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold h-12">
                                        <Phone className="w-4 h-4 mr-2" /> Hubungi Agen / Owner
                                    </Button>
                                    <Link href={`/chat?context=${encodeURIComponent("Saya tertarik dengan " + property.title + ". Apakah cocok untuk saya?")}`}>
                                        <Button variant="outline" className="w-full border-teal-200 text-teal-700 hover:bg-teal-50 h-12">
                                            <MessageSquare className="w-4 h-4 mr-2" /> Tanya AI Assistant
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" className="w-full">
                                        <Share2 className="w-4 h-4 mr-2" /> Bagikan
                                    </Button>
                                </div>

                                {/* Agent Info */}
                                <div className="flex items-center gap-3 pt-2 bg-slate-50 p-4 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                        <img src={property.agent.avatar} alt="Agent" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{property.agent.name}</p>
                                        <p className="text-xs text-slate-500">Verified Agent</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
