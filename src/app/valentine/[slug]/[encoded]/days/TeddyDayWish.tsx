'use client';

import { useState, useEffect } from 'react';
import { VALENTINE_DAYS, type NamePair } from '@/utils/encoding';

interface TeddyDayWishProps {
    day: (typeof VALENTINE_DAYS)[number];
    names: NamePair;
    quotes: string[];
}

const TEDDY_MESSAGES = [
    "I'll always be here to comfort you 🧸",
    "You're my favorite person to cuddle with 💕",
    "Soft hugs make everything better!",
    "You're beary special to me! 🐻",
    "Squeeze me whenever you miss your love!",
    "I'm a reminder that you're always loved 💖",
];

export default function TeddyDayWish({ day, names, quotes }: TeddyDayWishProps) {
    const [hugs, setHugs] = useState(0);
    const [currentMessage, setCurrentMessage] = useState<string | null>(null);
    const [teddyState, setTeddyState] = useState<'normal' | 'hug' | 'wave'>('normal');
    const [showLetter, setShowLetter] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Teddy waves occasionally
        const waveInterval = setInterval(() => {
            if (teddyState === 'normal') {
                setTeddyState('wave');
                setTimeout(() => setTeddyState('normal'), 1000);
            }
        }, 5000);

        return () => clearInterval(waveInterval);
    }, [teddyState]);

    const handleHug = () => {
        setHugs(prev => prev + 1);
        setTeddyState('hug');
        setCurrentMessage(TEDDY_MESSAGES[hugs % TEDDY_MESSAGES.length]);

        setTimeout(() => {
            setTeddyState('normal');
            setCurrentMessage(null);
        }, 2000);
    };

    // Floating teddies background
    const getFloatingTeddies = () => {
        if (!mounted) return null;
        return Array.from({ length: 12 }, (_, i) => (
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
                {['🧸', '💕', '🤗', '💖'][Math.floor(Math.random() * 4)]}
            </span>
        ));
    };

    const getTeddyEmoji = () => {
        switch (teddyState) {
            case 'hug': return '🤗';
            case 'wave': return '👋';
            default: return '🧸';
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Floating Teddies */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {getFloatingTeddies()}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-2xl mx-auto animate-fadeIn">
                <div className="glass-card p-6 md:p-10">
                    {/* Header */}
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Happy Teddy Day
                    </h1>

                    <p
                        className="text-xl text-pink-600 mb-6"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Dear {names.to}
                    </p>

                    {/* Big Interactive Teddy */}
                    <div className="mb-6">
                        <button
                            onClick={handleHug}
                            className={`
                text-8xl md:text-9xl transition-all duration-300 transform
                hover:scale-110 cursor-pointer
                ${teddyState === 'hug' ? 'scale-125' : ''}
                ${teddyState === 'wave' ? 'animate-bounce' : 'animate-heartbeat'}
              `}
                        >
                            {getTeddyEmoji()}
                        </button>

                        <p className="text-pink-600 text-sm mt-3">
                            Tap the teddy for a virtual hug! 🤗
                        </p>
                    </div>

                    {/* Speech Bubble */}
                    {currentMessage && (
                        <div className="animate-slideUp relative inline-block mb-4">
                            <div className="glass-card p-4 rounded-2xl relative">
                                <p
                                    className="text-lg text-pink-700"
                                    style={{ fontFamily: "'Dancing Script', cursive" }}
                                >
                                    {currentMessage}
                                </p>
                                {/* Speech bubble tail */}
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/25 rotate-45" />
                            </div>
                        </div>
                    )}

                    {/* Hug Counter */}
                    <div className="glass-card inline-block px-6 py-3 mb-6">
                        <p className="text-pink-600">
                            Virtual hugs given: <span className="font-bold text-2xl">{hugs}</span> 🤗
                        </p>
                        {hugs >= 5 && (
                            <p className="text-pink-500 text-xs mt-1">
                                ✨ You&apos;re a hugging champion! ✨
                            </p>
                        )}
                    </div>

                    {/* Warmth Meter */}
                    <div className="mb-6 max-w-xs mx-auto">
                        <p className="text-pink-600 text-sm mb-2">Warmth Meter 💖</p>
                        <div className="bg-pink-100 rounded-full h-4 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-pink-400 to-rose-500 h-full transition-all duration-500 rounded-full"
                                style={{ width: `${Math.min(100, hugs * 10)}%` }}
                            />
                        </div>
                    </div>

                    {/* Show letter after 5+ hugs */}
                    {hugs >= 5 && !showLetter && (
                        <button
                            onClick={() => setShowLetter(true)}
                            className="romantic-btn px-8 py-4 animate-pulse-glow"
                        >
                            Read Your Cuddly Love Letter 💌
                        </button>
                    )}

                    {/* Letter */}
                    {showLetter && (
                        <div className="animate-fadeIn mt-4 glass-card p-6 bg-white/50">
                            <div className="text-3xl mb-3 opacity-40">❝</div>
                            <p
                                className="text-lg md:text-xl text-pink-700 italic leading-relaxed"
                                style={{ fontFamily: "'Dancing Script', cursive" }}
                            >
                                {quotes[0] || "I'll be your teddy bear, always there to hold you tight."}
                            </p>
                            <div className="text-3xl mt-3 opacity-40 text-right">❞</div>

                            <div className="mt-4 pt-4 border-t border-pink-200">
                                <p className="text-pink-600/80">Your forever cuddle buddy,</p>
                                <p
                                    className="text-xl text-pink-700 font-medium"
                                    style={{ fontFamily: "'Dancing Script', cursive" }}
                                >
                                    {names.from} 🧸
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
