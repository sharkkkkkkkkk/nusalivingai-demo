
import { NextResponse } from "next/server";

// AI Housing Chat - Decision Support System
// Production-ready with comprehensive fallback logic
export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!messages || messages.length === 0) {
            return NextResponse.json({
                role: "assistant",
                content: "Hai! Aku NusaLiving AI Assistant. Aku bisa bantu kamu cari hunian, hitung budget, atau kasih saran desain interior. Mau mulai dari mana?"
            });
        }

        const lastMessage = messages[messages.length - 1].content.toLowerCase();

        // INTELLIGENT HOUSING ADVISOR LOGIC
        let responseContent = "";

        // 1. PROPERTY SEARCH & RECOMMENDATION
        if (lastMessage.match(/\b(cari|cariin|rekomendasi|suggest|saran)\b.*\b(rumah|apartemen|kost|hunian|tempat tinggal|kontrakan)\b/)) {
            const budget = lastMessage.match(/(\d+)\s*(juta|jt|m|million)/);
            const location = lastMessage.match(/\b(jakarta|depok|bsd|bandung|tangerang|bekasi|bogor)\b/);

            responseContent = `Oke, aku bantu cariin hunian yang cocok! 🏠\n\n`;

            if (budget) {
                responseContent += `Budget: ${budget[0]}\n`;
            }
            if (location) {
                responseContent += `Lokasi: ${location[0].charAt(0).toUpperCase() + location[0].slice(1)}\n`;
            }

            responseContent += `\nBiar lebih akurat, boleh tau:\n`;
            responseContent += `• Untuk berapa orang? (sendiri/couple/keluarga)\n`;
            responseContent += `• Prioritas: dekat kantor/kampus atau lifestyle area?\n`;
            responseContent += `• Prefer transport publik atau punya kendaraan?\n\n`;
            responseContent += `Atau langsung aja cek halaman **Explore** untuk lihat rekomendasi AI kami! 🎯`;

        }
        // 2. BUDGET & AFFORDABILITY
        else if (lastMessage.match(/\b(budget|biaya|harga|mahal|murah|afford|mampu|sanggup)\b/)) {
            const income = lastMessage.match(/(\d+)\s*(juta|jt|m)/);

            responseContent = `Soal budget, aku punya tips nih! 💰\n\n`;
            responseContent += `**Rule of Thumb:**\n`;
            responseContent += `• Sewa/cicilan maksimal 30% dari income\n`;
            responseContent += `• Sisain 20% untuk saving\n`;
            responseContent += `• 50% untuk living expenses\n\n`;

            if (income) {
                const amount = parseInt(income[1]);
                const maxRent = Math.floor(amount * 0.3);
                responseContent += `Dengan income ${income[0]}, budget aman untuk hunian: **Rp ${maxRent} juta/bulan**\n\n`;
            }

            responseContent += `Kita punya **Affordability Score** di setiap listing yang bantu kamu tau apakah hunian itu aman di kantong atau nggak. Cek di halaman Explore ya! 📊`;

        }
        // 3. LOCATION & AREA INSIGHTS
        else if (lastMessage.match(/\b(lokasi|daerah|area|kawasan|tempat)\b.*\b(bagus|rekomendasi|cocok|oke)\b/) ||
            lastMessage.match(/\b(jakarta|depok|bsd|bandung|tangerang)\b/)) {
            responseContent = `Lokasi itu penting banget! Setiap area punya karakter sendiri:\n\n`;
            responseContent += `**Jakarta Selatan** 🏙️\n`;
            responseContent += `• Vibe: Urban sophisticated, MRT coverage terbaik\n`;
            responseContent += `• Cocok: Young professionals, startup workers\n`;
            responseContent += `• Kost: 2.5-4 juta | Studio: 3.5-6 juta\n\n`;

            responseContent += `**BSD City** 🌆\n`;
            responseContent += `• Vibe: Modern suburban, tech hub\n`;
            responseContent += `• Cocok: Tech workers, mahasiswa\n`;
            responseContent += `• Kost: 1.8-3.5 juta | Studio: 2.5-4.5 juta\n\n`;

            responseContent += `**Depok** 🎓\n`;
            responseContent += `• Vibe: Student city, affordable\n`;
            responseContent += `• Cocok: Mahasiswa, early-career\n`;
            responseContent += `• Kost: 800rb-2 juta | Studio: 1.5-3 juta\n\n`;

            responseContent += `Mau insight lebih detail tentang area tertentu? Tanya aja! Atau cek **Area Insights** di platform kami 🗺️`;

        }
        // 4. INTERIOR DESIGN
        else if (lastMessage.match(/\b(desain|design|interior|dekor|renovasi|ubah|ganti)\b/)) {
            responseContent = `Wah, mau upgrade ruangan nih! 🎨\n\n`;
            responseContent += `Aku punya fitur **AI Interior Design** yang bisa:\n`;
            responseContent += `• Generate desain dari deskripsi kamu\n`;
            responseContent += `• Redesign dari foto ruangan\n`;
            responseContent += `• Chat interaktif untuk adjust desain\n\n`;

            responseContent += `**Style Populer:**\n`;
            responseContent += `• Minimalis Modern - Clean & simple\n`;
            responseContent += `• Japandi - Japanese + Scandinavian\n`;
            responseContent += `• Industrial - Raw & edgy\n`;
            responseContent += `• Bohemian - Colorful & eclectic\n\n`;

            responseContent += `Langsung coba di halaman **AI Design** atau **Design Chat** ya! Gratis kok 😊`;

        }
        // 5. COMMUTE & TRANSPORTATION
        else if (lastMessage.match(/\b(transport|transportasi|commute|perjalanan|akses|mrt|krl|busway)\b/)) {
            responseContent = `Transport itu crucial banget! 🚇\n\n`;
            responseContent += `**Tips Pilih Lokasi:**\n`;
            responseContent += `• Dekat MRT/KRL = hemat waktu & biaya\n`;
            responseContent += `• Walking distance 5-10 menit ideal\n`;
            responseContent += `• Cek jam sibuk: pagi (7-9) & sore (17-19)\n\n`;

            responseContent += `**Access Score** kami ngitung:\n`;
            responseContent += `• Jarak ke transport publik\n`;
            responseContent += `• Jarak ke kantor/kampus\n`;
            responseContent += `• Waktu tempuh rata-rata\n\n`;

            responseContent += `Semua property di platform kami ada Access Score-nya. Cek di Explore! 🎯`;

        }
        // 6. LIFESTYLE & FACILITIES
        else if (lastMessage.match(/\b(fasilitas|facility|gym|kolam|pool|coworking|cafe|mall)\b/)) {
            responseContent = `Fasilitas bikin hidup lebih nyaman! 🏋️\n\n`;
            responseContent += `**Must-Have (Gen Z):**\n`;
            responseContent += `• WiFi kencang (min 50Mbps)\n`;
            responseContent += `• AC + water heater\n`;
            responseContent += `• Security 24/7\n`;
            responseContent += `• Laundry (in-unit atau shared)\n\n`;

            responseContent += `**Nice-to-Have:**\n`;
            responseContent += `• Gym/fitness center\n`;
            responseContent += `• Coworking space\n`;
            responseContent += `• Rooftop/common area\n`;
            responseContent += `• Dekat cafe & resto\n\n`;

            responseContent += `Semua listing kami include info fasilitas lengkap. Check it out! ✨`;

        }
        // 7. KPR & FINANCING
        else if (lastMessage.match(/\b(kpr|kredit|cicilan|dp|down payment|bank|bunga|tenor)\b/)) {
            responseContent = `Soal KPR, aku kasih gambaran ya! 💳\n\n`;
            responseContent += `**Simulasi Umum:**\n`;
            responseContent += `• DP: 10-20% dari harga properti\n`;
            responseContent += `• Bunga: 3.75% - 7% per tahun\n`;
            responseContent += `• Tenor: 5, 10, 15, atau 20 tahun\n\n`;

            responseContent += `**Contoh:**\n`;
            responseContent += `Rumah Rp 500 juta, DP 20% (Rp 100 juta)\n`;
            responseContent += `Kredit: Rp 400 juta, bunga 6%, 15 tahun\n`;
            responseContent += `Cicilan: ~Rp 3.4 juta/bulan\n\n`;

            responseContent += `**Tips:**\n`;
            responseContent += `• Cicilan jangan lebih dari 30% income\n`;
            responseContent += `• Compare rate dari beberapa bank\n`;
            responseContent += `• Perhatikan biaya admin & provisi\n\n`;

            responseContent += `Butuh simulasi detail? Hubungi mitra bank kami atau gunakan kalkulator KPR online! 📱`;

        }
        // 8. STUDENT HOUSING
        else if (lastMessage.match(/\b(mahasiswa|kuliah|kampus|student|ui|itb|ugm|unpad)\b/)) {
            responseContent = `Hunian mahasiswa, aku expert nih! 🎓\n\n`;
            responseContent += `**Rekomendasi:**\n`;
            responseContent += `• **Kost** - Paling ekonomis (800rb - 2.5 juta)\n`;
            responseContent += `• **Coliving** - Fasilitas lengkap + networking (2-4 juta)\n`;
            responseContent += `• **Studio** - Privacy maksimal (2.5-5 juta)\n\n`;

            responseContent += `**Area Favorit Mahasiswa:**\n`;
            responseContent += `• Depok (UI) - Affordable, KRL access\n`;
            responseContent += `• BSD (Prasmul, Swiss German) - Modern, lengkap\n`;
            responseContent += `• Bandung (ITB, Unpad) - Sejuk, creative vibe\n\n`;

            responseContent += `**Tips:**\n`;
            responseContent += `• Cari yang include utilities (listrik, air, WiFi)\n`;
            responseContent += `• Dekat minimarket & laundry\n`;
            responseContent += `• Ada dapur bersama (hemat makan)\n\n`;

            responseContent += `Cek filter "Student-Friendly" di Explore! 🎯`;

        }
        // 9. GENERAL GREETING
        else if (lastMessage.match(/\b(hai|halo|hi|hello|hey|pagi|siang|sore|malam)\b/)) {
            responseContent = `Hai! Aku NusaLiving AI Assistant 👋\n\n`;
            responseContent += `Aku bisa bantu kamu:\n`;
            responseContent += `🏠 Cari hunian sesuai budget & lokasi\n`;
            responseContent += `💰 Hitung affordability & KPR\n`;
            responseContent += `🗺️ Kasih insight area & lifestyle\n`;
            responseContent += `🎨 Saran desain interior\n`;
            responseContent += `📊 Analisis skor hunian (Affordability, Access, Comfort)\n\n`;
            responseContent += `Mau mulai dari mana? Atau langsung explore aja! 😊`;

        }
        // 10. THANK YOU
        else if (lastMessage.match(/\b(thanks|thank you|terima kasih|makasih|thx)\b/)) {
            responseContent = `Sama-sama! Senang bisa bantu 😊\n\n`;
            responseContent += `Kalau ada pertanyaan lagi, jangan ragu tanya ya! Aku always here to help.\n\n`;
            responseContent += `Happy house hunting! 🏡✨`;

        }
        // DEFAULT FALLBACK
        else {
            responseContent = `Hmm, aku mengerti kamu lagi cari info properti! 🤔\n\n`;
            responseContent += `Sebagai AI Assistant NusaLiving, aku bisa bantu:\n`;
            responseContent += `• Cari hunian (rumah, apartemen, kost)\n`;
            responseContent += `• Hitung budget & affordability\n`;
            responseContent += `• Kasih insight area & lokasi\n`;
            responseContent += `• Saran desain interior\n`;
            responseContent += `• Info KPR & financing\n\n`;
            responseContent += `Coba tanya lebih spesifik, misalnya:\n`;
            responseContent += `"Cari kost di Depok budget 2 juta"\n`;
            responseContent += `"Apartemen dekat MRT harga berapa?"\n`;
            responseContent += `"Desain kamar tidur minimalis"\n\n`;
            responseContent += `Atau langsung explore platform kami! 🚀`;
        }

        return NextResponse.json({
            role: "assistant",
            content: responseContent
        });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({
            role: "assistant",
            content: "Maaf, ada gangguan teknis. Tapi tenang, semua fitur NusaLiving tetap bisa kamu akses langsung! Coba explore halaman Explore, Design, atau Scan ya! 😊"
        }, { status: 500 });
    }
}
