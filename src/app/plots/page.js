'use client';

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    MapPin,
    IndianRupee,
    Ruler,
    Search,
    SlidersHorizontal,
    ChevronDown,
    Check,
    X,
    RotateCcw,
    Filter,
    ChevronLeft,
    ChevronRight,
    Building2
} from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlotCard from '@/components/PlotCard';
import { mockPlots } from '@/data/mockPlots';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ==========================================
// 1. CONSTANTS & PREMIUM THEME
// ==========================================
const PREMIUM_EASE = [0.16, 1, 0.3, 1];
const LOCATIONS = ["Thrissur City", "Guruvayur", "Irinjalakuda", "Koratty", "Puzhakkal", "Punkunnam", "Kunnamkulam", "Chalakudy", "Kodungallur"];
const PURPOSES = ["All", "Residential", "Commercial", "Investment"];
const SIZE_UNITS = ["Cents", "Sq.ft", "Acres"];
const SORT_OPTIONS = ["Latest", "Price Low–High", "Price High–Low"];
const MAX_PRICE = 30000000;

const THEME = {
    primary: "#061E2D",
    secondary: "#0B5C8A",
    accent: "#D33C29",
    background: "#F8FAFC",
    glass: "rgba(255, 255, 255, 0.8)",
    shadow: "20px 0 40px rgba(6, 30, 45, 0.05)"
};

export default function PlotsPage() {
    // ---- State ----
    const [filters, setFilters] = useState({
        locations: [],
        priceRange: [0, MAX_PRICE],
        sizeUnit: 'Cents',
        sizeMin: '',
        sizeMax: '',
        purpose: 'All',
        roadAccess: false,
        landmark: ''
    });
    const [sortBy, setSortBy] = useState('Latest');
    const [visibleCount, setVisibleCount] = useState(9);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

    // Refs for scroll animations
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // ---- Handlers ----
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setVisibleCount(9);
    };

    const toggleLocation = (loc) => {
        setFilters(prev => {
            const isSelected = prev.locations.includes(loc);
            const newLocations = isSelected
                ? prev.locations.filter(l => l !== loc)
                : [...prev.locations, loc];
            return { ...prev, locations: newLocations };
        });
        setVisibleCount(9);
    };

    const resetFilters = () => {
        setFilters({
            locations: [],
            priceRange: [0, MAX_PRICE],
            sizeUnit: 'Cents',
            sizeMin: '',
            sizeMax: '',
            purpose: 'All',
            roadAccess: false,
            landmark: ''
        });
        setSortBy('Latest');
        setVisibleCount(9);
    };

    // ---- Filtering & Sorting ----
    const filteredPlots = useMemo(() => {
        return mockPlots.filter(plot => {
            if (filters.locations.length > 0 && !filters.locations.includes(plot.location)) return false;
            if (filters.purpose !== 'All' && plot.purpose !== filters.purpose) return false;
            if (plot.priceValue < filters.priceRange[0] || plot.priceValue > filters.priceRange[1]) return false;
            if (filters.roadAccess && !plot.roadAccess) return false;
            if (filters.landmark && !plot.landmark.toLowerCase().includes(filters.landmark.toLowerCase())) return false;
            if (filters.sizeMin || filters.sizeMax) {
                if (plot.sizeUnit !== filters.sizeUnit) return false;
                const min = filters.sizeMin !== '' ? Number(filters.sizeMin) : 0;
                const max = filters.sizeMax !== '' ? Number(filters.sizeMax) : Infinity;
                if (plot.sizeValue < min || plot.sizeValue > max) return false;
            }
            return true;
        }).sort((a, b) => {
            if (sortBy === 'Price Low–High') return a.priceValue - b.priceValue;
            if (sortBy === 'Price High–Low') return b.priceValue - a.priceValue;
            return new Date(b.dateAdded) - new Date(a.dateAdded);
        });
    }, [filters, sortBy]);

    const displayedPlots = filteredPlots.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPlots.length;

    // ---- Formatters ----
    const formatPrice = (value) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(0)} L`;
        return `₹${value.toLocaleString()}`;
    };

    // ==========================================
    // 2. PREMIUM FILTER PANEL COMPONENT
    // ==========================================
    const FilterPanel = ({ isMobile = false }) => {
        const panelRef = useRef(null);

        useGSAP(() => {
            if (isMobile) return;
            
            // Subtle breathing glow
            gsap.to(panelRef.current, {
                boxShadow: "20px 0 60px rgba(11, 92, 138, 0.1)",
                repeat: -1,
                yoyo: true,
                duration: 3,
                ease: "sine.inOut"
            });
        }, { scope: panelRef });

        return (
            <div ref={panelRef} className={`flex flex-col gap-8 ${isMobile ? 'p-6 pb-24' : 'p-8'} h-full bg-white/40 backdrop-blur-3xl`}>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-[#061E2D]/10">
                    <div className="relative overflow-hidden group">
                        <h3 className="text-xl font-black text-[#061E2D] font-display tracking-tight group-hover:text-[#D33C29] transition-colors duration-500">Intelligence</h3>
                        <p className="font-body text-[10px] uppercase font-bold tracking-[0.2em] text-[#0B5C8A]">Refine Portfolio</p>
                        <motion.div 
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.8 }}
                            className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D33C29]" 
                        />
                    </div>
                <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={resetFilters}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#D33C29] hover:text-[#061E2D] transition-colors"
                >
                    <RotateCcw size={12} /> Reset
                </motion.button>
            </div>

            {/* Location Dropdown */}
            <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold text-[#0B5C8A] uppercase tracking-[0.2em] flex items-center gap-2">
                    <MapPin size={14} /> Regional Coordinates
                </label>
                <div className="relative">
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                        className="w-full flex items-center justify-between bg-[#FFFFFF] border border-[#061E2D]/10 rounded-xl px-4 py-3.5 text-left text-[#061E2D] hover:border-[#0B5C8A] transition-colors shadow-sm"
                    >
                        <span className="truncate text-xs font-bold uppercase tracking-wider">
                            {filters.locations.length > 0
                                ? `${filters.locations.length} Regions Selected`
                                : 'Select Regions'}
                        </span>
                        <ChevronDown size={16} className={`text-[#0B5C8A] transition-transform duration-300 ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                        {isLocationDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                className="absolute z-20 mt-2 w-full bg-[#FFFFFF] border border-[#061E2D]/10 rounded-xl shadow-xl max-h-60 overflow-y-auto hide-scrollbar"
                            >
                                {LOCATIONS.map(loc => {
                                    const selected = filters.locations.includes(loc);
                                    return (
                                        <label key={loc} className="flex items-center gap-3 px-4 py-3 hover:bg-[#061E2D]/5 cursor-pointer transition-colors border-b border-[#061E2D]/5 last:border-0">
                                            <input
                                                type="checkbox"
                                                checked={selected}
                                                onChange={() => toggleLocation(loc)}
                                                className="w-4 h-4 accent-[#D33C29] border-gray-300 rounded cursor-pointer"
                                            />
                                            <span className="text-xs font-medium text-[#061E2D]">{loc}</span>
                                        </label>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {/* Selected Location Tags */}
                {filters.locations.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                        {filters.locations.map(loc => (
                            <div key={loc} className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1.5 bg-[#061E2D]/5 border border-[#061E2D]/10 rounded-md text-[10px] font-bold text-[#061E2D]">
                                {loc}
                                <button onClick={() => toggleLocation(loc)} className="p-0.5 hover:bg-[#D33C29] hover:text-[#FFFFFF] rounded-sm transition-colors text-[#061E2D]/40">
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range */}
            <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold text-[#0B5C8A] uppercase tracking-[0.2em] flex items-center gap-2">
                    <IndianRupee size={14} /> Capital Range
                </label>
                <div className="px-2 py-4">
                    <Slider.Root
                        className="relative flex items-center w-full h-5"
                        value={filters.priceRange} max={MAX_PRICE} step={100000}
                        onValueChange={(val) => handleFilterChange('priceRange', val)}
                    >
                        <Slider.Track className="bg-[#061E2D]/10 relative grow rounded-full h-1.5">
                            <Slider.Range className="absolute bg-[#D33C29] rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-5 h-5 bg-[#FFFFFF] border-2 border-[#D33C29] shadow-md rounded-full cursor-grab focus:outline-none transition-transform hover:scale-110" />
                        <Slider.Thumb className="block w-5 h-5 bg-[#FFFFFF] border-2 border-[#D33C29] shadow-md rounded-full cursor-grab focus:outline-none transition-transform hover:scale-110" />
                    </Slider.Root>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="text" value={formatPrice(filters.priceRange[0])} readOnly
                        className="w-full bg-[#FFFFFF] border border-[#061E2D]/10 rounded-lg px-3 py-2.5 text-[#061E2D] text-xs font-bold text-center shadow-inner"
                    />
                    <span className="text-[#061E2D]/30">-</span>
                    <input
                        type="text" value={formatPrice(filters.priceRange[1])} readOnly
                        className="w-full bg-[#FFFFFF] border border-[#061E2D]/10 rounded-lg px-3 py-2.5 text-[#061E2D] text-xs font-bold text-center shadow-inner"
                    />
                </div>
            </div>

            {/* Purpose */}
            <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold text-[#0B5C8A] uppercase tracking-[0.2em]">Asset Type</label>
                <div className="flex gap-2 flex-wrap">
                    {PURPOSES.map(p => (
                        <motion.button
                            key={p} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleFilterChange('purpose', p)}
                            className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all border ${filters.purpose === p
                                    ? 'bg-[#061E2D] text-[#FFFFFF] border-[#061E2D] shadow-md'
                                    : 'bg-[#FFFFFF] text-[#061E2D]/60 border-[#061E2D]/10 hover:border-[#0B5C8A]/50 hover:text-[#0B5C8A]'
                                }`}
                        >
                            {p}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Plot Size */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-[#0B5C8A] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Ruler size={14} /> Scale
                    </label>
                    <div className="flex gap-1 bg-[#061E2D]/5 p-1 rounded-md">
                        {SIZE_UNITS.map(unit => (
                            <button
                                key={unit} onClick={() => handleFilterChange('sizeUnit', unit)}
                                className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded transition-colors ${filters.sizeUnit === unit ? 'bg-[#FFFFFF] text-[#0B5C8A] shadow-sm' : 'text-[#061E2D]/50 hover:text-[#061E2D]'
                                    }`}
                            >
                                {unit}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="number" placeholder="Min" value={filters.sizeMin} onChange={(e) => handleFilterChange('sizeMin', e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#061E2D]/10 rounded-lg px-3 py-2.5 text-[#061E2D] text-xs font-bold focus:outline-none focus:border-[#D33C29]"
                    />
                    <span className="text-[#061E2D]/30">-</span>
                    <input
                        type="number" placeholder="Max" value={filters.sizeMax} onChange={(e) => handleFilterChange('sizeMax', e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#061E2D]/10 rounded-lg px-3 py-2.5 text-[#061E2D] text-xs font-bold focus:outline-none focus:border-[#D33C29]"
                    />
                </div>
            </div>

            {/* Road Access & Landmark */}
            <div className="flex flex-col gap-6 pt-4 border-t border-[#061E2D]/10">
                <motion.label whileHover={{ scale: 1.01 }} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.roadAccess ? 'bg-[#D33C29] border-[#D33C29]' : 'border-[#061E2D]/20 bg-[#FFFFFF] group-hover:border-[#D33C29]'}`}>
                        {filters.roadAccess && <Check size={12} className="text-[#FFFFFF]" />}
                    </div>
                    <span className="text-xs font-bold text-[#061E2D]">Requires Infrastructure / Road</span>
                </motion.label>

                <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold text-[#0B5C8A] uppercase tracking-[0.2em]">Landmark Search</label>
                    <div className="relative">
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#061E2D]/40" />
                        <input
                            type="text" placeholder="e.g. Temple, Highway" value={filters.landmark} onChange={(e) => handleFilterChange('landmark', e.target.value)}
                            className="w-full bg-[#FFFFFF] border border-[#061E2D]/10 rounded-xl pl-10 pr-4 py-3 text-xs font-medium focus:outline-none focus:border-[#D33C29] transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Apply Button */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FFFFFF]/80 backdrop-blur-xl border-t border-[#061E2D]/10 z-50">
                    <motion.button
                        whileTap={{ scale: 0.98 }} onClick={() => setIsMobileFilterOpen(false)}
                        className="w-full bg-[#D33C29] text-[#FFFFFF] font-bold uppercase tracking-widest text-xs py-4 rounded-xl shadow-[0_10px_20px_rgba(211,60,41,0.2)]"
                    >
                        Execute Search ({filteredPlots.length})
                    </motion.button>
                </div>
            )}
        </div>
    );
};

    // ==========================================
    // 3. MAIN RENDER
    // ==========================================
    return (
        <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] font-body selection:bg-[#D33C29] selection:text-[#FFFFFF]">

            {/* Cinematic Animated Header */}
            <motion.section
                style={{ y: headerY }}
                className="bg-[#061E2D] pt-40 pb-32 px-6 md:px-12 xl:px-24 relative overflow-hidden"
            >
                {/* Dynamic Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05]" 
                    style={{ 
                        backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`, 
                        backgroundSize: '3rem 3rem' 
                    }} 
                />
                
                {/* Orbital Light Blurs */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                        x: [0, 50, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#0B5C8A] blur-[120px] rounded-full pointer-events-none" 
                />
                
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, -30, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-[#D33C29] blur-[150px] rounded-full pointer-events-none" 
                />

                <div className="max-w-[1920px] mx-auto relative z-10 text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="max-w-3xl">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: PREMIUM_EASE }}
                                className="flex items-center gap-4 mb-8 justify-center lg:justify-start"
                            >
                                <motion.span 
                                    initial={{ width: 0 }}
                                    animate={{ width: 40 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-[2px] bg-[#D33C29]" 
                                />
                                <span className="text-[#FFFFFF]/50 font-bold uppercase tracking-[0.4em] text-[10px]">Prime Acquisitions</span>
                            </motion.div>
                            
                            <h1 className="text-6xl md:text-8xl xl:text-9xl font-black font-display text-[#FFFFFF] tracking-tighter leading-[0.85] mb-8 italic">
                                <motion.span
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.2, ease: PREMIUM_EASE }}
                                    className="block"
                                >
                                    The <span className="text-[#0B5C8A] brightness-125 not-italic">Plot</span>
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.4, ease: PREMIUM_EASE }}
                                    className="block ml-0 lg:ml-20 text-[#D33C29]"
                                >
                                    Vault.
                                </motion.span>
                            </h1>
                            
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.5, delay: 0.8 }}
                                className="text-[#FFFFFF]/60 max-w-xl text-lg font-light leading-relaxed mx-auto lg:mx-0"
                            >
                                Institutional-grade land assets in Thrissur. Every parcel 100% verified, documented, and curated for generational growth.
                            </motion.p>
                        </div>

                        {/* Animated Badge */}
                        <motion.div 
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 100, delay: 1 }}
                            className="hidden xl:flex w-40 h-40 rounded-full border border-white/10 items-center justify-center p-4 relative group"
                        >
                            <div className="absolute inset-0 rounded-full border border-dashed border-[#D33C29]/30 group-hover:rotate-180 transition-transform duration-10000 linear" />
                            <div className="text-center">
                                <Building2 className="w-8 h-8 text-[#D33C29] mx-auto mb-2" />
                                <span className="text-[10px] font-black text-white uppercase tracking-tighter">Verified Assets</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Main Layout - Full Width with Left Sticky Sidebar */}
            <section className="max-w-[1920px] mx-auto flex flex-col lg:flex-row items-start relative z-20 -mt-8">

                {/* DESKTOP FILTER SIDEBAR - FIXED & FULL HEIGHT */}
                <motion.aside
                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: PREMIUM_EASE }}
                    className="hidden lg:block w-[340px] xl:w-[380px] shrink-0 sticky top-0 h-screen overflow-y-auto hide-scrollbar bg-[#FFFFFF] border-r border-[#061E2D]/5 shadow-[20px_0_40px_rgba(6,30,45,0.03)] z-30"
                >
                    <FilterPanel />
                </motion.aside>

                {/* Mobile Filter Toggle */}
                <div className="lg:hidden w-full px-6 pt-12 pb-4 bg-[#F8FAFC]">
                    <div className="flex items-center justify-between">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsMobileFilterOpen(true)} className="flex items-center gap-2 bg-[#061E2D] text-[#FFFFFF] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg">
                            <SlidersHorizontal size={14} /> Matrix Parameters
                        </motion.button>
                        <div className="text-[10px] font-bold text-[#0B5C8A] tracking-[0.1em] uppercase">
                            {displayedPlots.length} / {filteredPlots.length} Assets
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Drawer */}
                <AnimatePresence>
                    {isMobileFilterOpen && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileFilterOpen(false)} className="fixed inset-0 bg-[#061E2D]/80 backdrop-blur-sm z-40 lg:hidden" />
                            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 left-0 w-[85%] max-w-sm h-full bg-[#FFFFFF] shadow-2xl z-50 lg:hidden overflow-y-auto hide-scrollbar">
                                <div className="sticky top-0 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#061E2D]/10 p-6 flex justify-between items-center z-10">
                                    <h2 className="font-black text-[#061E2D] font-display text-xl">Parameters</h2>
                                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-[#061E2D]/5 rounded-full text-[#061E2D]">
                                        <X size={18} />
                                    </motion.button>
                                </div>
                                <FilterPanel isMobile />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* RESULTS AREA */}
                <div className="flex-1 px-6 md:px-12 xl:px-16 py-12 min-h-screen bg-[#F8FAFC]">

                    {/* Top Bar: Sort */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#061E2D]/5">
                        <div className="hidden lg:block text-xs font-bold uppercase tracking-widest text-[#061E2D]/50">
                            Displaying <span className="text-[#0B5C8A]">{displayedPlots.length}</span> of <span className="text-[#0B5C8A]">{filteredPlots.length}</span> Assets
                        </div>

                        <div className="relative w-full sm:w-56 z-20 ml-auto">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsSortOpen(!isSortOpen)} className="w-full flex items-center justify-between bg-[#FFFFFF] border border-[#061E2D]/10 rounded-xl px-5 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-[#061E2D] hover:border-[#0B5C8A] transition-colors shadow-sm">
                                <span className="truncate">Sort: <span className="text-[#0B5C8A]">{sortBy}</span></span>
                                <ChevronDown size={14} className={`text-[#061E2D]/50 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {isSortOpen && (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="absolute right-0 mt-2 w-full bg-[#FFFFFF] border border-[#061E2D]/10 rounded-xl shadow-[0_20px_40px_rgba(6,30,45,0.08)] py-2 overflow-hidden">
                                        {SORT_OPTIONS.map(opt => (
                                            <button key={opt} onClick={() => { setSortBy(opt); setIsSortOpen(false); }} className={`w-full text-left px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors ${sortBy === opt ? 'bg-[#061E2D]/5 text-[#D33C29]' : 'text-[#061E2D]/70 hover:bg-[#061E2D]/[0.03] hover:text-[#0B5C8A]'}`}>
                                                {opt}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Plot Grid - STRICT GRID COLS TO PREVENT STRETCHING */}
                    {displayedPlots.length > 0 ? (
                        <>
                            <motion.div 
                                layout 
                                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8"
                            >
                                <AnimatePresence mode="popLayout">
                                    {displayedPlots.map((plot, i) => (
                                        <motion.div
                                            key={plot.id} 
                                            layout 
                                            initial={{ opacity: 0, scale: 0.9, y: 30 }} 
                                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            exit={{ opacity: 0, scale: 0.95 }} 
                                            transition={{ 
                                                duration: 0.6, 
                                                delay: (i % 4) * 0.1, 
                                                ease: PREMIUM_EASE 
                                            }}
                                            className="will-change-transform"
                                        >
                                            <PlotCard plot={plot} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>

                            {/* Load More */}
                            {hasMore && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-20 flex justify-center">
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setVisibleCount(prev => prev + 9)} className="group relative overflow-hidden bg-transparent border border-[#061E2D]/20 text-[#061E2D] px-12 py-5 rounded-full font-bold tracking-widest uppercase text-xs transition-colors duration-300">
                                        <span className="relative z-10 group-hover:text-[#FFFFFF] transition-colors duration-300">Reveal More Assets</span>
                                        <div className="absolute inset-0 bg-[#061E2D] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                                    </motion.button>
                                </motion.div>
                            )}
                        </>
                    ) : (
                        /* Zero State */
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center justify-center py-32 px-4 text-center bg-[#FFFFFF] border border-[#061E2D]/5 rounded-3xl shadow-sm">
                            <div className="w-24 h-24 rounded-full bg-[#061E2D]/5 flex items-center justify-center mb-8">
                                <Search size={32} className="text-[#0B5C8A]" />
                            </div>
                            <h3 className="text-3xl font-black text-[#061E2D] mb-4 font-display tracking-tight">Zero Matches Found.</h3>
                            <p className="text-[#061E2D]/50 max-w-md mb-8 font-light text-lg">
                                Our portfolio is highly exclusive. Adjust your parameters to discover available legacy assets.
                            </p>
                            <button onClick={resetFilters} className="bg-[#D33C29] text-[#FFFFFF] px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-[#b02e1e] transition-colors shadow-[0_10px_20px_rgba(211,60,41,0.2)]">
                                Reset Parameters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Global Utility for hiding the native ugly scrollbars inside the sidebar */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}