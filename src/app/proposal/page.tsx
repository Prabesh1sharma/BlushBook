"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

export default function ProposalPage() {
    const [showModal, setShowModal] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [isButtonMoved, setIsButtonMoved] = useState(false);
    const [hearts, setHearts] = useState<{ id: number; left: number; delay: number }[]>([]);
    const noButtonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize AudioContext lazily
    const getAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        return audioContextRef.current;
    }, []);

    // Play danger/buzzer sound using Web Audio API
    const playDangerSound = useCallback(() => {
        try {
            const audioContext = getAudioContext();

            // Create oscillator for buzzer sound
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Buzzer parameters
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);

            // Second beep
            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();

                osc2.connect(gain2);
                gain2.connect(audioContext.destination);

                osc2.type = 'square';
                osc2.frequency.setValueAtTime(150, audioContext.currentTime);

                gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

                osc2.start(audioContext.currentTime);
                osc2.stop(audioContext.currentTime + 0.4);
            }, 350);
        } catch (e) {
            console.log('Audio not supported:', e);
        }
    }, [getAudioContext]);

    // Move the No button away from cursor
    const handleNoButtonHover = useCallback(() => {
        if (!containerRef.current) return;

        const container = containerRef.current.getBoundingClientRect();
        const maxX = container.width - 150; // Button width
        const maxY = container.height - 60; // Button height

        const newX = Math.random() * maxX - maxX / 2;
        const newY = Math.random() * maxY - maxY / 2;

        setNoButtonPosition({ x: newX, y: newY });
        setIsButtonMoved(true);
    }, []);

    // Handle No button click (if they somehow manage to click it)
    const handleNoClick = useCallback(() => {
        playDangerSound();
        setShowModal(true);
    }, [playDangerSound]);

    // Handle Yes button click
    const handleYesClick = useCallback(() => {
        setShowCelebration(true);

        // Create celebration hearts
        const newHearts = Array.from({ length: 30 }, (_, i) => ({
            id: Date.now() + i,
            left: Math.random() * 100,
            delay: Math.random() * 2,
        }));
        setHearts(newHearts);

        // Clear hearts after animation
        setTimeout(() => {
            setHearts([]);
        }, 4000);
    }, []);

    // Cleanup audio context
    useEffect(() => {
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    return (
        <div className="min-h-screen px-4 py-12" ref={containerRef}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fadeIn">
                    <Link
                        href="/"
                        className="inline-block mb-8 text-pink-500 hover:text-pink-600 transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Main Proposal Card */}
                <div className="glass-card p-10 md:p-16 text-center animate-fadeIn">
                    {/* Heart Animation */}
                    <div className="text-7xl md:text-9xl mb-8 animate-heartbeat">
                        💕
                    </div>

                    {/* Question */}
                    <h1
                        className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-rose-500 to-red-400 bg-clip-text text-transparent"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Will You Be Mine?
                    </h1>

                    <p className="text-xl text-pink-700 mb-12 max-w-xl mx-auto">
                        This is a special moment...
                        One that could change everything.
                        Choose wisely! 💖
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[120px]">
                        {/* Yes Button */}
                        <button
                            onClick={handleYesClick}
                            className="romantic-btn yes-btn text-xl px-16 py-5 animate-pulse-glow z-10"
                            disabled={showCelebration}
                        >
                            💖 Yes! 💖
                        </button>

                        {/* No Button (moves away) */}
                        <button
                            ref={noButtonRef}
                            onClick={handleNoClick}
                            onMouseEnter={handleNoButtonHover}
                            onTouchStart={handleNoButtonHover}
                            className="romantic-btn no-btn text-xl px-16 py-5 z-10"
                            style={{
                                transform: isButtonMoved
                                    ? `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`
                                    : 'none',
                                transition: 'transform 0.2s ease-out',
                            }}
                        >
                            😢 No
                        </button>
                    </div>

                    {/* Hint */}
                    <p className="mt-8 text-pink-400 text-sm italic">
                        Hint: Try clicking &quot;No&quot; if you can catch it! 😉
                    </p>
                </div>

                {/* Beautiful Quotes Section */}
                <div className="text-center mt-12 space-y-8 animate-fadeIn">
                    <div className="glass-card p-8 max-w-2xl mx-auto">
                        <div className="text-4xl mb-4 opacity-30">❝</div>
                        <p
                            className="text-2xl md:text-3xl text-pink-700 italic leading-relaxed"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            Every love story is beautiful, but ours will be my favorite.
                        </p>
                        <div className="text-4xl mt-4 opacity-30 text-right">❞</div>
                    </div>

                    <div className="glass-card p-8 max-w-2xl mx-auto">
                        <div className="text-4xl mb-4 opacity-30">❝</div>
                        <p
                            className="text-2xl md:text-3xl text-pink-700 italic leading-relaxed"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            I choose you. And I'll choose you over and over and over. Without pause, without a doubt, in a heartbeat. I'll keep choosing you.
                        </p>
                        <div className="text-4xl mt-4 opacity-30 text-right">❞</div>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-4xl mt-6">
                        💕 <span className="text-pink-400">•</span> 💖 <span className="text-pink-400">•</span> 💕
                    </div>
                </div>
            </div>

            {/* Attribution Footer */}
            <footer className="text-center py-6 mt-12">
                <div className="glass-card inline-block px-8 py-4">
                    <p className="text-sm text-pink-600/80">
                        Made with 💕 for someone special
                    </p>
                </div>
            </footer>

            {/* Modal for No button */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="text-6xl mb-6">🚫💔</div>
                        <h2
                            className="text-3xl font-bold text-pink-600 mb-4"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            Nice Try!
                        </h2>
                        <p className="text-xl text-pink-700 mb-6">
                            You can&apos;t select &quot;No&quot; because...
                        </p>
                        <p
                            className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-6"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            You are already mine! 💕
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="romantic-btn px-8 py-3"
                        >
                            Got it! 😊
                        </button>
                    </div>
                </div>
            )}

            {/* Celebration overlay for Yes */}
            {showCelebration && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-pink-50/90 backdrop-blur-sm">
                    <div className="text-center animate-fadeIn">
                        <div className="text-8xl mb-8 animate-heartbeat">
                            🎉💕🎉
                        </div>
                        <h2
                            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-rose-500 to-red-400 bg-clip-text text-transparent"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            You Said Yes!
                        </h2>
                        <p className="text-2xl text-pink-700 mb-8">
                            This is the beginning of our beautiful story! 💖
                        </p>
                        <button
                            onClick={() => setShowCelebration(false)}
                            className="romantic-btn px-10 py-4 text-xl"
                        >
                            Start Our Journey 💕
                        </button>
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
                                }}
                            >
                                {['💕', '💖', '💗', '❤️', '🌸', '✨'][Math.floor(Math.random() * 6)]}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
