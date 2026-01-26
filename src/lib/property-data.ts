
export interface Property {
    id: string;
    name: string;
    type: 'Kost' | 'Apartment' | 'Coliving' | 'House';
    price: number;
    location: string;
    image: string;
    rating: number;
    tags: string[];
    features: string[];
    coords: [number, number]; // Lat, Lng
    managedBy: string;
    transport: string[]; // e.g. "Dekat MRT", "Dekat KRL"
    gender: 'Campur' | 'Putra' | 'Putri';
    isVideoAvailable?: boolean;
}

export const properties: Property[] = [
    {
        id: "1",
        name: "NusaLiving Bahari Cipete",
        type: "Coliving",
        price: 3500000,
        location: "Cilandak, Jakarta Selatan",
        image: "https://images.unsplash.com/photo-1522771753035-4a50097a5fce?auto=format&fit=crop&q=80&w=800",
        rating: 4.8,
        tags: ["Kamar Mandi Dalam", "AC", "Furniture Baru"],
        features: ["WiFi Kencang", "Dapur Bersama", "Security 24 Jam", "Cleaning Service", "Ruang Tamu", "Parkir Motor"],
        coords: [-6.2345, 106.8500],
        managedBy: "NusaLiving",
        transport: ["Dekat MRT"],
        gender: "Campur",
        isVideoAvailable: true
    },
    {
        id: "2",
        name: "Kost Eksklusif SCBD Suites",
        type: "Kost",
        price: 5500000,
        location: "Senopati, Jakarta Selatan",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800",
        rating: 4.9,
        tags: ["Lux", "Parkir Mobil", "Bathtub"],
        features: ["Kolam Renang", "Gym", "Laundry", "Private Kitchen", "Netflix Ready"],
        coords: [-6.2200, 106.8100],
        managedBy: "Partner",
        transport: ["Dekat MRT", "Dekat Halte Busway"],
        gender: "Putri"
    },
    {
        id: "3",
        name: "Apartemen Kalibata City Green",
        type: "Apartment",
        price: 4000000,
        location: "Kalibata, Jakarta Selatan",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
        rating: 4.3,
        tags: ["2BR", "Full Furnished", "City View"],
        features: ["Mall Access", "Stasiun Kereta", "Food Court", "ATM Center"],
        coords: [-6.2550, 106.8550],
        managedBy: "Owner",
        transport: ["Dekat KRL"],
        gender: "Campur"
    },
    {
        id: "4",
        name: "Kost Murah Binus Syahdan",
        type: "Kost",
        price: 1800000,
        location: "Kemanggisan, Jakarta Barat",
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800",
        rating: 4.5,
        tags: ["Kamar Mandi Luar", "Termasuk Listrik"],
        features: ["WiFi", "Air Minum Dispenser", "Parkir Motor"],
        coords: [-6.2000, 106.7800],
        managedBy: "NusaLiving",
        transport: [],
        gender: "Putra"
    },
    {
        id: "5",
        name: "Creative Hub House Dago",
        type: "House",
        price: 4500000,
        location: "Dago, Bandung",
        image: "https://images.unsplash.com/photo-1600596542815-2a4fe3011197?auto=format&fit=crop&q=80&w=800",
        rating: 4.9,
        tags: ["Villa Vibes", "View Bagus", "Tenang"],
        features: ["Taman Luas", "Studio Space", "Balcony", "BBQ Area"],
        coords: [-6.8800, 107.6100],
        managedBy: "NusaLiving",
        transport: [],
        gender: "Campur",
        isVideoAvailable: true
    },
    {
        id: "6",
        name: "Kost Salemba UI",
        type: "Kost",
        price: 2200000,
        location: "Salemba, Jakarta Pusat",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800",
        rating: 4.6,
        tags: ["Dekat Kampus", "Strategis"],
        features: ["WiFi", "Ruang Belajar", "CCTV"],
        coords: [-6.1900, 106.8400],
        managedBy: "Partner",
        transport: ["Dekat KRL", "Dekat Halte Busway"],
        gender: "Putri"
    }
];
