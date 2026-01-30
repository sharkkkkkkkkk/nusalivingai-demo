import { NextResponse } from 'next/server';

// Area insights and lifestyle analysis
export async function POST(req: Request) {
    try {
        const { area } = await req.json();

        const areaInsights: Record<string, any> = {
            'jakarta-selatan': {
                name: 'Jakarta Selatan',
                character: 'Urban Sophisticated',
                vibe: 'Kawasan premium dengan lifestyle modern dan akses transport publik terbaik di Jakarta. Cocok untuk young professionals dan digital nomads.',
                demographics: 'Mayoritas profesional muda (25-35 tahun), startup workers, dan mahasiswa S2/S3',
                highlights: [
                    'MRT & TransJakarta Coverage Terbaik',
                    'Coworking Spaces & Cafe Culture',
                    'Premium Shopping Malls',
                    'International Schools & Universities',
                    'Culinary Hub (Senopati, Kemang, Blok M)'
                ],
                challenges: [
                    'Harga properti & sewa relatif tinggi',
                    'Traffic padat di jam sibuk',
                    'Kompetisi tinggi untuk hunian terjangkau'
                ],
                averageRent: {
                    kost: '2.5 - 4 juta/bulan',
                    studio: '3.5 - 6 juta/bulan',
                    apartment1BR: '5 - 10 juta/bulan'
                },
                transportation: {
                    mrt: 'Excellent',
                    busway: 'Excellent',
                    grabGojek: 'Always Available',
                    bikeability: 'Good (bike lanes available)'
                },
                lifestyle: {
                    workspaces: 'Abundant (WeWork, GoWork, EV Hive)',
                    cafes: 'Premium coffee culture',
                    nightlife: 'Active (Senopati, SCBD)',
                    fitness: 'Many gyms & yoga studios',
                    shopping: 'High-end malls (Plaza Senayan, Pacific Place, Pondok Indah Mall)'
                },
                bestFor: ['Young Professionals', 'Startup Workers', 'Digital Nomads', 'Graduate Students'],
                notIdealFor: ['Budget-conscious students', 'Families with young kids (unless high budget)']
            },
            'bsd-city': {
                name: 'BSD City',
                character: 'Modern Suburban Tech Hub',
                vibe: 'Kota mandiri yang terencana dengan ekosistem startup, kampus, dan lifestyle modern. Cocok untuk tech workers dan mahasiswa.',
                demographics: 'Mahasiswa, startup employees, young families, dan tech professionals',
                highlights: [
                    'Ekosistem Startup & Tech Companies',
                    'Kampus Ternama (Prasmul, Swiss German, Atma Jaya)',
                    'Infrastruktur Terencana',
                    'Mall & Entertainment Lengkap',
                    'Residential Clusters Beragam'
                ],
                challenges: [
                    'Akses ke Jakarta butuh waktu (1-1.5 jam)',
                    'Belum ada MRT/LRT',
                    'Tergantung kendaraan pribadi atau online'
                ],
                averageRent: {
                    kost: '1.8 - 3.5 juta/bulan',
                    studio: '2.5 - 4.5 juta/bulan',
                    apartment1BR: '3.5 - 6 juta/bulan'
                },
                transportation: {
                    mrt: 'Not Available',
                    busway: 'Limited',
                    grabGojek: 'Available',
                    bikeability: 'Excellent (wide roads, bike-friendly)'
                },
                lifestyle: {
                    workspaces: 'Growing (many in malls & offices)',
                    cafes: 'Trendy & Instagram-worthy',
                    nightlife: 'Moderate (mall-centric)',
                    fitness: 'Good (gyms in malls & clusters)',
                    shopping: 'Excellent (AEON, ICE BSD, The Breeze, Q-Big)'
                },
                bestFor: ['Tech Workers', 'University Students', 'Startup Employees', 'Young Families'],
                notIdealFor: ['Daily commuters to Central Jakarta', 'Non-drivers without budget for online transport']
            },
            'depok': {
                name: 'Depok',
                character: 'Student City & Commuter Base',
                vibe: 'Kota pelajar dengan harga terjangkau dan akses ke Jakarta yang semakin baik. Cocok untuk mahasiswa dan early-career professionals.',
                demographics: 'Mahasiswa UI, pekerja muda, dan keluarga menengah',
                highlights: [
                    'Universitas Indonesia (UI)',
                    'Harga Hunian Lebih Terjangkau',
                    'Akses KRL & Tol Cijago',
                    'Margonda: Student Lifestyle Hub',
                    'Komunitas Muda Aktif'
                ],
                challenges: [
                    'Infrastruktur masih berkembang',
                    'Macet di area Margonda',
                    'Fasilitas premium terbatas'
                ],
                averageRent: {
                    kost: '800rb - 2 juta/bulan',
                    studio: '1.5 - 3 juta/bulan',
                    apartment1BR: '2.5 - 4.5 juta/bulan'
                },
                transportation: {
                    mrt: 'Not Available',
                    krl: 'Excellent (Stasiun UI, Depok Baru)',
                    busway: 'Limited',
                    grabGojek: 'Available',
                    bikeability: 'Moderate'
                },
                lifestyle: {
                    workspaces: 'Limited but growing',
                    cafes: 'Student-friendly, affordable',
                    nightlife: 'Student-oriented (Margonda)',
                    fitness: 'Basic gyms available',
                    shopping: 'Margo City, Depok Town Square'
                },
                bestFor: ['University Students', 'Budget-Conscious Young Professionals', 'First-Time Renters'],
                notIdealFor: ['Luxury seekers', 'Those needing premium amenities']
            },
            'bandung': {
                name: 'Bandung',
                character: 'Creative & Chill Mountain City',
                vibe: 'Kota kreatif dengan udara sejuk, biaya hidup terjangkau, dan komunitas seni & kuliner yang kuat. Cocok untuk remote workers dan creatives.',
                demographics: 'Mahasiswa, creative workers, remote workers, dan young families',
                highlights: [
                    'Biaya Hidup Lebih Murah',
                    'Udara Sejuk & Pemandangan Gunung',
                    'Komunitas Kreatif & Startup',
                    'Kuliner Legendaris',
                    'Factory Outlets & Shopping'
                ],
                challenges: [
                    'Infrastruktur transport publik terbatas',
                    'Macet di weekend (wisatawan)',
                    'Job market lebih kecil dari Jakarta'
                ],
                averageRent: {
                    kost: '700rb - 1.8 juta/bulan',
                    studio: '1.5 - 3 juta/bulan',
                    apartment1BR: '2 - 4 juta/bulan'
                },
                transportation: {
                    mrt: 'Not Available',
                    busway: 'Limited (Trans Metro Bandung)',
                    grabGojek: 'Available',
                    bikeability: 'Moderate'
                },
                lifestyle: {
                    workspaces: 'Good (many indie coworking spaces)',
                    cafes: 'Excellent (cafe culture strong)',
                    nightlife: 'Moderate (live music venues)',
                    fitness: 'Outdoor activities (hiking, cycling)',
                    shopping: 'Factory outlets, local markets'
                },
                bestFor: ['Remote Workers', 'Creative Professionals', 'Students', 'Nature Lovers'],
                notIdealFor: ['Those needing daily access to Jakarta', 'Corporate professionals requiring office presence']
            }
        };

        const normalizedArea = area.toLowerCase().replace(/\s+/g, '-');
        const insight = areaInsights[normalizedArea] || {
            name: area,
            character: 'Area Berkembang',
            vibe: 'Area ini sedang berkembang dengan potensi yang menarik untuk hunian.',
            demographics: 'Beragam',
            highlights: ['Lokasi strategis', 'Harga kompetitif', 'Akses transport'],
            challenges: ['Data detail sedang kami kumpulkan'],
            averageRent: {
                kost: 'Bervariasi',
                studio: 'Bervariasi',
                apartment1BR: 'Bervariasi'
            },
            bestFor: ['Explorers', 'Budget-conscious renters'],
            notIdealFor: []
        };

        return NextResponse.json({
            success: true,
            area: insight
        });

    } catch (error) {
        console.error('Area insights API error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch area insights',
                area: {
                    name: 'Unknown',
                    vibe: 'Data tidak tersedia saat ini. Silakan coba lagi nanti.'
                }
            },
            { status: 500 }
        );
    }
}
