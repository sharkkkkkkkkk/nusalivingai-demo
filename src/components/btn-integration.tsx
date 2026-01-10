import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Calculator, CreditCard, PieChart } from "lucide-react"

export function BtnIntegration() {
    return (
        <section className="py-20 bg-blue-900 text-white relative overflow-hidden" id="financing">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 space-y-8">
                        <div className="inline-flex items-center rounded-lg bg-blue-800 px-3 py-1 text-sm font-medium text-blue-200">
                            Official Financing Partner
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Real BTN Logo */}
                            <div className="relative h-24 w-60 bg-white/90 rounded-xl p-3 flex items-center justify-center shrink-0 backdrop-blur-sm shadow-lg">
                                <Image src="/assets/logo-btn-new.png" alt="Logo Bank BTN" fill className="object-contain p-2" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Wujudkan Rumah Impian dengan KPR BTN
                            </h2>
                        </div>

                        <p className="text-lg text-blue-100 max-w-[600px]">
                            Dapatkan kemudahan pengajuan KPR bersubsidi maupun non-subsidi langsung dari platform NusaLiving. Terintegrasi langsung dengan sistem Bank BTN.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-blue-800/50 p-4 rounded-lg flex gap-3 items-start border border-blue-700/50 hover:bg-blue-800 transition-colors">
                                <Calculator className="w-6 h-6 text-yellow-400 mt-1" />
                                <div>
                                    <h3 className="font-bold text-lg">Simulasi KPR</h3>
                                    <p className="text-sm text-blue-200">Hitung angsuran sesuai kemampuanmu dengan kalkulator presisi.</p>
                                </div>
                            </div>
                            <div className="bg-blue-800/50 p-4 rounded-lg flex gap-3 items-start border border-blue-700/50 hover:bg-blue-800 transition-colors">
                                <CreditCard className="w-6 h-6 text-yellow-400 mt-1" />
                                <div>
                                    <h3 className="font-bold text-lg">Pengajuan Online</h3>
                                    <p className="text-sm text-blue-200">Ajukan aplikasi KPR tanpa perlu antre di bank. Cepat & Transparan.</p>
                                </div>
                            </div>
                            <div className="bg-blue-800/50 p-4 rounded-lg flex gap-3 items-start border border-blue-700/50 hover:bg-blue-800 transition-colors">
                                <PieChart className="w-6 h-6 text-yellow-400 mt-1" />
                                <div>
                                    <h3 className="font-bold text-lg">Bunga Kompetitif</h3>
                                    <p className="text-sm text-blue-200">Nikmati suku bunga spesial khusus pengguna NusaLiving.</p>
                                </div>
                            </div>
                            <div className="bg-blue-800/50 p-4 rounded-lg flex gap-3 items-start border border-blue-700/50 hover:bg-blue-800 transition-colors">
                                <Building2 className="w-6 h-6 text-yellow-400 mt-1" />
                                <div>
                                    <h3 className="font-bold text-lg">Developer Terpercaya</h3>
                                    <p className="text-sm text-blue-200">Akses ke proyek perumahan mitra BTN yang aman dan valid.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/financing/apply">
                                <Button size="lg" className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 font-bold px-8 w-full sm:w-auto">
                                    Ajukan KPR Sekarang
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/financing/check">
                                <Button size="lg" variant="outline" className="border-blue-200 text-blue-950 hover:bg-blue-800 hover:text-white w-full sm:w-auto">
                                    Cek Kelayakan (BI Checking)
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mockup Card */}
                    <div className="flex-1 relative w-full max-w-[500px] lg:max-w-none mx-auto">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 text-slate-800 relative overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-900 rounded flex items-center justify-center text-white font-bold">BTN</div>
                                    <div className="text-sm font-semibold text-slate-500">KPR Platinum</div>
                                </div>
                                <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">APPROVED</div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Limit Kredit Disetujui</p>
                                    <h3 className="text-3xl font-bold text-slate-900">Rp 850.000.000</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Bunga</p>
                                        <p className="font-medium">3.75% Fixed 1 th</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Tenor</p>
                                        <p className="font-medium">20 Tahun</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Angsuran/bulan</p>
                                        <p className="font-medium">Rp 4.250.xxx</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Tgl. Jatuh Tempo</p>
                                        <p className="font-medium">Tgl 25</p>
                                    </div>
                                </div>
                                <div className="border-t pt-4 mt-2">
                                    <p className="text-xs text-slate-400 text-center">Simulasi ini hanya estimasi. Syarat & ketentuan berlaku.</p>
                                </div>
                            </div>
                            {/* Decor */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-bl-full -mr-8 -mt-8"></div>
                        </div>
                        {/* Back card decoration */}
                        <div className="absolute -z-10 top-4 -right-4 w-full h-full bg-blue-800 rounded-2xl opacity-50 scale-[0.98]"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
