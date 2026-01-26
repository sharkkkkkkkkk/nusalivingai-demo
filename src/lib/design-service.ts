
export interface DesignInspiration {
    url: string;
    description: string;
    tags: string[];
}

// Categorized mock images from Unsplash
const designDatabase: DesignInspiration[] = [
    // Kamar Tidur - Hangat (Warm)
    { url: "https://images.unsplash.com/photo-1616594039964-40891a9046c9?q=80&w=1000&auto=format&fit=crop", description: "Kamar tidur warm cozy dengan pencahayaan kuning lembut", tags: ["kamar tidur", "bedroom", "hangat", "warm", "cozy", "plywood"] },
    { url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop", description: "Bedroom bohemian style dengan warna earth tone", tags: ["kamar tidur", "bedroom", "hangat", "warm", "boho", "earth tone"] },

    // Kamar Tidur - Dingin/Cool/Minimalist
    { url: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=1000&auto=format&fit=crop", description: "Modern minimalist bedroom dengan nuansa biru sejuk", tags: ["kamar tidur", "bedroom", "dingin", "cool", "minimalist", "blue", "modern"] },
    { url: "https://images.unsplash.com/photo-1594052308967-b52b2f67de0a?q=80&w=1000&auto=format&fit=crop", description: "Scandinavian bedroom, clean white and grey", tags: ["kamar tidur", "bedroom", "dingin", "cool", "white", "grey", "scandi"] },

    // Dapur - Hangat (Warm)
    { url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop", description: "Dapur kayu estetis dengan lighting hangat", tags: ["dapur", "kitchen", "hangat", "warm", "wood", "japanese"] },

    // Dapur - Modern/Cool
    { url: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=1000&auto=format&fit=crop", description: "Smart kitchen modern industrial grey", tags: ["dapur", "kitchen", "dingin", "cool", "industrial", "modern", "black"] },

    // Ruang Tamu - Hangat
    { url: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop", description: "Living room nyaman dengan sofa beige dan lampu gantung", tags: ["ruang tamu", "living room", "hangat", "warm", "beige", "family"] },

    // Ruang Tamu - Cool
    { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop", description: "Ruang tamu luas modern luxury glass", tags: ["ruang tamu", "living room", "dingin", "cool", "luxury", "glass"] },

    // Fallback generics
    { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop", description: "Interior modern minimalis", tags: ["general", "minimalist"] }
];

export const generateDesignResponse = async (prompt: string): Promise<{ text: string, images: string[] }> => {
    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerPrompt = prompt.toLowerCase();

    // Logic Matcher
    let matches = designDatabase.filter(item => {
        // Simple distinct word matching
        const promptWords = lowerPrompt.split(" ");
        return item.tags.some(tag => promptWords.includes(tag) || lowerPrompt.includes(tag));
    });

    // Filtering by specific room if mentioned
    if (lowerPrompt.includes("tidur") || lowerPrompt.includes("bedroom")) {
        matches = matches.filter(m => m.tags.includes("kamar tidur") || m.tags.includes("bedroom"));
    } else if (lowerPrompt.includes("dapur") || lowerPrompt.includes("kitchen")) {
        matches = matches.filter(m => m.tags.includes("dapur") || m.tags.includes("kitchen"));
    } else if (lowerPrompt.includes("tamu") || lowerPrompt.includes("living")) {
        matches = matches.filter(m => m.tags.includes("ruang tamu") || m.tags.includes("living room"));
    }

    // Filtering by nuance
    if (lowerPrompt.includes("hangat") || lowerPrompt.includes("warm") || lowerPrompt.includes("krem") || lowerPrompt.includes("kayu")) {
        matches = matches.filter(m => m.tags.includes("hangat") || m.tags.includes("warm"));
    } else if (lowerPrompt.includes("dingin") || lowerPrompt.includes("cool") || lowerPrompt.includes("sejuk") || lowerPrompt.includes("biru") || lowerPrompt.includes("putih")) {
        matches = matches.filter(m => m.tags.includes("dingin") || m.tags.includes("cool") || m.tags.includes("white"));
    }

    // Fallback if no specific match found but room was mentioned, return generic room
    if (matches.length === 0) {
        // Try to just match the room type ignoring nuance
        if (lowerPrompt.includes("tidur")) matches = designDatabase.filter(m => m.tags.includes("kamar tidur"));
        else if (lowerPrompt.includes("dapur")) matches = designDatabase.filter(m => m.tags.includes("dapur"));
        else if (lowerPrompt.includes("tamu")) matches = designDatabase.filter(m => m.tags.includes("ruang tamu"));
        else matches = [designDatabase[designDatabase.length - 1]]; // Ultimate fallback
    }

    // Pick top 2-4 matches
    const selectedImages = matches.slice(0, 4).map(m => m.url);

    // Generate Contextual Text
    let responseText = "Berikut adalah inspirasi desain yang cocok untuk Anda.";
    if (lowerPrompt.includes("hangat")) {
        responseText = "Pilihan bagus! Nuansa hangat dengan lighting 3000K-4000K dan elemen kayu akan membuat ruangan terasa sangat 'homy' dan menenangkan.";
    } else if (lowerPrompt.includes("dingin") || lowerPrompt.includes("sejuk")) {
        responseText = "Style pilihan Anda mengarah ke 'Cool & Clean'. Penggunaan warna putih dominan, biru pastel, atau abu-abu dengan cahaya natural light akan memberikan kesan luas dan produktif.";
    } else if (lowerPrompt.includes("dapur")) {
        responseText = "Untuk dapur, pastikan 'Working Triangle' (Wastafel, Kompor, Kulkas) tertata ergonomis. Berikut referensi visualnya.";
    }

    return {
        text: responseText,
        images: selectedImages.length > 0 ? selectedImages : [designDatabase[0].url]
    };
}
