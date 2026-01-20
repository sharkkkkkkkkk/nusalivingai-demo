import Image from "next/image"
import { AlertCircle, Users, Sprout } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProblemSection() {
    const problems = [
        {
            title: "Kesulitan Perencanaan MBR & Gen Z",
            description: "Kesulitan merencanakan rumah yang terjangkau, aman, dan cepat dibangun di tengah kenaikan harga properti.",
            icon: AlertCircle,
        },
        {
            title: "Tenaga Lokal Belum Terdigitalisasi",
            description: "Minimnya akses ke pekerjaan terstandarisasi dan keterhubungan dengan ekosistem digital perumahan.",
            icon: Users,
        },
        {
            title: "Perencanaan Wilayah Belum Optimal",
            description: "Banyak wilayah belum mempertimbangkan risiko bencana, efisiensi energi, dan potensi lokal sejak awal.",
            icon: Sprout,
        },
    ]

    return (
        <section className="py-20 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                        Tantangan Hunian Indonesia Hari Ini
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-[700px]">
                        NusaLiving AI hadir untuk menjembatani kebutuhan hunian dengan teknologi yang relevan dan kontekstual.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:gap-12 items-center">
                    <div className="grid grid-rows-2 gap-4 w-full max-w-md mx-auto">
                        {/* Housing Growth Chart */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg group">
                            <Image
                                src="https://cdn.visiteliti.com/cms/assets/news_image/berita_valid1562751346.jpg"
                                alt="Annual Housing Sales Growth Chart"
                                fill
                                className="object-cover transition-transform group-hover:scale-105 duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute bottom-3 left-3 text-white">
                                <p className="text-xs font-semibold drop-shadow-lg">Pertumbuhan Tahunan Penjualan Rumah</p>
                            </div>
                        </div>

                        {/* Modern Housing Complex */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg group">
                            <Image
                                src="/images/modern-housing.jpg"
                                alt="Modern Housing Complex"
                                fill
                                className="object-cover transition-transform group-hover:scale-105 duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute bottom-3 left-3 text-white">
                                <p className="text-xs font-semibold drop-shadow-lg">Hunian Modern Berkelanjutan</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {problems.map((problem, index) => (
                            <Card key={index} className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
                                        <problem.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">{problem.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{problem.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
