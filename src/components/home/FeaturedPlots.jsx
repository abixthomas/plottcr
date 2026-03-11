import { ArrowRight, MapPin, Ruler } from 'lucide-react';

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
                        <div
                            key={plot.id}
                            className="group relative flex flex-col bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 will-change-transform hover:-translate-y-2"
                        >
                            {/* Image Section - Normal Size */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                                <img
                                    src={plot.image}
                                    alt={plot.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                />
                                {/* Gentle Dark Gradient at bottom for text contrast if needed */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Refined Featured Ribbon */}
                                {plot.featured && (
                                    <div className="absolute top-6 -right-2 bg-[#061E2D] text-white text-[10px] font-bold tracking-widest uppercase px-5 py-2 shadow-lg z-10 text-center min-w-[100px]">
                                        {plot.tag}
                                        {/* Ribbon fold effect */}
                                        <div className="absolute -bottom-2 right-0 w-2 h-2 bg-black opacity-50 clip-path-ribbon" />
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="px-6 md:px-8 pt-8 pb-8 flex flex-col flex-grow relative bg-white border border-[#061E2D]/5 group-hover:border-transparent transition-colors">

                                {/* Overlapping Action Circle */}
                                <div className="absolute top-0 right-8 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 text-[#0B5C8A] group-hover:bg-[#D33C29] group-hover:text-white group-hover:border-[#D33C29] transition-all duration-300 z-10 cursor-pointer">
                                    <ArrowRight size={20} className="-rotate-45" />
                                </div>

                                {/* Title */}
                                <h3 className="text-[32px] font-sans font-bold text-[#061E2D] mb-2 group-hover:text-[#D33C29] tracking-tight transition-colors line-clamp-1">
                                    {plot.title}
                                </h3>

                                {/* Location (Underneath the title) */}
                                <div className="flex items-center gap-2 text-[#0B5C8A] text-[11px] font-bold tracking-[0.15em] uppercase mb-8">
                                    <MapPin size={12} className="text-[#D33C29]" />
                                    {plot.location}
                                </div>

                                {/* Specs Row */}
                                <div className="pt-5 border-t border-gray-100 flex items-end justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-[10px] items-center flex gap-1 font-bold uppercase tracking-widest mb-1.5">
                                            Area
                                        </span>
                                        <span className="text-[#061E2D] font-bold text-[15px]">
                                            {plot.size}
                                        </span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                                            Price
                                        </span>
                                        <span className="text-[#D33C29] font-bold text-[22px] tracking-tight leading-none">
                                            {plot.price}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Top Border Accent Line */}
                            <div className="absolute top-0 left-0 w-0 h-1 bg-[#D33C29] group-hover:w-full transition-all duration-500 ease-out z-20" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}