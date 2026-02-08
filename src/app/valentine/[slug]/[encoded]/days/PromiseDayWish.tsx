'use client';

import { useState, useEffect } from 'react';
import { VALENTINE_DAYS, type NamePair } from '@/utils/encoding';

interface PromiseDayWishProps {
    day: (typeof VALENTINE_DAYS)[number];
    names: NamePair;
    quotes: string[];
}

const PROMISES = [
    { emoji: '💕', text: "I promise to love you unconditionally..." },
    { emoji: '🤝', text: "I promise to stand by your side always..." },
    { emoji: '🌟', text: "I promise to be your biggest supporter..." },
    { emoji: '🌙', text: "I promise to never let you feel alone..." },
    { emoji: '☀️', text: "I promise to bring sunshine to your cloudy days..." },
    { emoji: '💪', text: "I promise to grow stronger together with you..." },
];

export default function PromiseDayWish({ day, names, quotes }: PromiseDayWishProps) {
    const [scrollUnfurled, setScrollUnfurled] = useState(false);
    const [visiblePromises, setVisiblePromises] = useState<number[]>([]);
    const [sealed, setSealed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (scrollUnfurled && visiblePromises.length < PROMISES.length) {
            const timer = setTimeout(() => {
                setVisiblePromises(prev => [...prev, prev.length]);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [scrollUnfurled, visiblePromises]);

    const allPromisesShown = visiblePromises.length >= PROMISES.length;

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
                {['🤝', '💕', '✨', '🌟', '💖'][Math.floor(Math.random() * 5)]}
            </span>
        ));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Floating Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {getFloatingElements()}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-2xl mx-auto animate-fadeIn">
                <div className="glass-card p-6 md:p-10">
                    {/* Header */}
                    <div className="text-6xl md:text-7xl mb-4 animate-heartbeat">🤝</div>

                    <h1
                        className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Happy Promise Day
                    </h1>

                    <p
                        className="text-xl text-pink-600 mb-6"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Dear {names.to}
                    </p>

                    {!scrollUnfurled ? (
                        /* Rolled Scroll */
                        <div className="animate-fadeIn">
                            <div className="text-7xl mb-4">📜</div>
                            <p className="text-pink-600 mb-4">
                                A sacred scroll of promises awaits...
                            </p>
                            <button
                                onClick={() => setScrollUnfurled(true)}
                                className="romantic-btn px-8 py-4"
                            >
                                Unfurl the Promise Scroll 📜✨
                            </button>
                        </div>
                    ) : (
                        /* Unfurled Scroll with Promises */
                        <div className="animate-fadeIn">
                            <div
                                className="relative bg-amber-50/80 rounded-lg p-6 md:p-8 border-4 border-amber-200 shadow-lg overflow-hidden"
                                style={{
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h100v100H0z" fill="%23fef3c7" fill-opacity=".3"/%3E%3C/svg%3E")',
                                }}
                            >
                                {/* Scroll Header */}
                                <div className="text-center mb-6">
                                    <p
                                        className="text-2xl md:text-3xl text-amber-800"
                                        style={{ fontFamily: "'Dancing Script', cursive" }}
                                    >
                                        My Promises to You
                                    </p>
                                    <div className="w-32 h-px bg-amber-400 mx-auto mt-2" />
                                </div>

                                {/* Promises List */}
                                <div className="space-y-3 text-left">
                                    {PROMISES.map((promise, index) => (
                                        <div
                                            key={index}
                                            className={`
                        flex items-start gap-3 transition-all duration-500
                        ${visiblePromises.includes(index)
                                                    ? 'opacity-100 translate-x-0'
                                                    : 'opacity-0 -translate-x-4'
                                                }
                      `}
                                        >
                                            <span className="text-2xl">{promise.emoji}</span>
                                            <p
                                                className="text-lg text-amber-900"
                                                style={{ fontFamily: "'Dancing Script', cursive" }}
                                            >
                                                {promise.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Signature */}
                                {allPromisesShown && (
                                    <div className="mt-6 text-right animate-fadeIn">
                                        <p className="text-amber-700 text-sm">Forever yours,</p>
                                        <p
                                            className="text-xl text-amber-900 font-medium"
                                            style={{ fontFamily: "'Dancing Script', cursive" }}
                                        >
                                            {names.from}
                                        </p>
                                    </div>
                                )}

                                {/* Wax Seal */}
                                {sealed && (
                                    <div className="absolute bottom-4 right-4 animate-fadeIn">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg transform rotate-12">
                                            <span className="text-2xl">💕</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Seal Button */}
                            {allPromisesShown && !sealed && (
                                <button
                                    onClick={() => setSealed(true)}
                                    className="romantic-btn px-8 py-4 mt-6 animate-pulse-glow"
                                >
                                    Seal These Promises with Love 💕
                                </button>
                            )}

                            {/* Final Message */}
                            {sealed && (
                                <div className="animate-fadeIn mt-6 glass-card p-6 bg-white/50">
                                    <div className="text-3xl mb-3 opacity-40">❝</div>
                                    <p
                                        className="text-lg md:text-xl text-pink-700 italic leading-relaxed"
                                        style={{ fontFamily: "'Dancing Script', cursive" }}
                                    >
                                        {quotes[0] || "A promise is forever, and so is my love for you."}
                                    </p>
                                    <div className="text-3xl mt-3 opacity-40 text-right">❞</div>

                                    <p className="text-pink-600 mt-4 text-sm">
                                        These promises are now sealed and will last forever 💕
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
