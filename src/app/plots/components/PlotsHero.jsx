'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2 } from 'lucide-react';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

export default function PlotsHero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <motion.section
            style={{ opacity }}
            className="bg-[#061E2D] pt-40 pb-32 px-6 md:px-12 xl:px-24 relative overflow-hidden min-h-[70vh] flex items-center"
        >
            {/* Dynamic Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
                    backgroundSize: '4rem 4rem'
                }}
            />

            {/* Cinematic Light Effects */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.25, 0.15],
                    x: [0, 100, 0],
                    y: [0, -50, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-48 -right-48 w-[800px] h-[800px] bg-[#0B5C8A] blur-[160px] rounded-full pointer-events-none"
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1],
                    x: [0, -100, 0],
                    y: [0, 50, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-48 -left-48 w-[700px] h-[700px] bg-[#D33C29] blur-[180px] rounded-full pointer-events-none"
            />

            <div className="max-w-[1920px] mx-auto relative z-10 w-full">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16">
                    <motion.div style={{ y: y1 }} className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: PREMIUM_EASE }}
                            className="flex items-center gap-6 mb-12"
                        >
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: 60 }}
                                transition={{ duration: 1.2, delay: 0.5, ease: PREMIUM_EASE }}
                                className="h-[1px] bg-[#D33C29]"
                            />
                            <span className="text-[#FFFFFF]/40 font-bold uppercase tracking-[0.6em] text-[11px]">Elite Land Acquisition</span>
                        </motion.div>

                        <h1 className="text-7xl md:text-9xl xl:text-[11rem] font-black font-display text-[#FFFFFF] tracking-tighter leading-[0.8] mb-12 select-none">
                            <motion.span
                                initial={{ opacity: 0, y: 100, rotateX: -30 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ duration: 1.2, delay: 0.2, ease: PREMIUM_EASE }}
                                className="block"
                            >
                                THE <span className="text-[#0B5C8A] brightness-125 italic font-light">FUTURE</span>
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 100, rotateX: -30 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ duration: 1.2, delay: 0.4, ease: PREMIUM_EASE }}
                                className="block text-[#D33C29] ml-0 lg:ml-24"
                            >
                                UNLOCKED.
                            </motion.span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 1 }}
                            className="text-[#FFFFFF]/50 max-w-2xl text-xl font-light leading-relaxed mb-8"
                        >
                            Secure your legacy with TCR Plots. Curating Thrissur's most prestigious land assets for visionary investors and homeowners.
                        </motion.p>
                    </motion.div>

                    {/* Interactive Scroll Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="hidden xl:block relative"
                    >
                        <div className="w-64 h-64 rounded-full border border-white/5 flex items-center justify-center relative p-8 backdrop-blur-sm bg-white/5 overflow-hidden group">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: `radial-gradient(circle, #D33C29 1px, transparent 1px)`,
                                    backgroundSize: '20px 20px'
                                }}
                            />
                            <div className="relative z-10 text-center">
                                <Building2 className="w-12 h-12 text-[#D33C29] mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
                                <div className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-1">Authenticated</div>
                                <div className="text-[10px] font-medium text-white/40 uppercase tracking-[0.2em]">Portfolio 2024</div>
                            </div>

                            {/* Decorative pieces */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-[#D33C29]/50" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-[#D33C29]/50" />
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-8 bg-[#D33C29]/50" />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-8 bg-[#D33C29]/50" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom transition gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
        </motion.section>
    );
}