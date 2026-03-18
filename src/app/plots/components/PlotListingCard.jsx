'use client';

import React, { useRef } from 'react';
import { MapPin, Maximize2, Route, Building2, ArrowUpRight } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

export default function PlotListingCard({ plot, index = 0 }) {
    if (!plot) return null;

    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    // ── 3D TILT ON HOVER ──
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 250, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 250, damping: 25 });

    const handleMouse = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const resetMouse = () => { mouseX.set(0); mouseY.set(0); };

    const formatPrice = (value) => {
        if (!value) return 'Price on Request';
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(0)} Lakhs`;
        return `₹${value.toLocaleString()}`;
    };

    // ── STAGGER CHILDREN ──
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: index * 0.07 } }
    };
    const childVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: PREMIUM_EASE } }
    };
    const imageVariants = {
        hidden: { opacity: 0, scale: 1.08 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: PREMIUM_EASE } }
    };

    return (
        <motion.div
            ref={cardRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            onMouseMove={handleMouse}
            onMouseLeave={resetMouse}
            className="group bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#0B5C8A]/15 hover:border-[#D33C29]/30 hover:shadow-[0_25px_60px_rgba(6,30,45,0.18)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        >
            {/* IMAGE — 16:9 */}
            <motion.div variants={imageVariants} className="relative aspect-[16/9] overflow-hidden bg-[#061E2D]">
                <img
                    src={plot.image || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1500&auto=format&fit=crop"}
                    alt={plot.name || plot.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />

                {/* Cinematic overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061E2D]/60 via-[#061E2D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Badge */}
                <motion.div variants={childVariants} className="absolute top-4 left-4 z-10">
                    <span className="bg-[#0B5C8A] text-[#FFFFFF] px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest shadow-lg border border-[#0B5C8A]/30">
                        Premium Listing
                    </span>
                </motion.div>

                {/* Purpose tag */}
                <motion.div variants={childVariants} className="absolute top-4 right-4 z-10">
                    <span className="bg-[#061E2D]/70 backdrop-blur-md text-[#FFFFFF] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-[#FFFFFF]/10">
                        {plot.purpose || "Residential"}
                    </span>
                </motion.div>

                {/* Arrow CTA — appears on hover */}
                <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="w-12 h-12 rounded-full bg-[#D33C29] text-[#FFFFFF] flex items-center justify-center shadow-xl shadow-[#D33C29]/30 hover:scale-110 transition-transform duration-300">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
            </motion.div>

            {/* BODY — Brand themed */}
            <div className="p-4 bg-gradient-to-b from-[#FFFFFF] to-[#F8FAFC]">
                {/* Price — Hero element */}
                <motion.div variants={childVariants} className="mb-2">
                    <span className="text-2xl font-black text-[#D33C29] tracking-tighter leading-none">
                        {formatPrice(plot.priceValue)}
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h3 variants={childVariants} className="text-lg font-bold text-[#061E2D] leading-tight line-clamp-1 mb-3 group-hover:text-[#0B5C8A] transition-colors duration-300">
                    {plot.title || plot.name || "Exclusive Heritage Plot"}
                </motion.h3>

                {/* Location */}
                <motion.div variants={childVariants} className="flex items-center gap-2 mb-4 pb-4 border-b border-[#0B5C8A]/10">
                    <div className="w-6 h-6 rounded-full bg-[#D33C29]/10 flex items-center justify-center shrink-0">
                        <MapPin size={14} className="text-[#D33C29]" />
                    </div>
                    <span className="text-xs font-black text-[#061E2D] uppercase tracking-wider truncate">
                        {plot.location || "Thrissur Prime"}, Kerala
                    </span>
                </motion.div>

                {/* Specs Grid — 3 cols with Deep Ocean styling */}
                <motion.div variants={childVariants} className="grid grid-cols-3 gap-2 mb-5">
                    {/* Size */}
                    <div className="bg-[#061E2D]/[0.03] rounded-xl p-2 text-center hover:bg-[#D33C29]/5 transition-colors duration-300 border border-transparent hover:border-[#D33C29]/10">
                        <Maximize2 size={14} className="text-[#D33C29] mx-auto mb-1" />
                        <span className="text-[9px] uppercase tracking-widest text-[#061E2D]/50 font-black block mb-0.5">Size</span>
                        <span className="text-xs font-black text-[#061E2D]">
                            {plot.sizeValue || plot.size}<span className="text-[9px] font-bold opacity-50 ml-0.5">{plot.sizeUnit || "c"}</span>
                        </span>
                    </div>
                    {/* Access */}
                    <div className="bg-[#061E2D]/[0.03] rounded-xl p-2 text-center hover:bg-[#D33C29]/5 transition-colors duration-300 border border-transparent hover:border-[#D33C29]/10">
                        <Route size={14} className="text-[#D33C29] mx-auto mb-1" />
                        <span className="text-[9px] uppercase tracking-widest text-[#061E2D]/50 font-black block mb-0.5">Access</span>
                        <span className="text-xs font-black text-[#061E2D]">
                            {plot.roadAccess ? "Road" : "Priv"}
                        </span>
                    </div>
                    {/* Zoning */}
                    <div className="bg-[#061E2D]/[0.03] rounded-xl p-2 text-center hover:bg-[#D33C29]/5 transition-colors duration-300 border border-transparent hover:border-[#D33C29]/10">
                        <Building2 size={14} className="text-[#D33C29] mx-auto mb-1" />
                        <span className="text-[9px] uppercase tracking-widest text-[#061E2D]/50 font-black block mb-0.5">Zoning</span>
                        <span className="text-xs font-black text-[#061E2D]">
                            {plot.purpose?.slice(0, 3) || "Res"}
                        </span>
                    </div>
                </motion.div>

                {/* Action Button — Deep Ocean fill */}
                <motion.button
                    variants={childVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-[#061E2D] text-[#FFFFFF] py-3.5 rounded-xl text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#0B5C8A] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-lg shadow-[#061E2D]/10"
                >
                    View Details
                </motion.button>
            </div>
        </motion.div>
    );
}