'use client';

import { useState, useEffect } from 'react';
import { VALENTINE_DAYS, type NamePair } from '@/utils/encoding';

interface HugDayWishProps {
    day: (typeof VALENTINE_DAYS)[number];
    names: NamePair;
    quotes: string[];
}

const HUG_MESSAGES = [
    "Sending you the warmest hug! 🤗",
    "Feel my arms around you! 💕",
    "This hug is full of love! 💖",
    "No distance can stop this hug!",
    "Comfort and warmth, just for you!",
    "A hug to heal any worries! 🌟",
];

export default function HugDayWish({ day, names, quotes }: HugDayWishProps) {
    const [hugsReceived, setHugsReceived] = useState(0);
    const [isHugging, setIsHugging] = useState(false);
    const [currentMessage, setCurrentMessage] = useState<string | null>(null);
    const [showLetter, setShowLetter] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const sendHug = () => {
        setIsHugging(true);
        setHugsReceived(prev => prev + 1);
        setCurrentMessage(HUG_MESSAGES[hugsReceived % HUG_MESSAGES.length]);

        setTimeout(() => {
            setIsHugging(false);
            setCurrentMessage(null);
        }, 2000);
    };

    const warmthLevel = Math.min(100, hugsReceived * 12);

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
                {['🤗', '💕', '💖', '✨', '🌸'][Math.floor(Math.random() * 5)]}
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
                    <div className={`text-7xl md:text-8xl mb-4 ${isHugging ? 'animate-bounce' : 'animate-heartbeat'}`}>
                        🤗
                    </div>

                    <h1
                        className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Happy Hug Day
                    </h1>

                    <p
                        className="text-xl text-pink-600 mb-6"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Dear {names.to}
                    </p>

                    {/* Hug Animation Area */}
                    <div className="mb-6">
                        {/* Arms animation */}
                        <div className={`
              flex items-center justify-center gap-2 text-6xl mb-4 transition-all duration-500
              ${isHugging ? 'gap-0' : 'gap-8'}
            `}>
                            <span className={`transition-transform duration-500 ${isHugging ? 'rotate-45' : ''}`}>
                                🤚
                            </span>
                            <div className="text-5xl">😊</div>
                            <span className={`transition-transform duration-500 ${isHugging ? '-rotate-45' : ''}`}>
                                🤚
                            </span>
                        </div>

                        {/* Message popup - positioned below the animation */}
                        <div className="h-16 flex items-center justify-center">
                            {currentMessage && (
                                <div className="animate-slideUp">
                                    <div className="glass-card px-6 py-3 rounded-full">
                                        <p
                                            className="text-lg text-pink-700 font-medium"
                                            style={{ fontFamily: "'Dancing Script', cursive" }}
                                        >
                                            {currentMessage}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Send Hug Button */}
                    <button
                        onClick={sendHug}
                        disabled={isHugging}
                        className={`
              romantic-btn px-10 py-5 text-xl mb-6
              ${isHugging ? 'scale-95 opacity-80' : 'hover:scale-105'}
              transition-transform
            `}
                    >
                        {isHugging ? '🤗 Hugging...' : '🤗 Send Virtual Hug'}
                    </button>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* Hug Counter */}
                        <div className="glass-card p-4">
                            <p className="text-pink-600 text-sm">Hugs Sent</p>
                            <p className="text-3xl font-bold text-pink-700">{hugsReceived}</p>
                        </div>

                        {/* Warmth Level */}
                        <div className="glass-card p-4">
                            <p className="text-pink-600 text-sm">Warmth Level</p>
                            <p className="text-3xl font-bold text-pink-700">{warmthLevel}%</p>
                        </div>
                    </div>

                    {/* Warmth Bar */}
                    <div className="mb-6 max-w-sm mx-auto">
                        <div className="bg-pink-100 rounded-full h-6 overflow-hidden relative">
                            <div
                                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-full transition-all duration-500 rounded-full"
                                style={{ width: `${warmthLevel}%` }}
                            />
                            {warmthLevel >= 100 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-sm font-bold drop-shadow-md">MAX WARMTH! 🔥</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Show letter after enough hugs */}
                    {hugsReceived >= 5 && !showLetter && (
                        <button
                            onClick={() => setShowLetter(true)}
                            className="romantic-btn px-8 py-4 animate-pulse-glow"
                        >
                            Open Your Warm Love Letter 💌
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
                                {quotes[0] || "A hug is a silent way of saying, 'You matter to me.'"}
                            </p>
                            <div className="text-3xl mt-3 opacity-40 text-right">❞</div>

                            <div className="mt-4 pt-4 border-t border-pink-200">
                                <p className="text-pink-600/80">With the warmest embrace,</p>
                                <p
                                    className="text-xl text-pink-700 font-medium"
                                    style={{ fontFamily: "'Dancing Script', cursive" }}
                                >
                                    {names.from} 🤗
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
