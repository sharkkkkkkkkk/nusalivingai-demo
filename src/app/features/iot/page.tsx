"use client"

import Link from "next/link"
import { ArrowLeft, Zap, Droplets, Thermometer, Activity, Power } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function IoTPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="text-slate-200 hover:text-white hover:bg-slate-800">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">Smart Home Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm text-slate-400">System Online</span>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-slate-900 border-slate-800 text-slate-50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Listrik (Hari Ini)</CardTitle>
                            <Zap className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12.5 kWh</div>
                            <p className="text-xs text-slate-500">-4% dari rata-rata</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800 text-slate-50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Air (Hari Ini)</CardTitle>
                            <Droplets className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0.4 m³</div>
                            <p className="text-xs text-slate-500">Normal</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800 text-slate-50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Suhu Ruang</CardTitle>
                            <Thermometer className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24°C</div>
                            <p className="text-xs text-slate-500">Nyaman</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800 text-slate-50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
                            <Activity className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-slate-500">2 Idle</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Control & Charts */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        {/* Energy Chart Mockup */}
                        <Card className="bg-slate-900 border-slate-800 text-slate-50">
                            <CardHeader>
                                <CardTitle>Konsumsi Energi Minggu Ini</CardTitle>
                                <CardDescription className="text-slate-400">Monitoring real-time penggunaan listrik.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px] flex items-end justify-between gap-2 pt-4 px-2">
                                    {[40, 65, 45, 80, 55, 30, 60].map((h, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                            <div
                                                className="w-full bg-teal-500/20 group-hover:bg-teal-500 transition-all rounded-t-md relative"
                                                style={{ height: `${h}%` }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {h}kWh
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-500">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Quick Controls</h3>
                        {[
                            { name: "Living Room Light", icon: Zap, state: true },
                            { name: "AC Master Bedroom", icon: Thermometer, state: true },
                            { name: "Water Pump", icon: Droplets, state: false },
                            { name: "Garden Lights", icon: Zap, state: false },
                        ].map((device, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${device.state ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-500'}`}>
                                        <device.icon className="h-5 w-5" />
                                    </div>
                                    <span className={device.state ? 'text-slate-200' : 'text-slate-500'}>{device.name}</span>
                                </div>
                                <Button size="icon" variant="ghost" className={device.state ? 'text-green-500' : 'text-slate-600'}>
                                    <Power className="h-5 w-5" />
                                </Button>
                            </div>
                        ))}

                        <div className="mt-8 p-4 rounded-xl bg-teal-900/10 border border-teal-900/50">
                            <div className="flex gap-3">
                                <Badge variant="outline" className="border-teal-500 text-teal-400">Tip Hemat</Badge>
                                <span className="text-sm text-teal-200">Matikan AC saat suhu luar &lt; 24°C</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
