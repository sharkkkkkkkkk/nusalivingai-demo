import { Map, Home, Package, Store, ShieldCheck, Activity } from "lucide-react"
import Link from "next/link"

export function FeatureSection() {
    const features = [
        {
            title: "AI Site Scan & Housing Analysis",
            description: "Menganalisis kelayakan lokasi berdasarkan kontur dasar, risiko lingkungan, dan potensi efisiensi energi untuk rekomendasi hunian yang tepat.",
            icon: Map,
            href: "/dashboard/site-scan",
        },
        {
            title: "AI Housing Planner",
            description: "Memberikan rekomendasi tipe hunian, estimasi biaya, waktu pembangunan, dan tingkat keterjangkauan berbasis skema pembiayaan perumahan.",
            icon: Home,
            href: "/dashboard/planner",
        },
        {
            title: "Modular & Sustainable Housing Catalog",
            description: "Katalog rumah modular dan konvensional berkelanjutan dengan informasi harga, material lokal, durasi konstruksi, dan estimasi emisi karbon.",
            icon: Package,
            href: "/dashboard/catalog",
        },
        {
            title: "Marketplace Perencana Hunian Lokal",
            description: "Menghubungkan tukang dan arsitek lokal terverifikasi dengan pengguna melalui sistem rating, portofolio, dan estimasi jasa berbasis lokasi.",
            icon: Store,
            href: "/dashboard/marketplace",
        },
        {
            title: "Blockchain-based Verification",
            description: "Sistem pencatatan dokumen dan riwayat proyek berbasis hash untuk transparansi dan kepercayaan (Future-ready).",
            icon: ShieldCheck,
            href: "/dashboard/blockchain",
        },
        {
            title: "IoT Housing Dashboard",
            description: "Monitoring konsumsi energi dan air untuk mendukung efisiensi dan pelaporan ESG sederhana (Optional).",
            icon: Activity,
            href: "/dashboard/iot",
        },
    ]

    return (
        <section className="py-20 bg-slate-50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Fitur Utama Platform</h2>
                    <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
                        Teknologi canggih untuk mempermudah setiap langkah perjalanan kepemilikan rumah Anda.
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Link key={index} href={feature.href} className="group">
                            <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-all h-full">
                                <div className="p-4 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
