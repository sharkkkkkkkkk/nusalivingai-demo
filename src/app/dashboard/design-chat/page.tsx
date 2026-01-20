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

const UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY" // Replace with environment variable

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

    // Enhanced Room Type Detection for Gen Z
    const detectRoomContext = (text: string): RoomContext | null => {
        const lowerText = text.toLowerCase()

        // Bedroom Detection
        if (lowerText.match(/\b(kamar tidur|bedroom|kamar|bobo|tidur)\b/)) {
            return {
                type: "Kamar Tidur",
                keywords: ["modern bedroom interior", "minimalist bedroom design", "cozy small bedroom", "bedroom furniture layout"],
                styleKeywords: "modern minimalist bedroom interior cozy furniture",
                genZTips: [
                    "💡 Gunakan kasur platform tanpa bed frame buat hemat ruang",
                    "📱 Sediakan power outlet dekat tempat tidur untuk charging gadget",
                    "🎨 Warna netral (beige, gray) bikin ruangan keliatan luas",
                    "🪴 Tambah tanaman mini buat vibe aesthetic Instagram-able"
                ]
            }
        }

        // Kitchen Detection
        if (lowerText.match(/\b(dapur|kitchen|masak)\b/)) {
            return {
                type: "Dapur",
                keywords: ["modern kitchen interior", "small kitchen design", "minimalist kitchen cabinets", "kitchen interior"],
                styleKeywords: "modern minimalist kitchen interior design minimalist compact",
                genZTips: [
                    "🔥 Kompor tanam lebih hemat ruang & aesthetic daripada kompor biasa",
                    "📦 Rak gantung atau hook untuk alat masak yang sering dipakai",
                    "✨ Cabinet warna terang bikin dapur kecil keliatan lega",
                    "💰 Budget friendly: cat ulang cabinet lama + ganti handle baru"
                ]
            }
        }

        // Bathroom Detection
        if (lowerText.match(/\b(kamar mandi|bathroom|toilet|wc)\b/)) {
            return {
                type: "Kamar Mandi",
                keywords: ["modern bathroom interior", "luxury bathroom design", "minimalist bathroom shower", "bathroom tiles"],
                styleKeywords: "modern bathroom interior luxury minimalist clean",
                genZTips: [
                    "🚿 Shower tanpa partisi (walk-in) bikin kamar mandi keliatan luas",
                    "🪞 Cermin besar + lampu LED strip = vibe hotel mewah",
                    "🌿 Tanaman tahan lembab (lidah mertua) buat sentuhan natural",
                    "💡 Warna putih + abu-abu + kayu = kombinasi timeless & clean"
                ]
            }
        }

        // Living Room Detection
        if (lowerText.match(/\b(ruang tamu|ruang keluarga|living room|living|tamu|keluarga)\b/)) {
            return {
                type: "Ruang Tamu",
                keywords: ["modern living room interior", "minimalist living room sofa", "scandinavian living room", "cozy living room"],
                styleKeywords: "modern living room interior scandinavian minimalist cozy",
                genZTips: [
                    "🛋️ Sofa 2-seater + bean bag lebih fleksibel dari sofa besar",
                    "📺 Floating shelf untuk TV biar keliatan modern & hemat tempat",
                    "🎨 Accent wall (1 dinding warna beda) buat focal point",
                    "💡 Lampu kuning (warm light) bikin suasana homey & cozy"
                ]
            }
        }

        // Workspace/Study Detection
        if (lowerText.match(/\b(kerja|workspace|wfh|belajar|study|kantor)\b/)) {
            return {
                type: "Ruang Kerja",
                keywords: ["home office desk setup", "minimalist workspace interior", "study room design", "work from home interior"],
                styleKeywords: "home office workspace interior desk setup minimalist",
                genZTips: [
                    "💻 Meja menghadap jendela = natural light baik buat produktivitas",
                    "🪑 Invest di kursi ergonomis, punggungmu akan berterimakasih!",
                    "📚 Pegboard atau rak minimalis buat organize alat tulis",
                    "🎥 Setup lighting yang bagus penting buat video call/konten"
                ]
            }
        }

        // Dining Room Detection
        if (lowerText.match(/\b(ruang makan|dining room|makan|dining)\b/)) {
            return {
                type: "Ruang Makan",
                keywords: ["modern dining room interior", "minimalist dining table", "small dining room design", "dining area"],
                styleKeywords: "modern dining room interior table minimalist elegant",
                genZTips: [
                    "🍴 Meja lipat atau extendable buat ruang kecil = game changer",
                    "🪑 Bench seating hemat space daripada kursi individual",
                    "💡 Pendant lamp di atas meja buat aksen dramatis",
                    "🌿 Centerpiece simple (vas bunga/lilin) cukup buat vibe cozy"
                ]
            }
        }

        return null
    }

    // Fetch images from Unsplash API
    const fetchUnsplashImages = async (query: string, count: number = 4): Promise<string[]> => {
        try {
            // Note: In production, use environment variables and server-side API calls
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
            )

            if (!response.ok) throw new Error("Unsplash API failed")

            const data = await response.json()
            return data.results.map((photo: any) => photo.urls.regular) || []
        } catch (error) {
            console.error("Unsplash fetch error:", error)
            return []
        }
    }

    // VERIFIED High-Quality Fallback Images (curated from Pexels & Unsplash)
    const getFallbackImages = (roomType: string): string[] => {
        const fallbacks: Record<string, string[]> = {
            "Kamar Tidur": [
                "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1374125/pexels-photo-1374125.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            "Dapur": [
                "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            "Kamar Mandi": [
                "https://images.pexels.com/photos/1358912/pexels-photo-1358912.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            "Ruang Tamu": [
                "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            "Ruang Kerja": [
                "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/5833846/pexels-photo-5833846.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            "Ruang Makan": [
                "https://images.pexels.com/photos/1860382/pexels-photo-1860382.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/6086445/pexels-photo-6086445.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        }

        return fallbacks[roomType] || [
            "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
    }

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg: Message = {
            id: Date.now(),
            role: "user",
            content: input
        }

        setMessages(prev => [...prev, userMsg])
        const userInput = input
        setInput("")
        setLoading(true)

        try {
            // Detect room context
            const context = detectRoomContext(userInput)

            if (!context) {
                // No room detected - ask for clarification
                setTimeout(() => {
                    const aiMsg: Message = {
                        id: Date.now() + 1,
                        role: "ai",
                        content: "Hmm, aku belum tangkep ruang apa yang kamu maksud nih 🤔\n\nBisa lebih spesifik? Misalnya:\n• \"Kamar tidur minimalis\"\n• \"Dapur kecil budget hemat\"\n• \"Ruang tamu aesthetic\"\n\nAyo coba lagi! 😊"
                    }
                    setMessages(prev => [...prev, aiMsg])
                    setLoading(false)
                }, 1000)
                return
            }

            // Try to fetch from Unsplash API first
            let images = await fetchUnsplashImages(context.styleKeywords, 4)

            // Fallback to curated images if API fails
            if (images.length === 0) {
                images = getFallbackImages(context.type)
            }

            setTimeout(() => {
                const aiMsg: Message = {
                    id: Date.now() + 1,
                    role: "ai",
                    content: `Oke, aku paham! Kamu mau desain **${context.type}** yang kece! 🎨✨\n\nIni dia ${images.length} inspirasi desain yang cocok buat Gen Z kayak kamu:`,
                    images: images,
                    tips: context.genZTips,
                    roomType: context.type
                }
                setMessages(prev => [...prev, aiMsg])
                setLoading(false)
            }, 2000)
        } catch (error) {
            console.error("Chat error:", error)
            const errorMsg: Message = {
                id: Date.now() + 1,
                role: "ai",
                content: "Oops! Ada kendala teknis nih 😅 Tapi tenang, aku tetap bisa kasih rekomendasi desain lewat deskripsi. Coba tanya lagi atau pilih salah satu saran di samping!"
            }
            setMessages(prev => [...prev, errorMsg])
            setLoading(false)
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
                    <Badge className="ml-auto" variant="outline">Beta</Badge>
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
