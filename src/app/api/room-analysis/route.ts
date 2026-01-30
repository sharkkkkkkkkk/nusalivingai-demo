import { NextResponse } from 'next/server';

// AI Room Analysis - Computer Vision Simulation
// In production, this would integrate with Google Cloud Vision API or similar
export async function POST(req: Request) {
    try {
        const { imageData, analysisType } = await req.json();

        // Simulate AI analysis with realistic results
        // In production: Use Google Cloud Vision API for actual image analysis

        const roomTypes = ['bedroom', 'living-room', 'kitchen', 'bathroom', 'workspace', 'dining-room'];
        const randomRoomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];

        const analysisResults: Record<string, any> = {
            'bedroom': {
                roomType: 'Kamar Tidur',
                confidence: 0.92,
                detectedObjects: [
                    { name: 'Tempat Tidur', confidence: 0.95, position: 'center' },
                    { name: 'Lemari Pakaian', confidence: 0.88, position: 'left' },
                    { name: 'Meja Belajar', confidence: 0.82, position: 'right' },
                    { name: 'Jendela', confidence: 0.90, position: 'back' }
                ],
                dimensions: {
                    estimated: '3.5m x 3.2m',
                    area: '11.2 m²',
                    ceiling: 'Standard (2.7m - 3m)'
                },
                lighting: {
                    type: 'Natural + Artificial',
                    quality: 'Good',
                    recommendation: 'Tambahkan lampu baca di area meja untuk WFH/belajar malam'
                },
                condition: 'Furnished',
                colorPalette: {
                    dominant: 'Putih/Cream',
                    accent: 'Coklat Kayu',
                    mood: 'Warm & Cozy'
                },
                styleAnalysis: {
                    current: 'Minimalis Modern',
                    suggestions: ['Scandinavian', 'Japandi', 'Industrial Soft']
                },
                designRecommendations: [
                    {
                        priority: 'high',
                        suggestion: 'Tambahkan pencahayaan ambient (LED strip) di belakang headboard untuk suasana cozy',
                        estimatedCost: 'Rp 150.000 - 300.000'
                    },
                    {
                        priority: 'medium',
                        suggestion: 'Ganti sprei dengan warna earth tone (terracotta, sage green) untuk vibe lebih hangat',
                        estimatedCost: 'Rp 200.000 - 500.000'
                    },
                    {
                        priority: 'medium',
                        suggestion: 'Tambahkan tanaman kecil (Monstera, Snake Plant) di sudut ruangan',
                        estimatedCost: 'Rp 50.000 - 150.000'
                    },
                    {
                        priority: 'low',
                        suggestion: 'Pasang wall organizer atau pegboard untuk maximize storage',
                        estimatedCost: 'Rp 100.000 - 250.000'
                    }
                ],
                furnitureNeeds: [
                    { item: 'Rak Buku Minimalis', priority: 'medium', budget: 'Rp 300.000 - 800.000' },
                    { item: 'Lampu Meja/Belajar', priority: 'high', budget: 'Rp 150.000 - 400.000' },
                    { item: 'Cermin Dinding', priority: 'low', budget: 'Rp 100.000 - 300.000' }
                ],
                aiInsight: 'Kamar tidur ini punya potensi besar! Ukurannya pas untuk single living atau couple. Pencahayaan alami bagus dari jendela. Dengan budget 500rb - 1 juta, kamu bisa upgrade jadi super cozy dan Instagram-worthy. Fokus ke lighting dan tanaman dulu untuk quick win!'
            },
            'living-room': {
                roomType: 'Ruang Tamu',
                confidence: 0.89,
                detectedObjects: [
                    { name: 'Sofa', confidence: 0.93, position: 'center' },
                    { name: 'Meja Kopi', confidence: 0.85, position: 'center-front' },
                    { name: 'TV/Monitor', confidence: 0.80, position: 'wall' },
                    { name: 'Jendela Besar', confidence: 0.88, position: 'side' }
                ],
                dimensions: {
                    estimated: '4m x 3.5m',
                    area: '14 m²',
                    ceiling: 'Standard (2.7m - 3m)'
                },
                lighting: {
                    type: 'Natural Dominant',
                    quality: 'Excellent',
                    recommendation: 'Tambahkan floor lamp untuk suasana malam yang lebih warm'
                },
                condition: 'Partially Furnished',
                colorPalette: {
                    dominant: 'Putih/Netral',
                    accent: 'Abu-abu',
                    mood: 'Clean & Modern'
                },
                styleAnalysis: {
                    current: 'Modern Minimalis',
                    suggestions: ['Scandinavian', 'Mid-Century Modern', 'Contemporary']
                },
                designRecommendations: [
                    {
                        priority: 'high',
                        suggestion: 'Tambahkan accent wall dengan wallpaper atau cat warna kontras (navy, sage green)',
                        estimatedCost: 'Rp 500.000 - 1.500.000'
                    },
                    {
                        priority: 'high',
                        suggestion: 'Ganti atau tambahkan cushion/bantal sofa dengan warna earth tone untuk warmth',
                        estimatedCost: 'Rp 200.000 - 600.000'
                    },
                    {
                        priority: 'medium',
                        suggestion: 'Tambahkan tanaman besar (Monstera, Fiddle Leaf Fig) di sudut ruangan',
                        estimatedCost: 'Rp 150.000 - 400.000'
                    },
                    {
                        priority: 'medium',
                        suggestion: 'Pasang floating shelf untuk display dekorasi atau buku',
                        estimatedCost: 'Rp 200.000 - 500.000'
                    }
                ],
                furnitureNeeds: [
                    { item: 'Floor Lamp/Standing Lamp', priority: 'high', budget: 'Rp 300.000 - 800.000' },
                    { item: 'Rug/Karpet', priority: 'medium', budget: 'Rp 200.000 - 1.000.000' },
                    { item: 'Side Table', priority: 'low', budget: 'Rp 150.000 - 400.000' }
                ],
                aiInsight: 'Ruang tamu yang spacious dengan natural light bagus! Perfect untuk entertaining atau WFH. Dengan budget 1-2 juta, kamu bisa transform jadi super cozy. Prioritas: accent wall + lighting + tanaman. Ini akan langsung upgrade vibe ruangan 100%!'
            },
            'kitchen': {
                roomType: 'Dapur',
                confidence: 0.91,
                detectedObjects: [
                    { name: 'Kitchen Cabinet', confidence: 0.94, position: 'wall' },
                    { name: 'Kompor', confidence: 0.90, position: 'counter' },
                    { name: 'Sink', confidence: 0.92, position: 'counter' },
                    { name: 'Kulkas', confidence: 0.85, position: 'corner' }
                ],
                dimensions: {
                    estimated: '2.5m x 2m',
                    area: '5 m²',
                    ceiling: 'Standard (2.7m - 3m)'
                },
                lighting: {
                    type: 'Artificial',
                    quality: 'Moderate',
                    recommendation: 'Tambahkan under-cabinet LED lighting untuk area kerja yang lebih terang'
                },
                condition: 'Furnished',
                colorPalette: {
                    dominant: 'Putih',
                    accent: 'Silver/Stainless',
                    mood: 'Clean & Functional'
                },
                styleAnalysis: {
                    current: 'Modern Minimalis',
                    suggestions: ['Scandinavian', 'Industrial', 'Contemporary']
                },
                designRecommendations: [
                    {
                        priority: 'high',
                        suggestion: 'Pasang LED strip under-cabinet untuk pencahayaan area kerja',
                        estimatedCost: 'Rp 150.000 - 350.000'
                    },
                    {
                        priority: 'medium',
                        suggestion: 'Tambahkan magnetic knife strip dan hanging organizer untuk maximize storage',
                        estimatedCost: 'Rp 100.000 - 300.000'
                    },
                    {
                        priority: 'medium',
                        suggestion: 'Ganti atau tambahkan backsplash dengan tile pattern untuk visual interest',
                        estimatedCost: 'Rp 300.000 - 800.000'
                    },
                    {
                        priority: 'low',
                        suggestion: 'Tambahkan small herb garden (basil, mint) di window sill',
                        estimatedCost: 'Rp 50.000 - 150.000'
                    }
                ],
                furnitureNeeds: [
                    { item: 'Wall-mounted Organizer', priority: 'high', budget: 'Rp 100.000 - 300.000' },
                    { item: 'Under-sink Storage', priority: 'medium', budget: 'Rp 150.000 - 400.000' },
                    { item: 'Bar Stool (jika ada counter)', priority: 'low', budget: 'Rp 200.000 - 500.000' }
                ],
                aiInsight: 'Dapur compact yang efisien! Perfect untuk daily cooking. Dengan budget 500rb - 1 juta, fokus ke lighting dan organization. Under-cabinet LED + wall organizer akan bikin dapur ini super functional dan aesthetic!'
            },
            'bathroom': {
                roomType: 'Kamar Mandi',
                confidence: 0.88,
                detectedObjects: [
                    { name: 'Shower', confidence: 0.90, position: 'corner' },
                    { name: 'Toilet', confidence: 0.92, position: 'side' },
                    { name: 'Sink/Wastafel', confidence: 0.89, position: 'wall' },
                    { name: 'Mirror', confidence: 0.85, position: 'above-sink' }
                ],
                dimensions: {
                    estimated: '2m x 1.8m',
                    area: '3.6 m²',
                    ceiling: 'Standard (2.7m - 3m)'
                },
                lighting: {
                    type: 'Artificial',
                    quality: 'Moderate',
                    recommendation: 'Upgrade ke LED dengan color temperature 4000K-5000K untuk natural light feel'
                },
                condition: 'Furnished',
                colorPalette: {
                    dominant: 'Putih/Cream',
                    accent: 'Chrome',
                    mood: 'Clean & Fresh'
                },
                styleAnalysis: {
                    current: 'Minimalis',
                    suggestions: ['Scandinavian', 'Modern Luxury', 'Japandi']
                },
                designRecommendations: [
                    {
                        priority: 'high',
                        suggestion: 'Tambahkan LED mirror atau mirror with backlight untuk vibe hotel',
                        estimatedCost: 'Rp 300.000 - 800.000'
                    },
                    {
                        priority: 'medium',
                        suggestion: 'Pasang shower caddy atau corner shelf untuk toiletries organization',
                        estimatedCost: 'Rp 100.000 - 250.000'
                    },
                    {
                        priority: 'medium',
                        suggestion: 'Tambahkan tanaman tahan lembab (Snake Plant, Pothos) untuk fresh vibe',
                        estimatedCost: 'Rp 50.000 - 150.000'
                    },
                    {
                        priority: 'low',
                        suggestion: 'Upgrade shower head ke rain shower untuk luxury feel',
                        estimatedCost: 'Rp 150.000 - 500.000'
                    }
                ],
                furnitureNeeds: [
                    { item: 'Towel Rack/Hook', priority: 'high', budget: 'Rp 50.000 - 200.000' },
                    { item: 'Storage Basket', priority: 'medium', budget: 'Rp 75.000 - 250.000' },
                    { item: 'Bath Mat', priority: 'medium', budget: 'Rp 50.000 - 150.000' }
                ],
                aiInsight: 'Kamar mandi compact tapi functional! Dengan budget 500rb - 1 juta, kamu bisa upgrade jadi hotel-vibe. Prioritas: LED mirror + organization + tanaman. Simple tapi impactful!'
            },
            'workspace': {
                roomType: 'Ruang Kerja',
                confidence: 0.87,
                detectedObjects: [
                    { name: 'Meja Kerja', confidence: 0.93, position: 'center' },
                    { name: 'Kursi Kerja', confidence: 0.90, position: 'desk' },
                    { name: 'Monitor/Laptop', confidence: 0.85, position: 'desk' },
                    { name: 'Rak Buku', confidence: 0.80, position: 'wall' }
                ],
                dimensions: {
                    estimated: '3m x 2.5m',
                    area: '7.5 m²',
                    ceiling: 'Standard (2.7m - 3m)'
                },
                lighting: {
                    type: 'Mixed (Natural + Task Lighting)',
                    quality: 'Good',
                    recommendation: 'Tambahkan bias lighting di belakang monitor untuk reduce eye strain'
                },
                condition: 'Furnished',
                colorPalette: {
                    dominant: 'Putih/Netral',
                    accent: 'Kayu/Hitam',
                    mood: 'Focused & Professional'
                },
                styleAnalysis: {
                    current: 'Minimalis Modern',
                    suggestions: ['Industrial', 'Scandinavian', 'Contemporary']
                },
                designRecommendations: [
                    {
                        priority: 'high',
                        suggestion: 'Tambahkan monitor light bar atau desk lamp dengan adjustable brightness',
                        estimatedCost: 'Rp 200.000 - 600.000'
                    },
                    {
                        priority: 'high',
                        suggestion: 'Pasang pegboard atau wall organizer untuk cable management & accessories',
                        estimatedCost: 'Rp 150.000 - 400.000'
                    },
                    {
                        priority: 'medium',
                        suggestion: 'Upgrade kursi ke ergonomic chair untuk postur yang lebih baik',
                        estimatedCost: 'Rp 800.000 - 2.000.000'
                    },
                    {
                        priority: 'medium',
                        suggestion: 'Tambahkan tanaman desk-friendly (Succulent, Mini Cactus) untuk reduce stress',
                        estimatedCost: 'Rp 30.000 - 100.000'
                    }
                ],
                furnitureNeeds: [
                    { item: 'Monitor Stand/Arm', priority: 'high', budget: 'Rp 150.000 - 500.000' },
                    { item: 'Cable Management Kit', priority: 'high', budget: 'Rp 50.000 - 150.000' },
                    { item: 'Desk Organizer', priority: 'medium', budget: 'Rp 100.000 - 300.000' }
                ],
                aiInsight: 'Workspace yang produktif! Perfect untuk WFH atau content creation. Dengan budget 1-1.5 juta, prioritas ke lighting + ergonomic chair + cable management. Ini akan boost produktivitas dan bikin setup kamu pro-level!'
            },
            'dining-room': {
                roomType: 'Ruang Makan',
                confidence: 0.86,
                detectedObjects: [
                    { name: 'Meja Makan', confidence: 0.92, position: 'center' },
                    { name: 'Kursi Makan', confidence: 0.90, position: 'around-table' },
                    { name: 'Pendant Light', confidence: 0.75, position: 'above-table' }
                ],
                dimensions: {
                    estimated: '3m x 2.8m',
                    area: '8.4 m²',
                    ceiling: 'Standard (2.7m - 3m)'
                },
                lighting: {
                    type: 'Pendant + Ambient',
                    quality: 'Good',
                    recommendation: 'Pastikan pendant light bisa dimmed untuk suasana dinner yang cozy'
                },
                condition: 'Furnished',
                colorPalette: {
                    dominant: 'Putih/Cream',
                    accent: 'Kayu Natural',
                    mood: 'Warm & Inviting'
                },
                styleAnalysis: {
                    current: 'Minimalis Modern',
                    suggestions: ['Scandinavian', 'Bohemian', 'Mid-Century']
                },
                designRecommendations: [
                    {
                        priority: 'high',
                        suggestion: 'Upgrade pendant light ke design yang lebih statement (rattan, geometric)',
                        estimatedCost: 'Rp 300.000 - 1.000.000'
                    },
                    {
                        priority: 'medium',
                        suggestion: 'Tambahkan table runner atau placemats untuk visual interest',
                        estimatedCost: 'Rp 100.000 - 300.000'
                    },
                    {
                        priority: 'medium',
                        suggestion: 'Pasang floating shelf atau sideboard untuk display & storage',
                        estimatedCost: 'Rp 400.000 - 1.200.000'
                    },
                    {
                        priority: 'low',
                        suggestion: 'Tambahkan centerpiece (vase + dried flowers atau lilin)',
                        estimatedCost: 'Rp 50.000 - 200.000'
                    }
                ],
                furnitureNeeds: [
                    { item: 'Sideboard/Buffet', priority: 'medium', budget: 'Rp 800.000 - 2.500.000' },
                    { item: 'Wall Art/Mirror', priority: 'low', budget: 'Rp 150.000 - 500.000' },
                    { item: 'Rug (under table)', priority: 'low', budget: 'Rp 300.000 - 1.000.000' }
                ],
                aiInsight: 'Ruang makan yang cozy untuk family time! Dengan budget 1-1.5 juta, fokus ke lighting upgrade + table decor. Statement pendant light akan langsung transform vibe ruangan jadi lebih warm dan inviting!'
            }
        };

        const result = analysisResults[randomRoomType];

        return NextResponse.json({
            success: true,
            analysis: result,
            processingTime: '2.3s',
            apiUsed: 'AI Vision Analysis (Simulated)'
        });

    } catch (error) {
        console.error('Room analysis API error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Analysis failed',
                analysis: {
                    roomType: 'Unknown',
                    aiInsight: 'Maaf, analisis gagal. Silakan coba upload foto yang lebih jelas atau coba lagi nanti.'
                }
            },
            { status: 500 }
        );
    }
}
