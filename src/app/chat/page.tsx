"use client"

import { Suspense } from "react"
import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ChatMessage {
    id: string;
    role: 'user' | 'ai';
    content: string;
}

function ChatContent() {
    const searchParams = useSearchParams()
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'ai',
            content: "Halo! Aku NusaAI 🤖. Ada yang bisa aku bantu? Aku bisa rekomendasikan hunian, hitung KPR, atau kasih tips interior."
        }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const context = searchParams.get('context')
        if (context) {
            setInputValue(context)
        }
    }, [searchParams])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue("")
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role === 'ai' ? 'assistant' : 'user',
                        content: m.content
                    }))
                })
            })

            if (!response.ok) throw new Error('API request failed')

            const data = await response.json()

            const aiMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: data.content
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error('Chat error:', error)
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: "Maaf, ada gangguan teknis. Tapi tenang, semua fitur NusaLiving tetap bisa kamu akses langsung! Coba explore halaman Explore, Design, atau Scan ya! 😊"
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-teal-50">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full mb-4">
                        <Sparkles className="h-5 w-5" />
                        <span className="font-semibold">AI Housing Advisor</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                        Chat dengan NusaAI
                    </h1>
                    <p className="text-slate-600">
                        Tanya apa aja tentang hunian, budget, lokasi, atau desain interior
                    </p>
                </div>

                <Card className="shadow-xl border-0 overflow-hidden">
                    <ScrollArea className="h-[500px] p-6" ref={scrollRef}>
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <Avatar className={`h-8 w-8 ${message.role === 'ai' ? 'bg-gradient-to-br from-teal-500 to-blue-500' : 'bg-slate-200'}`}>
                                        <AvatarFallback>
                                            {message.role === 'ai' ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4" />}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div
                                        className={`flex-1 max-w-[80%] ${message.role === 'user'
                                                ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white'
                                                : 'bg-slate-100 text-slate-800'
                                            } rounded-2xl px-4 py-3 ${message.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-3">
                                    <Avatar className="h-8 w-8 bg-gradient-to-br from-teal-500 to-blue-500">
                                        <AvatarFallback>
                                            <Bot className="h-4 w-4 text-white" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
                                            <span className="text-sm text-slate-600">NusaAI sedang berpikir...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <div className="border-t bg-white p-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Ketik pertanyaan kamu di sini..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button
                                onClick={handleSend}
                                disabled={!inputValue.trim() || isLoading}
                                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {[
                                "Cari kost di Depok budget 2 juta",
                                "Apartemen dekat MRT",
                                "Desain kamar tidur minimalis",
                                "Hitung KPR rumah 500 juta"
                            ].map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setInputValue(suggestion)}
                                    className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 transition-colors"
                                    disabled={isLoading}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    )
}

export default function ChatPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-600 mx-auto mb-4" />
                    <p className="text-slate-600">Loading chat...</p>
                </div>
            </div>
        }>
            <ChatContent />
        </Suspense>
    )
}
