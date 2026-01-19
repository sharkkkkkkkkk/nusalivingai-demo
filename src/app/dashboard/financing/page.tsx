"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function FinancingPage() {
    const searchParams = useSearchParams()
    const defaultTab = searchParams.get('tab') || 'compare'

    // Calculator State
    const [price, setPrice] = useState(500000000)
    const [dp, setDp] = useState(100000000)
    const [rate, setRate] = useState(4.5)
    const [tenor, setTenor] = useState(20)
    const [installment, setInstallment] = useState(0)

    const calculateInstallment = () => {
        const principal = price - dp
        const monthlyRate = rate / 100 / 12
        const months = tenor * 12

        if (principal <= 0) {
            setInstallment(0)
            return
        }

        const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
        setInstallment(Math.round(monthlyPayment))
    }

    // Auto calculate on mount
    useEffect(() => {
        calculateInstallment()
    }, [])

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Financing Center</h1>
                <p className="text-muted-foreground">Bandingkan dan ajukan KPR dari berbagai mitra perbankan terpercaya.</p>
            </div>

            <Tabs defaultValue={defaultTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="compare">Komparasi KPR</TabsTrigger>
                    <TabsTrigger value="calculator">Kalkulator KPR</TabsTrigger>
                    <TabsTrigger value="history">Riwayat Pengajuan</TabsTrigger>
                </TabsList>

                <TabsContent value="compare" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Bank BTN */}
                        <Card className="border-blue-200">
                            <CardHeader className="pb-2">
                                <div className="font-bold text-xl text-blue-900">BTN Platinum</div>
                                <CardDescription>Best for First Home Buyer</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-3xl font-bold text-blue-600">3.75% <span className="text-sm text-muted-foreground font-normal">fixed 1 th</span></div>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> DP mulai 0%</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Tenor s.d 30 tahun</li>
                                </ul>
                                <Button className="w-full bg-blue-900 hover:bg-blue-800">Ajukan Sekarang</Button>
                            </CardContent>
                        </Card>

                        {/* Bank BCA */}
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="font-bold text-xl text-blue-800">BCA KPR</div>
                                <CardDescription>Best for Fixed Rate Stability</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-3xl font-bold text-blue-600">4.25% <span className="text-sm text-muted-foreground font-normal">fixed 3 th</span></div>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Proses Cepat</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Bebas Penalti Pelunasan</li>
                                </ul>
                                <Button className="w-full" variant="outline">Ajukan Sekarang</Button>
                            </CardContent>
                        </Card>

                        {/* Mandiri */}
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="font-bold text-xl text-blue-900">Mandiri KPR</div>
                                <CardDescription>Flexible Installment</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-3xl font-bold text-blue-600">3.88% <span className="text-sm text-muted-foreground font-normal">fixed 1 th</span></div>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Multiguna Available</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Tenor s.d 20 tahun</li>
                                </ul>
                                <Button className="w-full" variant="outline">Ajukan Sekarang</Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="calculator">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Kalkulator Simulasi KPR</CardTitle>
                                <CardDescription>Hitung estimasi angsuran bulanan Anda.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Harga Properti (Rp)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="500000000"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dp">Uang Muka / DP (Rp)</Label>
                                    <Input
                                        id="dp"
                                        type="number"
                                        placeholder="50000000"
                                        value={dp}
                                        onChange={(e) => setDp(Number(e.target.value))}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="rate">Bunga (%)</Label>
                                        <Input
                                            id="rate"
                                            type="number"
                                            step="0.1"
                                            placeholder="3.75"
                                            value={rate}
                                            onChange={(e) => setRate(Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tenor">Tenor (Tahun)</Label>
                                        <Input
                                            id="tenor"
                                            type="number"
                                            placeholder="20"
                                            value={tenor}
                                            onChange={(e) => setTenor(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={calculateInstallment}>
                                    Hitung Angsuran
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900 text-white border-none flex flex-col justify-center">
                            <CardContent className="p-8 text-center space-y-6">
                                <div>
                                    <p className="text-slate-400 mb-2">Estimasi Angsuran per Bulan</p>
                                    <div className="text-4xl font-bold text-yellow-500">
                                        {installment > 0 ? `Rp ${installment.toLocaleString('id-ID')}` : "Rp 0"}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm text-left pt-6 border-t border-slate-700">
                                    <div>
                                        <p className="text-slate-400">Total Pinjaman</p>
                                        <p className="font-semibold text-lg">Rp {(price - dp).toLocaleString('id-ID')}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400">Total Bunga Estimasi</p>
                                        <p className="font-semibold text-lg">
                                            {installment > 0
                                                ? `Rp ${((installment * tenor * 12) - (price - dp)).toLocaleString('id-ID')}`
                                                : "Rp 0"
                                            }
                                        </p>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-slate-800 hover:text-white">
                                    Unduh Hasil Simulasi
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
