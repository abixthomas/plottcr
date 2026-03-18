'use client';

import React from 'react';
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

                        {/* Pagination Trigger */}
                        {visibleCount < totalCount && (
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
