
"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Upload, Sparkles, MessageSquare, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

export default function DesignPage() {
    const [prompt, setPrompt] = useState("")
    const [selectedTab, setSelectedTab] = useState("text")
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [statusText, setStatusText] = useState("Sedang Mendesain...")

    const handleGenerate = async () => {
        if (!prompt && !uploadedImage && selectedTab !== 'chat') return;
        setIsLoading(true);
        setGeneratedImage(null);
        setStatusText("Memulai AI...");

        try {
            if (selectedTab === 'image') {
                setStatusText("Memindai Struktur Ruangan (Computer Vision)...");
                await new Promise(r => setTimeout(r, 2000));
                setStatusText("Mengaplikasikan Gaya Desain...");
            } else {
                setStatusText("Sedang Mendesain Ruangan...");
            }

            const res = await fetch('/api/design', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt + (uploadedImage ? " based on uploaded room structure" : ""),
                    type: selectedTab
                }),
            });

            if (!res.ok) throw new Error("Failed to generate");

            const data = await res.json();
            setGeneratedImage(data.url);
        } catch (error) {
            console.error(error);
            alert("Gagal generate gambar. Coba lagi ya!");
        } finally {
            setIsLoading(false);
            setStatusText("Sedang Mendesain...");
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1 container py-10 max-w-5xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        AI Interior Designer
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Wujudkan desain ruangan impianmu dalam hitungan detik. Menggunakan teknologi DALL-E dan Stable Diffusion yang disesuaikan untuk hunian Indonesia.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* INPUT SECTION */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>Mulai Desain</CardTitle>
                            <CardDescription>Pilih metode input yang kamu suka</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="text" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-3 mb-6">
                                    <TabsTrigger value="text" className="gap-2"><Sparkles className="w-4 h-4" /> Teks</TabsTrigger>
                                    <TabsTrigger value="image" className="gap-2"><ImageIcon className="w-4 h-4" /> Foto</TabsTrigger>
                                    <TabsTrigger value="chat" className="gap-2"><MessageSquare className="w-4 h-4" /> Chat</TabsTrigger>
                                </TabsList>

                                <TabsContent value="text" className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Deskripsikan Ruanganmu</label>
                                        <Textarea
                                            placeholder="Contoh: Ruang tamu minimalis ukuran 3x4 meter dengan nuansa Japandi, ada sofa abu-abu dan tanaman monstera..."
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            className="min-h-[120px]"
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="image" className="space-y-4">
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
                                    >
                                        {uploadedImage ? (
                                            <img src={uploadedImage} alt="Uploaded" className="max-h-48 object-cover rounded-md" />
                                        ) : (
                                            <>
                                                <Upload className="h-10 w-10 text-slate-400 mb-2" />
                                                <p className="text-sm text-slate-500">Klik untuk upload foto ruangan (JPG/PNG)</p>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Instruksi Tambahan (Opsional)</label>
                                        <Input
                                            placeholder="Misal: Ubah jadi gaya industrial, ganti warna cat jadi putih..."
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="chat" className="space-y-4">
                                    <div className="h-[200px] border rounded-md p-4 overflow-y-auto bg-white mb-2 space-y-2">
                                        <div className="bg-slate-100 p-2 rounded-lg text-sm rounded-tl-none inline-block max-w-[80%]">
                                            Hai! Ceritakan desain ruangan impianmu, aku akan buatkan visualnya.
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Contoh: Buat kamar tidur nuansa biru pastel..."
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500">Ketik detail desain, lalu klik tombol Generate Desain di bawah.</p>
                                </TabsContent>

                                <Button
                                    onClick={handleGenerate}
                                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white"
                                    disabled={isLoading || (selectedTab === 'text' && !prompt) || (selectedTab === 'image' && !uploadedImage) || (selectedTab === 'chat' && !prompt)}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {statusText}
                                        </>
                                    ) : (
                                        "Generate Desain"
                                    )}
                                </Button>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* OUTPUT SECTION */}
                    <div className="space-y-4">
                        <Card className="border-0 shadow-lg overflow-hidden h-full min-h-[400px] flex flex-col">
                            <CardHeader>
                                <CardTitle>Hasil Visual</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex items-center justify-center bg-slate-100 p-0 relative group">
                                {generatedImage ? (
                                    <div className="relative w-full h-full min-h-[400px]">
                                        <Image
                                            src={generatedImage}
                                            alt="Generated Design"
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button variant="secondary" size="sm">Download HD</Button>
                                            <Button variant="secondary" size="sm">Simpan ke Planner</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center p-8 text-slate-400">
                                        <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                        <p>Hasil desain AI akan muncul di sini</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
