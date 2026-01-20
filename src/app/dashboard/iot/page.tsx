"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Droplets, Lock, Sun, Battery, Thermometer, Wifi } from "lucide-react"

export default function IOTPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Smart Home Control</h1>
                <p className="text-slate-500">Monitor and control your home IoT devices from one dashboard.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-blue-100">Total Energy</CardTitle>
                        <Zap className="h-4 w-4 text-blue-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45.2 kWh</div>
                        <p className="text-xs text-blue-100 mt-1">-12% from last week</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-cyan-100">Water Usage</CardTitle>
                        <Droplets className="h-4 w-4 text-cyan-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12.5 m³</div>
                        <p className="text-xs text-cyan-100 mt-1">Normal usage</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-amber-100">Solar Power</CardTitle>
                        <Sun className="h-4 w-4 text-amber-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8.4 kWh</div>
                        <p className="text-xs text-amber-100 mt-1">Generating now</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-green-100">Climate</CardTitle>
                        <Thermometer className="h-4 w-4 text-green-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24°C</div>
                        <p className="text-xs text-green-100 mt-1">Humidity: 65%</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="devices" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="devices">Connected Devices</TabsTrigger>
                    <TabsTrigger value="automation">Automations</TabsTrigger>
                    <TabsTrigger value="energy">Energy Monitor</TabsTrigger>
                </TabsList>

                <TabsContent value="devices" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Smart Lock Card */}
                        <Card className="overflow-hidden">
                            <div className="h-48 relative bg-slate-100">
                                <img src="/images/catalog/smart_lock.jpg" alt="Smart Lock" className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2">
                                    <Badge variant="default" className="bg-green-500">Locked</Badge>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    Main Door Lock
                                    <Switch checked={true} />
                                </CardTitle>
                                <CardDescription>Smart biometric lock</CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Solar Panel Status */}
                        <Card className="overflow-hidden">
                            <div className="h-48 relative bg-slate-100">
                                <img src="/images/catalog/solar_panel.jpg" alt="Solar Panel" className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2">
                                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 flex gap-1 items-center">
                                        <Sun className="h-3 w-3" /> Active
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    Roof Solar Array
                                    <span className="text-sm font-normal text-slate-500">3.2 kW Output</span>
                                </CardTitle>
                                <CardDescription>Monocrystalline Panel System</CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Living Room Light */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-base font-medium">Living Room Light</CardTitle>
                                <Switch />
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-4 mt-4">
                                    <Sun className="h-4 w-4 text-slate-400" />
                                    <div className="flex-1 h-2 bg-slate-100 rounded-full">
                                        <div className="w-3/4 h-full bg-yellow-400 rounded-full" />
                                    </div>
                                    <span className="text-sm text-slate-500">75%</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Water Meter */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-base font-medium">Smart Water Meter</CardTitle>
                                <Wifi className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="mt-4 flex flex-col gap-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Flow Rate</span>
                                        <span className="font-medium">12 L/min</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Pressure</span>
                                        <span className="font-medium">2.4 Bar</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Leak Status</span>
                                        <span className="text-green-600 font-medium">Safe</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
