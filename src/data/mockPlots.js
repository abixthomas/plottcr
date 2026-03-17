// Simple seeded PRNG to ensure hydration matches
function createPRNG(seed) {
    let state = seed;
    return function() {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

const prng = createPRNG(12345); // Fixed seed
const BASE_DATE = new Date('2026-03-01T00:00:00Z').getTime();

export const generateMockPlots = () => {
    const locations = ["Thrissur City", "Guruvayur", "Irinjalakuda", "Koratty", "Puzhakkal", "Punkunnam", "Kunnamkulam", "Chalakudy", "Kodungallur"];
    const purposes = ["Residential", "Commercial", "Investment"];
    const units = ["Cents", "Sq.ft", "Acres"];
    const landmarks = ["Near Temple", "Near Hospital", "Highway Access", "Near School", "River View", "City Center"];
    const images = [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1628611225249-6c3c7c689552?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518557984649-7b161c230cfa?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000&auto=format&fit=crop"
    ];

    const plots = [];

    // Ensure first few are the hardcoded ones to match featured plots perfectly
    const featuredPlots = [
        {
            id: 'plot-1',
            title: 'Sobha City View',
            location: 'Thrissur City',
            sizeText: '10 Cents',
            sizeValue: 10,
            sizeUnit: 'Cents',
            priceText: '₹25 Lakhs',
            priceValue: 2500000,
            purpose: 'Residential',
            roadAccess: true,
            landmark: 'Near Vadakkumnathan Temple',
            image: images[0],
            dateAdded: new Date(BASE_DATE - 1 * 86400000).toISOString(),
        },
        {
            id: 'plot-2',
            title: 'Guruvayur East Commercial',
            location: 'Guruvayur',
            sizeText: '15 Cents',
            sizeValue: 15,
            sizeUnit: 'Cents',
            priceText: '₹40 Lakhs',
            priceValue: 4000000,
            purpose: 'Commercial',
            roadAccess: true,
            landmark: 'Near Temple',
            image: images[1],
            dateAdded: new Date(BASE_DATE - 5 * 86400000).toISOString(),
        },
        {
            id: 'plot-3',
            title: 'City Center Premium',
            location: 'Thrissur City',
            sizeText: '8 Cents',
            sizeValue: 8,
            sizeUnit: 'Cents',
            priceText: '₹32 Lakhs',
            priceValue: 3200000,
            purpose: 'Investment',
            roadAccess: true,
            landmark: 'City Center',
            image: images[2],
            dateAdded: new Date(BASE_DATE - 2 * 86400000).toISOString(),
        },
        {
            id: 'plot-4',
            title: 'Riverside Estate',
            location: 'Kunnamkulam',
            sizeText: '1.2 Acres',
            sizeValue: 1.2,
            sizeUnit: 'Acres',
            priceText: '₹2.5 Crores',
            priceValue: 25000000,
            purpose: 'Residential',
            roadAccess: false,
            landmark: 'River View',
            image: images[3],
            dateAdded: new Date(BASE_DATE - 10 * 86400000).toISOString(),
        },
        {
            id: 'plot-5',
            title: 'Lulu Avenue Commercial',
            location: 'Puzhakkal',
            sizeText: '20 Cents',
            sizeValue: 20,
            sizeUnit: 'Cents',
            priceText: '₹80 Lakhs',
            priceValue: 8000000,
            purpose: 'Commercial',
            roadAccess: true,
            landmark: 'Highway Access',
            image: images[4],
            dateAdded: new Date(BASE_DATE - 3 * 86400000).toISOString(),
        }
    ];

    plots.push(...featuredPlots);

    for (let i = 6; i <= 100; i++) {
        const location = locations[Math.floor(prng() * locations.length)];
        const purpose = purposes[Math.floor(prng() * purposes.length)];
        const unit = units[Math.floor(prng() * units.length)];
        const landmark = landmarks[Math.floor(prng() * landmarks.length)];
        const image = images[Math.floor(prng() * images.length)];
        const roadAccess = prng() > 0.2; // 80% have road access

        let sizeValue;
        if (unit === 'Cents') {
            sizeValue = Math.floor(prng() * 50) + 3; // 3 to 53 cents
        } else if (unit === 'Sq.ft') {
            sizeValue = Math.floor(prng() * 10000) + 1000; // 1000 to 11000 sqft
        } else {
            sizeValue = (prng() * 5 + 0.5).toFixed(1); // 0.5 to 5.5 acres
        }
        
        // Very rough pricing mapping for varied data
        let priceValue = 0;
        if (unit === 'Cents') {
            priceValue = sizeValue * (Math.floor(prng() * 300000) + 200000); // 2-5 lakhs per cent
        } else if (unit === 'Sq.ft') {
            priceValue = sizeValue * (Math.floor(prng() * 1000) + 500);
        } else {
            priceValue = sizeValue * 100 * (Math.floor(prng() * 200000) + 100000); 
        }

        let priceText = '';
        if (priceValue >= 10000000) {
            priceText = `₹${(priceValue / 10000000).toFixed(2)} Crores`;
        } else {
            priceText = `₹${Math.floor(priceValue / 100000)} Lakhs`;
        }

        // Generate date within last 30 days deterministically
        const dateAdded = new Date(BASE_DATE - Math.floor(prng() * 30 * 86400000)).toISOString();

        plots.push({
            id: `plot-${i}`,
            title: `${location} ${purpose} Plot`,
            location,
            sizeText: `${sizeValue} ${unit}`,
            sizeValue: parseFloat(sizeValue),
            sizeUnit: unit,
            priceText,
            priceValue,
            purpose,
            roadAccess,
            landmark,
            image,
            dateAdded
        });
    }

    return plots;
};

export const mockPlots = generateMockPlots();
