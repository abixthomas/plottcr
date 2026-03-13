'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
    MapPin,
    ShieldCheck,
    Globe,
    TrendingUp,
    Scale,
    FileText,
    Award,
    ArrowRight
} from 'lucide-react';

// Safely register GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// --- CONSTANTS & TOKENS ---
const easeApple = [0.16, 1, 0.3, 1];

// --- COMPONENTS ---

// 2. Elegant Counter
const ElegantCounter = ({ end, suffix = "", title, description }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000;
            const interval = 16;
            const step = Math.ceil(end / (duration / interval));

            const timer = setInterval(() => {
                start += step;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, interval);
        }
    }, [isInView, end]);

    return (
        <div ref={ref} className="flex flex-col md:pr-8">
            <h3 className="text-4xl md:text-5xl font-black text-[#0B5C8A] leading-none font-[Plus_Jakarta_Sans] mb-3">
                {count}<span className="text-[#D33C29]">{suffix}</span>
            </h3>
            <p className="text-[#0B5C8A] font-bold uppercase tracking-widest text-xs mb-2">
                {title}
            </p>
            <p className="text-[#0B5C8A]/60 font-light text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function AboutPageRefined() {
    const containerRef = useRef(null);

    // Parallax for Hero Image
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    // GSAP Image Parallax
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.utils.toArray('.img-parallax').forEach(img => {
                gsap.to(img, {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        });
        return () => ctx.revert();
    }, []);

    const team = [
        { name: "Rajeev Menon", role: "Founder & Chairman", bio: "With over 25 years in Kerala real estate, Rajeev pioneered the shift toward 100% legal transparency in land acquisitions.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" },
        { name: "Abix Thomas V", role: "Director of Data & Strategy", bio: "Leveraging predictive data modeling, Abix identifies Thrissur's highest ROI corridors long before they become mainstream.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" },
        { name: "Priya Nambiar", role: "Head of Legal Affairs", bio: "A former advocate, Priya ensures every square foot we curate passes a rigorous three-tier encumbrance audit.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
        { name: "Sarah Varghese", role: "VP, Global NRI Relations", bio: "Sarah provides a seamless, concierge-level acquisition experience for our investors residing in the Middle East and beyond.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop" }
    ];

    return (
        <article ref={containerRef} className="bg-white min-h-screen selection:bg-[#0B5C8A] selection:text-white font-inter">

            {/* 1. REFINED SIDE-BY-SIDE HERO */}
            <header className="pt-24 md:pt-32 pb-16 px-6 bg-[#0B5C8A]/5 overflow-hidden">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Content */}
                    <div className="text-left order-2 lg:order-1">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: easeApple }}
                            className="text-[#D33C29] font-bold tracking-[0.2em] uppercase text-[10px] mb-6 border border-[#D33C29]/20 px-4 py-1.5 rounded-full inline-block"
                        >
                            Est. 1998 • Thrissur, Kerala
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: easeApple }}
                            className="text-[#0B5C8A] text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] font-[Plus_Jakarta_Sans] mb-8"
                        >
                            Curating Thrissur's Most <br className="hidden md:block" />
                            <span className="text-[#D33C29] italic font-light">Prestigious</span> Landscapes.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: easeApple }}
                            className="text-[#0B5C8A]/70 text-base md:text-lg font-light leading-relaxed max-w-xl"
                        >
                            We are more than real estate consultants; we are the architects of your generational wealth. For over two decades, we have provided high-net-worth families and NRIs with 100% legally vetted, premium land assets across Kerala's cultural capital.
                        </motion.p>
                    </div>

                    {/* Right: Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.4, ease: easeApple }}
                        className="w-full h-[40vh] md:h-[50vh] rounded-sm overflow-hidden relative shadow-2xl order-1 lg:order-2"
                    >
                        <motion.div style={{ y: heroImageY }} className="absolute inset-0 -top-20 -bottom-20">
                            <Image
                                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2500&auto=format&fit=crop"
                                alt="Thrissur Scenic Plot View" fill priority
                                className="object-cover"
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-[#0B5C8A]/10 mix-blend-multiply" />
                    </motion.div>
                </div>
            </header>

            {/* 2. THE HERITAGE NARRATIVE (Rich Content Section) */}
            <section className="py-24 bg-white border-y border-[#0B5C8A]/10">
                <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: easeApple }}
                        className="relative w-full h-[500px] md:h-[650px] rounded-sm overflow-hidden shadow-2xl bg-[#F8FAFC]"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2500&auto=format&fit=crop"
                            alt="Premium Real Estate Plot"
                            fill
                            priority
                            className="object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: easeApple }}
                        className="flex flex-col justify-center"
                    >
                        <h2 className="text-[#0B5C8A] text-3xl md:text-5xl font-black tracking-tighter leading-tight font-[Plus_Jakarta_Sans] mb-8">
                            A Legacy Built on <br />Absolute Transparency.
                        </h2>

                        <div className="space-y-6 text-[#0B5C8A]/75 text-lg font-light leading-relaxed">
                            <p>
                                Founded in 1998, Thrissur Plots emerged from a distinct need in the Kerala real estate market: the demand for absolute, uncompromising legal clarity. The land market was often fragmented and opaque, making it difficult for families and expatriates to invest safely.
                            </p>
                            <p>
                                We changed that narrative. By instituting a rigorous legal framework and prioritizing premium zoning, we evolved into Thrissur's most trusted land acquisition platform. We do not deal in speculation; we deal in verified, high-appreciation assets.
                            </p>
                            <p>
                                Today, our dedicated NRI desk ensures that global Keralites can secure their homeland legacy with complete peace of mind, managing everything from remote documentation to final registration seamlessly.
                            </p>
                        </div>

                        <div className="mt-10">
                            <button
                                onClick={() => console.log('Read Philosophy')}
                                className="px-8 py-4 rounded-sm font-[Plus_Jakarta_Sans] font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-3 bg-[#D33C29] text-white shadow-lg shadow-[#D33C29]/20 hover:shadow-[#D33C29]/40 hover:-translate-y-1"
                            >
                                Our Investment Philosophy <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* 3. PERFORMANCE METRICS (Refined Grid) */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#0B5C8A]/10">
                        <ElegantCounter
                            end={25} suffix="+" title="Years of Excellence"
                            description="A quarter-century of undisputed market leadership in Thrissur."
                        />
                        <ElegantCounter
                            end={500} suffix="+" title="Premium Plots Sold"
                            description="Carefully curated parcels delivered to satisfied investors."
                        />
                        <ElegantCounter
                            end={1200} suffix="+" title="Families Secured"
                            description="Protecting the generational wealth of local and global clients."
                        />
                        <ElegantCounter
                            end={100} suffix="%" title="Clear Titles"
                            description="A flawless record of zero litigations on our delivered properties."
                        />
                    </div>
                </div>
            </section>

            {/* 4. THE PILLARS OF TRUST (Detailed Content Cards) */}
            <section className="py-24 bg-white border-y border-[#0B5C8A]/10">
                <div className="max-w-[1200px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="mb-16 md:text-center max-w-2xl mx-auto"
                    >
                        <h2 className="text-[#0B5C8A] text-3xl md:text-5xl font-black tracking-tighter leading-tight font-[Plus_Jakarta_Sans] mb-6">
                            The Architecture of Confidence.
                        </h2>
                        <p className="text-[#0B5C8A]/70 text-lg font-light leading-relaxed">
                            We do not just broker land; we engineer secure investments. Our stringent protocols protect you from the complexities of property acquisition.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheck, title: "Triple-Vetted Legal Scrutiny", text: "Every plot undergoes an exhaustive audit by empanelled supreme court advocates. We verify decades of encumbrance history, ensuring the title is absolute and dispute-free before it enters our portfolio." },
                            { icon: Globe, title: "Dedicated NRI Concierge", text: "We understand the challenges of remote investment. Our digital acquisition protocol offers virtual site tours, remote POA facilitation, and seamless cross-border documentation for complete peace of mind." },
                            { icon: TrendingUp, title: "Strategic Growth Corridors", text: "Location is everything. We utilize data-driven insights to curate land banks exclusively in Thrissur's highest appreciation zones, guaranteeing strong ROI and sustainable development potential." }
                        ].map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: idx * 0.1, ease: easeApple }}
                                className="bg-[#F8FAFC] p-10 rounded-sm border border-[#0B5C8A]/5 hover:shadow-xl transition-shadow duration-300"
                            >
                                <pillar.icon size={36} className="text-[#D33C29] mb-8" strokeWidth={1.5} />
                                <h3 className="text-[#0B5C8A] text-xl font-bold font-[Plus_Jakarta_Sans] mb-4">{pillar.title}</h3>
                                <p className="text-[#0B5C8A]/70 font-light leading-relaxed">
                                    {pillar.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. COVERAGE AREAS (Content Focus) */}
            <section className="py-24 bg-[#061E2D] text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(#FFFFFF 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

                <div className="max-w-[1200px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <MapPin size={40} className="text-[#D33C29] mb-8" />
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight font-[Plus_Jakarta_Sans] mb-6">
                            Dominating the <br /> Right Horizons.
                        </h2>
                        <p className="text-white/70 text-lg font-light leading-relaxed mb-8">
                            We do not operate everywhere; we operate where growth is guaranteed. Our focus is strictly on Thrissur's premium residential and commercial corridors.
                        </p>
                        <div>
                            <button
                                onClick={() => console.log('View Map')}
                                className="px-8 py-4 rounded-sm font-[Plus_Jakarta_Sans] font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-3 border border-[#0B5C8A] text-[#0B5C8A] hover:bg-[#0B5C8A] hover:text-white"
                            >
                                <span className="text-white">Explore Available Plots</span>
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { name: 'Guruvayur Core', desc: 'High-yield zones near the pilgrimage center, ideal for premium residential and hospitality investments.' },
                            { name: 'Thrissur City Core', desc: 'Elite urban plots offering immediate access to the cultural capital’s top institutions and commercial hubs.' },
                            { name: 'Infopark Radius', desc: 'Exponential growth areas driven by IT infrastructure, perfect for long-term capital appreciation.' },
                            { name: 'Irinjalakuda Suburbs', desc: 'Serene, heritage-rich landscapes curated for expansive family estates and retirement villas.' }
                        ].map((loc, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-colors duration-300">
                                <h4 className="font-bold text-lg font-[Plus_Jakarta_Sans] mb-3 text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D33C29]" />
                                    {loc.name}
                                </h4>
                                <p className="text-white/60 font-light text-sm leading-relaxed">
                                    {loc.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </article>
    );
}