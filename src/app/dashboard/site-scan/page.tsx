"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, MapPin, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SiteScanPage() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleScan = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simulate AI delay
        setTimeout(() => {
            setLoading(false)
            setResult({
                zone: "Zona Kuning (Perumahan Kepadatan Rendah)",
                risk: "Rendah",
                access: "Baik",
                price: "Rp 3.500.000",
                soil: "Tanah Liat Berpasir (Stabil)",
                permit: "Dapat Dibangun (IMB/PBG Ready)"
            })
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">AI Site Scan</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Analisis Lokasi Cerdas</CardTitle>
                        <CardDescription>Masukkan alamat atau koordinat lokasi lahan yang ingin Anda analisis.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleScan} className="flex gap-4">
                            <div className="relative flex-1">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Contoh: Jl. Kaliurang Km 10, Yogyakarta" className="pl-10" required />
                            </div>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Scanning..." : "Scan Lokasi"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {result && (
                    <div className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="border-teal-200 bg-teal-50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-teal-600" />
                                    Kelayakan Lahan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-teal-700">92%</div>
                                <p className="text-sm text-teal-600">Sangat Disarankan untuk Hunian</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-blue-600" />
                                    Estimasi Harga Tanah
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900">{result.price}<span className="text-base font-normal text-muted-foreground">/m²</span></div>
                                <p className="text-sm text-green-600">+5% dari rata-rata daerah</p>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Analisis Detail</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <span className="text-sm text-muted-foreground">Zona Tata Ruang</span>
                                    <div className="font-medium">{result.zone}</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm text-muted-foreground">Risiko Bencana (Banjir/Longsor)</span>
                                    <div className="font-medium flex items-center gap-2">
                                        {result.risk}
                                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Aman</Badge>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm text-muted-foreground">Kondisi Tanah</span>
                                    <div className="font-medium">{result.soil}</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm text-muted-foreground">Aksesibilitas</span>
                                    <div className="font-medium">{result.access}</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
