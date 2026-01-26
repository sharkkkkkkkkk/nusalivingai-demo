"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Scan, CheckCircle, Loader2, Image as ImageIcon, Sparkles, AlertCircle } from "lucide-react"
import { analyzeImage, ScanResult } from "@/lib/ai-service"
import Image from "next/image"

export default function ScanPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [result, setResult] = useState<ScanResult | null>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setSelectedImage(imageUrl)
            setResult(null)
            setProgress(0)
        }
    }

    const handleScan = async () => {
        if (!selectedImage) return

        setIsAnalyzing(true)
        setProgress(10)

        // Simulate progress intervals
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(interval)
                    return 90
                }
                return prev + 10
            })
        }, 300)

        try {
            // In a real app, we would send the file object here
            // const response = await analyzeImage(file)
            // For this demo, we use a mock service
            const mockFile = new File([""], "filename");
            const data = await analyzeImage(mockFile)

            clearInterval(interval)
            setProgress(100)
            setResult(data)
        } catch (error) {
            console.error("Scan failed", error)
        } finally {
            setIsAnalyzing(false)
        }
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                            <Scan className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-800 bg-clip-text text-transparent">
                            AI Hunian Scan
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Upload foto ruangan, kamar kosong, atau rumah impianmu. AI kami akan menganalisis kondisi, dimensi, dan memberikan rekomendasi desain terbaik.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Upload Section */}
                        <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <CardTitle>Upload Foto</CardTitle>
                                <CardDescription>Format supported: JPG, PNG (Max 5MB)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg border border-muted-foreground/10 min-h-[300px] relative overflow-hidden group">
                                    {selectedImage ? (
                                        <Image
                                            src={selectedImage}
                                            alt="Preview"
                                            fill
                                            className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="text-center space-y-4">
                                            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                                                <Upload className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Drag & drop or click to upload</p>
                                                <p className="text-sm text-muted-foreground">Select a clear photo of the room</p>
                                            </div>
                                        </div>
                                    )}
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={handleImageUpload}
                                    />
                                </div>

                                <Button
                                    className="w-full h-12 text-lg"
                                    onClick={handleScan}
                                    disabled={!selectedImage || isAnalyzing}
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Menganalisis...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-5 w-5" />
                                            Mulai Analisis AI
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Analysis Result Section */}
                        <div className="space-y-6">
                            {isAnalyzing && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                            Sedang Memproses...
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Progress value={progress} className="w-full h-2" />
                                        <p className="text-sm text-muted-foreground animate-pulse">
                                            Mengidentifikasi objek, mengukur dimensi, dan menilai pencahayaan...
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                            {result && !isAnalyzing && (
                                <Card className="bg-gradient-to-br from-background to-muted/20 border-primary/20 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-primary">
                                            <CheckCircle className="h-6 w-6" />
                                            Hasil Analisis
                                        </CardTitle>
                                        <CardDescription>Berdasarkan pemindaian visual AI</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label className="text-muted-foreground">Tipe Ruangan</Label>
                                                <p className="font-semibold text-lg">{result.type}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-muted-foreground">Kondisi</Label>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant={result.condition === 'Unfurnished' ? "outline" : "default"}>
                                                        {result.condition}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-muted-foreground">Est. Dimensi</Label>
                                                <p className="font-medium">{result.dimensions}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-muted-foreground">Pencahayaan</Label>
                                                <p className="font-medium text-sm">{result.lighting}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-4 border-t">
                                            <Label className="text-base font-semibold">Rekomendasi Gaya Desain</Label>
                                            <div className="flex flex-wrap gap-2">
                                                {result.styleSuggestions.map((style, idx) => (
                                                    <Badge key={idx} variant="secondary" className="px-3 py-1 text-sm bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                                                        {style}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                AI menyarankan gaya ini berdasarkan struktur dan pencahayaan ruangan Anda.
                                            </p>
                                        </div>

                                        <Button variant="outline" className="w-full group">
                                            Lihat Inspirasi Desain
                                            <Sparkles className="ml-2 h-4 w-4 group-hover:text-amber-500 transition-colors" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}

                            {!result && !isAnalyzing && (
                                <Card className="border-dashed bg-muted/30">
                                    <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground space-y-3">
                                        <ImageIcon className="h-12 w-12 opacity-20" />
                                        <p>Hasil analisis akan muncul di sini.</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
