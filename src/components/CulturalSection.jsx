'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FadeUp from './animations/FadeUp';

export default function CulturalSection() {
    return (
        <section className="relative py-spacing-section px-8 overflow-hidden bg-surface">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                {/* Text Column (45%) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <FadeUp>
                        <h2 className="font-serif text-4xl md:text-6xl font-medium text-primary leading-tight">
                            Experience the Soul of <br />
                            <span className="relative inline-block mt-2">
                                Thrissur
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute -bottom-2 left-0 h-1 bg-accent"
                                />
                            </span>
                        </h2>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <p className="font-sans text-lg text-primary/80 leading-relaxed font-light mt-4">
                            Thrissur is not just a location; it's a living legacy. Known as the Cultural Capital of Kerala, it's a land where heritage breathes in every corner—from the rhythmic echoes of the Thrissur Pooram to the timeless architecture of ancient temples.
                        </p>
                    </FadeUp>

                    <FadeUp delay={0.3}>
                        <p className="font-sans text-lg text-primary/80 leading-relaxed font-light">
                            Investing here means securing a piece of this vibrancy. Whether for a peaceful residence or a strategic commercial asset, our plots put you at the heart of Kerala's most trusted cultural hub.
                        </p>
                    </FadeUp>

                    {/* Decorative Cultural Element */}
                    <FadeUp delay={0.5} y={10}>
                        <div className="flex items-center gap-4 mt-8">
                            <div className="w-12 h-px bg-accent" />
                            <span className="font-serif italic text-accent text-xl tracking-wide">Legacy in every grain of soil</span>
                        </div>
                    </FadeUp>
                </div>

                {/* Video Column (55%) */}
                <div className="lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotateY: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl shadow-primary/20 group"
                    >
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-green-forest-4433-large.mp4"
                        />
                        {/* Soft Overlay */}
                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-50" />

                        {/* Artistic Frame Decor */}
                        <div className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-accent rounded-tr-[40px] pointer-events-none" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 border-b-2 border-l-2 border-accent rounded-bl-[40px] pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
