'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const Counter = ({ value, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseInt(value.replace(/,/g, ''));
            if (isNaN(end)) return;

            const totalFrames = Math.round(duration * 60);
            const increment = end / totalFrames;

            let frame = 0;
            const timer = setInterval(() => {
                frame++;
                start += increment;
                if (frame === totalFrames || start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 1000 / 60);

            return () => clearInterval(timer);
        }
    }, [isInView, value, duration]);

    // Format number nicely
    const formattedCount = count >= 1000 ? count.toLocaleString() : count;

    return <span ref={ref}>{formattedCount}{suffix}</span>;
};

const StatNode = ({ number, suffix, label, description, index }) => {
    const isLarge = index === 0; // First item is the hero spec

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative group ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
        >
            {/* Glassmorphic Container with Constellation Nodes */}
            <div className={`h-full border border-white/10 hover:border-white/20 bg-[#FFFFFF]/[0.02] backdrop-blur-md p-8 md:p-12 transition-colors duration-500 overflow-hidden ${isLarge ? 'bg-gradient-to-br from-[#0B5C8A]/10 to-transparent' : ''}`}>

                {/* 4 Corner Nodes */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:bg-[#D33C29] transition-colors duration-500 shadow-[0_0_10px_rgba(211,60,41,0)] group-hover:shadow-[0_0_10px_rgba(211,60,41,0.8)]" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white/30 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-[#D33C29] transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-white/30 rounded-full -translate-x-1/2 translate-y-1/2 group-hover:bg-[#D33C29] transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-white/30 rounded-full translate-x-1/2 translate-y-1/2 group-hover:bg-[#D33C29] transition-colors duration-500" />

                {/* Internal Glow Effect */}
                <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                    <div>
                        <div className="flex items-baseline gap-1 overflow-hidden">
                            <motion.h3
                                className={`font-serif text-white font-black tracking-tight leading-none ${isLarge ? 'text-7xl md:text-[120px]' : 'text-5xl md:text-6xl'}`}
                            >
                                <Counter value={number} suffix={suffix} />
                            </motion.h3>
                        </div>

                        <div className="flex items-center gap-4 mt-6">
                            <div className="h-[1px] w-8 bg-[#D33C29] group-hover:w-16 transition-all duration-500 ease-out" />
                            <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-white/50">
                                {label}
                            </p>
                        </div>
                    </div>

                    <p className={`font-light text-white/40 leading-relaxed ${isLarge ? 'text-lg max-w-sm' : 'text-sm'}`}>
                        {description}
                    </p>
                </div>

                {/* Geometric overlay animation */}
                {isLarge && (
                    <motion.div
                        className="absolute right-[-10%] bottom-[-20%] w-[60%] h-[120%] border border-white/5 rounded-full pointer-events-none"
                        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default function Highlights() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const gridY = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="relative py-32 bg-[#061E2D] overflow-hidden min-h-screen flex items-center">
            {/* Constellation Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Deep Ambient Glows */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0B5C8A]/10 mix-blend-screen blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D33C29]/5 mix-blend-screen blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />

                {/* SVGs Constellation Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                    <motion.path
                        d="M 0,100 Q 400,300 800,100 T 1600,200"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M 200,800 L 400,400 L 900,600 L 1400,200"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                </svg>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left Sticky Header */}
                    <div className="w-full lg:w-1/3 lg:sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-white/50 uppercase mb-8">
                                <span className="w-2 h-2 bg-[#D33C29]" />
                                Empirical Constellation
                            </span>

                            <h2 className="font-serif text-5xl md:text-6xl text-white leading-[1.1] mb-8">
                                Quantifying <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B5C8A] to-[#60A5FA]">
                                    Excellence.
                                </span>
                            </h2>

                            <p className="text-white/60 font-light text-lg leading-relaxed max-w-md mb-12">
                                We measure success not just in acres, but in the generational value created for our elite clientele through rigorous selection and absolute legal transparency.
                            </p>

                            <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-white/20 to-transparent ml-2" />
                        </motion.div>
                    </div>

                    {/* Right Parallax Grid */}
                    <div className="w-full lg:w-2/3">
                        <motion.div
                            style={{ y: gridY }}
                            className="grid auto-rows-[250px] grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 p-px"
                        >
                            <StatNode
                                number="100"
                                suffix="%"
                                label="Legal Immunity"
                                description="Zero litigation record across our entire curated property portfolio over the last two decades."
                                index={0}
                            />

                            <StatNode
                                number="25"
                                suffix="+"
                                label="Years Legacy"
                                description="Deep expertise in premium land acquisitions and structured asset management."
                                index={1}
                            />

                            <StatNode
                                number="500"
                                suffix="+"
                                label="Elite Assets"
                                description="High-appreciating plots successfully delivered to visionary investors globally."
                                index={2}
                            />

                            <StatNode
                                number="12"
                                suffix="+"
                                label="Growth Zones"
                                description="Strategic presence across Thrissur's highest yielding metropolitan and cultural corridors."
                                index={3}
                            />

                            <StatNode
                                number="24"
                                suffix="%"
                                label="Average ROI"
                                description="Historical annual appreciation witnessed by our earliest institutional investors."
                                index={4}
                            />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
