'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { VALENTINE_DAYS, type NamePair } from '@/utils/encoding';

interface ProposeDayWishProps {
    day: (typeof VALENTINE_DAYS)[number];
    names: NamePair;
    quotes: string[];
}

// Emotional quotes to show when user tries to click "No"
const EMOTIONAL_QUOTES = [
    { emoji: '💔', quote: "But my heart beats only for you...", subtext: "Are you sure you want to break it?" },
    { emoji: '😢', quote: "Without you, there's no tomorrow...", subtext: "Every sunset would feel incomplete." },
    { emoji: '🌹', quote: "You are my only choice in every universe...", subtext: "In every lifetime, it's always you." },
    { emoji: '💫', quote: "My stars don't shine without you...", subtext: "You are the light of my life." },
    { emoji: '🥺', quote: "I've waited my whole life for you...", subtext: "Please don't make me wait forever." },
    { emoji: '💕', quote: "Every love song reminds me of you...", subtext: "You're the melody of my heart." },
    { emoji: '🌙', quote: "My dreams are empty without you...", subtext: "Be the reason I wake up smiling." },
    { emoji: '❤️‍🩹', quote: "Only you can make my heart whole...", subtext: "Please say yes and complete me." },
];

export default function ProposeDayWish({ day, names, quotes }: ProposeDayWishProps) {
    const [noAttempts, setNoAttempts] = useState(0);
    const [showEmotionalModal, setShowEmotionalModal] = useState(false);
    const [currentEmotionalQuote, setCurrentEmotionalQuote] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [hearts, setHearts] = useState<{ id: number; left: number; delay: number }[]>([]);
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        setMounted(true);
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const getAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        return audioContextRef.current;
    }, []);

    // Play sad/buzzer sound
    const playSadSound = useCallback(() => {
        try {
            const audioContext = getAudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.5);

            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio not supported:', e);
        }
    }, [getAudioContext]);

    // Play celebration sound
    const playCelebrationSound = useCallback(() => {
        try {
            const audioContext = getAudioContext();
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

            notes.forEach((freq, i) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15);

                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.15);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.3);

                oscillator.start(audioContext.currentTime + i * 0.15);
                oscillator.stop(audioContext.currentTime + i * 0.15 + 0.3);
            });
        } catch (e) {
            console.log('Audio not supported:', e);
        }
    }, [getAudioContext]);

    // Move NO button away from cursor
    const handleNoHover = useCallback(() => {
        if (!containerRef.current) return;

        const container = containerRef.current.getBoundingClientRect();
        const maxX = Math.min(200, container.width / 3);
        const maxY = Math.min(150, container.height / 4);

        const newX = (Math.random() - 0.5) * 2 * maxX;
        const newY = (Math.random() - 0.5) * 2 * maxY;

        setNoButtonPosition({ x: newX, y: newY });
    }, []);

    // Handle NO button click
    const handleNoClick = useCallback(() => {
        playSadSound();
        setNoAttempts(prev => prev + 1);
        setCurrentEmotionalQuote(noAttempts % EMOTIONAL_QUOTES.length);
        setShowEmotionalModal(true);
    }, [noAttempts, playSadSound]);

    // Handle YES button click
    const handleYesClick = useCallback(() => {
        playCelebrationSound();
        setShowCelebration(true);

        const newHearts = Array.from({ length: 40 }, (_, i) => ({
            id: Date.now() + i,
            left: Math.random() * 100,
            delay: Math.random() * 2,
        }));
        setHearts(newHearts);

        setTimeout(() => setHearts([]), 5000);
    }, [playCelebrationSound]);

    // Calculate button size based on attempts (shrinks after multiple tries)
    const noButtonScale = Math.max(0.5, 1 - noAttempts * 0.1);

    // Floating elements
    const getFloatingElements = () => {
        if (!mounted) return null;
        return Array.from({ length: 20 }, (_, i) => (
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
                {['💍', '💕', '💖', '✨', '🌸'][Math.floor(Math.random() * 5)]}
            </span>
        ));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden" ref={containerRef}>
            {/* Floating Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {getFloatingElements()}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-2xl mx-auto animate-fadeIn">
                {/* Main Proposal Card */}
                <div className="glass-card p-8 md:p-12">
                    {/* Heart Animation */}
                    <div className="text-7xl md:text-8xl mb-6 animate-heartbeat">💍</div>

                    {/* To Name */}
                    <p
                        className="text-xl md:text-2xl text-pink-600 mb-2"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Dear
                    </p>
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-600 bg-clip-text text-transparent"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        {names.to}
                    </h1>

                    {/* Question */}
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-4 text-pink-700"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Will You Be Mine?
                    </h2>

                    <p className="text-lg text-pink-600 mb-8 max-w-md mx-auto">
                        This is a special moment... One that could change everything.
                        Choose wisely! 💖
                    </p>

                    {/* Buttons Container */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[140px]">
                        {/* YES Button */}
                        <button
                            onClick={handleYesClick}
                            className="romantic-btn yes-btn text-xl px-14 py-5 animate-pulse-glow z-10"
                            disabled={showCelebration}
                        >
                            💖 Yes! 💖
                        </button>

                        {/* NO Button (moves away + shrinks) */}
                        <button
                            onClick={handleNoClick}
                            onMouseEnter={handleNoHover}
                            onTouchStart={handleNoHover}
                            className="romantic-btn no-btn text-lg px-10 py-4 z-10 transition-all duration-200"
                            style={{
                                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scale(${noButtonScale})`,
                                opacity: Math.max(0.4, 1 - noAttempts * 0.15),
                            }}
                        >
                            😢 No
                        </button>
                    </div>

                    {noAttempts > 0 && (
                        <p className="mt-6 text-pink-400 text-sm italic animate-fadeIn">
                            You&apos;ve tried to say no {noAttempts} time{noAttempts > 1 ? 's' : ''}... but love never gives up! 💕
                        </p>
                    )}

                    <p className="mt-4 text-pink-400 text-xs">
                        Hint: Try clicking &quot;No&quot; if you can catch it! 😉
                    </p>
                </div>

                {/* From signature */}
                <div className="mt-8 glass-card inline-block px-8 py-4">
                    <p className="text-sm text-pink-600/80">With all my love,</p>
                    <p
                        className="text-xl text-pink-700 font-medium"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        {names.from}
                    </p>
                </div>
            </div>

            {/* Emotional Quote Modal */}
            {showEmotionalModal && (
                <div className="modal-overlay" onClick={() => setShowEmotionalModal(false)}>
                    <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
                        <div className="text-6xl mb-4 animate-heartbeat">
                            {EMOTIONAL_QUOTES[currentEmotionalQuote].emoji}
                        </div>

                        <h2
                            className="text-2xl md:text-3xl font-bold mb-3 text-pink-600"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            Wait...
                        </h2>

                        <p
                            className="text-xl md:text-2xl text-pink-700 mb-2 italic"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            &ldquo;{EMOTIONAL_QUOTES[currentEmotionalQuote].quote}&rdquo;
                        </p>

                        <p className="text-pink-600/80 mb-6">
                            {EMOTIONAL_QUOTES[currentEmotionalQuote].subtext}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => {
                                    setShowEmotionalModal(false);
                                    handleYesClick();
                                }}
                                className="romantic-btn yes-btn px-8 py-3"
                            >
                                💖 Okay, Yes!
                            </button>
                            <button
                                onClick={() => setShowEmotionalModal(false)}
                                className="romantic-btn px-8 py-3 opacity-60 hover:opacity-80"
                            >
                                Let me think... 🤔
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Celebration Screen */}
            {showCelebration && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-pink-50/95 backdrop-blur-sm">
                    <div className="text-center animate-fadeIn max-w-lg mx-auto px-4">
                        <div className="text-8xl mb-6 animate-heartbeat">🎉💕🎉</div>

                        <h2
                            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-rose-500 to-red-400 bg-clip-text text-transparent"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            You Said Yes!
                        </h2>

                        <p className="text-xl text-pink-700 mb-6">
                            This is the beginning of our beautiful story, {names.to}! 💖
                        </p>

                        {/* Random quote from the day */}
                        {quotes.length > 0 && (
                            <div className="glass-card p-6 mb-6">
                                <div className="text-2xl mb-2 opacity-30">❝</div>
                                <p
                                    className="text-lg text-pink-700 italic"
                                    style={{ fontFamily: "'Dancing Script', cursive" }}
                                >
                                    {quotes[0]}
                                </p>
                                <div className="text-2xl mt-2 opacity-30 text-right">❞</div>
                            </div>
                        )}

                        <p className="text-pink-600">
                            With love, <span className="font-semibold">{names.from}</span> 💕
                        </p>
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
                                {['💕', '💖', '💗', '❤️', '🌸', '✨', '💍'][Math.floor(Math.random() * 7)]}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
