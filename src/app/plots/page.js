'use client';

import React, { useState, useMemo } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { mockPlots } from '@/data/mockPlots';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterPanel from './components/FilterPanel';
import PlotsHero from './components/PlotsHero';
import PlotsToolbar from './components/PlotsToolbar';
import PlotsGrid from './components/PlotsGrid';
import MobileFilter from './components/MobileFilter';

const LOCATIONS = ["Thrissur City", "Guruvayur", "Irinjalakuda", "Koratty", "Puzhakkal", "Punkunnam", "Kunnamkulam", "Chalakudy", "Kodungallur"];
const PURPOSES = ["All", "Plots", "Lands"];
const SIZE_UNITS = ["Cents", "Acres"];
const MAX_PRICE = 50000000;

export default function PlotsPage() {
    // ─── FILTERS STATE ──────────────────────────────────────────
    const [filters, setFilters] = useState({
        locations: [],
        priceRange: [0, MAX_PRICE / 2],
        purposes: [],
        sizeMin: '',
        sizeMax: '',
        sizeUnit: 'Cents',
        roadAccess: false
    });
    const [sortBy, setSortBy] = useState('Latest');
    const [visibleCount, setVisibleCount] = useState(8);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const { scrollY } = useScroll();
    const heroScale = useTransform(scrollY, [0, 500], [1, 1.15]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleLocation = (loc) => {
        setFilters(prev => ({
            ...prev,
            locations: prev.locations.includes(loc)
                ? prev.locations.filter(l => l !== loc)
                : [...prev.locations, loc]
        }));
    };

    const resetFilters = () => {
        setFilters({
            locations: [],
            priceRange: [0, MAX_PRICE / 2],
            purposes: [],
            sizeMin: '',
            sizeMax: '',
            sizeUnit: 'Cents',
            roadAccess: false
        });
    };

    const formatPrice = (value) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(0)} L`;
        return `₹${value.toLocaleString('en-IN')}`;
    };

    // ─── FILTERING LOGIC ────────────────────────────────────────
    const filteredPlots = useMemo(() => {
        return mockPlots.filter(plot => {
            if (filters.locations.length > 0 && !filters.locations.includes(plot.location)) return false;
            if (filters.purposes.length > 0 && !filters.purposes.includes(plot.purpose)) return false;
            if (plot.priceValue < filters.priceRange[0] || plot.priceValue > filters.priceRange[1]) return false;
            if (filters.roadAccess && !plot.roadAccess) return false;

            const sv = plot.sizeValue || 0;
            const sUnit = plot.sizeUnit || 'Cents';

            if (filters.sizeUnit === sUnit) {
                if (filters.sizeMin && sv < Number(filters.sizeMin)) return false;
                if (filters.sizeMax && sv > Number(filters.sizeMax)) return false;
            }
            return true;
        }).sort((a, b) => {
            if (sortBy === 'Price Low–High') return a.priceValue - b.priceValue;
            if (sortBy === 'Price High–Low') return b.priceValue - a.priceValue;
            return new Date(b.dateAdded) - new Date(a.dateAdded);
        });
    }, [filters, sortBy]);

    const displayedPlots = filteredPlots.slice(0, visibleCount);

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-body selection:bg-[#D33C29] selection:text-white">
            <Header />

            <PlotsHero heroScale={heroScale} />

            <PlotsToolbar
                onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
                onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
                isSidebarVisible={isSidebarVisible}
                resultsCount={filteredPlots.length}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            <main className="flex flex-col lg:flex-row bg-[#F8FAFC]">
                <motion.aside
                    initial={false}
                    animate={{
                        width: isSidebarVisible ? 440 : 0,
                        opacity: isSidebarVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden lg:block shrink-0 bg-[#F8FAFC]"
                >
                    <div className="sticky top-[100px] z-20 px-5 pt-4 pb-0 h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
                        <FilterPanel
                            filters={filters}
                            handleFilterChange={handleFilterChange}
                            toggleLocation={toggleLocation}
                            resetFilters={resetFilters}
                            locations={LOCATIONS}
                            purposes={PURPOSES}
                            sizeUnits={SIZE_UNITS}
                            maxPrice={MAX_PRICE}
                            formatPrice={formatPrice}
                        />
                    </div>
                </motion.aside>

                <div className="flex-1">
                    <PlotsGrid
                        plots={displayedPlots}
                        visibleCount={visibleCount}
                        setVisibleCount={setVisibleCount}
                        totalCount={filteredPlots.length}
                        resetFilters={resetFilters}
                    />
                </div>
            </main>

            <MobileFilter
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                filters={filters}
                handleFilterChange={handleFilterChange}
                toggleLocation={toggleLocation}
                resetFilters={resetFilters}
                locations={LOCATIONS}
                purposes={PURPOSES}
                sizeUnits={SIZE_UNITS}
                maxPrice={MAX_PRICE}
                formatPrice={formatPrice}
            />

            <Footer />
        </div>
    );
}