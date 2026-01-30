
export interface Property {
    id: string;
    title: string;
    type: "house" | "apartment" | "kos" | "coliving";
    price: number;
    pricePeriod: "monthly" | "yearly" | "buy";
    location: {
        address: string;
        city: string;
        district: string;
        lat: number;
        lng: number;
    };
    specs: {
        bedrooms: number;
        bathrooms: number;
        area: number; // m2
        furnishing: "unfurnished" | "semi-furnished" | "furnished";
    };
    features: string[];
    images: string[];
    scores: {
        affordability: number; // 0-100
        access: number; // 0-100
        comfort: number; // 0-100
        genZFit: number; // 0-100
    };
    description: string;
    agent: {
        name: string;
        avatar: string;
    };
}

export interface DesignRequest {
    type: "text-to-design" | "image-to-design" | "chat-to-visual";
    prompt?: string;
    image?: string; // base64 or url
    roomType?: string;
    style?: string;
}

export interface ChatMessage {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: string;
}

export interface UserPreferences {
    income?: number;
    workLocation?: string;
    transportMode?: 'public' | 'private';
    lifestyle?: string[]; // e.g., 'quiet', 'nightlife', 'gym'
}
