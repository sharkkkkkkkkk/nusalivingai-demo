import { NextResponse } from 'next/server';

// Fallback images organized by room type
const FALLBACK_IMAGES: Record<string, string[]> = {
    bedroom: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
        "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800",
        "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800"
    ],
    living: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800"
    ],
    kitchen: [
        "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800"
    ],
    bathroom: [
        "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800"
    ],
    workspace: [
        "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=800",
        "https://images.unsplash.com/photo-1600494448655-2f8d0b5b3b3f?w=800",
        "https://images.unsplash.com/photo-1600494449098-9e6f0b3e7e3f?w=800",
        "https://images.unsplash.com/photo-1600494449097-9e6f0b3e7e3e?w=800"
    ],
    dining: [
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800",
        "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800"
    ],
    default: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800"
    ]
};

// Room type detection with Gen Z tips
const detectRoomType = (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.match(/\b(kamar tidur|bedroom|kamar|bobo|tidur)\b/)) {
        return {
            type: 'Kamar Tidur',
            category: 'bedroom',
            tips: [
                "💡 Gunakan kasur platform tanpa bed frame buat hemat ruang",
                "📱 Sediakan power outlet dekat tempat tidur untuk charging gadget",
                "🎨 Warna netral (beige, gray) bikin ruangan keliatan luas",
                "🪴 Tambah tanaman mini buat vibe aesthetic Instagram-able"
            ]
        };
    }

    if (lowerPrompt.match(/\b(dapur|kitchen|masak)\b/)) {
        return {
            type: 'Dapur',
            category: 'kitchen',
            tips: [
                "🔥 Kompor tanam lebih hemat ruang & aesthetic daripada kompor biasa",
                "📦 Rak gantung atau hook untuk alat masak yang sering dipakai",
                "✨ Cabinet warna terang bikin dapur kecil keliatan lega",
                "💰 Budget friendly: cat ulang cabinet lama + ganti handle baru"
            ]
        };
    }

    if (lowerPrompt.match(/\b(kamar mandi|bathroom|toilet|wc)\b/)) {
        return {
            type: 'Kamar Mandi',
            category: 'bathroom',
            tips: [
                "🚿 Shower tanpa partisi (walk-in) bikin kamar mandi keliatan luas",
                "🪞 Cermin besar + lampu LED strip = vibe hotel mewah",
                "🌿 Tanaman tahan lembab (lidah mertua) buat sentuhan natural",
                "💡 Warna putih + abu-abu + kayu = kombinasi timeless & clean"
            ]
        };
    }

    if (lowerPrompt.match(/\b(ruang tamu|ruang keluarga|living room|living|tamu|keluarga)\b/)) {
        return {
            type: 'Ruang Tamu',
            category: 'living',
            tips: [
                "🛋️ Sofa 2-seater + bean bag lebih fleksibel dari sofa besar",
                "📺 Floating shelf untuk TV biar keliatan modern & hemat tempat",
                "🎨 Accent wall (1 dinding warna beda) buat focal point",
                "💡 Lampu kuning (warm light) bikin suasana homey & cozy"
            ]
        };
    }

    if (lowerPrompt.match(/\b(kerja|workspace|wfh|belajar|study|kantor)\b/)) {
        return {
            type: 'Ruang Kerja',
            category: 'workspace',
            tips: [
                "💻 Meja menghadap jendela = natural light baik buat produktivitas",
                "🪑 Invest di kursi ergonomis, punggungmu akan berterimakasih!",
                "📚 Pegboard atau rak minimalis buat organize alat tulis",
                "🎥 Setup lighting yang bagus penting buat video call/konten"
            ]
        };
    }

    if (lowerPrompt.match(/\b(ruang makan|dining room|makan|dining)\b/)) {
        return {
            type: 'Ruang Makan',
            category: 'dining',
            tips: [
                "🍴 Meja lipat atau extendable buat ruang kecil = game changer",
                "🪑 Bench seating hemat space daripada kursi individual",
                "💡 Pendant lamp di atas meja buat aksen dramatis",
                "🌿 Centerpiece simple (vas bunga/lilin) cukup buat vibe cozy"
            ]
        };
    }

    return null;
};

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt || typeof prompt !== 'string') {
            return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
        }

        // Detect room type
        const roomInfo = detectRoomType(prompt);

        if (!roomInfo) {
            return NextResponse.json({
                message: "Hmm, aku belum tangkep ruang apa yang kamu maksud nih 🤔\n\nBisa lebih spesifik? Misalnya:\n• \"Kamar tidur minimalis\"\n• \"Dapur kecil budget hemat\"\n• \"Ruang tamu aesthetic\"\n\nAyo coba lagi! 😊",
                images: [],
                tips: [],
                roomType: null
            });
        }

        // Get fallback images for the detected room type
        const categoryImages = FALLBACK_IMAGES[roomInfo.category] || FALLBACK_IMAGES.default;
        const selectedImages = categoryImages.slice(0, 4);

        return NextResponse.json({
            message: `Oke, aku paham! Kamu mau desain **${roomInfo.type}** yang kece! 🎨✨\n\nIni dia ${selectedImages.length} inspirasi desain yang cocok buat Gen Z kayak kamu:`,
            images: selectedImages,
            tips: roomInfo.tips,
            roomType: roomInfo.type
        });

    } catch (error) {
        console.error('Design chat API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
