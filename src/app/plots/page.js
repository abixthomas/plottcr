'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { SlidersHorizontal, ArrowUpDown, MapPin, X } from 'lucide-react';
import { mockPlots } from '@/data/mockPlots';
import PlotListingCard from './components/PlotListingCard';
import Header from '@/components/Header';
import FilterPanel from './components/FilterPanel';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];
const LOCATIONS = ["Thrissur City", "Guruvayur", "Irinjalakuda", "Koratty", "Puzhakkal", "Punkunnam", "Kunnamkulam", "Chalakudy", "Kodungallur"];
const PURPOSES = ["All", "Residential", "Commercial", "Investment"];
const SIZE_UNITS = ["Cents", "Sq.Ft.", "Acres"];
const MAX_PRICE = 50000000;

export default function PlotsPage() {
    // ─── FILTERS STATE ──────────────────────────────────────────
    const [filters, setFilters] = useState({
        locations: [],
        priceRange: [0, MAX_PRICE / 2], // Default to half max for better UX
        purpose: 'All',
        sizeMin: '',
        sizeMax: '',
        sizeUnit: 'Cents',
        roadAccess: false
    });
    const [sortBy, setSortBy] = useState('Latest');
    const [visibleCount, setVisibleCount] = useState(8);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const heroScale = useTransform(scrollY, [0, 500], [1, 1.15]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleLocation = (loc) => {
        setFilters(prev => ({
            ...prev,
            locations: prev.locations.includes(loc)
                ? prev.locations.filter(l => l !== loc)
                : [...prev.locations, loc]
        }));
    };

    const resetFilters = () => {
        setFilters({
            locations: [],
            priceRange: [0, MAX_PRICE / 2],
            purpose: 'All',
            sizeMin: '',
            sizeMax: '',
            sizeUnit: 'Cents',
            roadAccess: false
        });
    };

    const formatPrice = (value) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(0)} L`;
        return `₹${value.toLocaleString('en-IN')}`;
    };

    // ─── FILTERING LOGIC ────────────────────────────────────────
    const filteredPlots = useMemo(() => {
        return mockPlots.filter(plot => {
            // Location
            if (filters.locations.length > 0 && !filters.locations.includes(plot.location)) return false;
            
            // Purpose
            if (filters.purpose !== 'All' && plot.purpose !== filters.purpose) return false;
            
            // Price Range
            if (plot.priceValue < filters.priceRange[0] || plot.priceValue > filters.priceRange[1]) return false;
            
            // Road Access
            if (filters.roadAccess && !plot.roadAccess) return false;
            
            // Size Filter
            const sv = plot.sizeValue || 0;
            const sUnit = plot.sizeUnit || 'Cents';
            
            // Normalize size if units differ (simplified for this mock)
            if (filters.sizeUnit === sUnit) {
                if (filters.sizeMin && sv < Number(filters.sizeMin)) return false;
                if (filters.sizeMax && sv > Number(filters.sizeMax)) return false;
            }
            
            return true;
        }).sort((a, b) => {
            if (sortBy === 'Price Low–High') return a.priceValue - b.priceValue;
            if (sortBy === 'Price High–Low') return b.priceValue - a.priceValue;
            return new Date(b.dateAdded) - new Date(a.dateAdded);
        });
    }, [filters, sortBy]);

    const displayedPlots = filteredPlots.slice(0, visibleCount);

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-body selection:bg-[#D33C29] selection:text-white overflow-x-hidden">
            {/* NAVBAR */}
            <Header />

            {/* ════════════════════════════════════════════════════════
                A. CINEMATIC HERO SECTION
            ════════════════════════════════════════════════════════ */}
            <motion.section
                ref={heroRef}
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

            {/* ════════════════════════════════════════════════════════
                B. MAIN CONTENT AREA (Sidebar + Grid)
            ════════════════════════════════════════════════════════ */}
            {/* ─── FULL WIDTH TOOLBAR ─── */}
            <div className="sticky top-[72px] z-40 bg-white border-b border-[#061E2D]/5 px-6 lg:px-12 py-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="lg:hidden flex items-center gap-2 bg-[#061E2D] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg"
                    >
                        <SlidersHorizontal size={14} /> Intelligence
                    </button>
                    <div>
                        <h2 className="text-2xl font-black text-[#061E2D] tracking-tight">Available Parcels</h2>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#0B5C8A]">{filteredPlots.length} Curated Assets</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-white border border-[#0B5C8A]/20 rounded-xl px-5 py-3 pr-12 text-xs font-black text-[#061E2D] uppercase tracking-widest cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#0B5C8A]/5 transition-all shadow-sm"
                        >
                            <option value="Latest">Latest Additions</option>
                            <option value="Price Low–High">Capital: Low First</option>
                            <option value="Price High–Low">Capital: High First</option>
                        </select>
                        <ArrowUpDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0B5C8A] pointer-events-none" />
                    </div>
                </div>
            </div>

            <main className="flex flex-col lg:flex-row min-h-screen">
                
                {/* ─── SIDEBAR FILTER (Desktop) ─── */}
                <aside className="hidden lg:block w-[440px] shrink-0 bg-[#061E2D] border-r border-white/10 z-30 relative">
                    <div className="sticky top-[158px] h-[calc(100vh-158px)] overflow-y-auto no-scrollbar">
                        <FilterPanel 
                            filters={filters}
                            handleFilterChange={handleFilterChange}
                            toggleLocation={toggleLocation}
                            resetFilters={resetFilters}
                            locations={LOCATIONS}
                            purposes={PURPOSES}
                            sizeUnits={SIZE_UNITS}
                            maxPrice={MAX_PRICE}
                            formatPrice={formatPrice}
                        />
                    </div>
                </aside>

                {/* ─── MAIN GRID ─── */}
                <section className="flex-1 bg-[#F1F5F9] min-h-screen">

                    {/* The Grid */}
                    <div className="p-6 lg:p-8 lg:px-12">
                        {displayedPlots.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8 mb-16"
                            >
                                <AnimatePresence mode="popLayout">
                                    {displayedPlots.map((plot, i) => (
                                        <PlotListingCard key={plot.id} plot={plot} index={i} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-40 text-center"
                            >
                                <div className="w-24 h-24 rounded-full bg-[#061E2D]/5 flex items-center justify-center mb-10">
                                    <MapPin size={40} className="text-[#0B5C8A]/30" />
                                </div>
                                <h3 className="text-3xl font-black text-[#061E2D] mb-4 tracking-tight">No Matching Parcels</h3>
                                <p className="text-[#061E2D]/50 max-w-md mb-10 text-base font-medium">
                                    The specified criteria yielded no results in our current curated portfolio.
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="bg-[#D33C29] text-white px-10 py-4 rounded-xl font-black tracking-widest uppercase text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[#D33C29]/30"
                                >
                                    Clear Parameters
                                </button>
                            </motion.div>
                        )}

                        {/* Pagination Trigger */}
                        {visibleCount < filteredPlots.length && (
                            <div className="flex justify-center mt-12 mb-20">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setVisibleCount(prev => prev + 6)}
                                    className="px-12 py-5 bg-[#061E2D] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all"
                                >
                                    Load More Discoveries
                                </motion.button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* ─── MOBILE FILTER OVERLAY ─── */}
            <AnimatePresence>
                {isMobileFilterOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-lg flex justify-end"
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="w-full sm:w-[500px] h-full bg-white relative overflow-y-auto no-scrollbar shadow-2xl"
                        >
                            <button 
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="absolute top-8 right-8 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-[#061E2D] text-white shadow-xl hover:rotate-90 transition-transform duration-500"
                            >
                                <X size={20} />
                            </button>
                            
                            <FilterPanel 
                                filters={filters}
                                handleFilterChange={handleFilterChange}
                                toggleLocation={toggleLocation}
                                resetFilters={resetFilters}
                                locations={LOCATIONS}
                                purposes={PURPOSES}
                                sizeUnits={SIZE_UNITS}
                                maxPrice={MAX_PRICE}
                                formatPrice={formatPrice}
                                isMobile={true}
                                onClose={() => setIsMobileFilterOpen(false)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ════════════════════════════════════════════════════════
                D. MONOLITHIC FOOTER
            ════════════════════════════════════════════════════════ */}
            <footer className="bg-[#061E2D] text-white pt-24">
                <div className="w-full px-6 lg:px-12 py-20 pb-32">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
                        {/* Brand */}
                        <div>
                            <h3 className="text-3xl font-black tracking-tight mb-8">LEGACY</h3>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-medium">
                                Curating the world's most prestigious land developments. We provide the foundation for your architectural aspirations and family heritage.
                            </p>
                        </div>
                        {/* Links */}
                        {['Explore', 'Services', 'Legal'].map((title, i) => (
                            <div key={title}>
                                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0B5C8A] mb-8">{title}</h4>
                                <ul className="space-y-4">
                                    {['Prime Lots', 'Private Estates', 'Commercial Land'].map(link => (
                                        <li key={link}>
                                            <a href="#" className="text-sm font-bold text-white/50 hover:text-white transition-colors">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 bg-black/20">
                    <div className="w-full px-6 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                        <span className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">
                            © 2024 TCR Plots — Engineered Excellence
                        </span>
                        <div className="flex gap-10">
                            {['Instagram', 'Twitter', 'Linkedin'].map(social => (
                                <a key={social} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-[#D33C29] transition-colors">{social}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}