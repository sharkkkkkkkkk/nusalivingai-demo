"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function CheckEligibilityPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-20 max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold mb-4">Cek Kelayakan KPR Instan</h1>
                    <p className="text-muted-foreground">Hitung estimasi plafon kredit yang bisa Anda dapatkan berdasarkan penghasilan (Simulasi)</p>
                </div>

                <div className="bg-slate-50 p-8 rounded-2xl border">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Total Penghasilan Suami & Istri (per bulan)</Label>
                            <Input type="number" placeholder="Rp" className="text-lg h-12" />
                        </div>

                        <div className="space-y-2">
                            <Label>Cicilan Lain yang Sedang Berjalan</Label>
                            <Input type="number" placeholder="Rp" className="text-lg h-12" />
                        </div>

                        <div className="space-y-2">
                            <Label>Usia Saat Ini</Label>
                            <Input type="number" placeholder="Tahun" />
                        </div>

                        <div className="space-y-2">
                            <Label>Jangka Waktu Kredit (Tenor)</Label>
                            <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                <option>15 Tahun</option>
                                <option>20 Tahun</option>
                                <option>25 Tahun</option>
                            </select>
                        </div>

                        <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold mt-4">
                            Hitung Kelayakan
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
