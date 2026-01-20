"use client"

import { useState } from "react"
import { Camera, RefreshCw, Check, AlertCircle, ScanLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function MaterialScannerPage() {
    const [scanning, setScanning] = useState(false)
    const [result, setResult] = useState<null | { name: string, quality: string, info: string, confidence: number }>(null)

    const handleScan = () => {
        setScanning(true)
        setResult(null)

        // Simulate scanning delay
        setTimeout(() => {
            setScanning(false)
            setResult({
                name: "Red Brick (Bata Merah)",
                quality: "Premium Grade A",
                info: "Standard dimensions 20x10x5cm. High density, suitable for structural walls.",
                confidence: 98
            })
        }, 3000)
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Material Scanner</h1>
                <p className="text-slate-500">Point your camera at a building material to identifying it and check quality.</p>
            </div>

            <Card className="overflow-hidden border-2 border-slate-200">
                <div className="relative aspect-[4/3] bg-slate-900 flex items-center justify-center">
                    {/* Camera Viewport Simulation */}
                    {!result && !scanning && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                            <img
                                src="https://images.unsplash.com/photo-1590074256249-1c7ec833448f?auto=format&fit=crop&w=800&q=80"
                                className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm mix-blend-multiply"
                                alt="Camera Feed"
                            />
                            <div className="z-10 bg-white/90 p-6 rounded-full shadow-xl">
                                <Camera className="h-12 w-12 text-slate-800" />
                            </div>
                            <p className="z-10 mt-4 font-medium text-slate-800 bg-white/80 px-4 py-1 rounded-full">Camera Ready</p>
                        </div>
                    )}

                    {/* Scanning Animation */}
                    {scanning && (
                        <div className="absolute inset-0 bg-black/60 z-20 flex flex-col items-center justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1590074256249-1c7ec833448f?auto=format&fit=crop&w=800&q=80"
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                                alt="Scanning..."
                            />
                            <div className="absolute inset-0 bg-scan-line animate-scan-down opacity-50"></div>
                            <div className="z-30 flex flex-col items-center">
                                <ScanLine className="h-16 w-16 text-primary animate-pulse" />
                                <p className="text-white font-mono mt-4 text-lg">Analyzing Structure...</p>
                            </div>
                        </div>
                    )}

                    {/* Result View */}
                    {result && (
                        <img
                            src="/images/catalog/bricks.jpg"
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="Scanned Object"
                        />
                    )}

                    {/* Overlay UI */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30 px-6">
                        {!scanning && (
                            <Button
                                size="lg"
                                className="rounded-full px-8 shadow-xl shadow-primary/20"
                                onClick={handleScan}
                            >
                                {result ? <><RefreshCw className="mr-2 h-4 w-4" /> Scan Again</> : "Start Scan"}
                            </Button>
                        )}
                    </div>
                </div>
            </Card>

            {/* Results Panel */}
            {result && (
                <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
                    <Card className="border-green-200 bg-green-50/50">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">{result.name}</h2>
                                    <Badge variant="outline" className="mt-1 border-green-500 text-green-700 bg-green-100">
                                        {result.quality}
                                    </Badge>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-600">{result.confidence}%</div>
                                    <div className="text-xs text-muted-foreground">Confidence</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Structural Integrity</span>
                                        <span className="font-medium text-slate-700">Excellent</span>
                                    </div>
                                    <Progress value={95} className="h-2" />
                                </div>

                                <div className="bg-white p-4 rounded-lg border text-sm text-slate-600">
                                    <div className="flex gap-2 items-start">
                                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        <p>{result.info}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
            <style jsx>{`
                @keyframes scan-down {
                    0% { top: 0; height: 0; background: linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.5)); border-bottom: 2px solid #22c55e; }
                    100% { top: 100%; height: 20px; background: linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0)); border-bottom: 0px solid transparent; }
                }
                .animate-scan-down {
                    animation: scan-down 2s infinite linear;
                    width: 100%;
                    position: absolute;
                }
            `}</style>
        </div>
    )
}
