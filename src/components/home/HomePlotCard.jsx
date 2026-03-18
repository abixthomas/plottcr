import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export default function HomePlotCard({ plot }) {
    return (
        <div
            className="group relative flex flex-col bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 will-change-transform hover:-translate-y-2 h-full"
        >
            {/* Image Section - Normal Size */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                <img
                    src={plot.image}
                    alt={plot.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Refined Featured Ribbon */}
                {plot.featured && (
                    <div className="absolute top-6 -right-2 bg-[#061E2D] text-white text-[10px] font-bold tracking-widest uppercase px-5 py-2 shadow-lg z-10 text-center min-w-[100px]">
                        {plot.tag}
                        {/* Ribbon fold effect */}
                        <div className="absolute -bottom-2 right-0 w-2 h-2 bg-black opacity-50 [clip-path:polygon(0_0,100%_0,100%_100%)]" />
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
    );
}
