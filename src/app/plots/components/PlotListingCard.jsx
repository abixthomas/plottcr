'use client';

import React, { useRef, useState } from 'react';
import { MapPin, Maximize2, Route, Phone, Eye, Check } from 'lucide-react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];
const SPRING_CONFIG = { stiffness: 150, damping: 20 };

// BRAND ACCENTS
const BRAND_RED = '#D33C29';
const BRAND_TEAL = '#063D69';

export default function PlotListingCard({ plot, index = 0 }) {
    if (!plot) return null;

    const [isSelected, setIsSelected] = useState(false);
    const cardRef = useRef(null);

    // ── MAGNETIC BUTTON LOGIC ──
    const exploreBtnX = useSpring(0, SPRING_CONFIG);
    const exploreBtnY = useSpring(0, SPRING_CONFIG);
    
    const handleMagneticMove = (e, setX, setY) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setX.set((e.clientX - centerX) * 0.15);
        setY.set((e.clientY - centerY) * 0.15);
    };

    const resetMagnetic = (setX, setY) => {
        setX.set(0);
        setY.set(0);
    };

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
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: PREMIUM_EASE } }
    };

    return (
        <motion.div
            ref={cardRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => setIsSelected(!isSelected)}
            className={`group relative bg-white transition-all duration-700 cursor-pointer overflow-hidden border-4 ${
                isSelected 
                    ? 'border-[#D33C29] shadow-[0_50px_100px_-25px_rgba(211,60,41,0.5)] z-30 scale-[1.04] rotate-[-0.5deg]' 
                    : 'border-slate-200 hover:border-[#D33C29]/20 shadow-none z-10'
            }`}
        >
            {/* ── HYPER-COLOR SELECTION OVERLAYS ── */}
            <AnimatePresence>
                {isSelected && (
                    <>
                        {/* ANIMATED GRADIENT BORDER FLOW */}
                        <motion.div 
                            className="absolute inset-0 z-40 pointer-events-none"
                            style={{ 
                                border: '4px solid transparent',
                                borderImageSource: `linear-gradient(90deg, ${BRAND_RED}, ${BRAND_TEAL}, ${BRAND_RED})`,
                                borderImageSlice: 1
                            }}
                            animate={{ opacity: [1, 0.7, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />

                        {/* MASSIVE RADIANT CENTER PULSE */}
                        <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 2.5, opacity: 0.2 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-radial from-[#D33C29] to-transparent pointer-events-none z-0"
                        />

                        {/* VIBRANT SELECTION SASH */}
                        <motion.div 
                            initial={{ x: '-120%', skewX: -20 }}
                            animate={{ x: '-20%', skewX: -20 }}
                            exit={{ x: '-120%', skewX: -20 }}
                            className="absolute top-4 left-0 w-full h-10 bg-gradient-to-r from-[#D33C29] to-[#063D69] z-50 flex items-center justify-center shadow-xl"
                        >
                            <Check size={16} className="text-white mr-3" strokeWidth={4} />
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Asset Selected</span>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* CINEMATIC SHINE OVERLAY */}
            <motion.div 
                className="absolute inset-0 pointer-events-none z-10"
                variants={{
                    hover: { 
                        x: ['-100%', '100%'],
                        transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }
                    }
                }}
                style={{ 
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    opacity: 0,
                    scale: 1.5,
                    rotate: -45
                }}
                whileHover={{ opacity: 1 }}
            />

            {/* Image Section */}
            <div className={`relative aspect-[21/9] overflow-hidden transition-all duration-700 ${isSelected ? 'brightness-125 saturate-150' : ''}`}>
                <motion.img
                    src={plot.image || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1500&auto=format&fit=crop"}
                    alt={plot.name || plot.title}
                    className="w-full h-full object-cover"
                    variants={{
                        hover: { scale: 1.05, transition: { duration: 0.8, ease: PREMIUM_EASE } }
                    }}
                />
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-20">
                    <motion.span 
                        variants={{ hover: { x: 5, scale: 1.05 } }}
                        className="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 text-[8px] font-black uppercase tracking-widest shadow-xl text-[#063D69]"
                    >
                        Premium
                    </motion.span>
                </div>

                {/* Overlay Vignette */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isSelected ? 'bg-black/5' : 'bg-black/20 opacity-0 group-hover:opacity-100'}`} />
            </div>

            {/* Content Section */}
            <motion.div 
                className={`p-6 pt-5 relative z-20 transition-all duration-700 ${isSelected ? 'bg-red-50/80 backdrop-blur-md' : 'bg-white'}`}
                variants={{
                    hover: { y: -5, transition: { duration: 0.4, ease: PREMIUM_EASE } }
                }}
            >
                <div className="flex justify-between items-start mb-2.5">
                    <motion.div variants={childVariants} className="flex flex-col">
                        <span className="text-[9px] font-black text-[#D33C29] uppercase tracking-[0.2em] mb-1">Portfolio Price</span>
                        <motion.h4 
                            animate={isSelected ? { scale: [1, 1.1, 1], color: ['#063D69', '#D33C29', '#063D69'] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className={`text-2xl font-black tracking-tighter leading-none ${isSelected ? '' : 'text-[#063D69]'}`}
                        >
                            {formatPrice(plot.priceValue)}
                        </motion.h4>
                    </motion.div>
                </div>

                <motion.h3 variants={childVariants} className={`text-lg font-black leading-tight mb-2.5 line-clamp-1 tracking-tight transition-colors duration-500 ${isSelected ? 'text-[#D33C29]' : 'text-slate-900'}`}>
                    {plot.title || plot.name || "Exclusive Asset Plot"}
                </motion.h3>

                <motion.div variants={childVariants} className="flex items-center gap-2 mb-4 text-slate-500 font-bold uppercase tracking-[0.15em] text-[10px]">
                    <MapPin size={12} className="text-[#D33C29]" />
                    <span className="truncate">{plot.location}, Kerala</span>
                </motion.div>

                {/* Specs */}
                <motion.div variants={childVariants} className="flex items-center gap-8 mb-5 border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${isSelected ? 'bg-[#D33C29]/20' : 'bg-[#063D69]/5'}`}>
                            <Maximize2 size={13} className={isSelected ? 'text-[#D33C29]' : 'text-[#063D69]'} />
                        </div>
                        <span className="text-sm font-black text-slate-900">{plot.sizeValue} {plot.sizeUnit}</span>
                    </div>
                </motion.div>

                {/* Dual Magnetic Actions */}
                <motion.div variants={childVariants} className="flex gap-3 mt-2">
                    <motion.button 
                        style={{ x: exploreBtnX, y: exploreBtnY }}
                        onMouseMove={(e) => handleMagneticMove(e, exploreBtnX, exploreBtnY)}
                        onMouseLeave={() => resetMagnetic(exploreBtnX, exploreBtnY)}
                        className={`flex-[4] h-11 flex items-center justify-center gap-2.5 transition-all duration-300 group/btn shadow-2xl relative overflow-hidden ${
                            isSelected ? 'bg-[#D33C29] text-white shadow-[#D33C29]/40 scale-105' : 'bg-[#063D69] text-white shadow-[#063D69]/10 hover:bg-[#D33C29]'
                        }`}
                    >
                        <Eye size={15} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Explore Asset</span>
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}