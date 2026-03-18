'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

export default function PlotsHero({ heroScale }) {
    return (
        <motion.section
            className="relative h-[80vh] flex items-center justify-center overflow-hidden"
        >
            <motion.div style={{ scale: heroScale }} className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Land"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            </motion.div>

            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: PREMIUM_EASE }}
                    className="mb-6"
                >
                    <span className="text-[12px] font-black uppercase tracking-[0.6em] text-white/60 mb-4 block">Archive of Distinction</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
                        FIND YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">LEGACY</span>
                    </h1>
                </motion.div>
            </div>

            {/* Vertical Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent opacity-30" />
            </motion.div>
        </motion.section>
    );
}