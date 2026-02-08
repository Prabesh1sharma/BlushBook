'use client';

import { useState, useEffect } from 'react';
import { VALENTINE_DAYS, type NamePair } from '@/utils/encoding';

interface ChocolateDayWishProps {
    day: (typeof VALENTINE_DAYS)[number];
    names: NamePair;
    quotes: string[];
}

const CHOCOLATES = [
    { emoji: '🍫', shape: 'bar', message: "You make life sweeter!" },
    { emoji: '🍬', shape: 'candy', message: "Sweet like candy, that's you!" },
    { emoji: '🧁', shape: 'cupcake', message: "A treat just for you!" },
    { emoji: '🍩', shape: 'donut', message: "Our love is infinite!" },
    { emoji: '🍪', shape: 'cookie', message: "You're one smart cookie!" },
    { emoji: '🎂', shape: 'cake', message: "Celebrating our sweetness!" },
];

export default function ChocolateDayWish({ day, names, quotes }: ChocolateDayWishProps) {
    const [boxOpen, setBoxOpen] = useState(false);
    const [unwrappedChocolates, setUnwrappedChocolates] = useState<number[]>([]);
    const [currentMessage, setCurrentMessage] = useState<string | null>(null);
    const [showFinalLetter, setShowFinalLetter] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleUnwrap = (index: number) => {
        if (unwrappedChocolates.includes(index)) return;

        setUnwrappedChocolates(prev => [...prev, index]);
        setCurrentMessage(CHOCOLATES[index].message);

        setTimeout(() => setCurrentMessage(null), 2000);
    };

    const allUnwrapped = unwrappedChocolates.length >= CHOCOLATES.length;

    // Floating chocolates background
    const getFloatingChocolates = () => {
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
                {['🍫', '🍬', '🧁', '🍩', '🍪'][Math.floor(Math.random() * 5)]}
            </span>
        ));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Floating Chocolates */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {getFloatingChocolates()}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-2xl mx-auto animate-fadeIn">
                <div className="glass-card p-6 md:p-10">
                    {/* Header */}
                    <div className="text-6xl md:text-7xl mb-4 animate-heartbeat">🍫</div>

                    <h1
                        className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Happy Chocolate Day
                    </h1>

                    <p
                        className="text-xl text-pink-600 mb-6"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Dear {names.to}
                    </p>

                    {!boxOpen ? (
                        /* Closed Box */
                        <div className="animate-fadeIn">
                            <div className="text-8xl mb-4">🎁</div>
                            <p className="text-pink-600 mb-4">
                                A sweet surprise awaits you...
                            </p>
                            <button
                                onClick={() => setBoxOpen(true)}
                                className="romantic-btn px-8 py-4"
                            >
                                Open Your Chocolate Box 🍫
                            </button>
                        </div>
                    ) : (
                        /* Open Box with Chocolates */
                        <div className="animate-fadeIn">
                            <p className="text-pink-600 mb-4 text-sm">
                                Choose your treats! Each one has a sweet message 💝
                            </p>

                            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
                                {CHOCOLATES.map((choco, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleUnwrap(i)}
                                        className={`
                      text-4xl md:text-5xl p-3 rounded-2xl transition-all duration-300 transform
                      ${unwrappedChocolates.includes(i)
                                                ? 'bg-pink-100 scale-100'
                                                : 'bg-pink-200/50 hover:bg-pink-200 hover:scale-110'
                                            }
                    `}
                                        disabled={unwrappedChocolates.includes(i)}
                                    >
                                        {unwrappedChocolates.includes(i) ? choco.emoji : '🎁'}
                                    </button>
                                ))}
                            </div>

                            {/* Pop-up message */}
                            {currentMessage && (
                                <div className="animate-slideUp glass-card p-4 mb-4 inline-block">
                                    <p
                                        className="text-lg text-pink-700"
                                        style={{ fontFamily: "'Dancing Script', cursive" }}
                                    >
                                        ✨ {currentMessage} ✨
                                    </p>
                                </div>
                            )}

                            <p className="text-pink-500 text-xs mb-4">
                                {allUnwrapped
                                    ? '🎉 All treats unwrapped!'
                                    : `${unwrappedChocolates.length}/${CHOCOLATES.length} treats unwrapped`
                                }
                            </p>

                            {/* Show final letter button */}
                            {allUnwrapped && !showFinalLetter && (
                                <button
                                    onClick={() => setShowFinalLetter(true)}
                                    className="romantic-btn px-8 py-4 animate-pulse-glow"
                                >
                                    Read Your Sweet Love Letter 💌
                                </button>
                            )}

                            {/* Final Letter */}
                            {showFinalLetter && (
                                <div className="animate-fadeIn mt-4 glass-card p-6 bg-white/50">
                                    <div className="text-3xl mb-3 opacity-40">❝</div>
                                    <p
                                        className="text-lg md:text-xl text-pink-700 italic leading-relaxed"
                                        style={{ fontFamily: "'Dancing Script', cursive" }}
                                    >
                                        {quotes[0] || "Life is like a box of chocolates, sweet moments to share with you."}
                                    </p>
                                    <div className="text-3xl mt-3 opacity-40 text-right">❞</div>

                                    <div className="mt-4 pt-4 border-t border-pink-200">
                                        <p className="text-pink-600/80">Sweetly yours,</p>
                                        <p
                                            className="text-xl text-pink-700 font-medium"
                                            style={{ fontFamily: "'Dancing Script', cursive" }}
                                        >
                                            {names.from} 🍫
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
