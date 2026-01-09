"use client"

import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { ArrowUpRight, Clock, Plus, Home as HomeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
    const { user } = useAuth()

    const projects = [
        {
            id: 1,
            name: "Rumah Impian Sleman",
            type: "Tipe 45 Modular",
            status: "Planning",
            date: "2 hari yang lalu",
            progress: 25,
            image: "bg-blue-100"
        },
        {
            id: 2,
            name: "Renovasi Dapur",
            type: "Interior",
            status: "Draft",
            date: "1 minggu yang lalu",
            progress: 10,
            image: "bg-orange-100"
        }
    ]

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Selamat Pagi, {user?.name.split(' ')[0] || 'User'} 👋</h1>
                    <p className="text-slate-500">Siap melanjutkan perencanaan hunian hari ini?</p>
                </div>
                <Link href="/dashboard/planner">
                    <Button className="gap-2 shadow-lg shadow-primary/25">
                        <Plus className="h-4 w-4" />
                        Buat Proyek Baru
                    </Button>
                </Link>
            </div>

            {/* Quick Stats Rows */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Proyek</CardTitle>
                        <HomeIcon className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">+1 bulan ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Estimasi Biaya</CardTitle>
                        <Coins className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rp 185Jt</div>
                        <p className="text-xs text-muted-foreground">Proyek utama</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Kesiapan Dokumen</CardTitle>
                        <FileCheck className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">40%</div>
                        <p className="text-xs text-muted-foreground">Perlu dilengkapi</p>
                    </CardContent>
                </Card>
            </div>

            {/* Active Projects Grid */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Proyek Aktif</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card key={project.id} className="group hover:border-primary/50 transition-colors cursor-pointer">
                            <div className={`h-32 w-full ${project.image} relative`}>
                                <div className="absolute top-3 right-3">
                                    <Badge variant={project.status === "Planning" ? "default" : "secondary"}>
                                        {project.status}
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    {project.name}
                                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </CardTitle>
                                <CardDescription>{project.type}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Progress</span>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${project.progress}%` }} />
                                    </div>
                                    <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                                        <Clock className="h-3 w-3" />
                                        Diupdate {project.date}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Empty State / Add New */}
                    <Link href="/dashboard/planner">
                        <Card className="h-full border-dashed flex flex-col items-center justify-center p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer min-h-[250px]">
                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                                <Plus className="h-6 w-6 text-slate-400" />
                            </div>
                            <h3 className="font-semibold text-slate-600">Mulai Proyek Baru</h3>
                            <p className="text-sm text-slate-400">Rencanakan hunian atau renovasi</p>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    )
}


function Coins(props: any) { return <Badge variant="outline" className="h-4 w-4 flex items-center justify-center p-0 border-none"><span className="text-[10px] font-bold">Rp</span></Badge> }
function FileCheck(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="m9 15 2 2 4-4" />
        </svg>
    )
}
