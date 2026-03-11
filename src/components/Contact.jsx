'use client';

import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

const InputField = ({ label, type = "text", placeholder, id, isTextarea = false }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value.length > 0);
    };

    return (
        <div className="relative w-full group pt-6" suppressHydrationWarning>
            <label
                htmlFor={id}
                className={`absolute left-0 transition-all duration-300 font-mono tracking-widest uppercase pointer-events-none
                           ${isFocused || hasValue
                        ? '-top-1 text-[10px] text-[#D33C29]'
                        : 'top-6 text-xs text-white/60'}`}
            >
                {label}
            </label>

            {isTextarea ? (
                <textarea
                    id={id}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    onChange={(e) => setHasValue(e.target.value.length > 0)}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none resize-none transition-colors duration-300 h-24"
                    style={{
                        borderBottomColor: isFocused ? '#D33C29' : 'rgba(255,255,255,0.2)'
                    }}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    onChange={(e) => setHasValue(e.target.value.length > 0)}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none transition-colors duration-300"
                    style={{
                        borderBottomColor: isFocused ? '#D33C29' : 'rgba(255,255,255,0.2)'
                    }}
                />
            )}

            {/* Animated Bottom Line */}
            <div
                className={`absolute bottom-0 left-0 h-[1px] bg-[#D33C29] transition-all duration-500 ease-out`}
                style={{ width: isFocused ? '100%' : '0%' }}
            />
        </div>
    );
};

export default function Contact() {
    return (
        <section className="relative py-24 md:py-32 bg-[#0B5C8A] overflow-hidden border-t border-white/10 selection:bg-white selection:text-[#0B5C8A]">
            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] grayscale mix-blend-overlay z-10">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

                    {/* Left: Private Form */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-12">
                            <span className="inline-flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-[#D33C29] uppercase mb-6">
                                <span className="w-8 h-[1px] bg-[#D33C29]" />
                                VIP Concierge
                            </span>

                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                                Initiate your <br />
                                <span className="text-white/60 italic font-light">Dialogue.</span>
                            </h2>
                        </div>

                        <form className="flex flex-col gap-8 max-w-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField id="name" label="Full Name" />
                                <InputField id="phone" label="Contact Number" />
                            </div>

                            <InputField id="email" type="email" label="Email Address" />

                            <InputField
                                id="interest"
                                label="Investment Interest (e.g. Commercial, Residential)"
                            />

                            <InputField
                                id="message"
                                label="Additional Requirements"
                                isTextarea={true}
                            />

                            <button type="button" className="group mt-8 relative w-full sm:w-auto self-start overflow-hidden bg-white px-10 py-5 rounded-none flex items-center justify-center gap-4 transition-all duration-500 hover:text-white">
                                {/* Button Hover Background */}
                                <div className="absolute inset-0 w-full h-full bg-[#D33C29] -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]" />

                                <span className="relative z-10 font-mono text-xs tracking-[0.2em] text-[#061E2D] group-hover:text-white transition-colors duration-300 font-bold uppercase">
                                    Submit Inquiry
                                </span>
                                <Send size={14} className="relative z-10 text-[#061E2D] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                            </button>
                        </form>
                    </div>

                    {/* Right: Companion Imagery / Details */}
                    <div className="relative h-[500px] lg:h-auto lg:min-h-[700px] flex flex-col justify-end p-8 md:p-10 overflow-hidden group rounded-2xl">
                        {/* Image Background */}
                        <div className="absolute inset-0 overflow-hidden bg-[#061E2D]">
                            <img
                                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1500&auto=format&fit=crop"
                                alt="Thrissur Real Estate"
                                className="w-full h-full object-cover object-center grayscale opacity-60 group-hover:opacity-80 transition-opacity duration-1000 ease-out"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#061E2D] via-[#061E2D]/40 to-transparent" />
                        </div>

                        {/* Contact Details Hovering over Image */}
                        <div className="relative z-10 flex flex-col gap-10 bg-[#07131C] p-8 md:p-12 border border-white/5 mt-auto shadow-2xl">
                            <div>
                                <h3 className="font-sans text-[28px] font-medium tracking-tight text-white mb-8">Corporate Headquarters</h3>
                                <div className="flex items-start gap-5 text-[#8B9DAA] hover:text-white transition-colors cursor-pointer group/link">
                                    <MapPin size={22} className="text-[#D33C29] mt-0.5 shrink-0" strokeWidth={1.5} />
                                    <p className="font-sans font-light leading-relaxed text-[17px]">
                                        Thrissur Villas Palace,<br />
                                        SH-69, Near Vadakkumnathan,<br />
                                        Thrissur, Kerala 680001
                                    </p>
                                    <ArrowUpRight size={18} className="text-white/20 group-hover/link:text-white group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-all ml-auto" strokeWidth={1.5} />
                                </div>
                            </div>

                            <div className="w-full h-px bg-white/5" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-4">
                                    <span className="font-mono text-[10px] tracking-[0.2em] font-bold text-[#D33C29] uppercase">Direct Line</span>
                                    <a href="tel:+919446000000" className="flex items-start gap-3.5 text-lg text-white font-medium hover:text-[#D33C29] transition-colors group">
                                        <Phone size={18} strokeWidth={1.5} className="mt-0.5 text-white/50 group-hover:text-[#D33C29] transition-colors" />
                                        +91 94460 00000
                                    </a>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <span className="font-mono text-[10px] tracking-[0.2em] font-bold text-[#D33C29] uppercase">Digital Desk</span>
                                    <a href="mailto:concierge@thrissur.com" className="flex items-start gap-3.5 text-lg text-white font-medium hover:text-[#D33C29] transition-colors group break-all">
                                        <Mail size={18} strokeWidth={1.5} className="mt-0.5 text-white/50 group-hover:text-[#D33C29] transition-colors shrink-0" />
                                        concierge@thriss<br className="hidden xl:block" />ur.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
