"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export default function ApplyKPRPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-20 max-w-3xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative h-16 w-40">
                        <Image src="/assets/logo-btn-new.png" alt="Bank BTN" fill className="object-contain" />
                    </div>
                    <div className="h-8 w-px bg-slate-300"></div>
                    <h1 className="text-2xl font-bold">Formulir Pengajuan KPR</h1>
                </div>

                <div className="bg-white p-8 rounded-xl border shadow-sm space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Data Pribadi</h2>
                        <p className="text-sm text-muted-foreground">Lengkapi data diri Anda untuk proses verifikasi awal.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="ktp">No. KTP</Label>
                            <Input id="ktp" placeholder="3201xxxxxxxxxxxx" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="npwp">No. NPWP</Label>
                            <Input id="npwp" placeholder="09.xxx.xxx.x-xxx.xxx" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap (Sesuai KTP)</Label>
                        <Input id="name" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold pt-4">Data Pekerjaan & Penghasilan</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="income">Penghasilan Bulanan (Bersih)</Label>
                            <Input id="income" type="number" placeholder="Rp 5.000.000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company">Nama Perusahaan/Instansi</Label>
                            <Input id="company" />
                        </div>
                    </div>

                    <div className="pt-6">
                        <Button className="w-full bg-blue-900 hover:bg-blue-800" size="lg">Kirim Pengajuan</Button>
                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Data Anda dilindungi oleh kebijakan privasi NusaLiving dan Bank BTN.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
