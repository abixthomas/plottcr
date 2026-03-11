'use client';

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedPlots from "@/components/home/FeaturedPlots";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import BlogHighlights from "@/components/home/BlogHighlights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative bg-surface min-h-screen">
        <Header />

        {/* SEC 01: HERO (GRAND ENTRANCE) */}
        <Hero />

        {/* SEC 02: FEATURED PLOTS (SPATIAL BLUEPRINT CAROUSEL) */}
        <FeaturedPlots />

        {/* SEC 04: WHY CHOOSE US (SPLIT-FOCUS LEDGER) */}
        <WhyChooseUs />

        {/* SEC 05: BLOG HIGHLIGHTS (EDITORIAL CLARITY) */}
        <BlogHighlights />

        {/* SEC 06: STATS (EMPIRICAL CONSTELLATION) */}
        <Testimonials />

        {/* SEC 07: CONNECT WITH US (CONTACT & MAP) */}
        <Contact />

        {/* GLOBAL FOOTER (SECURE CONCIERGE) */}
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
