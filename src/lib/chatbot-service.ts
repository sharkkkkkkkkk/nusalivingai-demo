
import { properties } from "./property-data";

export interface ChatMessage {
    id: string;
    role: 'user' | 'ai';
    content: string;
    attachments?: any[];
}

export const sendMessageToAI = async (message: string, history: ChatMessage[]): Promise<ChatMessage> => {
    // Simulate latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerMsg = message.toLowerCase();
    let content = "";

    // Simple Keyword matching simulation for "RAG"
    if (lowerMsg.includes("cari") || lowerMsg.includes("rekomendasi") || lowerMsg.includes("info")) {
        if (lowerMsg.includes("tebet")) {
            const tebetProps = properties.filter(p => p.location.includes("Tebet"));
            content = `Saya menemukan ${tebetProps.length} hunian menarik di area Tebet untukmu: \n\n` +
                tebetProps.map(p => `- **${p.name}**: Rp ${p.price.toLocaleString('id-ID')} (${p.type})`).join("\n");
        } else if (lowerMsg.includes("kamar mandi dalam")) {
            const props = properties.filter(p => p.tags.includes("Kamar Mandi Dalam") || p.tags.includes("2BR") || p.type === "Apartment");
            content = `Untuk privasi lebih, berikut rekomendasi dengan kamar mandi dalam:\n` +
                props.map(p => `- **${p.name}** di ${p.location}`).join("\n");
        } else {
            content = "Saya bisa bantu carikan hunian. Coba sebutkan lokasi (misal: Tebet, SCBD) atau budget kamu?";
        }
    } else if (lowerMsg.includes("halo") || lowerMsg.includes("hi")) {
        content = "Halo! Saya NusaAI, asisten properti pribadimu. Ada yang bisa saya bantu hari ini? Mau cari kos, apartemen, atau konsultasi desain?";
    } else if (lowerMsg.includes("desain") || lowerMsg.includes("interior")) {
        content = "Untuk bantuan desain interior, kamu bisa upload foto ruanganmu di menu 'Scan AI' atau gunakan fitur 'Design' untuk generate ide visual.";
    } else {
        content = "Maaf, saya spesialis properti dan desain. Bisa ulangi pertanyaanmu seputar hunian?";
    }

    return {
        id: Date.now().toString(),
        role: 'ai',
        content: content
    };
}
