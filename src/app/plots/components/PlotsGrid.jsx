'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Loader2 } from 'lucide-react';
import PlotListingCard from './PlotListingCard';

export default function PlotsGrid({ 
    plots, 
    visibleCount, 
    setVisibleCount, 
    totalCount, 
    resetFilters 
}) {
    const sentinelRef = useRef(null);
    const [isLoadingNext, setIsLoadingNext] = useState(false);

    // ─── INFINITE SCROLL LOGIC ───────────────────────────────────
    useEffect(() => {
        if (!sentinelRef.current || visibleCount >= totalCount) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoadingNext) {
                setIsLoadingNext(true);
                
                // Simulate a small delay for a smoother "loading" experience
                setTimeout(() => {
                    setVisibleCount(prev => prev + 6);
                    setIsLoadingNext(false);
                }, 400);
            }
        }, {
            root: null,
            rootMargin: '400px', 
            threshold: 0
        });

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [visibleCount, totalCount, setVisibleCount, isLoadingNext]);

    return (
        <section className="flex-1 bg-[#F8FAFC] min-h-screen">
            <div className="p-6 lg:p-8 lg:px-12">
                {plots.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8 mb-16">
                            <AnimatePresence mode="popLayout">
                                {plots.map((plot, i) => (
                                    <PlotListingCard 
                                        key={plot.id} 
                                        plot={plot} 
                                        index={i % 6} 
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination Sentinel & Loader */}
                        <div ref={sentinelRef} className="h-40 w-full flex flex-col items-center justify-center gap-4 py-20">
                            {(isLoadingNext || visibleCount < totalCount) && (
                                <>
                                    <div className="flex gap-2">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ 
                                                    scale: [1, 1.5, 1],
                                                    backgroundColor: ['#063D69', '#D33C29', '#063D69'],
                                                    opacity: [0.3, 1, 0.3]
                                                }}
                                                transition={{ 
                                                    duration: 1, 
                                                    repeat: Infinity, 
                                                    delay: i * 0.2,
                                                    ease: "easeInOut"
                                                }}
                                                className="w-2 h-2 rounded-full"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#063D69]/40">
                                        Curating More Assets
                                    </span>
                                </>
                            )}
                            
                            {visibleCount >= totalCount && plots.length > 0 && (
                                <div className="flex flex-col items-center gap-3 opacity-30">
                                    <div className="w-10 h-[1px] bg-[#063D69]/20" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#063D69]">
                                        End of Collection
                                    </span>
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
                        <div className="w-24 h-24 rounded-full bg-[#063D69]/5 flex items-center justify-center mb-10 border border-[#063D69]/10">
                            <MapPin size={40} className="text-[#063D69]/20" />
                        </div>
                        <h3 className="text-3xl font-black text-[#063D69] mb-4 tracking-tight">No Matching Parcels</h3>
                        <p className="text-slate-400 max-w-md mb-10 text-base font-medium">
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
