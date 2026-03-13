'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MapPin, ShieldCheck, Globe, TrendingUp, ArrowRight, Star, CheckCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const easeApple = [0.16, 1, 0.3, 1];

// ─── MAGNETIC CARD ───────────────────────────────────────────────────────────
const MagneticCard = ({ children, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 180, damping: 18 });
    const sy = useSpring(y, { stiffness: 180, damping: 18 });
    const move = (e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.1);
        y.set((e.clientY - r.top - r.height / 2) * 0.1);
    };
    return (
        <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} className={className}>
            {children}
        </motion.div>
    );
};

// ─── ANIMATED COUNTER ──────────────────────────────────────────────────────
const Counter = ({ end, suffix = '', label, sub }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!isInView) return;
        let v = 0;
        const step = Math.ceil(end / 80);
        const t = setInterval(() => { v = Math.min(v + step, end); setCount(v); if (v >= end) clearInterval(t); }, 25);
    }, [isInView, end]);
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: easeApple }} className="relative group">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[#0B5C8A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="text-5xl lg:text-6xl font-black font-[Plus_Jakarta_Sans] text-[#0B5C8A] leading-none mb-2">
                {count}<span className="text-[#D33C29]">{suffix}</span>
            </p>
            <p className="text-[#0B5C8A] font-extrabold uppercase tracking-[0.18em] text-[10px] mb-1">{label}</p>
            <p className="text-[#0B5C8A]/50 font-light text-xs leading-relaxed">{sub}</p>
        </motion.div>
    );
};

// ─── FLOATING ORB ─────────────────────────────────────────────────────────
const Orb = ({ className, delay = 0 }) => (
    <motion.div
        className={`absolute rounded-full pointer-events-none ${className}`}
        animate={{ y: [0, -28, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
);

// ─── WORD REVEAL HEADING ──────────────────────────────────────────────────
const RevealHeading = ({ text, className, delay = 0, tag = 'h2' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const Tag = tag;
    const words = text.split(' ');
    return (
        <Tag ref={ref} className={className}>
            {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.28em]">
                    <motion.span className="inline-block" initial={{ y: '110%' }} animate={isInView ? { y: '0%' } : {}} transition={{ duration: 0.85, delay: delay + i * 0.07, ease: easeApple }}>
                        {w}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
};

// ─── STAT ITEM (for dark background stats section) ────────────────────────
const StatItem = ({ end, suffix, label, sub, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!isInView) return;
        let v = 0;
        const step = Math.ceil(end / 80);
        const t = setInterval(() => { v = Math.min(v + step, end); setCount(v); if (v >= end) clearInterval(t); }, 25);
        return () => clearInterval(t);
    }, [isInView, end]);
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: easeApple }}
            className="text-center lg:px-8"
        >
            <p className="text-5xl lg:text-6xl font-black font-[Plus_Jakarta_Sans] text-white leading-none mb-2">
                {count}<span className="text-[#D33C29]">{suffix}</span>
            </p>
            <p className="text-white/90 font-bold uppercase tracking-widest text-[10px] mb-1">{label}</p>
            <p className="text-white/45 font-light text-xs">{sub}</p>
        </motion.div>
    );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AboutPageRefined() {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.06]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.img-parallax').forEach(el => {
                gsap.to(el, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
            });
        });
        return () => ctx.revert();
    }, []);

    const pillars = [
        { icon: ShieldCheck, num: '01', title: 'Triple-Vetted Legal Scrutiny', text: 'Every plot undergoes an exhaustive audit by empanelled supreme court advocates. We verify decades of encumbrance history, ensuring an absolute, dispute-free title.' },
        { icon: Globe, num: '02', title: 'Dedicated NRI Concierge', text: "Our digital acquisition protocol offers virtual site tours, remote POA facilitation, and seamless cross-border documentation for complete peace of mind." },
        { icon: TrendingUp, num: '03', title: 'Strategic Growth Corridors', text: "We utilize data-driven insights to curate land banks exclusively in Thrissur's highest appreciation zones, guaranteeing strong ROI and sustainable development." },
    ];

    const locations = [
        { name: 'Guruvayur Core', desc: 'High-yield zones near the pilgrimage center — ideal for residential and hospitality investments.' },
        { name: 'Thrissur City Core', desc: "Elite urban plots with immediate access to the cultural capital's top institutions and commercial hubs." },
        { name: 'Infopark Radius', desc: 'Growth areas driven by IT infrastructure — perfect for long-term capital appreciation.' },
        { name: 'Irinjalakuda Suburbs', desc: 'Serene, heritage-rich landscapes curated for expansive family estates and retirement villas.' },
    ];

    const trusts = ['100% Clear Land Titles', '25+ Years Market Authority', 'NRI-Ready Documentation', 'Zero Litigation Record', 'Supreme Court Empanelled Advocates', 'Dedicated Digital Concierge'];

    return (
        <article ref={containerRef} className="bg-[#F8FAFC] selection:bg-[#0B5C8A] selection:text-white overflow-x-hidden">

            {/* ══════════════════ HERO ══════════════════ */}
            <header className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#061E2D]">

                {/* Deep radial background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_-10%,_#0B5C8A_0%,_transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_80%,_#D33C29_0%,_transparent_50%)] opacity-20" />

                {/* Animated grid */}
                <motion.div
                    className="absolute inset-0 opacity-[0.045]"
                    style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '55px 55px' }}
                    animate={{ backgroundPosition: ['0px 0px', '55px 55px'] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                />

                {/* Floating particles */}
                {mounted && [...Array(18)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full pointer-events-none ${i % 3 === 0 ? 'bg-[#D33C29]' : i % 3 === 1 ? 'bg-white' : 'bg-[#0B5C8A]'}`}
                        style={{
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.2,
                        }}
                        animate={{
                            y: [0, -(Math.random() * 80 + 40), 0],
                            x: [0, (Math.random() - 0.5) * 30, 0],
                            opacity: [0.2, 0.7, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: Math.random() * 6 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 4,
                            ease: 'easeInOut',
                        }}
                    />
                ))}

                {/* Slow spinning rings */}
                <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5"
                    style={{ right: '-150px' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#D33C29]/10"
                    style={{ right: '-50px' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                />

                {/* Atmospheric orbs */}
                <Orb className="w-[600px] h-[600px] bg-[#0B5C8A]/25 blur-[130px] -top-40 -left-40" delay={0} />
                <Orb className="w-[350px] h-[350px] bg-[#D33C29]/15 blur-[100px] bottom-10 right-1/3" delay={4} />

                <div className="max-w-[1200px] mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">

                    {/* ── LEFT: TEXT ── */}
                    <div>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: easeApple }}
                            className="inline-flex items-center gap-2 mb-8"
                        >
                            {/* Pulsing dot */}
                            <span className="relative flex h-2 w-2">
                                <motion.span className="absolute inline-flex h-full w-full rounded-full bg-[#D33C29]" animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D33C29]" />
                            </span>
                            <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.25em]">Est. 1998 · Thrissur, Kerala</span>
                        </motion.div>

                        {/* Headline word-by-word */}
                        <div className="mb-8 text-white text-4xl md:text-5xl lg:text-[4.2rem] font-black tracking-[-0.02em] leading-[1.1] font-[Plus_Jakarta_Sans]">
                            <div className="flex flex-wrap gap-x-[0.25em] mb-2">
                                {['Curating', "Thrissur's", 'Most'].map((w, i) => (
                                    <span key={w} className="inline-block overflow-hidden h-[1.2em]">
                                        <motion.span 
                                            className="inline-block" 
                                            initial={{ y: '115%', opacity: 0 }} 
                                            animate={{ y: '0%', opacity: 1 }} 
                                            transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: easeApple }}
                                        >
                                            {w}
                                        </motion.span>
                                    </span>
                                ))}
                            </div>
                            <div className="overflow-hidden h-[1.2em]">
                                <motion.span 
                                    className="inline-block" 
                                    initial={{ y: '115%', opacity: 0 }} 
                                    animate={{ y: '0%', opacity: 1 }} 
                                    transition={{ duration: 0.9, delay: 0.5, ease: easeApple }}
                                >
                                    Landscapes.
                                </motion.span>
                            </div>
                        </div>

                        {/* Body */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.75, ease: easeApple }}
                            className="text-white/60 text-base md:text-lg font-light leading-relaxed max-w-[460px] mb-10"
                        >
                            We are the architects of your generational wealth. For over two decades we have served high-net-worth families and NRIs with 100% legally vetted, premium land assets across Kerala.
                        </motion.p>

                        {/* Trust chips */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
                            className="flex flex-wrap gap-2.5 mb-12"
                        >
                            {['100% Clear Titles', 'NRI Ready', 'Supreme Court Vetted'].map((tag, i) => (
                                <motion.span
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                                    whileHover={{ scale: 1.07, backgroundColor: 'rgba(211,60,41,0.15)' }}
                                    className="flex items-center gap-1.5 bg-white/6 border border-white/10 text-white/75 text-[10px] font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full backdrop-blur-md cursor-default transition-colors duration-300"
                                >
                                    <motion.span className="w-1 h-1 rounded-full bg-[#D33C29]" animate={{ scale: [1, 1.8, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
                                    {tag}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Scroll cue */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-6 h-10 border border-white/15 rounded-full flex items-start justify-center pt-1.5">
                                <motion.div className="w-1 h-1.5 rounded-full bg-white/70" animate={{ y: [0, 14, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
                            </div>
                            <span className="text-white/35 text-[10px] uppercase tracking-[0.22em]">Scroll to explore</span>
                        </motion.div>
                    </div>

                    {/* ── RIGHT: IMAGE WITH LENS REFRACTION ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1.6, delay: 0.3, ease: easeApple }}
                        className="relative order-first lg:order-last group"
                    >
                        {/* Soft ambient glow instead of intense radial */}
                        <motion.div
                            className="absolute -inset-10 rounded-[3rem] opacity-20"
                            style={{ background: 'radial-gradient(circle at center, #0B5C8A 0%, transparent 70%)' }}
                            animate={{ opacity: [0.15, 0.25, 0.15], scale: [0.95, 1.05, 0.95] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* Minimalist outer frame */}
                        <div className="absolute -inset-2 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-[2px]" />

                        {/* Main Image Container */}
                        <motion.div
                            className="relative w-full h-[45vh] lg:h-[56vh] rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10"
                            style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
                            whileHover={{ scale: 1.015 }}
                            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2500&auto=format&fit=crop"
                                alt="Thrissur Scenic Plot View" fill priority className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[4s] ease-out"
                            />
                            
                            {/* Depth gradients */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#061E2D]/80 via-transparent to-[#061E2D]/20" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#061E2D]/40 via-transparent to-transparent" />

                            {/* ── UNSEEN ANIMATION: Moving Refraction Lens ── */}
                            <motion.div
                                className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] pointer-events-none opacity-40 mix-blend-overlay"
                                style={{
                                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 50%)',
                                    backdropFilter: 'blur(8px) saturate(1.2)',
                                    WebkitBackdropFilter: 'blur(8px) saturate(1.2)',
                                }}
                                animate={{
                                    x: ['-5%', '5%', '-5%'],
                                    y: ['-5%', '3%', '-5%'],
                                }}
                                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                            />

                            {/* Light sweep refined */}
                            <motion.div
                                className="absolute inset-0 z-20"
                                style={{ background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%)' }}
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                            />

                            {/* ── HUD MINIMALIST BADGES ── */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end gap-4 z-30">
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="h-[1px] w-12 bg-[#D33C29]" />
                                    <div className="flex flex-col">
                                        <span className="text-white font-black text-3xl tracking-tighter leading-none">500<span className="text-[#D33C29]/80">+</span></span>
                                        <span className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">Acquisitions</span>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
                                    className="self-end flex items-center gap-4"
                                >
                                    <div className="flex flex-col items-end text-right">
                                        <span className="text-white font-black text-3xl tracking-tighter leading-none">25<span className="text-white/40">Yrs</span></span>
                                        <span className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">Market Trust</span>
                                    </div>
                                    <div className="h-[1px] w-12 bg-white/20" />
                                </motion.div>
                            </div>

                            {/* Corner Scanning Brackets (Subtle HUD) */}
                            <div className="absolute inset-4 pointer-events-none border border-white/5 rounded-2xl" />
                            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#D33C29]/40" />
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />
                        </motion.div>
                    </motion.div>
                </div>

            </header>

            {/* ══════════════════ TRUST STRIP ══════════════════ */}
            <div className="bg-white border-b border-[#0B5C8A]/8 py-5 overflow-hidden">
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                    className="flex gap-10 w-max"
                >
                    {[...trusts, ...trusts].map((t, i) => (
                        <div key={i} className="flex items-center gap-3 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D33C29] shrink-0" />
                            <span className="text-[#0B5C8A]/70 text-xs font-semibold uppercase tracking-[0.18em]">{t}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ══════════════════ HERITAGE NARRATIVE ══════════════════ */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#0B5C8A]/3 to-transparent pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-end overflow-hidden opacity-[0.025] select-none pointer-events-none pr-12">
                    <span className="text-[22vw] font-black text-[#0B5C8A] font-[Plus_Jakarta_Sans]">1998</span>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0 round 16px)' }}
                        whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0 round 16px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.3, ease: easeApple }}
                        className="relative w-full h-[480px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-[#0B5C8A]/10"
                    >
                        <Image src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2500&auto=format&fit=crop" alt="Heritage Plot" fill priority className="object-cover img-parallax scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#061E2D]/40 to-transparent" />

                        {/* Overlay badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.7, ease: easeApple }}
                            className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-4 shadow-xl"
                        >
                            <p className="text-[#D33C29] font-black text-3xl font-[Plus_Jakarta_Sans] leading-none">100%</p>
                            <p className="text-[#0B5C8A] text-xs font-bold uppercase tracking-widest mt-1">Legal Clarity</p>
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <div>
                        <motion.div initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: easeApple }} className="h-1 w-12 bg-gradient-to-r from-[#D33C29] to-[#D33C29]/30 rounded-full mb-6" />
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-[#D33C29] text-[10px] font-bold uppercase tracking-[0.25em] mb-4 inline-block">Our Story</motion.span>

                        <RevealHeading text="A Legacy Built on Absolute Transparency." className="text-[#0B5C8A] text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-[1.1] font-[Plus_Jakarta_Sans] mb-8" delay={0.05} />

                        <div className="space-y-5 text-[#0B5C8A]/70 font-light leading-relaxed">
                            {[
                                'Founded in 1998, Thrissur Plots emerged from a distinct need in the Kerala real estate market: the demand for absolute, uncompromising legal clarity.',
                                "We changed that narrative. By instituting a rigorous legal framework and prioritizing premium zoning, we evolved into Thrissur's most trusted land acquisition platform.",
                                'Today, our dedicated NRI desk ensures that global Keralites can secure their homeland legacy with complete peace of mind.'
                            ].map((p, i) => (
                                <motion.p key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.12, ease: easeApple }}>{p}</motion.p>
                            ))}
                        </div>

                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4, ease: easeApple }} className="mt-10">
                            <motion.button
                                whileHover={{ scale: 1.04, x: 4 }} whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D33C29] to-[#c0321f] text-white px-8 py-4 rounded-xl font-[Plus_Jakarta_Sans] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#D33C29]/25 hover:shadow-[#D33C29]/40 transition-shadow duration-300"
                            >
                                Our Investment Philosophy <ArrowRight size={15} />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════════ STATS ══════════════════ */}
            <section className="py-24 bg-gradient-to-br from-[#0B5C8A] to-[#061E2D] relative overflow-hidden">
                <Orb className="w-96 h-96 bg-[#D33C29]/10 blur-3xl -top-20 -right-20" delay={0} />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                        className="text-center text-white/50 text-[10px] font-bold uppercase tracking-[0.25em] mb-16"
                    >By the Numbers</motion.p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
                        {[
                            { end: 25, suffix: '+', label: 'Years of Excellence', sub: 'Undisputed market leadership' },
                            { end: 500, suffix: '+', label: 'Premium Plots Sold', sub: 'Curated parcels delivered' },
                            { end: 1200, suffix: '+', label: 'Families Secured', sub: 'Generational wealth protected' },
                            { end: 100, suffix: '%', label: 'Clear Titles', sub: 'Zero litigation record' },
                        ].map((s, i) => (
                            <StatItem key={i} end={s.end} suffix={s.suffix} label={s.label} sub={s.sub} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════ PILLARS OF TRUST ══════════════════ */}
            <section className="py-28 bg-[#F8FAFC] relative overflow-hidden">
                <Orb className="w-72 h-72 bg-[#D33C29]/5 blur-3xl top-0 right-0" delay={2} />

                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <div className="mb-16 max-w-2xl">
                        <motion.div initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: easeApple }} className="h-1 w-12 bg-gradient-to-r from-[#D33C29] to-[#D33C29]/30 rounded-full mb-6" />
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-[#D33C29] text-[10px] font-bold uppercase tracking-[0.25em] mb-4 inline-block">Why Choose Us</motion.span>
                        <RevealHeading text="The Architecture of Confidence." className="text-[#0B5C8A] text-3xl md:text-5xl font-black tracking-tighter leading-[1.12] font-[Plus_Jakarta_Sans] mb-5" delay={0.05} />
                        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[#0B5C8A]/65 text-lg font-light leading-relaxed">
                            We do not just broker land. We engineer secure, future-proof investments.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {pillars.map((p, idx) => (
                            <MagneticCard key={idx} className="h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    transition={{ duration: 0.9, delay: idx * 0.12, ease: easeApple }}
                                    whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(11,92,138,0.12)' }}
                                    className="relative bg-white rounded-2xl border border-[#0B5C8A]/8 p-8 lg:p-10 h-full overflow-hidden transition-all duration-500 group cursor-default"
                                >
                                    {/* Background number */}
                                    <span className="absolute top-4 right-6 text-[5rem] font-black text-[#0B5C8A]/[0.05] font-[Plus_Jakarta_Sans] leading-none select-none">{p.num}</span>

                                    {/* Gradient reveal on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0B5C8A]/0 to-[#0B5C8A]/0 group-hover:from-[#0B5C8A]/3 group-hover:to-[#D33C29]/3 transition-all duration-500 rounded-2xl" />

                                    {/* Icon */}
                                    <div className="relative mb-8">
                                        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D33C29]/10 to-[#D33C29]/5 flex items-center justify-center border border-[#D33C29]/15">
                                            <p.icon size={24} className="text-[#D33C29]" strokeWidth={1.5} />
                                        </div>
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl border border-[#D33C29]/20"
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                                        />
                                    </div>

                                    <h3 className="text-[#0B5C8A] text-xl font-bold font-[Plus_Jakarta_Sans] mb-4 relative z-10">{p.title}</h3>
                                    <p className="text-[#0B5C8A]/65 font-light leading-relaxed text-sm relative z-10">{p.text}</p>

                                    {/* Bottom line */}
                                    <div className="mt-8 h-px overflow-hidden">
                                        <motion.div className="h-full bg-gradient-to-r from-[#0B5C8A] to-[#D33C29]" initial={{ x: '-100%' }} whileHover={{ x: '0%' }} transition={{ duration: 0.4 }} />
                                    </div>
                                </motion.div>
                            </MagneticCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════ COVERAGE AREAS ══════════════════ */}
            <section className="py-28 bg-[#061E2D] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />
                <Orb className="w-80 h-80 bg-[#D33C29]/10 blur-[100px] -bottom-20 -right-20" delay={0} />
                <Orb className="w-60 h-60 bg-[#0B5C8A]/30 blur-[80px] top-0 -left-16" delay={4} />

                {/* Sweeping scanner */}
                <motion.div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#D33C29] to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 4 }} />

                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Left */}
                        <div className="lg:col-span-5">
                            <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeApple }}>
                                <div className="w-12 h-12 rounded-xl bg-[#D33C29]/20 border border-[#D33C29]/30 flex items-center justify-center mb-8">
                                    <MapPin size={22} className="text-[#D33C29]" />
                                </div>
                            </motion.div>

                            <RevealHeading text="Dominating the Right Horizons." className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.1] font-[Plus_Jakarta_Sans] mb-6 text-white" delay={0.05} />

                            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: easeApple }} className="text-white/60 text-lg font-light leading-relaxed mb-10">
                                We operate exclusively where growth is guaranteed — Thrissur's premium residential and commercial corridors.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3, ease: easeApple }}>
                                <motion.button
                                    whileHover={{ scale: 1.04, backgroundColor: '#D33C29', borderColor: '#D33C29' }} whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center gap-3 border border-white/25 text-white px-7 py-3.5 rounded-xl font-[Plus_Jakarta_Sans] font-bold text-xs uppercase tracking-widest transition-all duration-300"
                                >
                                    Explore Available Plots <ArrowRight size={13} />
                                </motion.button>
                            </motion.div>
                        </div>

                        {/* Right: location cards */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {locations.map((loc, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.1, ease: easeApple }}
                                    whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.07)', boxShadow: '0 20px 40px rgba(0,0,0,0.35)' }}
                                    className="bg-white/5 border border-white/10 p-7 rounded-2xl transition-all duration-300 group cursor-default"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <motion.span className="w-2 h-2 rounded-full bg-[#D33C29] shrink-0" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }} />
                                        <h4 className="font-bold text-base font-[Plus_Jakarta_Sans] text-white">{loc.name}</h4>
                                    </div>
                                    <p className="text-white/55 font-light text-sm leading-relaxed pl-5">{loc.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </article>
    );
}