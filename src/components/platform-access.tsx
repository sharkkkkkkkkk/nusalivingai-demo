import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Smartphone, Monitor } from "lucide-react"

export function PlatformAccess() {
    return (
        <section className="py-20 md:py-32 bg-background overflow-hidden relative">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 order-2 md:order-1">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Akses Dimana Saja, Kapan Saja
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Akses NusaLiving AI melalui aplikasi mobile dan web untuk fleksibilitas perencanaan kapan saja.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/dashboard" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full flex gap-2">
                                    <Monitor className="h-4 w-4" />
                                    Coba Prototype
                                </Button>
                            </Link>
                            <Link href="#footer" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full flex gap-2">
                                    <Smartphone className="h-4 w-4" />
                                    Hubungi Tim
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative order-1 md:order-2">
                        {/* Abstract decorative shape */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-teal-100/50 rounded-full blur-3xl opacity-70" />
                        <div className="relative aspect-video w-full rounded-2xl shadow-2xl overflow-hidden border bg-background">
                            <Image
                                src="/images/platform.png"
                                alt="NusaLiving Platform Dashboard Interface"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
