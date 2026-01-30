"use client"

import Link from "next/link"
import { ArrowLeft, Star, MapPin, MessageSquare, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function MarketplacePage() {
    const professionals = [
        {
            id: 1,
            name: "Budi Santoso, S.Ars",
            role: "Arsitek",
            location: "Sleman, Yogyakarta",
            rating: 4.8,
            projects: 24,
            verified: true,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
            tags: ["Minimalis", "Tropical", "Budget Expert"]
        },
        {
            id: 2,
            name: "CV. Bangun Jaya Abadi",
            role: "Kontraktor",
            location: "Bantul, Yogyakarta",
            rating: 4.9,
            projects: 156,
            verified: true,
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80",
            tags: ["Konstruksi Cepat", "Renovasi", "Garansi Estructural"]
        },
        {
            id: 3,
            name: "Siti Rahmawati",
            role: "Desainer Interior",
            location: "Kota Yogyakarta",
            rating: 4.7,
            projects: 12,
            verified: false,
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
            tags: ["Scandinavian", "Small Space"]
        },
        {
            id: 4,
            name: "Pak Yono & Tim",
            role: "Mandor Borongan",
            location: "Kulon Progo",
            rating: 4.6,
            projects: 40,
            verified: true,
            image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
            tags: ["Tenaga Lokal", "Spesialis Kayu"]
        },
    ]

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">Marketplace Tenaga Ahli</h1>
                </div>

                <div className="grid gap-6">
                    {professionals.map((pro) => (
                        <Card key={pro.id} className="flex flex-col sm:flex-row overflow-hidden hover:border-primary/50 transition-colors">
                            <div className="w-full sm:w-48 bg-slate-100 flex items-center justify-center p-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={pro.image} className="object-cover" />
                                    <AvatarFallback>{pro.name[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex-1 flex flex-col justify-between p-6">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold flex items-center gap-2">
                                                {pro.name}
                                                {pro.verified && <ShieldCheck className="h-4 w-4 text-blue-500" />}
                                            </h3>
                                            <p className="text-muted-foreground">{pro.role}</p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold">{pro.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                                        <MapPin className="h-4 w-4" />
                                        {pro.location} • {pro.projects} Proyek Selesai
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {pro.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="font-normal text-slate-600 bg-slate-100">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Lihat Portofolio</Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl">
                                            <DialogHeader>
                                                <DialogTitle>Portofolio {pro.name}</DialogTitle>
                                                <DialogDescription>
                                                    Koleksi proyek {pro.role} yang telah diselesaikan.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                                    <div key={i} className="aspect-square relative rounded-lg overflow-hidden bg-slate-100">
                                                        <img
                                                            src={`https://source.unsplash.com/random/400x400/?interior,home,${i}`}
                                                            alt={`Project ${i}`}
                                                            className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=400&fit=crop";
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-end mt-4">
                                                <Button className="w-full sm:w-auto">Unduh Katalog PDF</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Button className="gap-2" onClick={() => window.open(`https://wa.me/?text=Halo saya tertarik dengan jasa Anda di NusaLiving`, '_blank')}>
                                        <MessageSquare className="h-4 w-4" />
                                        Hubungi
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
