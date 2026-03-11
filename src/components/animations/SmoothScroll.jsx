'use client';

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }) {
    return (
        <ReactLenis
            root
            options={{
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                orientation: 'vertical',
                gestureOrientation: 'vertical',
            }}
        >
            {children}
        </ReactLenis>
    );
}
