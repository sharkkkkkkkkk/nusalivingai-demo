import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function ClosingStatement() {
    return (
        <section className="py-20 md:py-32 bg-slate-50 border-t">
            <div className="container px-4 md:px-6 mx-auto text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800 leading-tight">
                        NusaLiving AI bukan sekadar platform desain rumah—<br className="hidden md:inline" />tetapi fondasi pengambilan keputusan hunian yang lebih adil, terjangkau, dan berkelanjutan.
                    </h2>

                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="rounded-full px-8 h-12 text-lg">
                            Hubungi Kami
                        </Button>
                    </div>

                    <div className="mt-16 w-full max-w-5xl mx-auto relative aspect-[21/9] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="/images/closing.png"
                            alt="Sustainable Housing Future"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white text-left max-w-sm">
                            <p className="font-semibold text-lg">Visi 2030</p>
                            <p className="text-sm opacity-90">Membangun Indonesia yang Lebih Baik</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
