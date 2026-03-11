'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, ShieldCheck, Globe2, ArrowRight } from 'lucide-react';

const EDITORIAL_EASE = [0.16, 1, 0.3, 1];

const PILLARS = [
    {
        id: "01",
        icon: ShieldCheck,
        title: "Absolute Legal Clarity.",
        description: "We conduct exhaustive 50-point legal audits on every square foot. No encumbrances, no disputes, no friction. Just pristine, transfer-ready legacy assets.",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop" // Architecture/Legal concept
    },
    {
        id: "02",
        icon: Scale,
        title: "A Quarter-Century of Trust.",
        description: "For over 25 years, we have been the silent architects behind Thrissur's most significant private land acquisitions. Our reputation is built on delivering exactly what we promise.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop" // Verified Handshake/Trust concept
    },
    {
        id: "03",
        icon: Globe2,
        title: "Seamless NRI Integration.",
        description: "Engineered specifically for global investors. From remote site-tours to digital documentation and power-of-attorney facilitation, we handle the bureaucracy so you don't have to.",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop" // Aviation/Global concept
    }
];

export default function WhyChooseUs() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative w-full bg-[#F4F7F9] text-[#061E2D] overflow-hidden selection:bg-[#0B5C8A] selection:text-[#FFFFFF]">

            {/* Global Background Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#0B5C8A 1px, transparent 1px), linear-gradient(90deg, #0B5C8A 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}
            />

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24 py-24 md:py-32">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24 relative z-10">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-[2px] bg-[#D33C29]" />
                            <span className="text-[#0B5C8A] font-body text-xs md:text-sm font-bold uppercase tracking-[0.25em]">Our Foundations</span>
                        </div>
                        <h2 className="text-[#061E2D] text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tighter leading-[1] max-w-2xl">
                            The Right Choice <br /> For <span className="text-[#0B5C8A]">Your Legacy.</span>
                        </h2>
                    </div>
                    <p className="text-[#061E2D]/60 font-body text-lg md:text-xl font-light leading-relaxed max-w-md">
                        We don't just sell land; we curate institutional-grade assets designed to protect and multiply your family's wealth across generations.
                    </p>
                </div>

                {/* The Scroll-Spy Layout */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

                    {/* LEFT PANE: Sticky Cinematic Image Window (Hidden on small mobile) */}
                    <div className="hidden lg:flex w-[45%] h-screen sticky top-0 items-center py-16">
                        <div className="w-full h-full relative rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(6,30,45,0.15)] border border-[#061E2D]/5">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeIndex}
                                    src={PILLARS[activeIndex].image}
                                    initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                    transition={{ duration: 0.8, ease: EDITORIAL_EASE }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Inner Glass Branding */}
                            <div className="absolute bottom-8 left-8 bg-[#FFFFFF]/80 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 border border-[#FFFFFF]">
                                <span className="w-2 h-2 rounded-full bg-[#D33C29] animate-pulse" />
                                <span className="text-[#061E2D] font-display font-bold text-xs uppercase tracking-widest">{PILLARS[activeIndex].id} // Verified</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANE: Scrolling Text Pillars */}
                    <div className="w-full lg:w-[55%] flex flex-col pt-0 lg:pt-32 pb-0">
                        {PILLARS.map((pillar, index) => {
                            const isActive = activeIndex === index;

                            return (
                                <motion.div
                                    key={pillar.id}
                                    onViewportEnter={() => setActiveIndex(index)}
                                    viewport={{ amount: 0.6, margin: "-10%" }}
                                    className={`relative flex flex-col gap-6 pt-8 md:pt-12 pb-16 md:pb-24 border-t border-[#061E2D]/10 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-30 hover:opacity-50'}`}
                                >
                                    {/* Active State Line Indicator */}
                                    <motion.div
                                        className="absolute top-[-1px] left-0 h-[2px] bg-[#D33C29]"
                                        initial={false}
                                        animate={{ width: isActive ? "100%" : "0%" }}
                                        transition={{ duration: 0.8, ease: EDITORIAL_EASE }}
                                    />

                                    {/* Mobile Only Image (Shows when stacking) */}
                                    <div className="block lg:hidden w-full h-[300px] rounded-[24px] overflow-hidden mb-6 shadow-2xl">
                                        <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex items-start gap-6 md:gap-8">
                                        <div className={`mt-1.5 md:mt-2 w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-full flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-[#D33C29] text-[#FFFFFF] shadow-lg shadow-[#D33C29]/30' : 'bg-[#0B5C8A]/5 text-[#0B5C8A]'}`}>
                                            <pillar.icon size={24} strokeWidth={2} />
                                        </div>

                                        <div>
                                            <p className="text-[#D33C29] font-body text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-3">
                                                Pillar {pillar.id}
                                            </p>
                                            <h3 className="text-[#061E2D] text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-tight leading-none mb-6">
                                                {pillar.title}
                                            </h3>
                                            <p className="text-[#061E2D]/70 font-body text-lg md:text-xl leading-relaxed font-light">
                                                {pillar.description}
                                            </p>

                                            {/* Hover CTA that only appears on active */}
                                            <motion.div
                                                className="mt-8 overflow-hidden"
                                                initial={false}
                                                animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                                                transition={{ duration: 0.5, ease: EDITORIAL_EASE }}
                                            >
                                                <button className="flex items-center gap-3 text-[#0B5C8A] font-bold font-body uppercase tracking-[0.15em] text-sm group">
                                                    Explore Protocol
                                                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                                </button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}