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

    const generateResponse = async (userMessage: Message) => {
        try {
            // Prepare context (last 5 messages to keep payload small but contextual)
            const contextMessages = [...messages, userMessage].slice(-6).map(m => ({
                role: m.role,
                content: m.content
            }));

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: contextMessages }),
            });

            if (!res.ok) throw new Error("API Error");

            const data = await res.json();
            return data.content;
        } catch (error) {
            console.error(error);
            // Fallback if API fails completely (network error)
            return "Maaf, koneksi ke server NusaLiving AI sedang gangguan. Coba periksa internetmu ya!";
        }
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
            const responseText = await generateResponse(userMsg)
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
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
                    <div className="bg-white px-3 py-1.5 rounded-lg shadow-md border text-xs font-medium text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mb-1 whitespace-nowrap">
                        Klik untuk eksplorasi sistem AI & Teknis
                    </div>
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="h-14 w-14 rounded-full shadow-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white animate-bounce-slow flex items-center justify-center"
                    >
                        <MessageSquare className="h-6 w-6" />
                    </Button>
                </div>
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
