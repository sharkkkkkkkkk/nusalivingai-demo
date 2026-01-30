"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Image as ImageIcon, Sparkles, User, Bot, Loader2, Lightbulb, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Message = {
    id: number
    role: "user" | "ai"
    content: string
    images?: string[]
    tips?: string[]
    roomType?: string
}

type RoomContext = {
    type: string
    keywords: string[]
    genZTips: string[]
    styleKeywords: string
}

export default function DesignChatPage() {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: "ai",
            content: "Hai! Aku NusaDesign AI, asisten desain hunianmu! 🏠✨\n\nAku bantu kamu visualisasikan ruangan impian. Ceritain dong, ruang apa yang mau kamu desain?\n\nContoh:\n• \"Kamar tidur mungil buat WFH\"\n• \"Dapur minimalis budget 10 juta\"\n• \"Ruang tamu Japandi untuk konten\"",
        }
    ])
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            role: "user",
            content: input
        };

        setMessages(prev => [...prev, userMsg]);
        const userInput = input;
        setInput("");
        setLoading(true);

        try {
            const response = await fetch('/api/design-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userInput })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();

            setTimeout(() => {
                const aiMsg: Message = {
                    id: Date.now() + 1,
                    role: "ai",
                    content: data.message,
                    images: data.images || [],
                    tips: data.tips || [],
                    roomType: data.roomType
                };
                setMessages(prev => [...prev, aiMsg]);
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg: Message = {
                id: Date.now() + 1,
                role: "ai",
                content: "Oops! Ada kendala teknis nih 😅 Tapi tenang, aku tetap bisa kasih rekomendasi desain. Coba tanya lagi atau pilih salah satu saran di samping!"
            };
            setMessages(prev => [...prev, errorMsg]);
            setLoading(false);
        }
    }

    const genZSuggestions = [
        "Kamar tidur 3x3 aesthetic",
        "Dapur minimalis 2 juta",
        "Kamar WFH + tidur",
        "Ruang tamu Japandi",
        "Kamar mandi hotel vibes",
        "Workspace untuk konten"
    ]

    return (
        <div className="flex h-[calc(100vh-8rem)] flex-col md:flex-row gap-6">
            {/* Chat Area */}
            <Card className="flex-1 flex flex-col overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-pink-50 p-4 border-b flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-primary">NusaDesign AI</h2>
                        <p className="text-xs text-muted-foreground">Asisten Desain Hunian Gen Z</p>
                    </div>
                </div>

                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                    <div className="space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                <Avatar className="h-8 w-8 shrink-0">
                                    {msg.role === "user" ? (
                                        <AvatarFallback className="bg-slate-200"><User className="h-4 w-4" /></AvatarFallback>
                                    ) : (
                                        <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white"><Bot className="h-4 w-4" /></AvatarFallback>
                                    )}
                                </Avatar>
                                <div className={`flex flex-col gap-3 max-w-[85%]`}>
                                    <div
                                        className={`rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-slate-50 text-slate-800 border"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>

                                    {/* Image Grid */}
                                    {msg.images && msg.images.length > 0 && (
                                        <div className="grid grid-cols-2 gap-2">
                                            {msg.images.map((img, idx) => (
                                                <div key={idx} className="relative group rounded-lg overflow-hidden border shadow-sm bg-slate-100 aspect-video">
                                                    <img
                                                        src={img}
                                                        alt={`${msg.roomType} design ${idx + 1}`}
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                                                        onError={(e) => {
                                                            e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                                        <p className="text-white text-xs font-medium">Inspirasi #{idx + 1}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Gen Z Tips */}
                                    {msg.tips && msg.tips.length > 0 && (
                                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Lightbulb className="h-4 w-4 text-amber-600" />
                                                <h4 className="font-semibold text-amber-900 text-sm">Tips Gen Z untuk {msg.roomType}</h4>
                                            </div>
                                            <div className="space-y-2">
                                                {msg.tips.map((tip, idx) => (
                                                    <p key={idx} className="text-xs text-amber-800 leading-relaxed">{tip}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white"><Bot className="h-4 w-4" /></AvatarFallback>
                                </Avatar>
                                <div className="bg-slate-50 border rounded-2xl p-4 flex items-center gap-3">
                                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                    <span className="text-sm text-slate-600">Lagi cari inspirasi terbaik buat kamu...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="p-4 border-t bg-white">
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="shrink-0" title="Upload Room Photo (Coming Soon)" disabled>
                            <ImageIcon className="h-4 w-4 text-slate-400" />
                        </Button>
                        <Input
                            placeholder="Ceritain ruang impianmu... (e.g. 'Kamar tidur minimalis budget 5 juta')"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            disabled={loading}
                            className="flex-1"
                        />
                        <Button onClick={handleSend} disabled={loading || !input.trim()} className="shrink-0">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Side Panel - Gen Z Suggestions */}
            <div className="hidden w-80 flex-col gap-4 md:flex">
                <Card className="p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Home className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold text-sm">Ide Populer Gen Z</h3>
                    </div>
                    <div className="space-y-2">
                        {genZSuggestions.map((suggestion) => (
                            <Button
                                key={suggestion}
                                variant="outline"
                                className="w-full justify-start text-xs h-auto py-2.5 px-3 hover:bg-primary/5 hover:border-primary/50"
                                onClick={() => setInput(suggestion)}
                            >
                                <Sparkles className="h-3 w-3 mr-2 text-primary flex-shrink-0" />
                                <span className="text-left">{suggestion}</span>
                            </Button>
                        ))}
                    </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                    <h3 className="font-semibold text-blue-900 text-sm mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Pro Tip
                    </h3>
                    <p className="text-xs text-blue-700 leading-relaxed">
                        Makin spesifik requestmu, makin akurat inspirasinya! Sebutin budget, ukuran ruang, atau style yang kamu suka (Japandi, Industrial, Bohemian, dll).
                    </p>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                    <h3 className="font-semibold text-purple-900 text-sm mb-2">Fitur Coming Soon</h3>
                    <ul className="text-xs text-purple-700 space-y-1.5">
                        <li>📸 Upload foto ruang kosong</li>
                        <li>💰 Estimasi biaya renovasi</li>
                        <li>🛒 Shopping list material</li>
                        <li>🎨 AR Virtual Preview</li>
                    </ul>
                </Card>
            </div>
        </div>
    )
}
