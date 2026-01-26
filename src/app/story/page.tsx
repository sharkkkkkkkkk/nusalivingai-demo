"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Upload, Video, Layers } from "lucide-react"
import Image from "next/image"

export default function StoryPage() {
    const [mode, setMode] = useState<"timelapse" | "comparison">("comparison")
    const [sliderValue, setSliderValue] = useState(50)

    // Mock images
    const beforeImage = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000" // Construction / Messy
    const afterImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000" // Finished

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-bold">Visual Story & Timelapse</h1>
                        <p className="text-muted-foreground">Lihat transformasi hunian dari masa ke masa.</p>
                    </div>

                    <Tabs defaultValue="comparison" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="comparison" onClick={() => setMode("comparison")}>
                                <Layers className="mr-2 h-4 w-4" /> Before / After
                            </TabsTrigger>
                            <TabsTrigger value="timelapse" onClick={() => setMode("timelapse")}>
                                <Video className="mr-2 h-4 w-4" /> Construction Timelapse
                            </TabsTrigger>
                        </TabsList>

                        <div className="mt-8">
                            {mode === "comparison" && (
                                <Card className="overflow-hidden border-2 border-muted">
                                    <div className="relative h-[400px] w-full cursor-col-resize group"
                                        onMouseMove={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect()
                                            const x = e.clientX - rect.left
                                            const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
                                            setSliderValue(percent)
                                        }}
                                        onTouchMove={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect()
                                            const x = e.touches[0].clientX - rect.left
                                            const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
                                            setSliderValue(percent)
                                        }}
                                    >
                                        {/* After Image (Background) */}
                                        <div className="absolute inset-0">
                                            <Image src={afterImage} alt="After" fill className="object-cover" />
                                            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm font-bold">AFTER</div>
                                        </div>

                                        {/* Before Image (Clipped) */}
                                        <div
                                            className="absolute inset-0 overflow-hidden border-r-2 border-white"
                                            style={{ width: `${sliderValue}%` }}
                                        >
                                            <Image src={beforeImage} alt="Before" fill className="object-cover object-left" />
                                            <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm font-bold">BEFORE</div>
                                        </div>

                                        {/* Slider Handle */}
                                        <div
                                            className="absolute inset-y-0 w-1 bg-white shadow-lg pointer-events-none flex items-center justify-center"
                                            style={{ left: `${sliderValue}%` }}
                                        >
                                            <div className="h-8 w-8 bg-white rounded-full shadow flex items-center justify-center">
                                                <Layers className="h-4 w-4 text-black" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-muted/20 text-center text-sm text-uted-foreground">
                                        Geser untuk melihat perubahan
                                    </div>
                                </Card>
                            )}

                            {mode === "timelapse" && (
                                <Card>
                                    <CardContent className="p-0">
                                        <div className="relative aspect-video bg-black flex items-center justify-center">
                                            <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1590490360171-8c43313fafe6')] bg-cover bg-center"></div>
                                            <div className="z-10 text-center text-white space-y-4">
                                                <div className="h-16 w-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto hover:scale-110 transition-transform cursor-pointer">
                                                    <Play className="h-8 w-8 ml-1" />
                                                </div>
                                                <p className="font-medium">Play Construction Timelapse (15s)</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 border-2 border-dashed border-muted p-8 rounded-lg justify-center hover:bg-muted/50 transition-colors cursor-pointer">
                                            <Upload className="h-8 w-8 text-muted-foreground" />
                                            <div className="text-left">
                                                <p className="font-semibold">Upload progress photos</p>
                                                <p className="text-sm text-muted-foreground">Select multiple photos to generate timelapse</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </main>
    )
}
