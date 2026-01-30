
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "mock-key",
    dangerouslyAllowBrowser: true // Although this is server-side, sometimes necessary in edge scenarios
});

export async function getChatResponse(messages: any[]) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            // Simulate intelligent delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            return null; // Signal to use fallback
        }

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are NusaLiving AI, a helpful real estate assistant for the Indonesian market. You speak Bahasa Indonesia. You help users find homes, check KPR (mortgages), and design interiors. Be concise, friendly, and use Gen Z slang occasionally but remain professional." },
                ...messages
            ],
            model: "gpt-4o-mini",
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Error:", error);
        return null;
    }
}

export async function generateImageResponse(prompt: string) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return null;
        }

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Interior design photorealistic: ${prompt}. High quality, 4k, architectural photography style, suitable for Indonesian homes.`,
            n: 1,
            size: "1024x1024",
        });

        return response?.data?.[0]?.url;
    } catch (error) {
        console.error("DALL-E Error:", error);
        return null;
    }
}
