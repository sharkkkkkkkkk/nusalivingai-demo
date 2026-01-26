"use client"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Sparkles, Loader2, Paperclip } from "lucide-react"
import { sendMessageToAI, ChatMessage } from "@/lib/chatbot-service"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'ai',
            content: "Halo! Aku NusaAI 🤖. Ada yang bisa aku bantu? Aku bisa rekomendasikan hunian, hitung KPR, atau kasih tips interior."
        }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isTyping])

    const handleSend = async () => {
        if (!inputValue.trim()) return

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue
        }

        setMessages(prev => [...prev, userMsg])
        setInputValue("")
        setIsTyping(true)

        try {
            const aiMsg = await sendMessageToAI(userMsg.content, messages)
            setMessages(prev => [...prev, aiMsg])
        } catch (error) {
            console.error(error)
        } finally {
            setIsTyping(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex flex-col h-screen bg-background">
            <Navbar />

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar (Desktop only) */}
                <div className="w-64 border-r bg-muted/10 hidden md:block p-4">
                    <Button variant="outline" className="w-full justify-start gap-2 mb-4" onClick={() => setMessages([])}>
                        <Sparkles className="h-4 w-4" /> New Chat
                    </Button>
                    <div className="text-sm font-medium text-muted-foreground mb-2 px-2">History</div>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start truncate text-xs h-9">
                            Cari kos di Tebet
                        </Button>
                        <Button variant="ghost" className="w-full justify-start truncate text-xs h-9">
                            Desain kamar minimalis
                        </Button>
                    </div>
                </div>

                {/* Main Chat */}
                <div className="flex-1 flex flex-col relative max-w-4xl mx-auto w-full">
                    <ScrollArea className="flex-1 p-4 md:p-6">
                        <div className="space-y-6 pb-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'ai' && (
                                        <Avatar className="h-8 w-8 border">
                                            <AvatarImage src="/assets/bot-avatar.png" />
                                            <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                                        </Avatar>
                                    )}

                                    <div className={`rounded-2xl p-4 max-w-[80%] text-sm leading-relaxed shadow-sm
                                        ${msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-white dark:bg-zinc-800 border rounded-tl-none'
                                        }`}>
                                        <div className="whitespace-pre-wrap font-sans">
                                            {msg.content}
                                        </div>
                                    </div>

                                    {msg.role === 'user' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3 justify-start">
                                    <Avatar className="h-8 w-8 border">
                                        <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted rounded-2xl rounded-tl-none p-4 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
                        <div className="relative flex items-end gap-2 p-2 border rounded-xl bg-background shadow-sm focus-within:ring-1 focus-within:ring-primary/50">
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-primary mb-[1px]">
                                <Paperclip className="h-5 w-5" />
                            </Button>
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Tanya soal hunian, KPR, atau desain..."
                                className="flex-1 max-h-32 min-h-[44px] py-3 bg-transparent border-0 focus:ring-0 resize-none text-sm scrollbar-hide focus:outline-none"
                                rows={1}
                            />
                            <Button
                                onClick={handleSend}
                                disabled={!inputValue.trim() || isTyping}
                                size="icon"
                                className="h-10 w-10 mb-[1px]"
                            >
                                {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            </Button>
                        </div>
                        <p className="text-center text-[10px] text-muted-foreground mt-2">
                            NusaLiving AI bisa salah. Selalu cek ulang informasi penting.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
