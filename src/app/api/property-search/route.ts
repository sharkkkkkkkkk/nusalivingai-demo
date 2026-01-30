import { NextResponse } from 'next/server';

// Property search with AI-powered matching
export async function POST(req: Request) {
    try {
        const { query, filters } = await req.json();

        // Simulate AI-powered search with intelligent matching
        // In production, this would use vector search + semantic matching

        const searchResults = {
            query: query || '',
            filters: filters || {},
            totalResults: 127,
            recommendations: [
                {
                    id: 'prop-001',
                    title: 'Apartemen Studio Modern - Dekat MRT Lebak Bulus',
                    type: 'apartment',
                    price: 450000000,
                    pricePerMonth: 3500000,
                    location: {
                        city: 'Jakarta Selatan',
                        district: 'Lebak Bulus',
                        address: 'Jl. Ciputat Raya No. 45'
                    },
                    specs: {
                        bedrooms: 1,
                        bathrooms: 1,
                        area: 24,
                        buildingArea: 24,
                        landArea: 0
                    },
                    features: [
                        'Fully Furnished',
                        'AC',
                        'Water Heater',
                        'Kitchen Set',
                        'Balcony',
                        'Security 24/7'
                    ],
                    images: [
                        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
                        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
                    ],
                    scores: {
                        affordability: 85,
                        access: 92,
                        comfort: 78,
                        genZFit: 88
                    },
                    aiReasoning: 'Cocok untuk profesional muda yang kerja di area Sudirman/SCBD. Akses MRT hanya 5 menit jalan kaki, hemat waktu & biaya transport. Budget-friendly untuk single living.',
                    nearbyFacilities: ['MRT Lebak Bulus (400m)', 'Transmart (500m)', 'Pondok Indah Mall (2km)', 'RS Pondok Indah (1.5km)']
                },
                {
                    id: 'prop-002',
                    title: 'Kost Eksklusif Premium - BSD City',
                    type: 'kost',
                    price: 2800000,
                    pricePerMonth: 2800000,
                    location: {
                        city: 'Tangerang Selatan',
                        district: 'BSD City',
                        address: 'Jl. Edutown BSD'
                    },
                    specs: {
                        bedrooms: 1,
                        bathrooms: 1,
                        area: 18,
                        buildingArea: 18,
                        landArea: 0
                    },
                    features: [
                        'Kamar Mandi Dalam',
                        'AC',
                        'WiFi 100Mbps',
                        'Laundry',
                        'Coworking Space',
                        'Gym',
                        'Rooftop Garden'
                    ],
                    images: [
                        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
                        'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800'
                    ],
                    scores: {
                        affordability: 78,
                        access: 75,
                        comfort: 85,
                        genZFit: 95
                    },
                    aiReasoning: 'Perfect untuk mahasiswa atau pekerja startup di BSD. Fasilitas lengkap kayak hotel, cocok buat yang suka networking. WiFi kencang buat WFH atau gaming.',
                    nearbyFacilities: ['AEON Mall BSD (1km)', 'ICE BSD (800m)', 'Prasmul (2km)', 'The Breeze (1.5km)']
                },
                {
                    id: 'prop-003',
                    title: 'Rumah Minimalis 2 Lantai - Depok',
                    type: 'house',
                    price: 850000000,
                    pricePerMonth: 0,
                    location: {
                        city: 'Depok',
                        district: 'Margonda',
                        address: 'Jl. Margonda Raya'
                    },
                    specs: {
                        bedrooms: 3,
                        bathrooms: 2,
                        area: 120,
                        buildingArea: 70,
                        landArea: 90
                    },
                    features: [
                        'Carport 1 Mobil',
                        'Taman Depan',
                        'Dapur Modern',
                        'Ruang Keluarga Luas',
                        'Kamar Tidur Utama + Balkon'
                    ],
                    images: [
                        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
                        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
                    ],
                    scores: {
                        affordability: 72,
                        access: 88,
                        comfort: 90,
                        genZFit: 70
                    },
                    aiReasoning: 'Ideal untuk pasangan muda atau small family. Lokasi strategis dekat UI, akses ke Jakarta lancar via Tol Cijago. Harga masih reasonable untuk rumah 2 lantai di area premium.',
                    nearbyFacilities: ['Universitas Indonesia (3km)', 'Margo City (1km)', 'Stasiun UI (2km)', 'RS Mitra Keluarga (1.5km)']
                }
            ],
            aiInsight: query
                ? `Berdasarkan pencarian "${query}", saya menemukan ${3} hunian yang paling sesuai dengan kebutuhanmu. Saya prioritaskan yang punya akses transport bagus dan budget-friendly.`
                : 'Berikut adalah rekomendasi hunian terbaik untuk kamu berdasarkan preferensi Gen Z: akses mudah, fasilitas lengkap, dan value for money.'
        };

        return NextResponse.json(searchResults);

    } catch (error) {
        console.error('Property search API error:', error);
        return NextResponse.json(
            {
                error: 'Search failed',
                recommendations: [],
                aiInsight: 'Maaf, pencarian sedang mengalami gangguan. Silakan coba lagi.'
            },
            { status: 500 }
        );
    }
}
