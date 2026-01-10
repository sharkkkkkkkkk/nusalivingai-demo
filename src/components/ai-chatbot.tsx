"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, X, MessageSquare, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type Message = {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Halo! Saya AI Assistant NusaLiving. Ada yang bisa saya bantu terkait perencanaan hunian, KPR BTN, atau desain rumah hari ini?",
            timestamp: new Date(),
        },
    ])
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, isOpen])

    const generateResponse = async (query: string) => {
        // Simulate AI delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const lowerQuery = query.toLowerCase()

        if (lowerQuery.includes("kpr") || lowerQuery.includes("btn") || lowerQuery.includes("bank")) {
            return "Untuk pengajuan KPR BTN, kami menyediakan fitur simulasi dan pengajuan langsung. Anda bisa mendapatkan bunga spesial mulai 3.75% fixed 1 tahun. Apakah Anda ingin saya bantu hitung simulasi angsuran?"
        }
        if (lowerQuery.includes("lokasi") || lowerQuery.includes("tanah") || lowerQuery.includes("site")) {
            return "Fitur AI Site Scan kami dapat menganalisis kelayakan lokasi berdasarkan kontur tanah dan risiko bencana. Cukup unggah foto atau lokasi tanah Anda di menu Dashboard."
        }
        if (lowerQuery.includes("desain") || lowerQuery.includes("arsitek") || lowerQuery.includes("rumah")) {
            return "Kami memiliki ribuan katalog desain modular yang hemat energi dan ramah lingkungan. Anda juga bisa terhubung dengan arsitek lokal melalui Marketplace kami."
        }
        if (lowerQuery.includes("biaya") || lowerQuery.includes("harga") || lowerQuery.includes("budget")) {
            return "AI Housing Planner kami dapat membantu mengestimasi RAB (Rencana Anggaran Biaya) secara detail sesuai dengan spesifikasi material yang Anda pilih. Silakan akses menu Planner di dashboard."
        }
        if (lowerQuery.includes("bocor") || lowerQuery.includes("air") || lowerQuery.includes("listrik") || lowerQuery.includes("energi")) {
            return "Untuk monitoring utilitas (Air & Listrik), Anda bisa menggunakan fitur IoT Dashboard. Sistem kami dapat mendeteksi kebocoran air atau lonjakan penggunaan listrik secara real-time."
        }

        return "Saya mengerti. Sebagai asisten NusaLiving, saya siap membantu Anda merencanakan hunian impian. Bisa diperjelas pertanyaan Anda seputar fitur aplikasi, KPR, atau teknis bangunan?"
    }

    const handleSend = async () => {
        if (!inputValue.trim()) return

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMsg])
        setInputValue("")
        setIsLoading(true)

        try {
            const responseText = await generateResponse(userMsg.content)
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: responseText,
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiMsg])
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-teal-600 hover:bg-teal-700 text-white z-50 animate-bounce-slow"
                >
                    <MessageSquare className="h-6 w-6" />
                </Button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-[350px] md:w-[400px] h-[600px] bg-background border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-teal-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full">
                                <Bot className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">AI Assistant NusaLiving</h3>
                                <p className="text-xs text-teal-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    Online • Siap membantu
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4 bg-slate-50">
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                        msg.role === "user" ? "bg-slate-200" : "bg-teal-100 text-teal-600"
                                    )}>
                                        {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm shadow-sm",
                                        msg.role === "user"
                                            ? "bg-teal-600 text-white rounded-tr-none"
                                            : "bg-white text-slate-700 rounded-tl-none border"
                                    )}>
                                        {msg.content}
                                        <div className={cn(
                                            "text-[10px] mt-1 opacity-70",
                                            msg.role === "user" ? "text-teal-100 text-right" : "text-slate-400"
                                        )}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                                        <Bot className="h-4 w-4" />
                                    </div>
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t">
                        {/* Suggested Prompts */}
                        {messages.length < 3 && (
                            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                                <button onClick={() => { setInputValue("Bagaimana cara ajukan KPR?"); handleSend(); }} className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full whitespace-nowrap text-slate-600 transition-colors">
                                    Cara ajukan KPR?
                                </button>
                                <button onClick={() => { setInputValue("Cari desain rumah minimalis"); handleSend(); }} className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full whitespace-nowrap text-slate-600 transition-colors">
                                    Desain rumah minimalis
                                </button>
                                <button onClick={() => { setInputValue("Cek lokasi rawan banjir"); handleSend(); }} className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full whitespace-nowrap text-slate-600 transition-colors">
                                    Cek lokasi tanah
                                </button>
                            </div>
                        )}

                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSend()
                            }}
                            className="flex gap-2"
                        >
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ketik pesan..."
                                className="flex-1 focus-visible:ring-teal-600"
                            />
                            <Button type="submit" size="icon" className="bg-teal-600 hover:bg-teal-700 text-white" disabled={!inputValue.trim() || isLoading}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
