"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function PartnerJoinPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-20 max-w-3xl">
                <div className="mb-10">
                    <span className="text-primary font-bold tracking-wider text-sm uppercase">Mitra Developer</span>
                    <h1 className="text-4xl font-bold mt-2">Gabung Ekosistem NusaLiving</h1>
                    <p className="text-muted-foreground mt-4 text-lg">
                        Jangkau ribuan calon pembeli potensial yang telah terverifikasi dan siap dengan fasilitas pembiayaan.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl border shadow-lg space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="company">Nama PT/Perusahaan</Label>
                            <Input id="company" placeholder="PT. ..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pic">Nama Penanggung Jawab</Label>
                            <Input id="pic" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Bisnis</Label>
                        <Input id="email" type="email" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon / WhatsApp</Label>
                        <Input id="phone" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="projects">Lokasi Proyek Saat Ini</Label>
                        <Textarea id="projects" placeholder="Contoh: Perumahan Grand City, Bogor; Cluster Harmony, Bekasi..." />
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="flex items-start gap-2">
                            <input type="checkbox" id="agree" className="mt-1" />
                            <label htmlFor="agree" className="text-sm text-muted-foreground">
                                Saya setuju untuk dihubungi oleh tim NusaLiving terkait kemitraan ini.
                            </label>
                        </div>
                        <Button className="w-full" size="lg">Daftar Sebagai Mitra</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
