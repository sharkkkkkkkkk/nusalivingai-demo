"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Map as MapIcon,
    Home,
    Package,
    Store,
    Settings,
    LogOut,
    Menu,
    Bell,
    Wifi,
    ShieldCheck,
    MessageSquare,
    ScanLine
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const { user, loading, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading, router])

    if (loading) {
        return <div className="h-screen w-full flex items-center justify-center bg-slate-50">Loading...</div>
    }

    if (!user) return null

    const navigation = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Planner", href: "/dashboard/planner", icon: Home },
        { name: "Smart Home (IoT)", href: "/dashboard/iot", icon: Wifi },
        { name: "Blockchain Verify", href: "/dashboard/blockchain", icon: ShieldCheck },
        { name: "AI Design Chat", href: "/dashboard/design-chat", icon: MessageSquare },
        { name: "Material Scanner", href: "/dashboard/scanner", icon: ScanLine },
        { name: "Site Analysis", href: "/dashboard/site-scan", icon: MapIcon },
        { name: "Material Catalog", href: "/dashboard/catalog", icon: Package },
        { name: "Jasa Ahli", href: "/dashboard/marketplace", icon: Store },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ]

    return (
        <div className="flex h-screen w-full bg-slate-50">
            {/* Sidebar Desktop */}
            <aside className="hidden w-64 flex-col border-r bg-white md:flex">
                <div className="flex h-16 items-center px-6 border-b">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative w-8 h-8">
                            <img src="/assets/Logo.png" alt="Logo" className="object-contain w-full h-full" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900">NusaLiving</span>
                    </Link>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        )
                    })}
                </div>
                <div className="border-t p-4">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={logout}>
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Header */}
                <header className="flex h-16 items-center justify-between border-b bg-white px-6">
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 p-0">
                                <div className="flex h-16 items-center px-6 border-b">
                                    <span className="text-lg font-bold">Menu</span>
                                </div>
                                <div className="flex flex-col gap-2 p-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="ml-auto flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-slate-400">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-3 border-l pl-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium">{user?.name || "User"}</p>
                                <p className="text-xs text-muted-foreground">Free Plan</p>
                            </div>
                            <Avatar>
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "User"}`} />
                                <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
