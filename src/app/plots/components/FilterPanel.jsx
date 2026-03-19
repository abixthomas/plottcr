'use client';

import React, { useState, useRef } from 'react';
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
import useClickOutside from '@/hooks/useClickOutside';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];
const BRAND_RED = '#D33C29';
const BRAND_TEAL = '#063D69';

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
    const locationDropdownRef = useRef(null);

    useClickOutside(locationDropdownRef, () => setIsLocationDropdownOpen(false));

    const SectionHeader = ({ icon: Icon, title, subtitle }) => (
        <div className="flex flex-col gap-0.5 mb-1.5">
            <div className="flex items-center gap-2 text-[#063D69]">
                <div className="w-5 h-5 rounded-lg bg-[#063D69]/5 flex items-center justify-center shrink-0 border border-[#063D69]/10">
                    <Icon size={12} strokeWidth={2.5} className="text-[#063D69]" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{title}</span>
            </div>
            {subtitle && <span className="text-[9px] text-[#063D69]/60 font-bold uppercase tracking-widest pl-7">{subtitle}</span>}
        </div>
    );

    return (
        <div className={`flex flex-col gap-3 ${isMobile ? 'px-8 pt-8 pb-16 h-fit' : 'px-6 pt-6 pb-0 h-full'} bg-white border border-slate-200 shadow-[0_20px_50px_rgba(6,61,105,0.05)] rounded-2xl transition-all duration-500`}>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                    <h3 className="text-xl font-black text-[#063D69] tracking-tight">Filters</h3>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(211, 60, 41, 0.08)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetFilters}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#D33C29] transition-all px-3 py-2 bg-[#D33C29]/5 rounded-xl border border-[#D33C29]/10"
                >
                    <RotateCcw size={12} strokeWidth={3} /> Reset
                </motion.button>
            </div>

            {/* Regional Selection */}
            <div className="flex flex-col gap-2">
                <SectionHeader icon={MapPin} title="Location" subtitle="Target Regions" />
                <div className="relative group pl-7" ref={locationDropdownRef}>
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                        className={`w-full flex items-center justify-between bg-slate-50 border ${isLocationDropdownOpen ? 'border-[#063D69] ring-4 ring-[#063D69]/5' : 'border-slate-200'} rounded-xl px-4 py-3 text-left transition-all duration-300 hover:bg-slate-100 shadow-sm`}
                    >
                        <span className="text-[11px] font-black text-[#063D69]/70 uppercase tracking-wider">
                            {filters.locations.length > 0
                                ? `${filters.locations.length} Selected`
                                : 'All Locations'}
                        </span>
                        <ChevronDown size={14} className={`text-[#063D69] transition-transform duration-500 ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                        {isLocationDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
                            >
                                <div className="max-h-60 overflow-y-auto py-2 no-scrollbar">
                                    {locations.map(loc => {
                                        const isSelected = filters.locations.includes(loc);
                                        return (
                                            <button
                                                key={loc}
                                                onClick={() => toggleLocation(loc)}
                                                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                                            >
                                                <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#D33C29]' : 'text-[#063D69]/70 group-hover:text-[#063D69]'}`}>
                                                    {loc}
                                                </span>
                                                {isSelected && (
                                                    <div className="w-4 h-4 rounded-full bg-[#D33C29] flex items-center justify-center">
                                                        <Check size={10} className="text-white" strokeWidth={4} />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Visual Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {filters.locations.map(loc => (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                key={loc}
                                className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 bg-[#D33C29] rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-md shadow-[#D33C29]/20"
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
            <div className="flex flex-col gap-2">
                <SectionHeader icon={IndianRupee} title="Price Range" subtitle="Investment Threshold" />
                <div className="px-2 pt-4 pb-2 pl-7">
                    <Slider.Root
                        className="relative flex items-center w-full h-4 touch-none"
                        value={filters.priceRange} max={maxPrice} step={100000}
                        onValueChange={(val) => handleFilterChange('priceRange', val)}
                    >
                        <Slider.Track className="bg-slate-100 relative grow rounded-full h-[6px]">
                            <Slider.Range className="absolute bg-[#D33C29] rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-5 h-5 bg-white border-[3px] border-[#D33C29] shadow-lg rounded-full cursor-grab focus:outline-none transition-transform hover:scale-110 border-solid" />
                        <Slider.Thumb className="block w-5 h-5 bg-white border-[3px] border-[#D33C29] shadow-lg rounded-full cursor-grab focus:outline-none transition-transform hover:scale-110 border-solid" />
                    </Slider.Root>
                </div>
                <div className="flex items-center justify-between mt-2 gap-3 pl-7">
                    <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 shadow-inner">
                        <span className="text-[8px] font-black text-[#063D69]/70 uppercase tracking-[0.2em] block mb-0.5">Min</span>
                        <span className="text-[12px] font-black text-[#063D69]">{formatPrice(filters.priceRange[0])}</span>
                    </div>
                    <div className="w-4 h-[1px] bg-slate-200 shrink-0" />
                    <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 shadow-inner text-right">
                        <span className="text-[8px] font-black text-[#063D69]/70 uppercase tracking-[0.2em] block mb-0.5">Max</span>
                        <span className="text-[12px] font-black text-[#063D69]">{formatPrice(filters.priceRange[1])}</span>
                    </div>
                </div>
            </div>

            {/* Asset Classification */}
            <div className="flex flex-col gap-2">
                <SectionHeader icon={Target} title="Classification" subtitle="Asset Intent" />
                <div className="grid grid-cols-2 gap-3 mt-1 pl-7">
                    {purposes.map(p => {
                        const isSelected = p === 'All' 
                            ? filters.purposes.length === 0 
                            : filters.purposes.includes(p);

                        const togglePurpose = () => {
                            if (p === 'All') {
                                handleFilterChange('purposes', []);
                            } else {
                                const newPurposes = filters.purposes.includes(p)
                                    ? filters.purposes.filter(item => item !== p)
                                    : [...filters.purposes, p];
                                handleFilterChange('purposes', newPurposes);
                            }
                        };

                        return (
                            <motion.button
                                key={p}
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={togglePurpose}
                                className={`px-3 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all border-2 ${isSelected
                                    ? '!bg-[#D33C29] !text-white border-[#D33C29] shadow-lg shadow-[#D33C29]/20'
                                    : 'bg-slate-50 text-slate-800 border-slate-100 hover:border-slate-300 hover:bg-slate-100'
                                    }`}
                            >
                                {p}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Dimensional Scale */}
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between mb-0.5 pl-7">
                    <SectionHeader icon={Ruler} title="Scale" subtitle="Spatial Scope" />
                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                        {sizeUnits.map(unit => (
                            <button
                                key={unit}
                                onClick={() => handleFilterChange('sizeUnit', unit)}
                                className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded transition-all ${filters.sizeUnit === unit ? 'bg-white text-[#063D69] shadow-sm' : 'text-slate-600 hover:text-[#063D69]'}`}
                            >
                                {unit}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2 pl-7">
                    <div className="relative flex-1 group">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.sizeMin}
                            onChange={(e) => handleFilterChange('sizeMin', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black text-[#063D69] focus:outline-none focus:border-[#063D69] transition-all shadow-inner"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-[#063D69]/50 uppercase">{filters.sizeUnit}</span>
                    </div>
                    <div className="relative flex-1 group">
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.sizeMax}
                            onChange={(e) => handleFilterChange('sizeMax', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black text-[#063D69] focus:outline-none focus:border-[#063D69] transition-all shadow-inner"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-[#063D69]/50 uppercase">{filters.sizeUnit}</span>
                    </div>
                </div>
            </div>

            {/* Logical parameters */}
            <div className="flex flex-col pt-2 pb-3 border-t border-slate-100 pl-7">
                <motion.button
                    onClick={() => handleFilterChange('roadAccess', !filters.roadAccess)}
                    whileHover={{ x: 5, backgroundColor: 'rgba(6,61,105,0.03)' }}
                    className={`flex items-center justify-between w-full group py-3 px-5 rounded-2xl border transition-all ${filters.roadAccess ? 'bg-[#063D69]/5 border-[#063D69]/20 shadow-sm' : 'bg-slate-50 border-slate-100'}`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${filters.roadAccess ? 'bg-[#063D69] border-[#063D69] shadow-md' : 'border-slate-200 bg-white'}`}>
                            {filters.roadAccess && <Check size={14} strokeWidth={4} className="text-white" />}
                        </div>
                        <div className="flex flex-col items-start text-left">
                            <span className="text-[11px] font-black text-[#063D69] uppercase tracking-wider">Road Linkage</span>
                        </div>
                    </div>
                    <Navigation2 size={16} className={`${filters.roadAccess ? 'text-[#D33C29]' : 'text-slate-300'} transition-colors duration-500`} />
                </motion.button>
            </div>

            {/* Mobile Apply */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/90 backdrop-blur-xl border-t border-slate-100 z-[60] flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-[#063D69] text-white font-black uppercase tracking-[0.2em] text-sm py-5 rounded-2xl shadow-xl active:scale-95 transition-all"
                    >
                        Apply Transformation
                    </button>
                </div>
            )}
        </div>
    );
}
