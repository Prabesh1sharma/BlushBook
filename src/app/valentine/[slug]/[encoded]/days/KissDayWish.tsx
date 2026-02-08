'use client';

import { useState, useEffect } from 'react';
import { VALENTINE_DAYS, type NamePair } from '@/utils/encoding';

interface KissDayWishProps {
    day: (typeof VALENTINE_DAYS)[number];
    names: NamePair;
    quotes: string[];
}

export default function KissDayWish({ day, names, quotes }: KissDayWishProps) {
    const [phase, setPhase] = useState<'envelope' | 'sealed' | 'opened'>('envelope');
    const [kisses, setKisses] = useState<{ id: number; x: number; y: number }[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSeal = () => {
        // Create kiss mark animation at center
        const newKisses = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            x: 40 + Math.random() * 20,
            y: 40 + Math.random() * 20,
        }));
        setKisses(newKisses);
        setPhase('sealed');

        setTimeout(() => setKisses([]), 2000);
    };

    const handleOpen = () => {
        setPhase('opened');

        // Create floating kisses
        const newKisses = Array.from({ length: 15 }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 100,
            y: Math.random() * 100,
        }));
        setKisses(newKisses);

        setTimeout(() => setKisses([]), 4000);
    };

    // Floating elements background
    const getFloatingElements = () => {
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
                {['💋', '💕', '💖', '✨', '❤️'][Math.floor(Math.random() * 5)]}
            </span>
        ));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Floating Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {getFloatingElements()}
            </div>

            {/* Flying Kisses */}
            {kisses.map((kiss) => (
                <span
                    key={kiss.id}
                    className="fixed text-3xl pointer-events-none z-30 animate-pulse"
                    style={{
                        left: `${kiss.x}%`,
                        top: `${kiss.y}%`,
                        animation: 'floatUp 2s ease-out forwards',
                    }}
                >
                    💋
                </span>
            ))}

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-2xl mx-auto animate-fadeIn">
                <div className="glass-card p-6 md:p-10">
                    {/* Header */}
                    <div className="text-6xl md:text-7xl mb-4 animate-heartbeat">💋</div>

                    <h1
                        className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 bg-clip-text text-transparent"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Happy Kiss Day
                    </h1>

                    <p
                        className="text-xl text-pink-600 mb-6"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Dear {names.to}
                    </p>

                    {phase === 'envelope' && (
                        /* Envelope waiting to be sealed */
                        <div className="animate-fadeIn">
                            <div className="relative inline-block">
                                {/* Envelope */}
                                <div className="text-9xl mb-4">✉️</div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl opacity-50">
                                    💕
                                </div>
                            </div>
                            <p className="text-pink-600 mb-4">
                                A love letter is ready for you...
                            </p>
                            <button
                                onClick={handleSeal}
                                className="romantic-btn px-8 py-4"
                            >
                                Seal it with a Kiss 💋
                            </button>
                        </div>
                    )}

                    {phase === 'sealed' && (
                        /* Sealed Letter */
                        <div className="animate-fadeIn">
                            <div className="relative inline-block">
                                {/* Envelope with kiss seal */}
                                <div className="text-9xl mb-4">💌</div>
                                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center shadow-lg animate-pulse">
                                        <span className="text-2xl">💋</span>
                                    </div>
                                </div>
                            </div>
                            <p
                                className="text-xl text-pink-700 mb-4"
                                style={{ fontFamily: "'Dancing Script', cursive" }}
                            >
                                ✨ Sealed with a kiss! ✨
                            </p>
                            <button
                                onClick={handleOpen}
                                className="romantic-btn px-8 py-4 animate-pulse-glow"
                            >
                                Open Your Love Letter 💕
                            </button>
                        </div>
                    )}

                    {phase === 'opened' && (
                        /* Opened Letter Content */
                        <div className="animate-fadeIn">
                            {/* Letter Content */}
                            <div className="glass-card p-6 md:p-8 bg-white/60 mb-6">
                                <div className="text-5xl mb-4">💋</div>

                                <p
                                    className="text-xl text-pink-600 mb-4"
                                    style={{ fontFamily: "'Dancing Script', cursive" }}
                                >
                                    To My Dearest {names.to},
                                </p>

                                <div className="space-y-4 mb-6">
                                    <div className="text-2xl opacity-40">❝</div>
                                    {quotes.slice(0, 2).map((quote, index) => (
                                        <p
                                            key={index}
                                            className="text-lg md:text-xl text-pink-700 italic leading-relaxed"
                                            style={{ fontFamily: "'Dancing Script', cursive" }}
                                        >
                                            {quote}
                                        </p>
                                    ))}
                                    {quotes.length === 0 && (
                                        <>
                                            <p
                                                className="text-lg md:text-xl text-pink-700 italic leading-relaxed"
                                                style={{ fontFamily: "'Dancing Script', cursive" }}
                                            >
                                                A kiss is a lovely trick designed by nature to stop speech when words become superfluous.
                                            </p>
                                            <p
                                                className="text-lg md:text-xl text-pink-700 italic leading-relaxed"
                                                style={{ fontFamily: "'Dancing Script', cursive" }}
                                            >
                                                Your kiss is the poetry my heart has been waiting to read.
                                            </p>
                                        </>
                                    )}
                                    <div className="text-2xl opacity-40 text-right">❞</div>
                                </div>

                                {/* Signature */}
                                <div className="mt-4 pt-4 border-t border-pink-200">
                                    <p className="text-pink-600/80">Sealed with all my love,</p>
                                    <p
                                        className="text-2xl text-pink-700 font-medium"
                                        style={{ fontFamily: "'Dancing Script', cursive" }}
                                    >
                                        {names.from}
                                    </p>
                                    <div className="text-3xl mt-2">💋💕💋</div>
                                </div>
                            </div>

                            {/* Music Notes floating (visual only) */}
                            <div className="flex justify-center gap-4 text-3xl opacity-40">
                                <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎵</span>
                                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💕</span>
                                <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎶</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* CSS for floating animation */}
            <style jsx>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
          }
        }
      `}</style>
        </div>
    );
}
