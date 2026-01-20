"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Image as ImageIcon, Sparkles, User, Bot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

type Message = {
    id: number
    role: "user" | "ai"
    content: string
    image?: string
}

export default function DesignChatPage() {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: "ai",
            content: "Hello! I'm your AI Interior Design Assistant. Upload a photo of your room or describe the style you're looking for (e.g., 'Modern Minimalist Living Room')."
        }
    ])
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg: Message = {
            id: Date.now(),
            role: "user",
            content: input
        }

        setMessages(prev => [...prev, userMsg])
        setInput("")
        setLoading(true)

        // Simulate AI processing
        setTimeout(() => {
            const aiMsg: Message = {
                id: Date.now() + 1,
                role: "ai",
                content: "Here is a concept based on your description. I've focused on clean lines, neutral colors, and natural light.",
                image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
            }
            setMessages(prev => [...prev, aiMsg])
            setLoading(false)
        }, 3000)
    }

    return (
        <div className="flex h-[calc(100vh-8rem)] flex-col md:flex-row gap-6">
            {/* Chat Area */}
            <Card className="flex-1 flex flex-col overflow-hidden border-0 shadow-lg">
                <div className="bg-primary/5 p-4 border-b flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold text-primary">NusaDesign AI</h2>
                </div>

                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                <Avatar className="h-8 w-8">
                                    {msg.role === "user" ? (
                                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                                    ) : (
                                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-4 w-4" /></AvatarFallback>
                                    )}
                                </Avatar>
                                <div className={`flex flex-col gap-2 max-w-[80%]`}>
                                    <div
                                        className={`rounded-lg p-3 text-sm ${msg.role === "user"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-slate-100 text-slate-800"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                    {msg.image && (
                                        <div className="rounded-lg overflow-hidden border shadow-sm mt-1">
                                            <img src={msg.image} alt="Generated Design" className="w-full h-auto object-cover max-h-64" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-4 w-4" /></AvatarFallback>
                                </Avatar>
                                <div className="bg-slate-100 rounded-lg p-3 flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                                    <span className="text-xs text-slate-500">Generating design...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="p-4 border-t bg-white">
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="shrink-0" title="Upload Room Photo">
                            <ImageIcon className="h-4 w-4 text-slate-500" />
                        </Button>
                        <Input
                            placeholder="Describe your dream room..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            disabled={loading}
                        />
                        <Button onClick={handleSend} disabled={loading || !input.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Side Panel (Suggestions/History) - Hidden on mobile */}
            <div className="hidden w-80 flex-col gap-4 md:flex">
                <Card className="flex-1 p-4 shadow-sm">
                    <h3 className="font-semibold mb-4 text-sm">Design Suggestions</h3>
                    <div className="space-y-3">
                        {["Nordic Minimalist", "Industrial Loft", "Modern Tropical", "Japandi Style"].map((style) => (
                            <Button
                                key={style}
                                variant="outline"
                                className="w-full justify-start text-xs h-9"
                                onClick={() => setInput(prev => `${prev} ${style}`)}
                            >
                                <Sparkles className="h-3 w-3 mr-2 text-primary" />
                                {style}
                            </Button>
                        ))}
                    </div>
                </Card>
                <Card className="p-4 bg-blue-50 border-blue-100">
                    <h3 className="font-semibold text-blue-900 text-sm mb-2">Pro Tip</h3>
                    <p className="text-xs text-blue-700">
                        Upload a photo of your empty room for better results. The AI will preserve the room structure while redesigning the interior.
                    </p>
                </Card>
            </div>
        </div>
    )
}
