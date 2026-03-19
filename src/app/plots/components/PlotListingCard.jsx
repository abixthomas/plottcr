'use client';

import React, { useRef, useState } from 'react';
import { MapPin, Maximize2, Route, ArrowUpRight, Phone, Eye } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

// BRAND ACCENTS
const BRAND_RED = '#D33C29';
const BRAND_TEAL = '#063D69';

export default function PlotListingCard({ plot, index = 0 }) {
    if (!plot) return null;

    const [isSelected, setIsSelected] = useState(false);
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    const formatPrice = (value) => {
        if (!value) return 'Price on Request';
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(0)} L`;
        return `₹${value.toLocaleString()}`;
    };

    // ── STAGGER CHILDREN ──
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.05, delayChildren: index * 0.05 } }
    };
    const childVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: PREMIUM_EASE } }
    };

    return (
        <motion.div
            ref={cardRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ 
                y: -10, 
                boxShadow: '0 25px 50px -12px rgba(6, 61, 105, 0.15)',
                transition: { duration: 0.4, ease: PREMIUM_EASE }
            }}
            onClick={() => setIsSelected(!isSelected)}
            className={`group relative bg-white border transition-all duration-400 cursor-pointer ${
                isSelected ? 'border-[#D33C29] ring-2 ring-[#D33C29]/20 scale-[1.02] shadow-2xl z-10' : 'border-slate-200 hover:border-[#D33C29]/30'
            }`}
        >
            {/* Selection Indicator */}
            <AnimatePresence>
                {isSelected && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-[#D33C29] text-white rounded-full flex items-center justify-center shadow-lg z-20"
                    >
                        <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Image Section */}
            <div className="relative aspect-[21/9] overflow-hidden">
                <img
                    src={plot.image || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1500&auto=format&fit=crop"}
                    alt={plot.name || plot.title}
                    className="w-full h-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-105"
                />
                
                {/* Floating Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
                    <span className="bg-white px-2 py-1 text-[8px] font-black uppercase tracking-widest shadow-md text-[#063D69]">
                        Premium
                    </span>
                    <span className="bg-[#D33C29] text-white px-2 py-1 text-[8px] font-black uppercase tracking-widest shadow-md">
                        {plot.purpose || "Asset"}
                    </span>
                </div>
            </div>

            {/* Content Section - RE-ENHANCED PADDING (P-6) */}
            <div className="p-6 pt-5 bg-white">
                <div className="flex justify-between items-start mb-2.5">
                    <motion.div variants={childVariants} className="flex flex-col">
                        <span className="text-[9px] font-black text-[#D33C29] uppercase tracking-[0.2em] mb-0.5">Price</span>
                        <h4 className="text-2xl font-black text-[#063D69] tracking-tighter leading-none">
                            {formatPrice(plot.priceValue)}
                        </h4>
                    </motion.div>
                </div>

                <motion.h3 variants={childVariants} className="text-lg font-black text-slate-900 leading-tight mb-2 line-clamp-1 tracking-tight">
                    {plot.title || plot.name || "Exclusive Asset Plot"}
                </motion.h3>

                <motion.div variants={childVariants} className="flex items-center gap-1.5 mb-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                    <MapPin size={11} className="text-[#D33C29]" />
                    <span className="truncate">{plot.location}, Kerala</span>
                </motion.div>

                {/* Specs */}
                <motion.div variants={childVariants} className="flex items-center gap-6 mb-5 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-1.5">
                        <Maximize2 size={13} className="text-[#063D69]" />
                        <span className="text-sm font-black text-slate-900">{plot.sizeValue} {plot.sizeUnit}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Route size={13} className="text-[#D33C29]" />
                        <span className="text-sm font-black text-slate-900">{plot.roadAccess ? "Road" : "Path"}</span>
                    </div>
                </motion.div>

                {/* Dual Actions */}
                <motion.div variants={childVariants} className="flex gap-2">
                    <button className="flex-[4] bg-[#063D69] text-white h-11 flex items-center justify-center gap-2 hover:bg-[#D33C29] transition-all duration-300 group/btn">
                        <Eye size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Explore Asset</span>
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); }}
                        className="flex-1 bg-white border border-[#063D69]/20 text-[#063D69] h-11 flex items-center justify-center hover:bg-green-50 hover:border-green-500/30 hover:text-green-600 transition-all duration-300"
                    >
                        <Phone size={14} />
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}