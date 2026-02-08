'use client';

import { useState, useEffect, useCallback } from 'react';
import { VALENTINE_DAYS, type NamePair } from '@/utils/encoding';

interface RoseDayWishProps {
    day: (typeof VALENTINE_DAYS)[number];
    names: NamePair;
    quotes: string[];
}

export default function RoseDayWish({ day, names, quotes }: RoseDayWishProps) {
    const [bloomedRoses, setBloomedRoses] = useState<number[]>([]);
    const [showLetter, setShowLetter] = useState(false);
    const [petals, setPetals] = useState<{ id: number; left: number; delay: number }[]>([]);
    const [mounted, setMounted] = useState(false);

    const totalRoses = 9;

    useEffect(() => {
        setMounted(true);

        // Auto-bloom roses one by one
        const intervals: NodeJS.Timeout[] = [];
        for (let i = 0; i < totalRoses; i++) {
            intervals.push(
                setTimeout(() => {
                    setBloomedRoses(prev => [...prev, i]);
                }, 800 + i * 600)
            );
        }

        return () => intervals.forEach(clearTimeout);
    }, []);

    const handleRoseClick = useCallback((index: number) => {
        if (!bloomedRoses.includes(index)) {
            setBloomedRoses(prev => [...prev, index]);
        }

        // Create petals when clicking
        const newPetals = Array.from({ length: 5 }, (_, i) => ({
            id: Date.now() + i,
            left: 30 + Math.random() * 40,
            delay: Math.random() * 0.5,
        }));
        setPetals(prev => [...prev, ...newPetals]);
        setTimeout(() => setPetals([]), 3000);
    }, [bloomedRoses]);

    const allBloomed = bloomedRoses.length >= totalRoses;

    // Floating roses background
    const getFloatingRoses = () => {
        if (!mounted) return null;
        return Array.from({ length: 15 }, (_, i) => (
            <span
                key={i}
                className="floating-element"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${4 + Math.random() * 4}s`,
                    fontSize: `${1.5 + Math.random() * 2}rem`,
                }}
            >
                🌹
            </span>
        ));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Floating Roses */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {getFloatingRoses()}
            </div>

            {/* Falling Petals */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
                {petals.map((petal) => (
                    <span
                        key={petal.id}
                        className="absolute text-2xl"
                        style={{
                            left: `${petal.left}%`,
                            top: '-10%',
                            animation: `fall 3s ease-in-out forwards`,
                            animationDelay: `${petal.delay}s`,
                        }}
                    >
                        🌸
                    </span>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-3xl mx-auto animate-fadeIn">
                <div className="glass-card p-6 md:p-10">
                    {/* Header */}
                    <div className="text-6xl md:text-7xl mb-4 animate-heartbeat">🌹</div>

                    <h1
                        className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 bg-clip-text text-transparent"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Happy Rose Day
                    </h1>

                    <p
                        className="text-xl text-pink-600 mb-6"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Dear {names.to}
                    </p>

                    {/* Rose Garden */}
                    <div className="mb-6">
                        <p className="text-pink-600 mb-4 text-sm">
                            Watch your garden bloom with love... 🌹
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-md mx-auto">
                            {Array.from({ length: totalRoses }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleRoseClick(i)}
                                    className={`
                    text-4xl md:text-5xl transition-all duration-500 transform
                    ${bloomedRoses.includes(i)
                                            ? 'scale-100 opacity-100'
                                            : 'scale-50 opacity-30 grayscale'
                                        }
                    hover:scale-110 cursor-pointer
                  `}
                                    disabled={bloomedRoses.includes(i)}
                                >
                                    🌹
                                </button>
                            ))}
                        </div>

                        <p className="text-pink-500 text-xs mt-3 italic">
                            {allBloomed
                                ? '✨ Your garden is in full bloom!'
                                : `${bloomedRoses.length}/${totalRoses} roses bloomed... Click to help them grow!`
                            }
                        </p>
                    </div>

                    {/* Message reveals after all roses bloom */}
                    {allBloomed && !showLetter && (
                        <div className="animate-fadeIn">
                            <button
                                onClick={() => setShowLetter(true)}
                                className="romantic-btn px-8 py-4 mt-4"
                            >
                                Open Your Rose-Sealed Letter 🌹💌
                            </button>
                        </div>
                    )}

                    {/* Letter */}
                    {showLetter && (
                        <div className="animate-fadeIn mt-6 glass-card p-6 bg-white/50">
                            <div className="text-3xl mb-3 opacity-40">❝</div>
                            <p
                                className="text-lg md:text-xl text-pink-700 italic leading-relaxed mb-4"
                                style={{ fontFamily: "'Dancing Script', cursive" }}
                            >
                                {quotes[0] || "A single rose can be my garden, a single friend, my world."}
                            </p>
                            <p
                                className="text-lg md:text-xl text-pink-700 italic leading-relaxed"
                                style={{ fontFamily: "'Dancing Script', cursive" }}
                            >
                                {quotes[1] || "Like a rose, you bring beauty and fragrance to my life."}
                            </p>
                            <div className="text-3xl mt-3 opacity-40 text-right">❞</div>

                            <div className="mt-4 pt-4 border-t border-pink-200">
                                <p className="text-pink-600/80">With all my love,</p>
                                <p
                                    className="text-xl text-pink-700 font-medium"
                                    style={{ fontFamily: "'Dancing Script', cursive" }}
                                >
                                    {names.from} 🌹
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Falling animation CSS */}
            <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}
