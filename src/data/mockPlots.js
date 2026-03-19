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
    const purposes = ["Plots", "Lands"];
    const units = ["Cents", "Acres"];
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

    // Hardcoded high-value Thrissur assets to showcase the new card design
    const featuredPlots = [
        {
            id: "REF-PLT-001",
            title: "Prime Freehold Commercial Plot - Puzhakkal Hub",
            location: "Puzhakkal",
            sizeText: "1.5 Acres",
            sizeValue: 1.5,
            sizeUnit: "Acres",
            priceText: "₹8.5 Crores",
            priceValue: 85000000,
            purpose: "Lands",
            roadAccess: true,
            landmark: "Opposite Lulu Mall Thrissur",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1500&auto=format&fit=crop",
            dateAdded: new Date().toISOString(),
        },
        {
            id: "REF-PLT-002",
            name: "Sobha City View Reserve",
            title: "Sobha City View Reserve",
            location: "Thrissur City",
            sizeText: "12 Cents",
            sizeValue: 12,
            sizeUnit: "Cents",
            priceText: "₹42 Lakhs",
            priceValue: 4200000,
            purpose: "Plots",
            roadAccess: true,
            landmark: "Heritage Zone Near Vadakkumnathan",
            image: images[0],
            dateAdded: new Date(BASE_DATE - 1 * 86400000).toISOString(),
        },
        {
            id: "REF-PLT-003",
            name: "Guruvayur Divine Commercial",
            title: "Guruvayur Divine Commercial",
            location: "Guruvayur",
            sizeText: "25 Cents",
            sizeValue: 25,
            sizeUnit: "Cents",
            priceText: "₹1.1 Crores",
            priceValue: 11000000,
            purpose: "Lands",
            roadAccess: true,
            landmark: "Inner Ring Road Access",
            image: images[1],
            dateAdded: new Date(BASE_DATE - 5 * 86400000).toISOString(),
        },
        {
            id: "REF-PLT-004",
            name: "Irinjalakuda Heritage Estate",
            title: "Irinjalakuda Heritage Estate",
            location: "Irinjalakuda",
            sizeText: "40 Cents",
            sizeValue: 40,
            sizeUnit: "Cents",
            priceText: "₹85 Lakhs",
            priceValue: 8500000,
            purpose: "Plots",
            roadAccess: true,
            landmark: "Near Koodalmanikyam Temple",
            image: images[2],
            dateAdded: new Date(BASE_DATE - 2 * 86400000).toISOString(),
        },
        {
            id: "REF-PLT-005",
            name: "Koratty Infopark Highway Plot",
            title: "Koratty Infopark Highway Plot",
            location: "Koratty",
            sizeText: "0.8 Acres",
            sizeValue: 0.8,
            sizeUnit: "Acres",
            priceText: "₹3.2 Crores",
            priceValue: 32000000,
            purpose: "Lands",
            roadAccess: true,
            landmark: "Direct Highway Frontage",
            image: images[5],
            dateAdded: new Date(BASE_DATE - 10 * 86400000).toISOString(),
        },
        {
            id: "REF-PLT-006",
            name: "Chalakudy Riverfront Oasis",
            title: "Chalakudy Riverfront Oasis",
            location: "Chalakudy",
            sizeText: "15 Cents",
            sizeValue: 15,
            sizeUnit: "Cents",
            priceText: "₹38 Lakhs",
            priceValue: 3800000,
            purpose: "Plots",
            roadAccess: false,
            landmark: "Riverside Garden Access",
            image: images[3],
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
        } else {
            sizeValue = (prng() * 5 + 0.5).toFixed(1); // 0.5 to 5.5 acres
        }
        
        // Very rough pricing mapping for varied data
        let priceValue = 0;
        if (unit === 'Cents') {
            priceValue = sizeValue * (Math.floor(prng() * 300000) + 200000); // 2-5 lakhs per cent
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

        const descriptiveSuffix = [
            "Prime Location",
            "Investment Opportunity",
            "Clear Title",
            "Highway Frontage",
            "Near City Center",
            "Verified Asset"
        ][Math.floor(prng() * 6)];

        plots.push({
            id: `plot-${i}`,
            title: `Exclusive ${location} ${purpose} Asset | ${descriptiveSuffix}`,
            name: `Exclusive ${location} ${purpose} Asset | ${descriptiveSuffix}`,
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
