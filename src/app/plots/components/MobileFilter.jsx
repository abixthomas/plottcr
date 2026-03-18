'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import FilterPanel from './FilterPanel';

export default function MobileFilter({ 
    isOpen, 
    onClose, 
    filters,
    handleFilterChange,
    toggleLocation,
    resetFilters,
    locations,
    purposes,
    sizeUnits,
    maxPrice,
    formatPrice
}) {
    return (
        <AnimatePresence>
            {isOpen && (
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
                            onClick={onClose}
                            className="absolute top-8 right-8 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-[#061E2D] text-white shadow-xl hover:rotate-90 transition-transform duration-500"
                        >
                            <X size={20} />
                        </button>
                        
                        <FilterPanel 
                            filters={filters}
                            handleFilterChange={handleFilterChange}
                            toggleLocation={toggleLocation}
                            resetFilters={resetFilters}
                            locations={locations}
                            purposes={purposes}
                            sizeUnits={sizeUnits}
                            maxPrice={maxPrice}
                            formatPrice={formatPrice}
                            isMobile={true}
                            onClose={onClose}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
