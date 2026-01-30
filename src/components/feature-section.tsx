import { Map, Home, Package, Store, ShieldCheck, Activity } from "lucide-react"
import Link from "next/link"

export function FeatureSection() {
    const features = [
        {
            title: "AI Property Discovery",
            description: "Pencarian hunian cerdas dengan filter gaya hidup, lokasi, dan budget. Temukan 'hidden gem' properti dengan AI.",
            icon: Map,
            href: "/explore",
        },
        {
            title: "AI Interior Design",
            description: "Visualisasikan renovasi ruangan dalam hitungan detik. Dari foto ruangan kosong menjadi hunian impian dengan teknologi Generative AI.",
            icon: Home,
            href: "/design",
        },
        {
            title: "Smart Housing Score",
            description: "Sistem skor cerdas (Affordability, Access, Gen Z Fit) untuk membantu Anda mengambil keputusan pembelian properti terbaik.",
            icon: Package,
            href: "/explore",
        },
        {
            title: "AI Decision Chatbot",
            description: "Asisten pribadi 24/7 yang siap menjawab pertanyaan seputar KPR, legalitas, hingga rekomendasi material bangunan.",
            icon: Store,
            href: "/chat",
        },
        {
            title: "Blockchain Verification",
            description: "Sistem verifikasi kepemilikan aset digital dan dokumen penting untuk keamanan transaksi properti masa depan.",
            icon: ShieldCheck,
            href: "/dashboard/blockchain",
        },
        {
            title: "Lifestyle Insights",
            description: "Data mendalam tentang karakter lingkungan, komunitas, dan vibe suatu kawasan agar Anda tidak salah pilih lokasi.",
            icon: Activity,
            href: "/explore",
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
