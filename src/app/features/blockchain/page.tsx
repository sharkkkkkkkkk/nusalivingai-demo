"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, ShieldCheck, FileCheck, Lock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function BlockchainPage() {
    const [verifying, setVerifying] = useState(false)
    const [verified, setVerified] = useState(false)

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault()
        setVerifying(true)
        setTimeout(() => {
            setVerifying(false)
            setVerified(true)
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Verifikasi Dokumen Blockchain</h1>
                </div>

                <Card className="border-slate-300 shadow-md">
                    <CardHeader className="text-center pb-8 border-b bg-slate-100/50">
                        <div className="mx-auto bg-blue-100 p-4 rounded-full mb-4 w-fit">
                            <ShieldCheck className="h-10 w-10 text-blue-600" />
                        </div>
                        <CardTitle className="text-2xl">Ledger Transparan</CardTitle>
                        <CardDescription>
                            Verifikasi keaslian dokumen kepemilikan, IMB, dan progress pembangunan yang tersimpan di jaringan blockchain NusaChain.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8 space-y-6">
                        <form onSubmit={handleVerify} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Nomor ID Dokumen / Hash Transaksi</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Contoh: 0x8f9a...3b21"
                                            className="pl-10 font-mono text-sm"
                                            defaultValue={verified ? "0x7d3a2b1c9e8f4d5a6b7c8d9e0f1a2b3c4d5e6f7" : ""}
                                        />
                                    </div>
                                    <Button type="submit" disabled={verifying || verified}>
                                        {verifying ? "Memverifikasi..." : "Cek Validitas"}
                                    </Button>
                                </div>
                            </div>
                        </form>

                        {verified && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6 animate-in fade-in slide-in-from-top-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <Check className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <h3 className="text-lg font-bold text-green-800">Dokumen Valid & Terverifikasi</h3>
                                        <div className="space-y-1 text-sm text-green-700">
                                            <div className="flex justify-between border-b border-green-200 pb-1">
                                                <span>Timestamp:</span>
                                                <span className="font-mono">2024-10-24 14:30:22 UTC</span>
                                            </div>
                                            <div className="flex justify-between border-b border-green-200 pb-1">
                                                <span>Block Height:</span>
                                                <span className="font-mono">#14,205,331</span>
                                            </div>
                                            <div className="flex justify-between border-b border-green-200 pb-1">
                                                <span>Issuer:</span>
                                                <span className="font-semibold">BPN Digital Official</span>
                                            </div>
                                            <div className="flex justify-between pt-1">
                                                <span>Owner:</span>
                                                <span className="font-semibold">Ahmad Fulan</span>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="w-full mt-4 text-green-700 border-green-300 hover:bg-green-100">
                                            <FileCheck className="mr-2 h-4 w-4" />
                                            Lihat Sertifikat Digital
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
