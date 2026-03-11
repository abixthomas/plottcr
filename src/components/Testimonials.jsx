'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

// Integrated Mock Data for seamless copy-pasting
const REVIEWS = [
    {
        id: 1,
        name: "Dr. Abraham Mathews",
        role: "Chief Surgeon",
        location: "Dubai, UAE",
        quote: "Institutional-grade security. I was managing acquisitions from Dubai, and their legal transparency made the entire process frictionless. Found my family's legacy plot here.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Sneha Menon",
        role: "Tech Entrepreneur",
        location: "Bangalore, India",
        quote: "Transparent, seamless, and entirely professional. They didn't just sell me a plot; they engineered an investment vehicle that perfectly matched my portfolio requirements.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Rajeev Krishnan",
        role: "NRI Investor",
        location: "London, UK",
        quote: "The only real estate firm I trust in Kerala. The level of detail in their 50-point legal audit gave me absolute peace of mind. A truly world-class operation.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    }
];

export default function Testimonials() {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isAutoplay, setIsAutoplay] = useState(true);

    // Smooth Autoplay
    useEffect(() => {
        if (!isAutoplay) return;
        const timer = setInterval(() => {
            setDirection(1);
            setActive((prev) => (prev + 1) % REVIEWS.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [isAutoplay, active]);

    const handleNext = () => {
        setIsAutoplay(false);
        setDirection(1);
        setActive((prev) => (prev + 1) % REVIEWS.length);
    };

    const handlePrev = () => {
        setIsAutoplay(false);
        setDirection(-1);
        setActive((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
    };

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? 50 : -50, opacity: 0, filter: "blur(8px)" }),
        center: { x: 0, opacity: 1, filter: "blur(0px)" },
        exit: (dir) => ({ x: dir > 0 ? -50 : 50, opacity: 0, filter: "blur(8px)" })
    };

    return (
        <section className="relative w-full min-h-screen bg-[#061E2D] flex flex-col justify-center overflow-hidden py-24 selection:bg-[#D33C29] selection:text-[#FFFFFF]">

            {/* Cinematic Lighting & Textures */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[#0B5C8A]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}
            />

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24 w-full relative z-10 flex flex-col items-center">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: PREMIUM_EASE }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-4 mb-6">
                        <span className="w-12 h-[1px] bg-[#D33C29]" />
                        <span className="text-[#FFFFFF]/60 font-body text-xs font-bold uppercase tracking-[0.3em]">Client Journals</span>
                        <span className="w-12 h-[1px] bg-[#D33C29]" />
                    </div>
                    <h2 className="text-[#FFFFFF] text-4xl md:text-6xl font-black font-display tracking-tighter">
                        The Trust <span className="text-[#0B5C8A] brightness-125">Oracle.</span>
                    </h2>
                </motion.div>

                {/* The Massive Cinematic Quote Area */}
                <div className="w-full max-w-5xl relative min-h-[400px] md:min-h-[300px] flex flex-col items-center justify-center mb-16">
                    <Quote size={120} className="absolute top-0 left-1/2 -translate-x-1/2 text-[#FFFFFF]/5 rotate-180 -z-10" />

                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={active}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.8, ease: PREMIUM_EASE }}
                            className="text-center flex flex-col items-center w-full"
                        >
                            <div className="flex gap-1.5 mb-8">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="#D33C29" color="#D33C29" className="drop-shadow-[0_0_8px_rgba(211,60,41,0.5)]" />
                                ))}
                            </div>

                            <h3 className="text-[#FFFFFF] text-2xl md:text-4xl lg:text-5xl font-display font-medium leading-[1.2] md:leading-[1.3] tracking-tight mb-12">
                                "{REVIEWS[active].quote}"
                            </h3>

                            <div className="flex flex-col items-center">
                                <p className="text-[#FFFFFF] font-black font-display text-xl tracking-wide mb-1">
                                    {REVIEWS[active].name}
                                </p>
                                <p className="text-[#FFFFFF]/50 font-body text-sm uppercase tracking-widest mb-3">
                                    {REVIEWS[active].role}
                                </p>
                                <div className="flex items-center gap-1.5 text-[#D33C29] font-body text-xs font-bold uppercase tracking-[0.2em]">
                                    <MapPin size={12} />
                                    {REVIEWS[active].location}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Interactive Avatar Navigation Track */}
                <div className="flex items-center gap-8 md:gap-16">
                    {/* Prev Button */}
                    <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-[#FFFFFF]/20 flex items-center justify-center text-[#FFFFFF] hover:bg-[#D33C29] hover:border-[#D33C29] transition-all duration-300 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    </button>

                    {/* Avatar Track */}
                    <div className="flex items-center gap-4 md:gap-6">
                        {REVIEWS.map((review, i) => {
                            const isActive = i === active;
                            return (
                                <button
                                    key={review.id}
                                    onClick={() => {
                                        setIsAutoplay(false);
                                        setDirection(i > active ? 1 : -1);
                                        setActive(i);
                                    }}
                                    className="relative flex items-center justify-center outline-none"
                                >
                                    <motion.div
                                        animate={{
                                            scale: isActive ? 1.2 : 0.8,
                                            opacity: isActive ? 1 : 0.4,
                                            filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)'
                                        }}
                                        transition={{ duration: 0.5, ease: PREMIUM_EASE }}
                                        className={`w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 ${isActive ? 'border-[#D33C29]' : 'border-transparent'}`}
                                    >
                                        <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                                    </motion.div>

                                    {/* Active Glow Ring */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeGlow"
                                            className="absolute -inset-2 rounded-full border border-[#D33C29]/30 blur-[2px]"
                                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    <button onClick={handleNext} className="w-12 h-12 rounded-full border border-[#FFFFFF]/20 flex items-center justify-center text-[#FFFFFF] hover:bg-[#D33C29] hover:border-[#D33C29] transition-all duration-300 group">
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>
        </section>
    );
}