import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export default function PlotCard({ plot }) {
    return (
        <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] border border-transparent hover:border-[#D33C29]/30 transition-all duration-500 will-change-transform hover:-translate-y-2">
            
            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                    src={plot.image}
                    alt={plot.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Purpose Badge - Fixed Position */}
                {plot.purpose && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#0B5C8A] text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded shadow-lg z-10 transition-colors group-hover:text-[#D33C29]">
                        {plot.purpose}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow relative bg-white/80 backdrop-blur-sm">
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-sans font-bold text-[#0B5C8A] mb-2 group-hover:text-[#D33C29] tracking-tight transition-colors line-clamp-1">
                    {plot.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider mb-6">
                    <MapPin size={14} className="text-[#D33C29]" />
                    {plot.location}
                </div>

                {/* Specs Row */}
                <div className="pt-4 border-t border-gray-100 flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                            Size
                        </span>
                        <span className="text-[#061E2D] font-bold text-sm">
                            {plot.sizeText}
                        </span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                            Price
                        </span>
                        <span className="text-[#D33C29] font-bold text-xl tracking-tight leading-none">
                            {plot.priceText}
                        </span>
                    </div>
                </div>

                {/* View Details Button Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-0 bg-[#F8FAFC]/90 backdrop-blur-md overflow-hidden group-hover:h-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center -z-10 group-hover:z-20 opacity-0 group-hover:opacity-100">
                    <button className="flex items-center gap-2 text-[#061E2D] font-bold tracking-widest uppercase text-sm border-b-2 border-[#D33C29] pb-1 hover:text-[#D33C29] transition-colors">
                        View Details
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>

            {/* Top Border Accent Line */}
            <div className="absolute top-0 left-0 w-0 h-1 bg-[#D33C29] group-hover:w-full transition-all duration-500 ease-out z-20 rounded-t-xl" />
        </div>
    );
}
