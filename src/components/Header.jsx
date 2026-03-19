'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header({ forceDark = false }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Heritage', href: '#' },
        { name: 'Plots', href: '/plots' },
        { name: 'About', href: '/about' },
        { name: 'Portfolio', href: '#' },
        { name: 'Investment', href: '#' },
        { name: 'Contact', href: '#' },
    ];

    const isDarkText = isScrolled || forceDark;

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 px-8 py-6 md:px-12 ${isScrolled ? 'py-4 bg-surface/80 backdrop-blur-xl border-b border-primary/5' : 'py-8'
                }`}
        >
            <div className="max-w-[1400px] mx-auto flex justify-between items-center">
                {/* LOGO */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-500">
                        <span className="font-serif font-bold text-surface text-xl">T</span>
                    </div>
                    <span className={`font-serif text-2xl font-bold tracking-tighter transition-colors duration-500 ${isDarkText ? 'text-primary' : 'text-white'}`}>
                        THRISSUR <span className="text-accent">PLOTS</span>
                    </span>
                </motion.div>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-12">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`font-sans text-[12px] uppercase tracking-[0.15em] font-semibold transition-colors duration-500 relative group ${isDarkText ? 'text-primary/70 hover:text-primary' : 'text-white/80 hover:text-white'
                                }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-2 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isDarkText ? 'bg-primary' : 'bg-white'
                                }`} />
                        </motion.a>
                    ))}

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-primary text-surface px-8 py-3 rounded-full font-sans text-[11px] uppercase tracking-[0.1em] font-bold hover:bg-accent transition-all duration-500 shadow-lg shadow-primary/10"
                    >
                        Concierge
                    </motion.button>
                </div>

                {/* MOBILE MENU TOGGLE */}
                <button
                    className={`md:hidden p-2 transition-colors duration-500 ${isDarkText ? 'text-primary' : 'text-white'}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 bg-surface z-50 flex flex-col items-center justify-center gap-8 md:hidden overflow-hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="font-serif text-4xl font-medium text-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <button className="bg-accent text-surface px-12 py-4 rounded-full font-sans font-bold mt-4">
                            Get in Touch
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
