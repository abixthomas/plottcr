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
        <section className="relative w-full bg-[#061E2D] pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden selection:bg-[#D33C29] selection:text-[#FFFFFF]">

            {/* Subtle Architectural Grid & Glow */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)', backgroundSize: '3rem 3rem' }} />
            <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#0B5C8A]/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                    {/* ========================================= */}
                    {/* LEFT COLUMN: Deep Editorial Typography */}
                    {/* ========================================= */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full lg:w-[50%] flex flex-col"
                    >
                        {/* Micro Badge */}
                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D33C29] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D33C29]"></span>
                            </span>
                            <span className="text-[#FFFFFF]/60 font-body text-[10px] font-bold uppercase tracking-[0.3em]">
                                Live Asset Terminal
                            </span>
                        </motion.div>

                        {/* High-Contrast Title */}
                        <motion.h1 variants={itemVariants} className="text-[#FFFFFF] text-4xl md:text-5xl lg:text-[64px] font-black font-display tracking-tighter leading-[1.05] mb-6">
                            SECURE YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#0B5C8A]">
                                FOUNDATION.
                            </span>
                        </motion.h1>

                        {/* Precision Subtext */}
                        <motion.p variants={itemVariants} className="text-[#FFFFFF]/50 font-body text-sm md:text-base max-w-lg font-light leading-relaxed mb-8">
                            Access Thrissur's most fiercely guarded, zero-encumbrance land portfolio. Engineered for visionary investors seeking generational stability.
                        </motion.p>

                        {/* Action Row */}
                        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
                            <button className="group relative flex items-center gap-3 bg-[#D33C29] text-[#FFFFFF] px-6 py-3.5 rounded-full font-body font-bold text-[10px] uppercase tracking-widest shadow-[0_10px_20px_rgba(211,60,41,0.2)] hover:shadow-[0_15px_30px_rgba(211,60,41,0.3)] hover:bg-[#FFFFFF] hover:text-[#061E2D] transition-all duration-300">
                                <span>Initialize Scan</span>
                                <div className="w-6 h-6 rounded-full bg-[#FFFFFF]/20 group-hover:bg-[#061E2D]/10 flex items-center justify-center transition-colors duration-300">
                                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </div>
                            </button>

                            <div className="flex items-center gap-2 border-l border-[#FFFFFF]/10 pl-6 py-1">
                                <ShieldCheck size={16} className="text-[#0B5C8A]" />
                                <span className="text-[#FFFFFF]/80 font-display font-bold text-xs uppercase tracking-wider">100% Verified</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ========================================= */}
                    {/* RIGHT COLUMN: The Floating Monolith Gallery */}
                    {/* ========================================= */}
                    <div className="w-full lg:w-[50%] hidden md:flex items-center justify-center gap-4 lg:gap-6 relative h-[400px]">

                        {/* Monolith 1 (Left - Shifted Down) */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 30 }}
                            transition={{ duration: 1, delay: 0.2, ease: PREMIUM_EASE }}
                            className="relative w-[140px] lg:w-[160px] h-[240px] lg:h-[260px] rounded-[2rem] overflow-hidden border border-[#FFFFFF]/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10"
                        >
                            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="w-full h-[120%] -mt-[10%]">
                                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop" alt="Lush Land" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-[#061E2D]/40" />
                            </motion.div>
                        </motion.div>

                        {/* Monolith 2 (Center - Hero Asset - Shifted Up) */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: -20 }}
                            transition={{ duration: 1, delay: 0.4, ease: PREMIUM_EASE }}
                            className="relative w-[200px] lg:w-[240px] h-[300px] lg:h-[340px] rounded-[2.5rem] overflow-hidden border border-[#FFFFFF]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20 group"
                        >
                            <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} className="w-full h-[120%] -mt-[10%]">
                                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop" alt="Premium Estate" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#061E2D] via-transparent to-transparent opacity-90" />
                            </motion.div>

                            {/* Inner Badge for Center Monolith */}
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30">
                                <span className="bg-[#FFFFFF]/20 backdrop-blur-md px-4 py-2 rounded-full text-[#FFFFFF] text-[9px] font-bold uppercase tracking-[0.2em] border border-[#FFFFFF]/30 shadow-lg">
                                    Signature Plot
                                </span>
                            </div>
                        </motion.div>

                        {/* Monolith 3 (Right - Shifted Down Further) */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 50 }}
                            transition={{ duration: 1, delay: 0.6, ease: PREMIUM_EASE }}
                            className="relative w-[130px] lg:w-[150px] h-[200px] lg:h-[220px] rounded-[2rem] overflow-hidden border border-[#FFFFFF]/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10"
                        >
                            <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="w-full h-[120%] -mt-[10%]">
                                <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop" alt="Scenic View" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-[#061E2D]/50" />
                            </motion.div>
                        </motion.div>

                        {/* Floating Market Metric Widget */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 1, ease: PREMIUM_EASE }}
                            className="absolute top-4 right-0 lg:right-4 z-30 bg-[#061E2D]/80 backdrop-blur-xl border border-[#FFFFFF]/10 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
                        >
                            <div className="w-8 h-8 rounded-full bg-[#D33C29] flex items-center justify-center text-[#FFFFFF] shadow-[0_0_15px_rgba(211,60,41,0.5)]">
                                <TrendingUp size={14} strokeWidth={3} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#FFFFFF]/50 font-body text-[8px] uppercase tracking-[0.2em] mb-0.5">Asset Growth</span>
                                <span className="text-[#FFFFFF] font-display text-xs font-bold tracking-widest">+22.4% APY</span>
                            </div>
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    );
}