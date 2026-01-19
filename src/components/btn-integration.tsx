import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Calculator, CreditCard, PieChart } from "lucide-react"

export function BtnIntegration() {
    return (
        <section className="py-20 bg-slate-950 text-white relative overflow-hidden" id="financing">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center rounded-full bg-blue-900/50 px-4 py-1.5 text-sm font-medium text-blue-200 border border-blue-700/50 mb-6">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Financing Partners
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Wujudkan Rumah Impian dengan Pilihan Bank Terlengkap
                    </h2>
                    <p className="text-xl text-slate-400">
                        NusaLiving bekerja sama dengan bank-bank terkemuka di Indonesia untuk memberikan pendaan hunian modular dengan bunga rendah dan persetujuan instan.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Bank BTN - Main Partner */}
                    <div className="col-span-1 lg:col-span-2 relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-bold rounded-full border border-yellow-500/20">RECOMMENDED</span>
                        </div>
                        <div className="p-8 flex flex-col h-full justify-between relative z-10">
                            <div>
                                <div className="h-16 w-32 bg-white rounded-lg flex items-center justify-center p-2 mb-6 shadow-lg">
                                    <Image src="/assets/logo-btn-new.png" alt="Bank BTN" width={100} height={40} className="object-contain" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">KPR BTN Platinum</h3>
                                <p className="text-slate-400 mb-6 max-w-md">Solusi pembiayaan rumah khusus milenial dengan tenor panjang hingga 30 tahun dan bunga mulai 3.75%.</p>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <PieChart className="w-5 h-5 text-blue-400" />
                                        <span className="text-sm font-medium">Bunga 3.75% Fixed</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-blue-400" />
                                        <span className="text-sm font-medium">Tenor s.d 30 Tahun</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Link href="/dashboard/financing" className="flex-1">
                                    <Button className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold w-full">
                                        Ajukan Sekarang
                                    </Button>
                                </Link>
                                <Link href="/dashboard/financing?tab=calculator" className="flex-1">
                                    <Button variant="outline" className="border-slate-700 hover:bg-slate-800 w-full">
                                        Simulasi
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {/* Abstract Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* BCA */}
                    <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all duration-300 p-6">
                        <div className="h-12 w-28 bg-white rounded-lg flex items-center justify-center p-2 mb-4">
                            {/* Placeholder for BCA: using textual representation styled nicely */}
                            <span className="text-blue-800 font-extrabold text-xl tracking-tighter">BCA</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">KPR BCA</h3>
                        <p className="text-sm text-slate-400 mb-4">Pilihan bunga fix 1-5 tahun yang stabil dan transparan.</p>
                        <ul className="text-sm text-slate-300 space-y-2 mb-6">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>Bunga Spesial 4.25%</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>Proses Cepat</li>
                        </ul>
                        <Link href="/dashboard/financing" className="w-full">
                            <Button variant="ghost" className="w-full border border-slate-700 hover:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">Lihat Detail</Button>
                        </Link>
                    </div>

                    {/* Mandiri */}
                    <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all duration-300 p-6">
                        <div className="h-12 w-28 bg-white rounded-lg flex items-center justify-center p-2 mb-4">
                            <span className="text-blue-900 font-extrabold text-xl tracking-wider">mandiri</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Mandiri KPR</h3>
                        <p className="text-sm text-slate-400 mb-4">Wujudkan hunian idaman dengan angsuran fleksibel.</p>
                        <ul className="text-sm text-slate-300 space-y-2 mb-6">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>Bunga mulai 3.88%</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>Tenor s.d 20 Tahun</li>
                        </ul>
                        <Link href="/dashboard/financing" className="w-full">
                            <Button variant="ghost" className="w-full border border-slate-700 hover:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">Lihat Detail</Button>
                        </Link>
                    </div>

                    {/* BNI */}
                    <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all duration-300 p-6">
                        <div className="h-12 w-28 bg-white rounded-lg flex items-center justify-center p-2 mb-4">
                            <span className="text-orange-600 font-extrabold text-xl tracking-tight">BNI</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">BNI Griya</h3>
                        <p className="text-sm text-slate-400 mb-4">Bebas pilih lokasi hunian, proses mudah dan cepat.</p>
                        <ul className="text-sm text-slate-300 space-y-2 mb-6">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>Fitur Griya Gue</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>Suku Bunga Ringan</li>
                        </ul>
                        <Link href="/dashboard/financing" className="w-full">
                            <Button variant="ghost" className="w-full border border-slate-700 hover:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">Lihat Detail</Button>
                        </Link>
                    </div>

                    {/* BRI */}
                    <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all duration-300 p-6">
                        <div className="h-12 w-28 bg-white rounded-lg flex items-center justify-center p-2 mb-4">
                            <span className="text-blue-700 font-extrabold text-xl tracking-tight">BRI</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">KPR BRI</h3>
                        <p className="text-sm text-slate-400 mb-4">Solusi kepemilikan rumah dengan jaringan terluas.</p>
                        <ul className="text-sm text-slate-300 space-y-2 mb-6">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>Bebas Biaya Admin</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>Jangka Waktu Panjang</li>
                        </ul>
                        <Link href="/dashboard/financing" className="w-full">
                            <Button variant="ghost" className="w-full border border-slate-700 hover:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">Lihat Detail</Button>
                        </Link>
                    </div>
                </div>

                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] opacity-10"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Bingung pilih bank yang mana?</h3>
                            <p className="text-blue-100">Gunakan fitur komparasi KPR kami untuk membandingkan angsuran, bunga, dan syarat dari semua bank.</p>
                        </div>
                        <Link href="/dashboard/financing">
                            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                                Bandingkan KPR <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
