"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Home, ArrowRight, DollarSign, PenTool } from "lucide-react"

export default function PlannerPage() {
    const [isCreating, setIsCreating] = useState(false)
    const [projects, setProjects] = useState([
        { id: 1, name: "Rumah Keluarga Cemara", type: "Type 45", status: "Draft" }
    ])

    const handleCreateProject = () => {
        setIsCreating(true)
        // Simulate AI generation delay
        setTimeout(() => {
            const newProject = {
                id: projects.length + 1,
                name: `Project Baru #${projects.length + 1}`,
                type: "Custom AI",
                status: "Generating..."
            }
            setProjects([...projects, newProject])
            setIsCreating(false)
        }, 1500)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">AI Housing Planner</h1>
                    <p className="text-muted-foreground">Rencanakan hunian impian Anda dengan bantuan AI mulai dari denah hingga RAB.</p>
                </div>
                <Button onClick={handleCreateProject} disabled={isCreating}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    {isCreating ? "Sedang Membuat..." : "Buat Proyek Baru"}
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card
                    className="hover:border-primary/50 transition-colors cursor-pointer border-dashed border-2 flex flex-col items-center justify-center p-8 text-center h-[300px]"
                    onClick={handleCreateProject}
                >
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <PenTool className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Generate AI Design</h3>
                    <p className="text-sm text-muted-foreground mt-2">Buat konsep desain otomatis berdasarkan preferensi gaya dan luas lahan.</p>
                </Card>

                {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-md transition-shadow group">
                        <div className="aspect-video bg-slate-100 relative group overflow-hidden rounded-t-xl border-b">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium bg-slate-50">
                                {project.status === "Generating..." ? (
                                    <div className="flex flex-col items-center gap-2 animate-pulse">
                                        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                        <span>AI generating layout...</span>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Home className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                                        Preview {project.name}
                                    </div>
                                )}
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                            <CardDescription>Status: {project.status}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2 mb-4">
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{project.type}</span>
                            </div>
                            <Button variant="outline" className="w-full">
                                {project.status === "Generating..." ? "Menunggu AI..." : "Lanjutkan Perencanaan"}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function PlusIcon(props: any) {
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
