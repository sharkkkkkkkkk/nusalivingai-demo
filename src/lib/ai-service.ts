
export interface ScanResult {
    type: string;
    condition: 'Furnished' | 'Unfurnished' | 'Semi-furnished';
    dimensions: string;
    lighting: string;
    styleSuggestions: string[]
}

export const analyzeImage = async (file: File): Promise<ScanResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return mock data based on simple random logic or fixed for demo
    return {
        type: "Kamar Tidur (Master Bedroom)",
        condition: "Unfurnished",
        dimensions: "4m x 5m (Estimasi AI)",
        lighting: "Natural Light: High, Ventilation: Good",
        styleSuggestions: [
            "Minimalist Tropical Indonesia",
            "Japandi (Japanese-Scandinavian)",
            "Industrial Modern"
        ]
    };
}
