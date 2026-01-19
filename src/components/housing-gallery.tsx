"use client"

import Image from "next/image"
import Link from "next/link"

// Actually, let's use a simple state to show "Copied!".
import { useState } from "react"
import { Check, Share2, Eye } from "lucide-react"

export function HousingGallery() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const images = [
        {
            src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
            alt: "Modern minimalist living room with large windows sunlight",
            label: "Ruang Tamu Modern"
        },
        {
            src: "https://images.unsplash.com/photo-1616594039964-40891a904672?q=80&w=1000&auto=format&fit=crop",
            alt: "Cozy modern bedroom interior warm lighting",
            label: "Kamar Tidur Nyaman"
        },
        {
            src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop",
            alt: "Modern kitchen minimalist design with island",
            label: "Dapur Smart Living"
        },
        {
            src: "/assets/hero-1.png",
            alt: "Konsep Hunian Modern",
            label: "Eksterior Modern"
        }
    ]

    const handleShare = (index: number) => {
        navigator.clipboard.writeText(window.location.href);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    }

    return (
        <section className="py-20 bg-background" id="gallery">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Galeri Hunian</h2>
                    <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
                        Inspirasi desain hunian masa depan yang cerdas, hemat energi, dan nyaman.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div key={index} className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 shadow-md hover:shadow-xl transition-all duration-300">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-white font-bold text-lg block mb-1">{image.label}</span>
                                    <p className="text-white/80 text-sm mb-4">{image.alt}</p>
                                    <div className="flex gap-2">
                                        <Link href="/dashboard/catalog" className="flex-1">
                                            <button className="w-full flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white text-white hover:text-black py-2 px-4 rounded-lg text-sm font-medium transition-colors border border-white/30">
                                                <Eye className="w-4 h-4" />
                                                Lihat Detail
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleShare(index)}
                                            className="bg-white/20 backdrop-blur-sm hover:bg-white text-white hover:text-black p-2 rounded-lg transition-colors border border-white/30 flex items-center justify-center"
                                            title="Bagikan"
                                        >
                                            {copiedIndex === index ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
