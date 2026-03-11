'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FadeUp({ children, delay = 0, y = 50, duration = 0.8 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: y }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: y }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.16, 1, 0.3, 1]
            }}
        >
            {children}
        </motion.div>
    );
}
