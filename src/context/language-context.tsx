"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "id" | "en"

type LanguageContextType = {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations: Record<string, Record<Language, string>> = {
    // Navigation
    "nav.features": { id: "Fitur", en: "Features" },
    "nav.solution": { id: "Solusi", en: "Solution" },
    "nav.impact": { id: "Dampak", en: "Impact" },
    "nav.financing": { id: "Pembiayaan", en: "Financing" },
    "nav.login": { id: "Masuk", en: "Login" },
    "nav.register": { id: "Daftar Sekarang", en: "Register Now" },
    "nav.dashboard": { id: "Dashboard", en: "Dashboard" },
    "nav.logout": { id: "Keluar", en: "Log out" },

    // Dashboard
    "dashboard.welcome": { id: "Selamat Pagi", en: "Good Morning" },
    "dashboard.subtitle": { id: "Siap melanjutkan perencanaan hunian hari ini?", en: "Ready to continue your housing planning today?" },
    "dashboard.newProject": { id: "Buat Proyek Baru", en: "Create New Project" },
    "dashboard.totalProjects": { id: "Total Proyek", en: "Total Projects" },
    "dashboard.estimatedCost": { id: "Estimasi Biaya", en: "Estimated Cost" },
    "dashboard.documentReady": { id: "Kesiapan Dokumen", en: "Document Readiness" },
    "dashboard.thisMonth": { id: "bulan ini", en: "this month" },
    "dashboard.mainProject": { id: "Proyek utama", en: "Main project" },
    "dashboard.needsCompletion": { id: "Perlu dilengkapi", en: "Needs completion" },
    "dashboard.activeProjects": { id: "Proyek Aktif", en: "Active Projects" },
    "dashboard.startNew": { id: "Mulai Proyek Baru", en: "Start New Project" },
    "dashboard.planHousing": { id: "Rencanakan hunian atau renovasi", en: "Plan housing or renovation" },
    "dashboard.smartTools": { id: "Smart Tools", en: "Smart Tools" },
    "dashboard.progress": { id: "Progress", en: "Progress" },
    "dashboard.updated": { id: "Diupdate", en: "Updated" },
    "dashboard.daysAgo": { id: "hari yang lalu", en: "days ago" },
    "dashboard.weekAgo": { id: "minggu yang lalu", en: "week ago" },

    // Catalog
    "catalog.title": { id: "Material Catalog", en: "Material Catalog" },
    "catalog.subtitle": { id: "Katalog material modular dan berkelanjutan terstandarisasi.", en: "Standardized modular and sustainable material catalog." },
    "catalog.cart": { id: "Cart", en: "Cart" },
    "catalog.search": { id: "Cari material (semen, bata, panel...)", en: "Search materials (cement, bricks, panels...)" },
    "catalog.filter": { id: "Filter", en: "Filter" },
    "catalog.addToProject": { id: "Tambah ke Proyek", en: "Add to Project" },
    "catalog.added": { id: "Berhasil ditambahkan", en: "Successfully added" },
    "catalog.addedDesc": { id: "telah masuk ke keranjang estimasi proyek.", en: "has been added to project estimation cart." },

    // Gallery
    "gallery.title": { id: "Galeri Inspirasi Hunian", en: "Housing Inspiration Gallery" },
    "gallery.subtitle": { id: "Koleksi desain rumah modular dan konvensional yang ramah lingkungan.", en: "Collection of eco-friendly modular and conventional home designs." },
    "gallery.viewDetail": { id: "Lihat Detail", en: "View Details" },
    "gallery.beds": { id: "Beds", en: "Beds" },
    "gallery.baths": { id: "Baths", en: "Baths" },

    // Guide
    "guide.title": { id: "Panduan Hunian Sehat & Berkelanjutan", en: "Healthy & Sustainable Living Guide" },
    "guide.subtitle": { id: "Kumpulan tips praktis untuk mewujudkan rumah impian yang ramah lingkungan.", en: "Collection of practical tips to create your dream eco-friendly home." },
    "guide.healthyHome": { id: "Prinsip Rumah Sehat", en: "Healthy Home Principles" },
    "guide.healthyDesc": { id: "Panduan dasar sirkulasi udara dan pencahayaan alami.", en: "Basic guide for air circulation and natural lighting." },
    "guide.energyEfficiency": { id: "Efisiensi Energi", en: "Energy Efficiency" },
    "guide.energyDesc": { id: "Strategi hemat listrik untuk hunian modern.", en: "Energy-saving strategies for modern homes." },
    "guide.sustainableMaterial": { id: "Material Berkelanjutan", en: "Sustainable Materials" },
    "guide.sustainableDesc": { id: "Memilih bahan bangunan yang ramah lingkungan.", en: "Choosing eco-friendly building materials." },
    "guide.waterConservation": { id: "Konservasi Air", en: "Water Conservation" },
    "guide.waterDesc": { id: "Sistem pengelolaan air bersih dan kotor.", en: "Clean and wastewater management system." },
    "guide.tips": { id: "Tips Penerapan:", en: "Implementation Tips:" },

    // Marketplace
    "marketplace.title": { id: "Jasa Ahli Bangunan", en: "Building Professional Services" },
    "marketplace.subtitle": { id: "Jaringan profesional terverifikasi untuk kebutuhan pembangunan Anda.", en: "Verified professional network for your construction needs." },
    "marketplace.allCategories": { id: "Semua Kategori", en: "All Categories" },
    "marketplace.architects": { id: "Arsitek", en: "Architects" },
    "marketplace.contractors": { id: "Kontraktor", en: "Contractors" },
    "marketplace.designers": { id: "Desainer Interior", en: "Interior Designers" },
    "marketplace.search": { id: "Cari nama atau keahlian...", en: "Search name or expertise..." },
    "marketplace.viewPortfolio": { id: "Lihat Portofolio", en: "View Portfolio" },
    "marketplace.contact": { id: "Hubungi", en: "Contact" },
    "marketplace.projects": { id: "Proyek", en: "Projects" },

    // Scanner
    "scanner.title": { id: "Material Scanner", en: "Material Scanner" },
    "scanner.subtitle": { id: "Point your camera at a building material to identifying it and check quality.", en: "Point your camera at a building material to identify it and check quality." },
    "scanner.cameraReady": { id: "Camera Ready", en: "Camera Ready" },
    "scanner.startScan": { id: "Start Scan", en: "Start Scan" },
    "scanner.scanAgain": { id: "Scan Again", en: "Scan Again" },
    "scanner.analyzing": { id: "Analyzing Structure...", en: "Analyzing Structure..." },
    "scanner.confidence": { id: "Confidence", en: "Confidence" },
    "scanner.integrity": { id: "Structural Integrity", en: "Structural Integrity" },
    "scanner.excellent": { id: "Excellent", en: "Excellent" },

    // Common
    "common.ready": { id: "Ready", en: "Ready" },
    "common.available": { id: "Available", en: "Available" },
    "common.preorder": { id: "Pre-order", en: "Pre-order" },
    "common.lowStock": { id: "Low Stock", en: "Low Stock" },
}


const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("id")

    // Optional: Persist language
    useEffect(() => {
        const saved = localStorage.getItem("language") as Language
        if (saved) setLanguage(saved)
    }, [])

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem("language", lang)
    }

    const t = (key: string) => {
        const item = translations[key]
        if (!item) return key
        return item[language]
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider")
    return context
}
