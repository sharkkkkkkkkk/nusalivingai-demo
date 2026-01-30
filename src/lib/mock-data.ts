
import { Property } from "./types";

export const MOCK_PROPERTIES: Property[] = [
    {
        id: "prop-001",
        title: "Minimalist Loft BSD",
        type: "apartment",
        price: 3500000,
        pricePeriod: "monthly",
        location: {
            address: "Green Office Park, BSD City",
            city: "Tangerang Selatan",
            district: "BSD",
            lat: -6.301,
            lng: 106.653
        },
        specs: {
            bedrooms: 1,
            bathrooms: 1,
            area: 32,
            furnishing: "furnished"
        },
        features: ["Smart Home", "Pool", "Gym", "Near Station", "High Speed Wifi"],
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800"],
        scores: {
            affordability: 85,
            access: 90,
            comfort: 88,
            genZFit: 95
        },
        description: "Apartemen loft modern cocok untuk digital nomad. Dekat dengan The Breeze dan Digital Hub.",
        agent: {
            name: "Siti Properti",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti"
        }
    },
    {
        id: "prop-002",
        title: "Co-living Space Jaksel",
        type: "coliving",
        price: 2800000,
        pricePeriod: "monthly",
        location: {
            address: "Jl. Cipete Raya No. 10",
            city: "Jakarta Selatan",
            district: "Cipete",
            lat: -6.275,
            lng: 106.812
        },
        specs: {
            bedrooms: 1,
            bathrooms: 1,
            area: 18,
            furnishing: "furnished"
        },
        features: ["Community Events", "Shared Kitchen", "Coworking Space", "Cleaning Service"],
        images: ["https://images.unsplash.com/photo-1522771753062-588773169514?auto=format&fit=crop&q=80&w=800"],
        scores: {
            affordability: 78,
            access: 92,
            comfort: 85,
            genZFit: 98
        },
        description: "Hunian komunal seru di tengah hip-nya Cipete. Dekat MRT dan cafe hits.",
        agent: {
            name: "Budi Agent",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi"
        }
    },
    {
        id: "prop-003",
        title: "Rumah Tumbuh Depok",
        type: "house",
        price: 850000000,
        pricePeriod: "buy",
        location: {
            address: "Sawangan, Depok",
            city: "Depok",
            district: "Sawangan",
            lat: -6.402,
            lng: 106.77
        },
        specs: {
            bedrooms: 2,
            bathrooms: 1,
            area: 60,
            furnishing: "unfurnished"
        },
        features: ["Garden", "Carport", "Expandable", "Green Area"],
        images: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&q=80&w=800"],
        scores: {
            affordability: 70,
            access: 65,
            comfort: 90,
            genZFit: 80
        },
        description: "Konsep rumah tumbuh skandinavian. Cocok untuk pasangan muda yang ingin berinvestasi jangka panjang.",
        agent: {
            name: "Rina Realty",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina"
        }
    },
    {
        id: "prop-004",
        title: "Kost Eksklusif SCBD Suites",
        type: "kos",
        price: 5500000,
        pricePeriod: "monthly",
        location: {
            address: "Senopati, Jakarta Selatan",
            city: "Jakarta Selatan",
            district: "Senopati",
            lat: -6.2200,
            lng: 106.8100
        },
        specs: {
            bedrooms: 1,
            bathrooms: 1,
            area: 24,
            furnishing: "furnished"
        },
        features: ["Lux", "Pool", "Gym", "Private Kitchen", "Netflix"],
        images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800"],
        scores: {
            affordability: 50,
            access: 98,
            comfort: 95,
            genZFit: 90
        },
        description: "Kost rasa apartemen di pusat bisnis SCBD. Jalan kaki ke kantor.",
        agent: {
            name: "SCBD Living",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SCBD"
        }
    },
    {
        id: "prop-005",
        title: "Creative House Dago",
        type: "house",
        price: 4500000,
        pricePeriod: "monthly",
        location: {
            address: "Dago Atas, Bandung",
            city: "Bandung",
            district: "Dago",
            lat: -6.8800,
            lng: 107.6100
        },
        specs: {
            bedrooms: 3,
            bathrooms: 2,
            area: 120,
            furnishing: "semi-furnished"
        },
        features: ["Villa Vibes", "Studio Space", "Garden", "Quiet"],
        images: ["https://images.unsplash.com/photo-1600596542815-2a4fe3011197?auto=format&fit=crop&q=80&w=800"],
        scores: {
            affordability: 85,
            access: 70,
            comfort: 98,
            genZFit: 92
        },
        description: "Rumah sewa dengan suasana villa di Dago. Cocok untuk tim kreatif atau content creator house.",
        agent: {
            name: "Kang Asep",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Asep"
        }
    }
];

export const LIFESTYLE_INSIGHTS = {
    "BSD": {
        vibe: "Modern & Organized",
        crowd: "Professionals, Young Families",
        highlights: ["Digital Hub", "Green Parks", "Wide Roads"],
        challenges: ["Public Transport to Jakarta (Train only)", "Need Car/Motorcycle"]
    },
    "Jakarta Selatan": {
        vibe: "Trendy & Busy",
        crowd: "Creatives, Expats, Gen Z",
        highlights: ["Coffee Shops", "Nightlife", "MRT Access"],
        challenges: ["Traffic Jams", "High Cost of Living", "Noise"]
    },
    "Depok": {
        vibe: "Academic & Laid back",
        crowd: "Students, Commuters",
        highlights: ["Affordable Food", "Train Access", "Universities"],
        challenges: ["Macet Margonda", "Dense Housing"]
    },
    "Bandung": {
        vibe: "Creative & Chill",
        crowd: "Students, Artists, Startups",
        highlights: ["Cool Climate", "Street Food", "Art Scene"],
        challenges: ["Traffic on Weekends", "Public Transport"]
    }
};
