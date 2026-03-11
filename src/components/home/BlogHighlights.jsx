import { ArrowRight, CalendarDays, Clock } from 'lucide-react';

const insights = [
    {
        id: 1,
        title: "The NRI Guide to Safe Land Investments in Kerala",
        excerpt: "Navigate the complexities of property acquisition from abroad with our comprehensive legal and procedural checklist.",
        date: "March 10, 2026",
        readTime: "5 min read",
        category: "Investment Guide",
        image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1500&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Why Thrissur is Emerging as the Premier Retirement Destination",
        excerpt: "An analysis of the cultural, medical, and lifestyle infrastructure making Thrissur the ideal choice for returning seniors.",
        date: "February 28, 2026",
        readTime: "8 min read",
        category: "Market Analysis",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1500&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Understanding Property Valuation: Beyond the Square Footage",
        excerpt: "Learn how to assess true intrinsic value when considering premium legacy assets in exclusive neighborhoods.",
        date: "February 15, 2026",
        readTime: "6 min read",
        category: "Expert Advice",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1500&auto=format&fit=crop"
    }
];

export default function BlogHighlights() {
    return (
        <section className="bg-[#FFFFFF] py-24 md:py-32">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
                    <div className="max-w-2xl">
                        <span className="inline-block text-[#D33C29] font-medium tracking-widest uppercase text-xs md:text-sm mb-4">
                            Market Intelligence
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#061E2D] leading-[1.1]">
                            Insights & Editorials
                        </h2>
                    </div>
                    <a href="#" className="inline-flex items-center gap-3 text-[#061E2D] font-bold hover:text-[#D33C29] transition-colors group text-sm uppercase tracking-widest border-b-2 border-[#061E2D] hover:border-[#D33C29] pb-1">
                        Read All Articles
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
                    {insights.map((post) => (
                        <article
                            key={post.id}
                            className="group flex flex-col bg-white border border-[#061E2D]/10 hover:border-[#0B5C8A]/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 rounded-lg hover:-translate-y-1"
                        >
                            {/* Image Box */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase text-[#0B5C8A] rounded-full shadow-sm">
                                    {post.category}
                                </div>
                            </div>

                            {/* Content Box */}
                            <div className="p-8 md:p-10 flex flex-col flex-grow">
                                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#061E2D] mb-4 group-hover:text-[#D33C29] transition-colors line-clamp-2 leading-snug">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 font-light text-base mb-8 line-clamp-3 leading-relaxed flex-grow">
                                    {post.excerpt}
                                </p>

                                {/* Meta Footer */}
                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#061E2D]/5 text-xs font-mono tracking-widest uppercase text-[#061E2D]/50">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={14} className="text-[#0B5C8A]" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className="text-[#0B5C8A]" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}
