import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="w-full bg-slate-950 py-12 text-slate-400">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative h-20 w-20 md:h-28 md:w-28">
                                <Image src="/assets/Logo.png" alt="NusaLiving Logo" fill className="object-contain" />
                            </div>
                            <span className="text-xl md:text-3xl font-bold text-slate-100">NusaLiving</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Platform perencanaan hunian cerdas yang menghubungkan teknologi, keberlanjutan, dan pembiayaan untuk masa depan Indonesia.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-teal-400">AI Site Scan</Link></li>
                            <li><Link href="#" className="hover:text-teal-400">Housing Planner</Link></li>
                            <li><Link href="#" className="hover:text-teal-400">Modular Catalog</Link></li>
                            <li><Link href="#" className="hover:text-teal-400">Marketplace</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">Perusahaan</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-teal-400">Tentang Kami</Link></li>
                            <li><Link href="#" className="hover:text-teal-400">Karir</Link></li>
                            <li><Link href="#" className="hover:text-teal-400">Blog</Link></li>
                            <li><Link href="#" className="hover:text-teal-400">Hubungi Kami</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">Sosial Media</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-teal-400 transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-teal-400 transition-colors"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-teal-400 transition-colors"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-teal-400 transition-colors"><Linkedin className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm">
                    <p>© {new Date().getFullYear()} NusaLiving AI. Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </footer>
    )
}
