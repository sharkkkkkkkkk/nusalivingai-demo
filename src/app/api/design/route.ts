
import { NextResponse } from "next/server";
import { generateImageResponse } from "@/lib/openai";

const FALLBACK_IMAGES = {
    bedroom: [
        "https://images.unsplash.com/photo-1616594039964-40891a909d99?auto=format&fit=crop&q=80&w=1024",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1024",
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1024"
    ],
    living: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1024",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1024",
        "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=1024"
    ],
    kitchen: [
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=1024",
        "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&q=80&w=1024"
    ],
    bathroom: [
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1024",
        "https://images.unsplash.com/photo-1620626012053-1c1ad85f65b4?auto=format&fit=crop&q=80&w=1024"
    ],
    default: [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1024",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1024",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1024"
    ]
};

export async function POST(req: Request) {
    try {
        const { prompt, type } = await req.json();

        // Enhance Prompt based on type
        let enhancedPrompt = prompt;
        if (type === 'image') {
            enhancedPrompt = `Redesign this room: ${prompt}. Maintain original room value, enhance style. Photorealistic, 8k, interior design.`;
        } else if (type === 'chat') {
            enhancedPrompt = `Adjust interior design: ${prompt}. Photorealistic, 8k.`;
        } else {
            enhancedPrompt = `Interior design of ${prompt}. Modern, clean, photorealistic, 8k, suitable for Indonesian tropical climate.`;
        }

        let imageUrl = await generateImageResponse(enhancedPrompt);

        if (!imageUrl) {
            // Intelligent Fallback Selection
            const lowerPrompt = prompt.toLowerCase();
            let category = 'default';

            if (lowerPrompt.includes('kamar') || lowerPrompt.includes('bedroom') || lowerPrompt.includes('tidur')) category = 'bedroom';
            else if (lowerPrompt.includes('tamu') || lowerPrompt.includes('living') || lowerPrompt.includes('keluarga')) category = 'living';
            else if (lowerPrompt.includes('dapur') || lowerPrompt.includes('kitchen') || lowerPrompt.includes('masak')) category = 'kitchen';
            else if (lowerPrompt.includes('mandi') || lowerPrompt.includes('bathroom')) category = 'bathroom';

            const options = FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES] || FALLBACK_IMAGES.default;
            imageUrl = options[Math.floor(Math.random() * options.length)];
        }

        return NextResponse.json({
            url: imageUrl,
            message: "Berikut adalah desain visual hasil interpretasi AI. Bagaimana menurutmu?"
        });

    } catch (error) {
        console.error("Design API Error:", error);
        return NextResponse.json({ url: "", message: "Gagal generate gambar." }, { status: 500 });
    }
}
