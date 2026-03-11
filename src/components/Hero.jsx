'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { MapPin, Maximize, Coins, Search, X, ChevronRight } from 'lucide-react';

// ==========================================
// 1. PREMIUM EASING & PHYSICS
// ==========================================
const PREMIUM_EASE = [0.16, 1, 0.3, 1]; // Apple‑grade cubic‑bezier
const SPRING_CONFIG = { stiffness: 300, damping: 30, mass: 1 };

// ==========================================
// 3. 3D PERSPECTIVE TEXT
// ==========================================
function FlipWord({ word, delay }) {
    return (
        <motion.span
            className="inline-block mr-4 last:mr-0"
            initial={{ opacity: 0, rotateX: -90, y: 20 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1.2, delay, ease: PREMIUM_EASE }}
            style={{ transformPerspective: 1000, transformStyle: 'preserve-3d' }}
        >
            {word}
        </motion.span>
    );
}

// ==========================================
// 4. TRANSFORMING SEARCH PANEL
// ==========================================
function MorphingSearch() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('Thrissur');
    const [selectedArea, setSelectedArea] = useState('Any');
    const [selectedBudget, setSelectedBudget] = useState('Any');

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <motion.div
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className={`relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden z-20 ${isExpanded ? 'w-full md:w-[650px] rounded-[2.5rem]' : 'w-auto rounded-full'
                }`}
        >
            <AnimatePresence mode="wait">
                {!isExpanded ? (
                    // Collapsed state: just a search pill
                    <motion.button
                        key="collapsed"
                        onClick={toggleExpand}
                        className="flex items-center gap-3 px-8 py-4 text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Search size={20} className="text-[#D33C29]" />
                        <span className="font-medium">Search Lands</span>
                        <ChevronRight size={16} className="text-white/60" />
                    </motion.button>
                ) : (
                    <motion.div
                        key="expanded"
                        className="p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-serif text-2xl">Refine Your Search</h3>
                            <button onClick={toggleExpand} className="text-white/60 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {/* Location */}
                            <div className="relative">
                                <label className="block text-white/40 text-xs uppercase mb-1">Location</label>
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-[#D33C29]"
                                >
                                    <option value="Thrissur">Thrissur</option>
                                    <option value="Guruvayur">Guruvayur</option>
                                    <option value="Irinjalakuda">Irinjalakuda</option>
                                </select>
                                <MapPin size={16} className="absolute right-4 top-8 text-[#D33C29]" />
                            </div>

                            {/* Area */}
                            <div className="relative">
                                <label className="block text-white/40 text-xs uppercase mb-1">Area (cents)</label>
                                <select
                                    value={selectedArea}
                                    onChange={(e) => setSelectedArea(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-[#D33C29]"
                                >
                                    <option value="Any">Any</option>
                                    <option value="1-5">1-5</option>
                                    <option value="5-10">5-10</option>
                                    <option value="10+">10+</option>
                                </select>
                                <Maximize size={16} className="absolute right-4 top-8 text-[#D33C29]" />
                            </div>

                            {/* Budget */}
                            <div className="relative">
                                <label className="block text-white/40 text-xs uppercase mb-1">Budget (₹ Cr)</label>
                                <select
                                    value={selectedBudget}
                                    onChange={(e) => setSelectedBudget(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-[#D33C29]"
                                >
                                    <option value="Any">Any</option>
                                    <option value="1-3">1-3</option>
                                    <option value="3-5">3-5</option>
                                    <option value="5+">5+</option>
                                </select>
                                <Coins size={16} className="absolute right-4 top-8 text-[#D33C29]" />
                            </div>
                        </div>

                        <button className="w-full bg-[#D33C29] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#b02e1e] transition">
                            <Search size={18} />
                            <span>Find Plots</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ==========================================
// 5. SCROLL PROGRESS RING
// ==========================================
function ScrollRing() {
    const { scrollYProgress } = useScroll();
    const circumference = 2 * Math.PI * 45; // radius 45

    return (
        <motion.div className="absolute bottom-8 right-8 z-30 hidden lg:block">
            <svg width="100" height="100" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#0B5C8A"
                    strokeWidth="2"
                    opacity="0.3"
                />
                {/* Progress circle */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#D33C29"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                        pathLength: scrollYProgress,
                        rotate: -90,
                        transformOrigin: 'center',
                    }}
                />
                {/* Central text */}
                <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="12"
                    fontFamily="monospace"
                >
                    SCROLL
                </text>
            </svg>
        </motion.div>
    );
}

// ==========================================
// 6. MAIN HERO – THE LAND PORTAL
// ==========================================
export default function HeroLandPortal() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    // Duotone overlay shift based on scroll (Staying within luxury blue/dark palette)
    const overlayColor = useTransform(
        scrollYProgress,
        [0, 1],
        ['rgba(11,92,138,0.6)', 'rgba(6,30,45,0.8)']
    );

    const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[110svh] overflow-hidden flex items-center justify-center"
        >
            {/* Background Video */}
            <motion.div style={{ scale: videoScale }} className="absolute inset-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                    {/* Local high-quality Thrissur video provided by user */}
                </video>
            </motion.div>

            {/* Dynamic Duotone Overlay */}
            <motion.div
                style={{ backgroundColor: overlayColor }}
                className="absolute inset-0 mix-blend-multiply pointer-events-none"
            />

            {/* Content */}
            <div className="relative z-20 w-full max-w-7xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: PREMIUM_EASE }}
                    className="mb-4 font-mono text-[#D33C29] text-sm tracking-[0.3em] uppercase"
                >
                    Thrissur • The Cultural Capital
                </motion.div>

                <h1 className="text-white text-5xl md:text-8xl lg:text-9xl font-black font-display leading-[0.9] tracking-tighter mb-6 flex flex-wrap justify-center">
                    <FlipWord word="Your" delay={0.2} />
                    <FlipWord word="Land" delay={0.4} />
                    <FlipWord word="Legacy" delay={0.6} />
                    <FlipWord word="Begins" delay={0.8} />
                    <FlipWord word="Here" delay={1.0} />
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2, ease: PREMIUM_EASE }}
                    className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
                >
                    Discover prime plots in Thrissur's most sought‑after locations.
                    Each parcel is vetted, documented, and ready for your vision.
                </motion.p>

                {/* Search Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5, ease: PREMIUM_EASE }}
                    className="mt-12 flex justify-center"
                >
                    <MorphingSearch />
                </motion.div>
            </div>

            {/* Scroll Progress Ring */}
            <ScrollRing />
        </section>
    );
}