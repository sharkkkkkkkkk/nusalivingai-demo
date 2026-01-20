"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, ShieldCheck, FileCheck, Clock } from "lucide-react"

export default function BlockchainPage() {
    const [hash, setHash] = useState("")
    const [status, setStatus] = useState<"idle" | "verifying" | "verified" | "invalid">("idle")

    const handleVerify = () => {
        if (!hash) return
        setStatus("verifying")
        setTimeout(() => {
            setStatus("verified") // Simulate success
        }, 2000)
    }

    const transactions = [
        { id: "TX-9823", doc: "Land Deed #8821", date: "2023-10-24 14:20", status: "Confirmed", hash: "0x8f...2a1" },
        { id: "TX-4421", doc: "Building Permit (IMB)", date: "2023-10-22 09:15", status: "Confirmed", hash: "0x3e...9c2" },
        { id: "TX-3321", doc: "Material Purchase Order", date: "2023-10-20 16:45", status: "Pending", hash: "0x1a...4b3" },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Blockchain Verification</h1>
                <p className="text-slate-500">Ensure the authenticity of your property documents and transactions.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            Document Validator
                        </CardTitle>
                        <CardDescription>Enter the document hash or scan QR code to verify.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex space-x-2">
                            <Input
                                placeholder="Paste document hash e.g., 0x8f2..."
                                value={hash}
                                onChange={(e) => setHash(e.target.value)}
                            />
                            <Button onClick={handleVerify} disabled={status === "verifying"}>
                                {status === "verifying" ? "Checking..." : <Search className="h-4 w-4" />}
                            </Button>
                        </div>

                        {status === "verified" && (
                            <div className="rounded-lg bg-green-50 p-4 border border-green-200 animate-in fade-in slide-in-from-top-2">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-green-900">Document Authenticated</h4>
                                        <p className="text-sm text-green-700 mt-1">
                                            This document exists on the NusaChain ledger and has not been tampered with.
                                        </p>
                                        <div className="mt-3 text-xs text-green-800 font-mono bg-green-100 p-2 rounded">
                                            Block: #12,442,121<br />
                                            Timestamp: 2023-10-24 14:20:11 UTC
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Usage Stats</CardTitle>
                        <CardDescription>Your blockchain interaction history.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4 text-center">
                                <FileCheck className="h-6 w-6 mx-auto text-blue-500 mb-2" />
                                <div className="text-2xl font-bold">12</div>
                                <div className="text-xs text-muted-foreground">Verified Docs</div>
                            </div>
                            <div className="border rounded-lg p-4 text-center">
                                <Clock className="h-6 w-6 mx-auto text-orange-500 mb-2" />
                                <div className="text-2xl font-bold">3</div>
                                <div className="text-xs text-muted-foreground">Pending Actions</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Transaction ID</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Document</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Hash</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">{tx.id}</td>
                                        <td className="p-4 align-middle">{tx.doc}</td>
                                        <td className="p-4 align-middle">{tx.date}</td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={tx.status === "Confirmed" ? "default" : "secondary"}>
                                                {tx.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle font-mono text-xs text-muted-foreground">{tx.hash}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
