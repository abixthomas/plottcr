'use client';

import Header from "@/components/Header";
import AboutPage from '@/components/AboutPage';
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";

export default function About() {
    return (
        <SmoothScroll>
            <main className="relative bg-white min-h-screen">
                <Header />
                <AboutPage />
                <Footer />

                {/* Global Film Grain Overlay for Cinematic Texture */}
                <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] grayscale contrast-150 mix-blend-overlay">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noise)" />
                    </svg>
                </div>
            </main>
        </SmoothScroll>
    );
}
