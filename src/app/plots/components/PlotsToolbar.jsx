'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import SortDropdown from './SortDropdown';

export default function PlotsToolbar({
    onOpenMobileFilters,
    onToggleSidebar,
    isSidebarVisible,
    resultsCount,
    sortBy,
    setSortBy
}) {
    const [isSortOpen, setIsSortOpen] = useState(false);

    const sortOptions = [
        "Latest",
        "Price Low–High",
        "Price High–Low"
    ];

    return (
        <div className="sticky top-[72px] z-40 bg-white border-b border-[#061E2D]/5 px-6 lg:px-12 py-6 flex items-center justify-between shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                <button
                    onClick={onOpenMobileFilters}
                    className="lg:hidden flex items-center gap-3 px-6 py-3 bg-[#061E2D] text-white rounded-xl active:scale-95 transition-all shadow-xl shadow-black/20"
                >
                    <SlidersHorizontal size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Logic</span>
                </button>

                <button
                    onClick={onToggleSidebar}
                    className="hidden lg:flex items-center gap-3 px-6 py-3 bg-[#061E2D] text-white rounded-xl active:scale-95 transition-all shadow-xl shadow-black/20 group"
                >
                    <motion.div
                        animate={{ rotate: isSidebarVisible ? 0 : 180 }}
                        className="flex items-center justify-center"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    </motion.div>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                        {isSidebarVisible ? 'Hide Filters' : 'Show Filters'}
                    </span>
                </button>
                <div>
                    <h2 className="text-2xl font-black text-[#061E2D] tracking-tight">Available Plots</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#0B5C8A]">{resultsCount} Curated Assets</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <SortDropdown
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    options={sortOptions}
                    isOpen={isSortOpen}
                    setIsOpen={setIsSortOpen}
                />
            </div>
        </div>
    );
}
