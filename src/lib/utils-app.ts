
import { Property, UserPreferences } from "./types";

export function calculateScores(property: Property, prefs?: UserPreferences): Property['scores'] {
    if (!prefs) return property.scores;

    // 1. Affordability Score
    let affordability = 50;
    if (prefs.income && property.price) {
        let monthlyCost = property.price;
        if (property.pricePeriod === 'buy') {
            monthlyCost = property.price / 240; // Rough estimation: 20 years mortgage 
        } else if (property.pricePeriod === 'yearly') {
            monthlyCost = property.price / 12;
        }

        const ratio = monthlyCost / prefs.income;
        if (ratio <= 0.3) affordability = 95; // Ideal
        else if (ratio <= 0.4) affordability = 80;
        else if (ratio <= 0.5) affordability = 60;
        else if (ratio <= 0.6) affordability = 40;
        else affordability = 20; // High risk
    }

    // 2. Access/Mobility Score
    let access = property.scores.access;
    if (prefs.workLocation) {
        // Simple heuristic: Boost score if location matches or is known to be good for transport
        const sameDistrict = property.location.district.toLowerCase() === prefs.workLocation.toLowerCase();
        const sameCity = property.location.city.toLowerCase() === prefs.workLocation.toLowerCase();

        if (sameDistrict) access = Math.min(98, access + 15);
        else if (sameCity) access = Math.min(95, access + 5);

        if (prefs.transportMode === 'public') {
            if (property.features.some(f => f.toLowerCase().includes('mrt') || f.toLowerCase().includes('station') || f.toLowerCase().includes('krl'))) {
                access = Math.min(99, access + 10);
            } else {
                access = Math.max(30, access - 10);
            }
        }
    }

    // 3. Gen Z Fit Score
    let genZFit = property.scores.genZFit;
    const genZKeywords = ['wifi', 'smart', 'aesthetic', 'coffee', 'gym', 'pool', 'netflix', 'loft', 'industrial'];
    const matchCount = genZKeywords.filter(k =>
        property.features.some(f => f.toLowerCase().includes(k)) ||
        property.description.toLowerCase().includes(k)
    ).length;

    if (matchCount > 3) genZFit = Math.min(99, genZFit + 10);
    if (property.type === 'coliving' || property.type === 'apartment') genZFit = Math.min(99, genZFit + 5);

    // 4. Comfort Score
    let comfort = property.scores.comfort;
    if (property.specs.furnishing === 'furnished') comfort += 5;
    if (property.specs.area > 30) comfort += 5;

    return {
        affordability: Math.round(affordability),
        access: Math.round(access),
        comfort: Math.round(Math.min(100, comfort)),
        genZFit: Math.round(Math.min(100, genZFit))
    };
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
