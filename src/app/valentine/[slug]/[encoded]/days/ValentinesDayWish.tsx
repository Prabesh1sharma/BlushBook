'use client';

import { useState, useEffect, useCallback } from 'react';
import { VALENTINE_DAYS, type NamePair } from '@/utils/encoding';

interface ValentinesDayWishProps {
    day: (typeof VALENTINE_DAYS)[number];
    names: NamePair;
    quotes: string[];
}

export default function ValentinesDayWish({ day, names, quotes }: ValentinesDayWishProps) {
    const [phase, setPhase] = useState<'entrance' | 'proposal' | 'celebration'>('entrance');
    const [showContent, setShowContent] = useState(false);
    const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; size: number }[]>([]);
    const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Auto-advance from entrance after animation
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 500);

        const advanceTimer = setTimeout(() => {
            setPhase('proposal');
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearTimeout(advanceTimer);
        };
    }, []);

    // Create fireworks effect
    const createFireworks = useCallback(() => {
        const colors = ['#ff69b4', '#ff1493', '#ff6b8a', '#ffd700', '#ff4500', '#9b59b6'];
        const newFireworks: { id: number; x: number; y: number; color: string }[] = [];

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const fw = {
                    id: Date.now() + i,
                    x: 10 + Math.random() * 80,
                    y: 10 + Math.random() * 60,
                    color: colors[Math.floor(Math.random() * colors.length)],
                };
                setFireworks(prev => [...prev, fw]);

                // Remove after animation
                setTimeout(() => {
                    setFireworks(prev => prev.filter(f => f.id !== fw.id));
                }, 2000);
            }, i * 200);
        }

        return newFireworks;
    }, []);

    // Handle YES click
    const handleYesClick = useCallback(() => {
        setPhase('celebration');
        createFireworks();

        // Create celebration hearts
        const newHearts = Array.from({ length: 50 }, (_, i) => ({
            id: Date.now() + i,
            left: Math.random() * 100,
            delay: Math.random() * 3,
            size: 1 + Math.random() * 2,
        }));
        setHearts(newHearts);

        setTimeout(() => setHearts([]), 6000);
    }, [createFireworks]);

    // Skip entrance animation
    const skipEntrance = useCallback(() => {
        setPhase('proposal');
        setShowContent(true);
    }, []);

    // Floating hearts background
    const getFloatingHearts = () => {
        if (!mounted) return null;
        return Array.from({ length: 25 }, (_, i) => (
            <span
                key={i}
                className="floating-element"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                    fontSize: `${1.5 + Math.random() * 2.5}rem`,
                }}
            >
                {['💕', '💖', '💗', '💓', '❤️', '💝', '✨'][Math.floor(Math.random() * 7)]}
            </span>
        ));
    };

    // Entrance Phase
    if (phase === 'entrance') {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-200 to-fuchsia-200 relative overflow-hidden cursor-pointer"
                onClick={skipEntrance}
            >
                {/* Animated hearts explosion */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {Array.from({ length: 12 }, (_, i) => (
                        <div
                            key={i}
                            className="absolute text-5xl md:text-7xl animate-pulse"
                            style={{
                                transform: `rotate(${i * 30}deg) translateY(-${80 + i * 20}px)`,
                                animationDelay: `${i * 0.1}s`,
                                opacity: showContent ? 1 : 0,
                                transition: 'opacity 0.5s ease-in-out',
                            }}
                        >
                            💕
                        </div>
                    ))}
                </div>

                {/* Center content */}
                <div className={`text-center z-10 transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <div className="text-8xl md:text-9xl mb-6 animate-heartbeat">💕</div>
                    <h1
                        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Happy Valentine&apos;s Day
                    </h1>
                    <p className="text-pink-600 mt-4 text-lg">Tap anywhere to continue...</p>
                </div>
            </div>
        );
    }

    // Celebration Phase
    if (phase === 'celebration') {
        return (
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-100 to-fuchsia-100">
                {/* Fireworks */}
                {fireworks.map((fw) => (
                    <div
                        key={fw.id}
                        className="absolute pointer-events-none"
                        style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
                    >
                        {Array.from({ length: 8 }, (_, i) => (
                            <div
                                key={i}
                                className="absolute w-3 h-3 rounded-full"
                                style={{
                                    backgroundColor: fw.color,
                                    animation: 'firework 1s ease-out forwards',
                                    transform: `rotate(${i * 45}deg) translateY(-50px)`,
                                }}
                            />
                        ))}
                    </div>
                ))}

                {/* Main Content */}
                <div className="text-center z-10 max-w-2xl mx-auto px-4 animate-fadeIn">
                    <div className="text-8xl md:text-9xl mb-6 animate-heartbeat">🎉💕🎉</div>

                    <h1
                        className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-rose-500 to-red-400 bg-clip-text text-transparent"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Forever Yours!
                    </h1>

                    <p className="text-2xl text-pink-700 mb-4">
                        Dear <span className="font-bold">{names.to}</span>,
                    </p>

                    <p className="text-xl text-pink-600 mb-8">
                        You&apos;ve made this the most magical Valentine&apos;s Day! 💖
                    </p>

                    {/* Beautiful quote card */}
                    <div className="glass-card p-6 md:p-8 mb-8">
                        <div className="text-3xl mb-3 opacity-30">❝</div>
                        <p
                            className="text-xl md:text-2xl text-pink-700 italic leading-relaxed"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            {quotes[0] || "You are my Valentine today, tomorrow, and forever."}
                        </p>
                        <div className="text-3xl mt-3 opacity-30 text-right">❞</div>
                    </div>

                    {/* Signature */}
                    <div className="glass-card inline-block px-8 py-4">
                        <p className="text-pink-600/80 mb-1">Forever & Always,</p>
                        <p
                            className="text-2xl font-bold text-pink-700"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            {names.from} 💕
                        </p>
                    </div>
                </div>

                {/* Celebration Hearts */}
                <div className="celebration">
                    {hearts.map((heart) => (
                        <span
                            key={heart.id}
                            className="celebration-heart"
                            style={{
                                left: `${heart.left}%`,
                                bottom: '-10%',
                                animationDelay: `${heart.delay}s`,
                                fontSize: `${heart.size}rem`,
                            }}
                        >
                            {['💕', '💖', '💗', '❤️', '🌸', '✨', '💝'][Math.floor(Math.random() * 7)]}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    // Proposal Phase (main)
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Floating Hearts */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {getFloatingHearts()}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-2xl mx-auto animate-fadeIn">
                {/* Grand Card */}
                <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                    {/* Decorative corners */}
                    <div className="absolute top-4 left-4 text-3xl opacity-40">🌹</div>
                    <div className="absolute top-4 right-4 text-3xl opacity-40">🌹</div>
                    <div className="absolute bottom-4 left-4 text-3xl opacity-40">🌹</div>
                    <div className="absolute bottom-4 right-4 text-3xl opacity-40">🌹</div>

                    {/* Main heart */}
                    <div className="text-8xl md:text-9xl mb-6 animate-heartbeat">💕</div>

                    {/* To name */}
                    <p className="text-xl text-pink-600 mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        My Dearest
                    </p>
                    <h1
                        className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-600 bg-clip-text text-transparent animate-pulse-glow"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        {names.to}
                    </h1>

                    {/* The question */}
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-4 text-pink-700"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Will You Be My Valentine?
                    </h2>

                    <p className="text-lg text-pink-600 mb-8 max-w-md mx-auto">
                        Today is the day I celebrate the greatest gift of all — you!
                        Say yes and make this Valentine&apos;s Day unforgettable. 💖
                    </p>

                    {/* Large YES button */}
                    <button
                        onClick={handleYesClick}
                        className="romantic-btn yes-btn text-2xl px-16 py-6 animate-pulse-glow hover:scale-105 transition-transform"
                    >
                        💕 Yes, I&apos;ll Be Yours! 💕
                    </button>

                    {/* Tiny hidden "no" option */}
                    <p className="mt-6 text-pink-300 text-xs opacity-40 hover:opacity-20 transition-opacity cursor-default">
                        (there is no &quot;no&quot; on Valentine&apos;s Day 😉)
                    </p>
                </div>

                {/* From signature */}
                <div className="mt-8 glass-card inline-block px-8 py-4">
                    <p className="text-sm text-pink-600/80">With all my love,</p>
                    <p
                        className="text-xl text-pink-700 font-medium"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        {names.from} 💕
                    </p>
                </div>
            </div>

            {/* Fireworks CSS */}
            <style jsx>{`
        @keyframes firework {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(0);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-100px);
          }
        }
      `}</style>
        </div>
    );
}
