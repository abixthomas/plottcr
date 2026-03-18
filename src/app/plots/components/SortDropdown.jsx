'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

export default function SortDropdown({ sortBy, setSortBy, options, isOpen, setIsOpen }) {
    return (
        <div className="relative w-full sm:w-64 z-40">
            <motion.button 
                whileHover={{ scale: 1.01 }} 
                whileTap={{ scale: 0.99 }} 
                onClick={() => setIsOpen(!isOpen)} 
                className={`w-full flex items-center justify-between bg-white border ${isOpen ? 'border-[#0B5C8A] ring-4 ring-[#0B5C8A]/5' : 'border-[#061E2D]/10'} rounded-2xl px-6 py-4 transition-all duration-300 shadow-sm`}
            >
                <div className="flex flex-col items-start leading-none">
                    <span className="text-[9px] font-black text-[#0B5C8A] uppercase tracking-[0.2em] mb-1">Priority</span>
                    <span className="text-[11px] font-black text-[#061E2D] uppercase tracking-widest">{sortBy}</span>
                </div>
                <ChevronDown size={18} className={`text-[#0B5C8A] transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                        transition={{ duration: 0.3, ease: PREMIUM_EASE }} 
                        className="absolute right-0 mt-3 w-full bg-white border border-[#061E2D]/10 rounded-2xl shadow-2xl py-3 overflow-hidden p-2"
                    >
                        {options.map(opt => (
                            <button 
                                key={opt} 
                                onClick={() => { setSortBy(opt); setIsOpen(false); }} 
                                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === opt ? 'bg-[#061E2D] text-white' : 'text-[#061E2D]/60 hover:bg-[#061E2D]/5 hover:text-[#061E2D]'}`}
                            >
                                {opt}
                                {sortBy === opt && <Check size={14} strokeWidth={3} />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
