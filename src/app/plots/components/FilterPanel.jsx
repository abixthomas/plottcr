'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    IndianRupee,
    Ruler,
    Check,
    X,
    RotateCcw,
    ChevronDown,
    Target,
    Navigation2
} from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

export default function FilterPanel({
    filters,
    handleFilterChange,
    toggleLocation,
    resetFilters,
    locations,
    purposes,
    sizeUnits,
    maxPrice,
    formatPrice,
    isMobile = false,
    onClose
}) {
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

    const SectionHeader = ({ icon: Icon, title, subtitle }) => (
        <div className="flex flex-col gap-0.5 mb-1.5">
            <div className="flex items-center gap-2 text-white">
                <div className="w-5 h-5 rounded-lg bg-[#0B5C8A]/20 flex items-center justify-center shrink-0 border border-[#0B5C8A]/30">
                    <Icon size={12} strokeWidth={2.5} className="text-[#0B5C8A]" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{title}</span>
            </div>
            {subtitle && <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest pl-7">{subtitle}</span>}
        </div>
    );

    return (
        <div className={`flex flex-col gap-5 ${isMobile ? 'p-10 pb-32 bg-[#061E2D]' : 'p-6'} h-fit min-h-[calc(100vh-200px)] bg-[#061E2D] border border-white/10 shadow-2xl rounded-3xl transition-all duration-500`}>
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                    <h3 className="text-2xl font-black text-white font-display tracking-tight">Intelligence</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0B5C8A] mt-1.5 italic opacity-80">Portfolio Optimization</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(211, 60, 41, 0.15)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetFilters}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#D33C29] transition-all px-4 py-2 bg-[#D33C29]/10 rounded-xl border border-[#D33C29]/20"
                >
                    <RotateCcw size={12} strokeWidth={3} /> Reset
                </motion.button>
            </div>

            {/* Regional Selection */}
            <div className="flex flex-col gap-2">
                <SectionHeader icon={MapPin} title="Geography" subtitle="Target Regions" />
                <div className="relative group pl-8">
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                        className={`w-full flex items-center justify-between bg-white/5 border ${isLocationDropdownOpen ? 'border-[#0B5C8A] ring-4 ring-[#0B5C8A]/10' : 'border-white/10'} rounded-xl px-5 py-4 text-left transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 shadow-xl shadow-black/20`}
                    >
                        <span className="text-[11px] font-black text-white uppercase tracking-wider">
                            {filters.locations.length > 0
                                ? `${filters.locations.length} Regions Locked`
                                : 'Universal Access'}
                        </span>
                        <ChevronDown size={16} className={`text-[#0B5C8A] transition-transform duration-500 ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                    </motion.button>
                    {/* Visual Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {filters.locations.map(loc => (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                key={loc}
                                className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 bg-[#D33C29] border border-[#D33C29]/50 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-xl shadow-[#D33C29]/20"
                            >
                                {loc}
                                <button onClick={() => toggleLocation(loc)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                                    <X size={10} strokeWidth={4} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Capital Range */}
            <div className="flex flex-col gap-2">
                <SectionHeader icon={IndianRupee} title="Capitalization" subtitle="Investment Threshold" />
                <div className="px-2 pt-5 pb-2 pl-8">
                    <Slider.Root
                        className="relative flex items-center w-full h-4 touch-none"
                        value={filters.priceRange} max={maxPrice} step={100000}
                        onValueChange={(val) => handleFilterChange('priceRange', val)}
                    >
                        <Slider.Track className="bg-white/10 relative grow rounded-full h-[8px]">
                            <Slider.Range className="absolute bg-[#D33C29] rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-6 h-6 bg-white border-[4px] border-[#D33C29] shadow-[0_0_20px_rgba(211,60,41,0.6)] rounded-full cursor-grab focus:outline-none focus:ring-4 focus:ring-[#D33C29]/20 transition-transform hover:scale-125 border-solid" />
                        <Slider.Thumb className="block w-6 h-6 bg-white border-[4px] border-[#D33C29] shadow-[0_0_20px_rgba(211,60,41,0.6)] rounded-full cursor-grab focus:outline-none focus:ring-4 focus:ring-[#D33C29]/20 transition-transform hover:scale-125 border-solid" />
                    </Slider.Root>
                </div>
                <div className="flex items-center justify-between mt-4 gap-4 pl-8">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 shadow-2xl">
                        <span className="text-[9px] font-black text-[#0B5C8A] uppercase tracking-[0.2em] block mb-1 opacity-70">Min</span>
                        <span className="text-sm font-black text-white">{formatPrice(filters.priceRange[0])}</span>
                    </div>
                    <div className="w-4 h-[1px] bg-white/10 shrink-0" />
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 shadow-2xl text-right">
                        <span className="text-[9px] font-black text-[#0B5C8A] uppercase tracking-[0.2em] block mb-1 opacity-70">Max</span>
                        <span className="text-sm font-black text-white">{formatPrice(filters.priceRange[1])}</span>
                    </div>
                </div>
            </div>

            {/* Asset Classification */}
            <div className="flex flex-col gap-2">
                <SectionHeader icon={Target} title="Classification" subtitle="Asset Intent" />
                <div className="grid grid-cols-2 gap-4 mt-2 pl-8">
                    {purposes.map(p => (
                        <motion.button
                            key={p}
                            whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFilterChange('purpose', p)}
                            className={`px-4 py-4 text-[11px] font-black uppercase tracking-[0.3em] rounded-xl transition-all border-2 ${filters.purpose === p
                                ? 'bg-[#D33C29] text-white border-[#D33C29] shadow-2xl shadow-[#D33C29]/20'
                                : 'bg-white/5 text-white/50 border-transparent hover:border-white/20'
                                }`}
                        >
                            {p}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Dimensional Scale */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between mb-3 pl-8">
                    <SectionHeader icon={Ruler} title="Scale" subtitle="Spatial Scope" />
                    <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/10">
                        {sizeUnits.map(unit => (
                            <button
                                key={unit}
                                onClick={() => handleFilterChange('sizeUnit', unit)}
                                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filters.sizeUnit === unit ? 'bg-white text-[#061E2D] shadow-xl' : 'text-white/30 hover:text-white'}`}
                            >
                                {unit}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4 pl-8">
                    <div className="relative flex-1 group">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.sizeMin}
                            onChange={(e) => handleFilterChange('sizeMin', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm font-black text-white focus:outline-none focus:border-[#0B5C8A] focus:ring-4 focus:ring-[#0B5C8A]/10 transition-all shadow-inner"
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20 uppercase">{filters.sizeUnit}</span>
                    </div>
                    <div className="relative flex-1 group">
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.sizeMax}
                            onChange={(e) => handleFilterChange('sizeMax', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-black text-white focus:outline-none focus:border-[#0B5C8A] focus:ring-4 focus:ring-[#0B5C8A]/10 transition-all shadow-inner"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20 uppercase">{filters.sizeUnit}</span>
                    </div>
                </div>
            </div>

            {/* Logical parameters */}
            <div className="flex flex-col pt-5 border-t border-white/10 pl-8">
                <motion.button
                    onClick={() => handleFilterChange('roadAccess', !filters.roadAccess)}
                    whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    className={`flex items-center justify-between w-full group py-5 px-6 rounded-2xl border transition-all ${filters.roadAccess ? 'bg-[#0B5C8A]/20 border-[#0B5C8A]/50 shadow-2xl' : 'bg-white/5 border-white/10'}`}
                >
                    <div className="flex items-center gap-5">
                        <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${filters.roadAccess ? 'bg-[#D33C29] border-[#D33C29] shadow-lg shadow-[#D33C29]/30' : 'border-white/20 bg-black/20'}`}>
                            {filters.roadAccess && <Check size={16} strokeWidth={4} className="text-white" />}
                        </div>
                        <div className="flex flex-col items-start text-left">
                            <span className="text-[12px] font-black text-white uppercase tracking-wider">Road Linkage</span>
                        </div>
                    </div>
                    <Navigation2 size={20} className={`${filters.roadAccess ? 'text-[#D33C29]' : 'text-white/20'} transition-colors duration-500`} />
                </motion.button>
            </div>

            {/* Mobile Apply */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 p-10 bg-[#061E2D]/80 backdrop-blur-3xl border-t border-white/10 z-[60] flex gap-5">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-[#D33C29] text-white font-black uppercase tracking-[0.3em] text-base py-6 rounded-2xl shadow-[0_20px_50px_rgba(211,60,41,0.4)] active:scale-95 transition-all active:shadow-none"
                    >
                        Apply Transformation
                    </button>
                </div>
            )}

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.05); }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
            `}</style>
        </div>
    );
}
