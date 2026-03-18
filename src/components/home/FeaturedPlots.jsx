import { ArrowRight } from 'lucide-react';
import HomePlotCard from './HomePlotCard';

const plots = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop',
        title: 'Sobha City View',
        location: 'Near Vadakkumnathan Temple',
        size: '10 Cents',
        price: '₹25 Lakhs',
        description: 'Residential plot with panoramic temple view, road access, electricity.',
        featured: true,
        tag: 'Premium'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop',
        title: 'Guruvayur East',
        location: 'Guruvayur',
        size: '15 Cents',
        price: '₹40 Lakhs',
        description: 'Commercial zone, 200m from temple, high footfall.',
        featured: true,
        tag: 'High ROI'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1628611225249-6c3c7c689552?q=80&w=2000&auto=format&fit=crop',
        title: 'City Center',
        location: 'Thrissur City',
        size: '8 Cents',
        price: '₹32 Lakhs',
        description: 'Near Aster Medcity and schools, perfect for residential.',
        featured: true,
        tag: 'Central'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop',
        title: 'Riverside Estate',
        location: 'Kunnamkulam',
        size: '12 Cents',
        price: '₹28 Lakhs',
        description: 'Scenic riverside plot, ideal for weekend home.',
        featured: false,
        tag: ''
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
        title: 'Lulu Avenue',
        location: 'Puzhakkal',
        size: '20 Cents',
        price: '₹80 Lakhs',
        description: 'Prime commercial location directly opposite to Lulu Mall Thrissur.',
        featured: true,
        tag: 'Commercial'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop',
        title: 'Heritage Gardens',
        location: 'Punkunnam',
        size: '7 Cents',
        price: '₹21 Lakhs',
        description: 'Quiet residential neighborhood surrounded by traditional architecture.',
        featured: false,
        tag: ''
    }
];

export default function FeaturedPlots() {
    return (
        <section className="bg-gray-50 py-24 md:py-32">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
                    <div className="max-w-xl">
                        <span className="inline-block text-[#D33C29] font-medium tracking-widest uppercase text-xs md:text-sm mb-4">
                            Exclusive Collection
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#061E2D] leading-[1.1]">
                            Featured Plots
                        </h2>
                    </div>
                    <a href="#" className="inline-flex items-center gap-3 text-[#061E2D] font-bold hover:text-[#D33C29] transition-colors group text-sm uppercase tracking-widest border-b-2 border-[#061E2D] hover:border-[#D33C29] pb-1">
                        View All Listings
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* 3 Columns = 2 Rows with 6 items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 2xl:gap-12">
                    {plots.map((plot) => (
                        <HomePlotCard key={plot.id} plot={plot} />
                    ))}
                </div>
            </div>
        </section>
    );
}