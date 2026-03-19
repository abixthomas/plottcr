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
        <div className={`flex flex-col gap-3 ${isMobile ? 'p-8 pb-32 bg-[#061E2D]' : 'p-4'} h-fit bg-[#061E2D] border border-white/10 shadow-2xl rounded-2xl transition-all duration-500`}>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                    <h3 className="text-xl font-black text-white font-display tracking-tight">Intelligence</h3>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#0B5C8A] mt-1 italic opacity-80">Filters</p>
                </div>
                    <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(211, 60, 41, 0.15)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetFilters}
                    className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.1em] text-[#D33C29] transition-all px-3 py-1.5 bg-[#D33C29]/10 rounded-lg border border-[#D33C29]/20"
                >
                    <RotateCcw size={10} strokeWidth={3} /> Reset
                </motion.button>
            </div>

            {/* Regional Selection */}
            <div className="flex flex-col gap-1.5">
                <SectionHeader icon={MapPin} title="Geography" subtitle="Target Regions" />
                <div className="relative group pl-7">
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                        className={`w-full flex items-center justify-between bg-white/5 border ${isLocationDropdownOpen ? 'border-[#0B5C8A] ring-4 ring-[#0B5C8A]/10' : 'border-white/10'} rounded-lg px-4 py-3 text-left transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 shadow-xl shadow-black/20`}
                    >
                        <span className="text-[10px] font-black text-white uppercase tracking-wider">
                            {filters.locations.length > 0
                                ? `${filters.locations.length} Regions Locked`
                                : 'Universal Access'}
                        </span>
                        <ChevronDown size={14} className={`text-[#0B5C8A] transition-transform duration-500 ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                    </motion.button>
                    {/* Visual Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {filters.locations.map(loc => (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                key={loc}
                                className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 bg-[#D33C29] border border-[#D33C29]/50 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-xl shadow-[#D33C29]/20"
                            >
                                {loc}
                                <button onClick={() => toggleLocation(loc)} className="p-0.5 hover:bg-white/20 rounded-full transition-colors">
                                    <X size={8} strokeWidth={4} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Capital Range */}
            <div className="flex flex-col gap-1.5">
                <SectionHeader icon={IndianRupee} title="Capitalization" subtitle="Investment Threshold" />
                <div className="px-2 pt-3 pb-1 pl-7">
                    <Slider.Root
                        className="relative flex items-center w-full h-3 touch-none"
                        value={filters.priceRange} max={maxPrice} step={100000}
                        onValueChange={(val) => handleFilterChange('priceRange', val)}
                    >
                        <Slider.Track className="bg-white/10 relative grow rounded-full h-[6px]">
                            <Slider.Range className="absolute bg-[#D33C29] rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-5 h-5 bg-white border-[3px] border-[#D33C29] shadow-[0_0_15px_rgba(211,60,41,0.6)] rounded-full cursor-grab focus:outline-none transition-transform hover:scale-110 border-solid" />
                        <Slider.Thumb className="block w-5 h-5 bg-white border-[3px] border-[#D33C29] shadow-[0_0_15px_rgba(211,60,41,0.6)] rounded-full cursor-grab focus:outline-none transition-transform hover:scale-110 border-solid" />
                    </Slider.Root>
                </div>
                <div className="flex items-center justify-between mt-2 gap-3 pl-7">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 shadow-xl">
                        <span className="text-[8px] font-black text-[#0B5C8A] uppercase tracking-[0.1em] block mb-0.5 opacity-70">Min</span>
                        <span className="text-xs font-black text-white">{formatPrice(filters.priceRange[0])}</span>
                    </div>
                    <div className="w-2 h-[1px] bg-white/10 shrink-0" />
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 shadow-xl text-right">
                        <span className="text-[8px] font-black text-[#0B5C8A] uppercase tracking-[0.1em] block mb-0.5 opacity-70">Max</span>
                        <span className="text-xs font-black text-white">{formatPrice(filters.priceRange[1])}</span>
                    </div>
                </div>
            </div>

            {/* Asset Classification */}
            <div className="flex flex-col gap-1.5">
                <SectionHeader icon={Target} title="Classification" subtitle="Asset Intent" />
                <div className="grid grid-cols-2 gap-3 mt-1 pl-7">
                    {purposes.map(p => (
                        <motion.button
                            key={p}
                            whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFilterChange('purpose', p)}
                            className={`px-3 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all border-2 ${filters.purpose === p
                                ? 'bg-[#D33C29] text-white border-[#D33C29] shadow-xl shadow-[#D33C29]/20'
                                : 'bg-white/5 text-white/50 border-transparent hover:border-white/20'
                                }`}
                        >
                            {p}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Dimensional Scale */}
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between mb-1.5 pl-7">
                    <SectionHeader icon={Ruler} title="Scale" subtitle="Spatial Scope" />
                    <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                        {sizeUnits.map(unit => (
                            <button
                                key={unit}
                                onClick={() => handleFilterChange('sizeUnit', unit)}
                                className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${filters.sizeUnit === unit ? 'bg-white text-[#061E2D] shadow-lg' : 'text-white/30 hover:text-white'}`}
                            >
                                {unit}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3 pl-7">
                    <div className="relative flex-1 group">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.sizeMin}
                            onChange={(e) => handleFilterChange('sizeMin', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs font-black text-white focus:outline-none focus:border-[#0B5C8A] focus:ring-4 focus:ring-[#0B5C8A]/10 transition-all shadow-inner"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-white/20 uppercase">{filters.sizeUnit}</span>
                    </div>
                    <div className="relative flex-1 group">
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.sizeMax}
                            onChange={(e) => handleFilterChange('sizeMax', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs font-black text-white focus:outline-none focus:border-[#0B5C8A] focus:ring-4 focus:ring-[#0B5C8A]/10 transition-all shadow-inner"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-white/20 uppercase">{filters.sizeUnit}</span>
                    </div>
                </div>
            </div>

            {/* Logical parameters */}
            <div className="flex flex-col pt-3 border-t border-white/10 pl-7">
                <motion.button
                    onClick={() => handleFilterChange('roadAccess', !filters.roadAccess)}
                    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    className={`flex items-center justify-between w-full group py-3 px-5 rounded-xl border transition-all ${filters.roadAccess ? 'bg-[#0B5C8A]/20 border-[#0B5C8A]/50 shadow-xl' : 'bg-white/5 border-white/10'}`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${filters.roadAccess ? 'bg-[#D33C29] border-[#D33C29] shadow-lg shadow-[#D33C29]/30' : 'border-white/20 bg-black/20'}`}>
                            {filters.roadAccess && <Check size={14} strokeWidth={4} className="text-white" />}
                        </div>
                        <div className="flex flex-col items-start text-left">
                            <span className="text-[11px] font-black text-white uppercase tracking-wider">Road Linkage</span>
                        </div>
                    </div>
                    <Navigation2 size={16} className={`${filters.roadAccess ? 'text-[#D33C29]' : 'text-white/20'} transition-colors duration-500`} />
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
