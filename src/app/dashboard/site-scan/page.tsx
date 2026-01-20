"use client"
import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { MapPin, CheckCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Info } from "lucide-react"

// Dynamically import the map component to avoid SSR issues with Leaflet
const RiskAnalysisMap = dynamic(
    () => import("@/components/risk-analysis-map"),
    {
        loading: () => <div className="h-[500px] w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400">Loading Map...</div>,
        ssr: false
    }
)

export default function SiteScanPage() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [locationDetails, setLocationDetails] = useState<any>(null)
    const [addressInput, setAddressInput] = useState("")

    const handleLocationSelect = (details: any) => {
        setLocationDetails(details)
        setAddressInput(details.address)
        // Auto-scan or wait for user? Let's just update the input first.
    }

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
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">AI Site Scan</h1>
                        <p className="text-slate-500">Analisis kelayakan lokasi lahan dengan teknologi AI & data geospasial.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Map & Input */}
                    <div className="lg:col-span-2 space-y-6">
                        <Tabs defaultValue="map" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="map">Analisis Peta</TabsTrigger>
                                <TabsTrigger value="photo">Upload Foto Lokasi</TabsTrigger>
                            </TabsList>
                            <TabsContent value="map">
                                <Card className="overflow-hidden border-slate-200 shadow-sm">
                                    <CardHeader className="bg-white border-b border-slate-100">
                                        <CardTitle className="text-lg">Pilih Lokasi Lahan</CardTitle>
                                        <CardDescription>Klik pada peta untuk menentukan lokasi yang ingin dianalisis.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <RiskAnalysisMap onLocationSelect={handleLocationSelect} />
                                    </CardContent>
                                </Card>
                                <Card className="mt-6">
                                    <CardContent className="pt-6">
                                        <form onSubmit={handleScan} className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Alamat Lengkap</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        value={addressInput}
                                                        onChange={(e) => setAddressInput(e.target.value)}
                                                        placeholder="Cari lokasi atau klik pada peta..."
                                                        className="pl-10"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {locationDetails && (
                                                <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border">
                                                    <div>
                                                        <span className="block font-semibold text-slate-700">Desa/Kelurahan</span>
                                                        {locationDetails.village || "-"}
                                                    </div>
                                                    <div>
                                                        <span className="block font-semibold text-slate-700">Kecamatan</span>
                                                        {locationDetails.subdistrict || "-"}
                                                    </div>
                                                    <div>
                                                        <span className="block font-semibold text-slate-700">Kabupaten/Kota</span>
                                                        {locationDetails.regency || "-"}
                                                    </div>
                                                    <div>
                                                        <span className="block font-semibold text-slate-700">Provinsi</span>
                                                        {locationDetails.province || "-"}
                                                    </div>
                                                </div>
                                            )}

                                            <Button type="submit" disabled={loading || !addressInput} className="w-full bg-teal-600 hover:bg-teal-700 font-bold h-11">
                                                {loading ? "Sedang Menganalisis..." : "Mulai Analisis AI"}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="photo">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>AI Vision Analysis</CardTitle>
                                        <CardDescription>Unggah foto lokasi tanah untuk deteksi vegetasi, kontur, dan lingkungan sekitar secara otomatis.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => document.getElementById('file-upload')?.click()}>
                                            <div className="bg-teal-50 p-4 rounded-full inline-block mb-4">
                                                <Upload className="h-8 w-8 text-teal-600" />
                                            </div>
                                            <h3 className="font-medium">Klik untuk upload foto</h3>
                                            <p className="text-xs text-slate-500 mt-1">Format: JPG, PNG (Max 5MB)</p>
                                            <input id="file-upload" type="file" className="hidden" onChange={(e) => {
                                                // Mock upload behavior
                                                if (e.target.files?.[0]) {
                                                    setLoading(true)
                                                    setTimeout(() => {
                                                        setLoading(false)
                                                        setResult({
                                                            zone: "Visual Detection: Lahan Kosong Bervegetasi",
                                                            risk: "Medium (Perlu Cut & Fill)",
                                                            access: "Jalan Tanah (Perlu Pengerasan)",
                                                            price: "Estimasi: Rp 1.500.000 / m2",
                                                            soil: "Tanah Humus (Subur)",
                                                            permit: "Zona Kuning (Residential)"
                                                        })
                                                    }, 2500)
                                                }
                                            }} />
                                        </div>
                                        <div className="flex gap-4 items-start bg-blue-50 p-4 rounded-lg">
                                            <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                            <p className="text-xs text-blue-700">
                                                AI Vision kami akan menganalisis objek dalam foto seperti kepadatan vegetasi, kemiringan tanah, dan keberadaan sumber air permukaan.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right Column: Results */}
                    <div className="space-y-6">
                        {!result ? (
                            <Card className="h-full min-h-[400px] flex items-center justify-center border-dashed bg-slate-50/50">
                                <div className="text-center p-6">
                                    <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-4">
                                        <MapPin className="h-8 w-8 text-slate-300" />
                                    </div>
                                    <h3 className="font-medium text-slate-900">Belum ada analisis</h3>
                                    <p className="text-sm text-slate-500 mt-1 max-w-[250px] mx-auto">Silakan pilih lokasi pada peta dan klik tombol analisis untuk melihat hasil.</p>
                                </div>
                            </Card>
                        ) : (
                            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                                <Card className="border-teal-200 bg-teal-50 shadow-md">
                                    <CardHeader className="pb-2 border-b border-teal-100/50">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <CheckCircle className="h-5 w-5 text-teal-600" />
                                            Skor Kelayakan
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <div className="flex items-end gap-2 mb-1">
                                            <div className="text-4xl font-bold text-teal-700">92%</div>
                                            <div className="text-sm font-bold text-teal-600 mb-1.5">Sangat Bagus</div>
                                        </div>
                                        <p className="text-xs text-teal-600/80">Lokasi ini sangat strategis dan aman untuk pembangunan hunian.</p>
                                    </CardContent>
                                </Card>

                                <Card className="shadow-sm">
                                    <CardHeader className="pb-3 border-b">
                                        <CardTitle className="text-base font-bold">Detail Analisis</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4 space-y-4">
                                        <div className="space-y-1">
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Estimasi Harga</span>
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                                <span className="text-xl font-bold text-slate-900">{result.price}</span>
                                                <span className="text-xs text-slate-500">/m²</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                                <span className="text-sm text-slate-600">Risiko Bencana</span>
                                                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">{result.risk}</Badge>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                                <span className="text-sm text-slate-600">Jenis Tanah</span>
                                                <span className="text-sm font-medium text-slate-900 text-right max-w-[50%]">{result.soil}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                                <span className="text-sm text-slate-600">Zona</span>
                                                <span className="text-sm font-medium text-slate-900 text-right max-w-[50%] tracking-tight line-clamp-1">{result.zone}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-sm text-slate-600">Perizinan</span>
                                                <span className="text-sm font-medium text-blue-600">{result.permit}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
