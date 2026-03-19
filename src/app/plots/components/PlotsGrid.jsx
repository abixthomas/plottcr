'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import PlotListingCard from './PlotListingCard';

export default function PlotsGrid({ 
    plots, 
    visibleCount, 
    setVisibleCount, 
    totalCount, 
    resetFilters 
}) {
    const sentinelRef = useRef(null);

    // ─── INFINITE SCROLL LOGIC ───────────────────────────────────
    useEffect(() => {
        if (!sentinelRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < totalCount) {
                // Throttle a bit to prevent multiple triggers in one go
                setVisibleCount(prev => prev + 6);
            }
        }, {
            root: null,
            rootMargin: '20% 0px', // Trigger before completely hitting the bottom
            threshold: 0.1
        });

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [visibleCount, totalCount, setVisibleCount]);

    return (
        <section className="flex-1 bg-[#F1F5F9] min-h-screen">
            <div className="p-6 lg:p-8 lg:px-12">
                {plots.length > 0 ? (
                    <>
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8 mb-16"
                        >
                            <AnimatePresence mode="popLayout">
                                {plots.map((plot, i) => (
                                    <PlotListingCard key={plot.id} plot={plot} index={i} />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Pagination Sentinel */}
                        <div ref={sentinelRef} className="h-20 w-full flex items-center justify-center">
                            {visibleCount < totalCount && (
                                <div className="flex gap-1.5 opacity-50">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                        className="w-1.5 h-1.5 rounded-full bg-[#061E2D]"
                                    />
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                        className="w-1.5 h-1.5 rounded-full bg-[#061E2D]"
                                    />
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                        className="w-1.5 h-1.5 rounded-full bg-[#061E2D]"
                                    />
                                </div>
                            )}
                        </div>
                    </>
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
            </div>
        </section>
    );
}
