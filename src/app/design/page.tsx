"use client"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Send, Lightbulb, Image as ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"
import { generateDesignResponse } from "@/lib/design-service"

interface DesignMessage {
    id: string;
    role: 'user' | 'ai';
    text: string;
    images?: string[];
}

export default function DesignPage() {
    const [messages, setMessages] = useState<DesignMessage[]>([
        {
            id: '1',
            role: 'ai',
            text: "Halo! Saya NusaDesign AI. Ceritakan ruang impianmu (Contoh: 'Kamar tidur nuansa hangat', 'Dapur minimalis 2 juta'), saya akan buatkan visualisasinya.",
            images: [
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80&w=600"
            ]
        }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isGenerating])

    const handleSend = async (text: string = inputValue) => {
        if (!text.trim()) return

        const userMsg: DesignMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: text
        }

        setMessages(prev => [...prev, userMsg])
        setInputValue("")
        setIsGenerating(true)

        try {
            const response = await generateDesignResponse(text)
            const aiMsg: DesignMessage = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                text: response.text,
                images: response.images
            }
            setMessages(prev => [...prev, aiMsg])
        } catch (error) {
            console.error(error)
        } finally {
            setIsGenerating(false)
        }
    }

    const quickPrompts = [
        { label: "Kamar tidur 3x3 aesthetic", prompt: "Kamar tidur ukuran 3x3 meter aesthetic minimalis" },
        { label: "Dapur minimalis budget hemat", prompt: "Desain dapur minimalis low budget bersih" },
        { label: "Kamar WFH + tidur", prompt: "Desain kamar tidur gabung ruang kerja WFH produktif" },
        { label: "Ruang tamu Japandi", prompt: "Ruang tamu gaya Japandi kayu hangat" },
        { label: "Workspace untuk konten", prompt: "Ruang kerja studio konten kreator modern lighting rgb" },
    ]

    return (
        <main className="min-h-screen bg-background flex flex-col font-sans">
            <Navbar />

            <div className="flex-1 container mx-auto px-4 py-4 md:py-8 flex gap-6 max-w-7xl h-[calc(100vh-80px)]">

                {/* Main Chat Area */}
                <Card className="flex-1 flex flex-col shadow-xl overflow-hidden border-2 border-primary/10">
                    <div className="bg-primary/5 p-4 border-b flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg leading-tight">NusaDesign AI</h2>
                                <p className="text-xs text-muted-foreground">Asisten Desain Hunian Gen Z</p>
                            </div>
                        </div>
                        <div className="px-3 py-1 rounded-full border text-xs font-semibold bg-background">
                            Beta
                        </div>
                    </div>

                    <ScrollArea className="flex-1 p-4 md:p-6 bg-slate-50 dark:bg-slate-950/30">
                        <div className="space-y-6">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    {/* Text Bubble */}
                                    <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 shadow-sm mb-2 text-sm md:text-base ${msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-sm'
                                            : 'bg-white dark:bg-zinc-800 border rounded-tl-sm'
                                        }`}>
                                        {msg.text}
                                    </div>

                                    {/* Images Grid (AI Only) */}
                                    {msg.images && msg.images.length > 0 && (
                                        <div className="max-w-[100%] md:max-w-[85%] grid grid-cols-2 gap-2 mt-1">
                                            {msg.images.map((img, idx) => (
                                                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden shadow-md group border-2 border-transparent hover:border-primary/50 transition-all cursor-pointer">
                                                    <Image
                                                        src={img}
                                                        alt="Design result"
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isGenerating && (
                                <div className="flex flex-col items-start max-w-[75%]">
                                    <div className="bg-white dark:bg-zinc-800 border rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-3">
                                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                        <span className="text-sm text-muted-foreground animate-pulse">Sedang merancang visual untukmu...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 bg-background border-t">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="relative flex items-center gap-2"
                        >
                            <Button type="button" size="icon" variant="ghost" className="shrink-0 text-muted-foreground">
                                <ImageIcon className="h-5 w-5" />
                            </Button>
                            <Input
                                placeholder="Ceritain ruang impianmu... (e.g. 'Kamar tidur minimalis budget 5 juta')"
                                className="pr-12 py-6 text-base rounded-full bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/20"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isGenerating}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1.5 h-9 w-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                                disabled={!inputValue.trim() || isGenerating}
                            >
                                <Send className="h-4 w-4 ml-0.5" />
                            </Button>
                        </form>
                    </div>
                </Card>

                {/* Sidebar (Desktop) */}
                <div className="hidden lg:flex w-80 flex-col gap-6">
                    <Card className="p-5 bg-[#0f172a] text-white border-0 shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="flex items-center gap-2 font-bold mb-4 text-emerald-400">
                                <Lightbulb className="h-5 w-5" /> Ide Populer Gen Z
                            </h3>
                            <div className="flex flex-col gap-3">
                                {quickPrompts.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSend(item.prompt)}
                                        className="text-left px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500/50 transition-all text-sm font-medium flex items-center gap-3 group"
                                        disabled={isGenerating}
                                    >
                                        <Sparkles className="h-4 w-4 text-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Background blobs */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 blur-3xl rounded-full -ml-10 -mb-10 pointer-events-none"></div>
                    </Card>

                    <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-800 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-200">
                        <div className="flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 mt-0.5 shrink-0" />
                            <div>
                                <p className="font-bold text-sm mb-1">Pro Tip</p>
                                <p className="text-sm leading-relaxed opacity-90">
                                    Makin spesifik requestmu, makin akurat inspirasinya! Sebutin budget, ukuran ruang, atau style yang kamu suka (Japandi, Industrial, Bohemian, dll).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}
