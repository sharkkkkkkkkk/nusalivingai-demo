"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Wand2, Home, Users, DollarSign, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PlannerPage() {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const handleGenerate = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setStep(2)
        }, 2500)
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold tracking-tight">AI Housing Planner</h1>
                        <Button variant="outline">Export PDF</Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-[350px_1fr] gap-8">
                    {/* Input Panel */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Parameter Hunian</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Dimensi Lahan (meter)</label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Ruler className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input placeholder="Lebar" className="pl-10" defaultValue="6" />
                                        </div>
                                        <span className="pt-2 text-muted-foreground">x</span>
                                        <div className="relative flex-1">
                                            <Ruler className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input placeholder="Panjang" className="pl-10" defaultValue="12" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Anggaran Konstruksi</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-2.5 text-sm font-semibold">Rp</div>
                                        <Input className="pl-10" placeholder="Contoh: 150.000.000" defaultValue="200.000.000" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Jumlah Penghuni</label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input className="pl-10" type="number" defaultValue="3" />
                                    </div>
                                </div>

                                <Button className="w-full gap-2" onClick={handleGenerate} disabled={loading || step === 2}>
                                    {loading ? (
                                        <>Merancang...</>
                                    ) : (
                                        <>
                                            <Wand2 className="h-4 w-4" />
                                            Generate Desain
                                        </>
                                    )}
                                </Button>
                                {step === 2 && (
                                    <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
                                        Reset Parameter
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Result Display */}
                    <div className="min-h-[500px]">
                        {loading ? (
                            <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4 bg-white rounded-xl border border-dashed">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                <p className="text-muted-foreground">AI sedang menghitung struktur optimal dan estimasi biaya...</p>
                            </div>
                        ) : step === 1 ? (
                            <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4 bg-slate-100 rounded-xl border border-dashed text-muted-foreground">
                                <Home className="h-16 w-16 opacity-20" />
                                <p>Masukkan parameter di sebelah kiri untuk mulai merancang.</p>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                                <Card className="overflow-hidden border-2 border-primary/20">
                                    <div className="aspect-video bg-slate-100 relative items-center justify-center flex">
                                        {/* Mock Blueprint Visual */}
                                        <div className="w-3/4 h-3/4 border-4 border-slate-800 bg-white shadow-lg p-4 grid grid-cols-2 grid-rows-2 gap-1 relative">
                                            <div className="border border-slate-300 p-2 text-xs text-slate-500">Kamar Tidur 1</div>
                                            <div className="border border-slate-300 p-2 text-xs text-slate-500">Kamar Tidur 2</div>
                                            <div className="border border-slate-300 p-2 text-xs text-slate-500 row-span-2 col-span-2 absolute bottom-0 right-0 w-1/2 h-1/2 bg-slate-50">R. Keluarga</div>
                                            <div className="border border-slate-300 p-2 text-xs text-slate-500 absolute bottom-0 left-0 w-1/2 h-1/2">Dapur + WC</div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                                    </div>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl">Rekomendasi: Tipe 45 Modular</CardTitle>
                                                <p className="text-muted-foreground">Optimal untuk lahan 6x12m</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-primary">Rp 185.000.000</div>
                                                <p className="text-xs text-muted-foreground">Estimasi All-in</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="pt-6 grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold mb-2">Spesifikasi Ruang</h4>
                                            <ul className="text-sm space-y-1 text-slate-600">
                                                <li>• 2 Kamar Tidur</li>
                                                <li>• 1 Kamar Mandi</li>
                                                <li>• Ruang Keluarga Open Plan</li>
                                                <li>• Carport 1 Mobil</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Material Utama</h4>
                                            <ul className="text-sm space-y-1 text-slate-600">
                                                <li>• Bata Ringan / Panel Modular</li>
                                                <li>• Rangka Atap Baja Ringan</li>
                                                <li>• Kusen Aluminium</li>
                                            </ul>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-slate-50 flex gap-3">
                                        <Button className="w-full">Simpan Desain</Button>
                                        <Button variant="outline" className="w-full">Konsultasi Arsitek</Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
