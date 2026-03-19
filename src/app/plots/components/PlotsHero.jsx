'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, TrendingUp } from 'lucide-react';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

export default function PlotsHero() {
    // Staggered animation orchestration for the text side
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: PREMIUM_EASE } }
    };

    return (
        <section className="relative w-full bg-[#061E2D] pt-12 pb-4 md:pt-16 md:pb-6 overflow-hidden selection:bg-[#D33C29] selection:text-[#FFFFFF]">

            {/* Subtle Architectural Grid & Glow */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)', backgroundSize: '2.5rem 2.5rem' }} />
            <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#0B5C8A]/15 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24 relative z-10">
                <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-4 md:py-6 relative">
                    
                    {/* Background Soft Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[120%] bg-[#0B5C8A]/10 blur-[100px] rounded-full pointer-events-none" />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative z-20 flex flex-col items-center"
                    >
                        {/* Micro Badge */}
                        <motion.div variants={itemVariants} className="flex items-center gap-2.5 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D33C29] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D33C29]"></span>
                            </span>
                            <span className="text-[#FFFFFF]/60 font-body text-[10px] font-bold uppercase tracking-[0.4em]">
                                Live Asset Terminal
                            </span>
                        </motion.div>

                        {/* Ultra-Compact Bold Title */}
                        <motion.h1 variants={itemVariants} className="text-[#FFFFFF] text-3xl md:text-5xl lg:text-[64px] font-black font-display tracking-tighter leading-[0.95] mb-6 uppercase">
                            SECURE YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF] to-[#0B5C8A]">
                                FOUNDATION.
                            </span>
                        </motion.h1>

                        {/* Precision Subtext */}
                        <motion.p variants={itemVariants} className="text-[#FFFFFF]/50 font-body text-[13px] md:text-base max-w-2xl font-light leading-relaxed mb-8">
                            Access Thrissur's most fiercely guarded, zero-encumbrance land portfolio. <br className="hidden md:block" />
                            Engineered for visionary investors seeking capital preservation.
                        </motion.p>

                        {/* Action Row */}
                        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-8">
                            <button className="group relative flex items-center gap-3.5 bg-[#D33C29] text-[#FFFFFF] px-8 py-3.5 rounded-full font-body font-bold text-[11px] uppercase tracking-widest shadow-[0_12px_30px_rgba(211,60,41,0.3)] hover:shadow-[0_20px_40px_rgba(211,60,41,0.4)] hover:scale-105 transition-all duration-300">
                                <span>Initialize Scan</span>
                                <div className="w-6 h-6 rounded-full bg-[#FFFFFF]/20 group-hover:bg-[#FFFFFF]/40 flex items-center justify-center transition-colors duration-300">
                                    <ArrowUpRight size={12} />
                                </div>
                            </button>

                            <div className="flex items-center gap-3 border-l border-[#FFFFFF]/15 pl-8 py-1.5">
                                <ShieldCheck size={18} className="text-[#0B5C8A]" />
                                <span className="text-[#FFFFFF]/90 font-display font-bold text-[13px] uppercase tracking-[0.1em]">100% Verified</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}