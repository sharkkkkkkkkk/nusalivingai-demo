import { ArrowRight, Briefcase, PlusCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function DeveloperEcosystem() {
    const developers = [
        "Jaya Properti Group",
        "Adhi Persada Properti",
        "Wika Realty",
        "Perumnas",
        "Ciputra Group"
    ]

    return (
        <section className="py-20 bg-slate-50 border-t" id="developers">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
                        Mitra Ekosistem
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Jaringan Pengembang Terpercaya</h2>
                    <p className="mt-4 text-muted-foreground max-w-[700px]">
                        Kami bekerjasama dengan pengembang properti terbaik untuk memastikan kualitas hunian yang Anda dapatkan.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 opacity-70 mb-16 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Mock Logos using text for reliability as 'dummy' */}
                    {developers.map((dev, i) => (
                        <div key={i} className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-sm border border-slate-200">
                            <BuildingIcon className="w-6 h-6 text-slate-400" />
                            <span className="font-bold text-slate-600">{dev}</span>
                        </div>
                    ))}
                    <div className="flex items-center gap-2 px-6 py-3 bg-slate-100 rounded-lg border border-dashed border-slate-300">
                        <span className="text-sm text-slate-500 italic">50+ Mitra Lainnya</span>
                    </div>
                </div>

                <div className="bg-background rounded-2xl border shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">Anda Pengembang Properti?</h3>
                            <p className="text-muted-foreground mb-8">
                                Bergabunglah dengan ekosistem NusaLiving untuk menjangkau ribuan calon pembeli potensial yang telah terverifikasi dan siap dengan fasilitas pembiayaan.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Users className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Akses Pasar Lebih Luas</h4>
                                        <p className="text-xs text-muted-foreground">Jangkau pembeli milenial dan Gen-Z secara tepat sasaran.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Briefcase className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Dashboard Manajemen Proyek</h4>
                                        <p className="text-xs text-muted-foreground">Kelola listing, pantau leads, dan analitik performa secara real-time.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <Link href="/partner/join">
                                    <Button className="w-full md:w-auto gap-2">
                                        Gabung Sebagai Mitra
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative h-64 md:h-auto bg-slate-100 min-h-[300px]">
                            {/* Conceptual Image for Developer Dashboard */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3/4 h-3/4 relative">
                                    <div className="absolute top-0 right-0 w-full h-full bg-white rounded-lg shadow-xl border p-4 transform rotate-3 transition-transform hover:rotate-0">
                                        <div className="flex items-center gap-4 mb-4 border-b pb-4">
                                            <div className="w-12 h-12 bg-slate-200 rounded animate-pulse"></div>
                                            <div className="space-y-2 flex-1">
                                                <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
                                                <div className="h-3 bg-slate-200 rounded w-1/3 animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-20 bg-slate-100 rounded w-full border border-dashed flex items-center justify-center text-slate-400 text-xs">
                                                Upload Project Data
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="h-8 bg-primary/20 rounded"></div>
                                                <div className="h-8 bg-slate-100 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg border flex items-center gap-3">
                                        <PlusCircle className="w-8 h-8 text-green-500" />
                                        <div>
                                            <p className="font-bold text-sm">New Lead!</p>
                                            <p className="text-xs text-muted-foreground">+12 Interest today</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function BuildingIcon(props: any) {
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
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01" />
            <path d="M16 6h.01" />
            <path d="M12 6h.01" />
            <path d="M12 10h.01" />
            <path d="M12 14h.01" />
            <path d="M16 10h.01" />
            <path d="M16 14h.01" />
            <path d="M8 10h.01" />
            <path d="M8 14h.01" />
        </svg>
    )
}
