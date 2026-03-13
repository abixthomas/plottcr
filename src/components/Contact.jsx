'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageCircle, Clock, Send, CheckCircle2, ArrowRight, Map } from 'lucide-react';

// --- DESIGN TOKENS ---
const COLORS = {
    primary: '#0B5C8A', // Deep Marine Blue
    accent: '#D33C29',  // Burnt Orange
    bgLight: '#F8FAFC', // Soft Light Gray/White
    white: '#FFFFFF',
};

// Apple-grade easing for 60fps fluidity
const APPLE_EASE = [0.16, 1, 0.3, 1];

// --- MAGNETIC BUTTON COMPONENT ---
const MagneticButton = ({ children, className, onClick, type = "button" }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.35;
        const y = (clientY - (top + height / 2)) * 0.35;
        setPosition({ x, y });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.button
            ref={ref}
            type={type}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};

export default function Contact() {
    const [formState, setFormState] = useState('idle'); // idle | loading | success
    const [isVisitRequested, setIsVisitRequested] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormState('loading');
        setTimeout(() => {
            setFormState('success');
            console.log("Inquiry logged for Thrissur Plots Legacy Acquisition.");
        }, 2000);
    };

    return (
        <section className="relative min-h-screen bg-[#F8FAFC] py-20 lg:py-32 px-6 overflow-hidden selection:bg-[#0B5C8A] selection:text-white">

            {/* --- BACKGROUND GRAPHICS --- */}
            {/* Subtle Dotted Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${COLORS.primary} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            {/* Abstract Map of Thrissur (Floating) */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 -left-20 opacity-[0.04] pointer-events-none text-[#0B5C8A]"
            >
                <Map size={800} strokeWidth={0.5} />
            </motion.div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 relative z-10">

                {/* --- LEFT COLUMN: DIRECT CONTACT --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: APPLE_EASE }}
                >
                    <header className="mb-12">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-[#0B5C8A]/10 text-[#0B5C8A] font-mono text-xs font-bold uppercase mb-6"
                        >
                            Elite NRI Concierge
                        </motion.span>
                        <h2 className="text-[#0B5C8A] text-5xl md:text-7xl font-black tracking-tighter leading-none font-[Plus Jakarta Sans]">
                            LET’S TALK ABOUT YOUR <span className="text-[#D33C29]">LAND LEGACY.</span>
                        </h2>
                        <p className="text-[#0B5C8A]/70 text-lg md:text-xl mt-8 max-w-lg font-light leading-relaxed">
                            Our team is here to assist you with bespoke queries, private site visits, or legal documentation for your next major investment.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {/* Call Card */}
                        <motion.div
                            whileHover={{ y: -5, borderColor: '#D33C29' }}
                            className="group p-8 bg-white border border-[#0B5C8A]/10 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-[#0B5C8A]/5"
                        >
                            <div className="bg-[#0B5C8A] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#0B5C8A]/20 transition-transform group-hover:scale-110">
                                <Phone size={24} className="text-white" />
                            </div>
                            <h3 className="text-[#0B5C8A]/50 font-mono text-xs uppercase tracking-widest mb-1">Direct Connect</h3>
                            <p className="text-[#0B5C8A] text-2xl font-black mb-6 tracking-tight">+91 94460 00000</p>
                            <a href="tel:+919446000000" className="inline-flex items-center gap-2 bg-[#0B5C8A] text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-[#D33C29] transition-colors">
                                Call Now <ArrowRight size={16} />
                            </a>
                        </motion.div>

                        {/* Email Card */}
                        <motion.div
                            whileHover={{ y: -5, borderColor: '#D33C29' }}
                            className="group p-8 bg-white border border-[#0B5C8A]/10 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-[#0B5C8A]/5"
                        >
                            <div className="bg-[#0B5C8A] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#0B5C8A]/20 transition-transform group-hover:scale-110">
                                <Mail size={24} className="text-white" />
                            </div>
                            <h3 className="text-[#0B5C8A]/50 font-mono text-xs uppercase tracking-widest mb-1">Inquiry Desk</h3>
                            <p className="text-[#0B5C8A] text-2xl font-black mb-6 tracking-tight">invest@thrissur.com</p>
                            <a href="mailto:invest@thrissur.com" className="inline-flex items-center gap-2 bg-[#0B5C8A] text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-[#D33C29] transition-colors">
                                Email Us <ArrowRight size={16} />
                            </a>
                        </motion.div>
                    </div>

                    <div className="flex flex-wrap items-center gap-10 opacity-70">
                        <div className="flex items-center gap-3 text-[#0B5C8A]">
                            <Clock size={20} className="text-[#D33C29]" />
                            <span className="text-sm font-bold uppercase tracking-widest">Global Support 24/7</span>
                        </div>
                        <button className="flex items-center gap-3 text-[#0B5C8A] hover:text-[#D33C29] transition-colors group">
                            <MessageCircle size={20} className="text-[#D33C29]" />
                            <span className="text-sm font-bold uppercase tracking-widest">+91 94460 00001</span>
                        </button>
                    </div>
                </motion.div>

                {/* --- RIGHT COLUMN: PREMIUM FORM CARD --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: APPLE_EASE }}
                >
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(11,92,138,0.12)] border border-[#0B5C8A]/5">
                        <AnimatePresence mode="wait">
                            {formState === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-16 text-center"
                                >
                                    <div className="w-24 h-24 bg-[#D33C29]/10 rounded-full flex items-center justify-center mb-8 mx-auto">
                                        <CheckCircle2 size={48} className="text-[#D33C29]" />
                                    </div>
                                    <h3 className="text-[#0B5C8A] text-3xl font-black mb-4">Connection Secured</h3>
                                    <p className="text-[#0B5C8A]/60 font-light">An investment principal will contact you shortly to discuss your land legacy.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-5">
                                        {[
                                            { label: 'Full Name', type: 'text', placeholder: 'e.g. John Doe' },
                                            { label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                                            { label: 'Phone Number', type: 'tel', placeholder: '+91 00000 00000' }
                                        ].map((field, idx) => (
                                            <div key={idx} className="space-y-2">
                                                <label className="block text-xs uppercase tracking-widest text-[#0B5C8A] font-bold ml-1">
                                                    {field.label}
                                                </label>
                                                <input
                                                    required
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    className="w-full bg-[#0B5C8A]/[0.02] border-2 border-[#0B5C8A]/10 rounded-xl px-5 py-3.5 text-base text-[#0B5C8A] font-bold outline-none focus:border-[#0B5C8A]/40 focus:bg-transparent transition-all placeholder:text-[#0B5C8A]/50 placeholder:font-medium"
                                                />
                                            </div>
                                        ))}

                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest text-[#0B5C8A] font-bold ml-1">
                                                Message / Requirements
                                            </label>
                                            <textarea
                                                placeholder="Discuss your investment goals..."
                                                rows={3}
                                                className="w-full bg-[#0B5C8A]/[0.02] border-2 border-[#0B5C8A]/10 rounded-xl px-5 py-3.5 text-base text-[#0B5C8A] font-bold outline-none focus:border-[#0B5C8A]/40 focus:bg-transparent transition-all resize-none placeholder:text-[#0B5C8A]/50 placeholder:font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 py-2 pt-2">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                id="site-visit"
                                                onChange={(e) => setIsVisitRequested(e.target.checked)}
                                                className="peer hidden"
                                            />
                                            <div className="w-6 h-6 border-2 border-[#0B5C8A]/20 rounded-lg bg-white peer-checked:bg-[#0B5C8A] peer-checked:border-[#0B5C8A] transition-all cursor-pointer flex items-center justify-center">
                                                <CheckCircle2 size={14} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                            </div>
                                            <label htmlFor="site-visit" className="absolute inset-0 cursor-pointer" />
                                        </div>
                                        <label htmlFor="site-visit" className="text-[#0B5C8A] text-base font-bold cursor-pointer select-none">I am interested in a physical site visit</label>
                                    </div>

                                    <AnimatePresence>
                                        {isVisitRequested && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="space-y-2 pb-2">
                                                    <label className="block text-xs uppercase tracking-widest text-[#0B5C8A] font-bold ml-1">
                                                        Preferred Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="w-full bg-[#0B5C8A]/[0.02] border-2 border-[#0B5C8A]/10 rounded-xl px-5 py-3.5 text-base text-[#0B5C8A] font-bold outline-none focus:border-[#0B5C8A]/40 focus:bg-transparent transition-all mb-4 placeholder:text-[#0B5C8A]/50"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <MagneticButton
                                        type="submit"
                                        className="w-full bg-[#D33C29] text-white py-5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-[#D33C29]/30 transition-all active:scale-[0.98]"
                                    >
                                        {formState === 'loading' ? (
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full" />
                                        ) : (
                                            <>Initialize Consultation <Send size={18} /></>
                                        )}
                                    </MagneticButton>
                                </form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}