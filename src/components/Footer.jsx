'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, MapPin, Phone, Mail, Instagram, Linkedin } from 'lucide-react';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

export default function Footer() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    // Subtle parallax effect for the massive background text
    const textY = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

    return (
        <footer ref={containerRef} className="relative bg-[#061E2D] pt-16 pb-6 overflow-hidden selection:bg-[#D33C29] selection:text-[#FFFFFF] border-t border-[#FFFFFF]/5">

            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0B5C8A]/20 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24 w-full relative z-10">

                {/* TOP SECTION: The Final Call */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-12 lg:mb-16 border-b border-[#FFFFFF]/10 pb-10">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-[2px] bg-[#D33C29]" />
                            <span className="text-[#FFFFFF]/60 font-body text-xs font-bold uppercase tracking-[0.3em]">The Final Step</span>
                        </div>
                        <h2 className="text-[#FFFFFF] text-4xl md:text-5xl lg:text-[4.5rem] font-black font-display tracking-tighter leading-[0.9]">
                            Initiate <br />
                            <span className="text-[#0B5C8A] brightness-150">Your Legacy.</span>
                        </h2>
                    </div>

                    <motion.button
                        whileHover={{ scale: 0.95 }}
                        whileTap={{ scale: 0.9 }}
                        className="group flex items-center justify-between w-full md:w-[350px] bg-[#FFFFFF]/5 backdrop-blur-md border border-[#FFFFFF]/20 p-2 pl-8 rounded-full hover:bg-[#FFFFFF]/10 transition-colors"
                    >
                        <span className="text-[#FFFFFF] font-body font-bold text-sm uppercase tracking-[0.2em]">Request Callback</span>
                        <div className="w-14 h-14 rounded-full bg-[#D33C29] flex items-center justify-center text-[#FFFFFF] shadow-[0_10px_20px_rgba(211,60,41,0.3)] group-hover:bg-[#b02e1e] transition-colors">
                            <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                    </motion.button>
                </div>

                {/* MIDDLE SECTION: The Ledger Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand & Address */}
                    <div className="lg:col-span-4 flex flex-col gap-8 pr-0 lg:pr-12">
                        <div className="flex items-start gap-4 text-[#FFFFFF]/70 hover:text-[#FFFFFF] transition-colors cursor-pointer group">
                            <MapPin size={20} className="text-[#D33C29] shrink-0 mt-1" />
                            <div>
                                <p className="font-display font-bold text-lg text-[#FFFFFF] mb-2">Thrissur HQ</p>
                                <p className="font-body text-sm font-light leading-relaxed">Level 4, The Apex Building,<br />Swaraj Round, Thrissur,<br />Kerala 680001</p>
                            </div>
                        </div>
                    </div>

                    {/* Direct Contacts */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <p className="text-[#FFFFFF]/40 font-body text-[10px] uppercase font-bold tracking-[0.3em] mb-2">Private Concierge</p>
                        <a href="tel:+919446000000" className="flex items-center gap-4 text-[#FFFFFF]/80 hover:text-[#D33C29] transition-colors group w-max">
                            <Phone size={16} className="text-[#0B5C8A] group-hover:text-[#D33C29] transition-colors" />
                            <span className="font-display text-xl tracking-wider">+91 94460 00000</span>
                        </a>
                        <a href="mailto:invest@thrissurplots.com" className="flex items-center gap-4 text-[#FFFFFF]/80 hover:text-[#D33C29] transition-colors group w-max">
                            <Mail size={16} className="text-[#0B5C8A] group-hover:text-[#D33C29] transition-colors" />
                            <span className="font-body font-light text-lg">invest@thrissurplots.com</span>
                        </a>
                    </div>

                    {/* Navigation & Legal */}
                    <div className="lg:col-span-4 flex flex-col md:flex-row gap-16 md:gap-24">
                        <div className="flex flex-col gap-4">
                            <p className="text-[#FFFFFF]/40 font-body text-[10px] uppercase font-bold tracking-[0.3em] mb-2">Index</p>
                            {['Portfolio', 'Heritage', 'Legal', 'Concierge'].map((link) => (
                                <a key={link} href="#" className="text-[#FFFFFF]/70 hover:text-[#FFFFFF] font-body text-sm relative w-max group">
                                    {link}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D33C29] group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                </a>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-[#FFFFFF]/40 font-body text-[10px] uppercase font-bold tracking-[0.3em] mb-2">Social</p>
                            {['LinkedIn', 'Instagram', 'Twitter'].map((platform) => (
                                <a key={platform} href="#" className="text-[#FFFFFF]/70 hover:text-[#FFFFFF] font-body text-sm relative w-max group flex items-center gap-2">
                                    {platform}
                                    <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-[#D33C29]" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: Massive Typography Graphic */}
                <div className="w-full overflow-hidden flex items-center justify-center relative pointer-events-none mt-12 lg:mt-0">
                    <motion.h1
                        style={{ y: textY }}
                        className="text-[10vw] leading-[0.75] font-black font-display tracking-tighter text-[#FFFFFF]/5 uppercase whitespace-nowrap"
                    >
                        Thrissur Plots
                    </motion.h1>
                </div>

                {/* Legal Bar */}
                <div className="flex flex-col md:flex-row justify-between w-full items-center gap-6 text-[#FFFFFF]/30 font-body text-[10px] uppercase font-bold tracking-[0.2em] border-t border-[#FFFFFF]/10 pt-8 pb-4 relative z-20">
                    <span>© {new Date().getFullYear()} THRISSUR PLOTS. ALL RIGHTS RESERVED.</span>
                    <div className="flex items-center gap-4 group cursor-pointer hover:text-[#FFFFFF] transition-colors">
                        <span>ENGINEERED WITH PRECISION</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D33C29] group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(211,60,41,0.8)] transition-all" />
                    </div>
                </div>
            </div>
        </footer>
    );
}