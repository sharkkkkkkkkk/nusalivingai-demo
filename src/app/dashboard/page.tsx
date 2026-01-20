"use client"

import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { ArrowUpRight, Clock, Plus, Home as HomeIcon, Map as MapIcon, MessageSquare, ShieldCheck, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
    const { user } = useAuth()
    const { t } = useLanguage()

    const projects = [
        {
            id: 1,
            name: "Rumah Impian Sleman",
            type: "Tipe 45 Modular",
            status: "Planning",
            date: "2 hari yang lalu",
            progress: 25,
            image: "/images/housing-complex.jpg"
        },
        {
            id: 2,
            name: "Renovasi Dapur",
            type: "Interior",
            status: "Draft",
            date: "1 minggu yang lalu",
            progress: 10,
            image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80"
        }
    ]

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t("dashboard.welcome")}, {user?.name.split(' ')[0] || 'User'} 👋</h1>
                    <p className="text-slate-500">{t("dashboard.subtitle")}</p>
                </div>
                <Link href="/dashboard/planner">
                    <Button className="gap-2 shadow-lg shadow-primary/25">
                        <Plus className="h-4 w-4" />
                        {t("dashboard.newProject")}
                    </Button>
                </Link>
            </div>

            {/* Quick Stats Rows */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{t("dashboard.totalProjects")}</CardTitle>
                        <HomeIcon className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">+1 {t("dashboard.thisMonth")}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{t("dashboard.estimatedCost")}</CardTitle>
                        <Coins className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rp 185Jt</div>
                        <p className="text-xs text-muted-foreground">{t("dashboard.mainProject")}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{t("dashboard.documentReady")}</CardTitle>
                        <FileCheck className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">40%</div>
                        <p className="text-xs text-muted-foreground">{t("dashboard.needsCompletion")}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Active Projects Grid */}
            <div>
                <h2 className="text-xl font-semibold mb-4">{t("dashboard.activeProjects")}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card key={project.id} className="group hover:border-primary/50 transition-colors cursor-pointer">
                            <div className="h-32 w-full relative overflow-hidden bg-slate-100">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                <div className="absolute top-3 right-3">
                                    <Badge variant={project.status === "Planning" ? "default" : "secondary"} className="shadow-sm">
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
                                        <span>{t("dashboard.progress")}</span>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${project.progress}%` }} />
                                    </div>
                                    <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                                        <Clock className="h-3 w-3" />
                                        {t("dashboard.updated")} {project.date}
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
                            <h3 className="font-semibold text-slate-600">{t("dashboard.startNew")}</h3>
                            <p className="text-sm text-slate-400">{t("dashboard.planHousing")}</p>
                        </Card>
                    </Link>
                </div>
            </div>
            {/* Smart Tools Quick Access */}
            <div>
                <h2 className="text-xl font-semibold mb-4">{t("dashboard.smartTools")}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/dashboard/site-scan">
                        <Card className="hover:bg-slate-50 transition-colors cursor-pointer border-none shadow-sm bg-teal-50/50">
                            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                                <div className="p-2 bg-teal-100 rounded-full">
                                    <MapIcon className="h-5 w-5 text-teal-600" />
                                </div>
                                <span className="font-medium text-sm">AI Site Scan</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/dashboard/design-chat">
                        <Card className="hover:bg-slate-50 transition-colors cursor-pointer border-none shadow-sm bg-indigo-50/50">
                            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                                <div className="p-2 bg-indigo-100 rounded-full">
                                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                                </div>
                                <span className="font-medium text-sm">Design Assistant</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/dashboard/blockchain">
                        <Card className="hover:bg-slate-50 transition-colors cursor-pointer border-none shadow-sm bg-blue-50/50">
                            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                                <div className="p-2 bg-blue-100 rounded-full">
                                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                                </div>
                                <span className="font-medium text-sm">Smart Contract</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/dashboard/iot">
                        <Card className="hover:bg-slate-50 transition-colors cursor-pointer border-none shadow-sm bg-amber-50/50">
                            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                                <div className="p-2 bg-amber-100 rounded-full">
                                    <Wifi className="h-5 w-5 text-amber-600" />
                                </div>
                                <span className="font-medium text-sm">Smart Home</span>
                            </CardContent>
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
