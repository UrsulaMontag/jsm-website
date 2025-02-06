'use client';

import {useEffect, useRef, useState, useCallback} from 'react';

const useAnimationFrame = (callback: (delta: number) => void) => {
    const frameRef = useRef<number>(0);
    const lastTime = useRef<number>(Date.now());

    const animate = useCallback(() => {
        const now = Date.now();
        const delta = now - lastTime.current;
        callback(delta);
        lastTime.current = now;
        frameRef.current = requestAnimationFrame(animate);
    }, [callback]);

    useEffect(() => {
        frameRef.current = requestAnimationFrame(animate);
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [animate]);
};

const SunsetFloatingOrbs = () => {
    const [isClient, setIsClient] = useState(false);
    const orbsRef = useRef<HTMLElement[]>([]);
    const positions = useRef<Array<{ top: string; left: string }>>([]);

    // Initialize random positions once on client mount
    useEffect(() => {
        setIsClient(true);
        positions.current = Array.from({length: 10}, () => ({
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`
        }));
    }, []);

    useAnimationFrame(() => {
        orbsRef.current.forEach((orb, index) => {
            const speed = 0.5 + index * 0.1;
            const x = Math.sin(Date.now() * 0.001 * speed) * 100;
            const y = Math.cos(Date.now() * 0.001 * speed) * 100;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    if (!isClient) return null;

    return (
        <div
            className="fixed inset-0 overflow-hidden z-0"
            data-testid="sunset-orbs-container"
        >
            {positions.current.map((pos, index) => (
                <div
                    key={index}
                    ref={(el: HTMLDivElement | null) => {
                        if (el) {
                            orbsRef.current[index] = el;
                        } else {
                            // Cleanup when element unmounts
                            delete orbsRef.current[index];
                        }
                    }}
                    className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-sunset-orange to-amber-glow opacity-30 blur-lg"
                    style={{
                        top: `${Math.random() * 100}vh`,
                        left: `${Math.random() * 100}vw`,
                        animation: `float ${10 + index * 2}s infinite ease-in-out`,
                    }}
                    data-testid="sunset-orb"
                />
            ))}
        </div>
    );
};

export default SunsetFloatingOrbs;