'use client';

import { useEffect, useState } from "react";
import {
  VALENTINE_DAYS,
  VALENTINE_MEANINGS,
  type NamePair,
} from "@/utils/encoding";

interface ValentineWishClientProps {
  day: (typeof VALENTINE_DAYS)[number];
  names: NamePair;
  quotes: string[];
}

export default function ValentineWishClient({
  day,
  names,
  quotes,
}: ValentineWishClientProps) {
  const [mounted, setMounted] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getThemedElements = () => {
    if (!mounted) return null;

    const baseStyle = () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${4 + Math.random() * 4}s`,
      fontSize: `${1.8 + Math.random() * 2.5}rem`,
    });

    switch (day.slug) {
      case "rose-day":
        return Array.from({ length: 22 }, (_, i) => (
          <span key={i} className="floating-element" style={baseStyle()}>
            🌹
          </span>
        ));
      case "propose-day":
        return Array.from({ length: 18 }, (_, i) => (
          <span key={i} className="floating-element" style={baseStyle()}>
            💍
          </span>
        ));
      case "chocolate-day":
        return Array.from({ length: 22 }, (_, i) => (
          <span key={i} className="floating-element" style={baseStyle()}>
            🍫
          </span>
        ));
      case "teddy-day":
        return Array.from({ length: 16 }, (_, i) => (
          <span key={i} className="floating-element" style={baseStyle()}>
            🧸
          </span>
        ));
      case "promise-day":
        return Array.from({ length: 18 }, (_, i) => (
          <span key={i} className="floating-element" style={baseStyle()}>
            🤝
          </span>
        ));
      case "hug-day":
        return Array.from({ length: 18 }, (_, i) => (
          <span key={i} className="floating-element" style={baseStyle()}>
            🤗
          </span>
        ));
      case "kiss-day":
        return Array.from({ length: 22 }, (_, i) => (
          <span key={i} className="floating-element" style={baseStyle()}>
            💋
          </span>
        ));
      case "valentines-day":
        return Array.from({ length: 26 }, (_, i) => (
          <span key={i} className="floating-element" style={baseStyle()}>
            {["💕", "💖", "💗", "💓", "❤️", "💝"][Math.floor(Math.random() * 6)]}
          </span>
        ));
      default:
        return null;
    }
  };

  const meaning = VALENTINE_MEANINGS[day.slug];

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 py-8 relative overflow-hidden">
      {/* Themed Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {getThemedElements()}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto animate-fadeIn grow flex flex-col justify-center gap-10">
        {/* Top: Emoji, Day Name, Date */}
        <div>
          <div className="text-8xl md:text-[9rem] mb-4 animate-heartbeat drop-shadow-lg">
            {day.emoji}
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold mb-3 bg-linear-to-r from-pink-500 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {day.name}
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-2xl text-pink-400">✨</span>
            <p className="text-lg md:text-xl text-pink-700 font-light">
              {day.date}
            </p>
            <span className="text-2xl text-pink-400">✨</span>
          </div>
        </div>

        {/* Step 1: Meaning of the day */}
        <div className="glass-card p-6 md:p-8 text-left">
          {/* <p className="text-sm uppercase tracking-[0.2em] text-pink-400 mb-2">
            Step 1 · Know what this day means
          </p> */}
          <h2
            className="text-2xl md:text-3xl font-bold text-pink-600 mb-4 text-center"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            What {day.name} really means for you 💕
          </h2>

          {meaning && (
            <>
              <p className="text-pink-700 text-base md:text-lg leading-relaxed mb-4 text-center">
                {meaning.intro}
              </p>
              <div className="space-y-3 text-pink-700 text-sm md:text-base leading-relaxed">
                {meaning.points.map((point, index) => (
                  <p key={index}>
                    <span className="mr-2 text-lg">{day.emoji}</span>
                    {point}
                  </p>
                ))}
              </div>
            </>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowLetter(true)}
              className="romantic-btn px-8 py-3 text-sm md:text-base"
            >
              Now You know what this day means – you are ready to open the letter 💌 Click here
            </button>
          </div>
        </div>

      </div>

      {/* Popup Letter Modal */}
      {showLetter && (
        <div
          className="modal-overlay"
          onClick={() => setShowLetter(false)}
        >
          <div
            className="modal-content max-w-2xl w-[95%] max-h-[80vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowLetter(false)}
              className="absolute top-4 right-4 text-pink-500 hover:text-pink-600 text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
            {!envelopeOpened ? (
              <>
                {/* Closed envelope view */}
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">✉️</div>
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-2 bg-linear-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    A special letter is waiting for you
                  </h2>
                  <p className="text-pink-600 text-sm md:text-base">
                    Carefully sealed with love, just for you.
                  </p>
                </div>

                {/* Envelope card with From / To */}
                <div className="glass-card p-6 md:p-8 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-left text-sm md:text-base text-pink-700">
                      <p className="font-semibold">From:</p>
                      <p
                        className="text-lg md:text-xl"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                      >
                        {names.from}
                      </p>
                    </div>
                    <div className="text-right text-sm md:text-base text-pink-700">
                      <p className="font-semibold">To:</p>
                      <p
                        className="text-lg md:text-xl"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                      >
                        {names.to}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col items-center gap-3">
                    <div className="h-px bg-linear-to-r from-transparent via-pink-300 to-transparent w-full max-w-xs" />
                    <div className="text-3xl">{day.emoji}</div>
                    <p
                      className="text-xl md:text-2xl text-pink-700"
                      style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                      {day.name}
                    </p>
                    <div className="h-px bg-linear-to-r from-transparent via-pink-300 to-transparent w-full max-w-xs" />
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setEnvelopeOpened(true)}
                    className="romantic-btn px-8 py-3 text-sm md:text-base"
                  >
                    Open the letter 💌
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Opened letter view */}
                {/* To Name */}
                <div className="text-center mb-6">
                  <p
                    className="text-xl md:text-2xl text-pink-600 mb-2"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    To My Dearest
                  </p>
                  <h2
                    className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-fuchsia-600 via-pink-500 to-rose-600 bg-clip-text text-transparent drop-shadow-lg animate-pulse-glow"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    {names.to}
                  </h2>
                </div>

                {/* Day Greeting */}
                <div className="text-center mb-6">
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-3 bg-linear-to-r from-rose-500 via-pink-600 to-fuchsia-500 bg-clip-text text-transparent"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    Happy {day.name}!
                  </h3>
                  <div className="text-3xl mb-2">{day.emoji}</div>
                </div>

                {/* Quotes */}
                {quotes && quotes.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {quotes.slice(0, 3).map((quote, index) => (
                      <div
                        key={index}
                        className="relative py-3 px-3 border-l-4 border-pink-300 bg-white/60 rounded-r-lg"
                      >
                        <div className="text-2xl mb-1 opacity-30 text-pink-400">
                          ❝
                        </div>
                        <p
                          className="text-base md:text-lg text-pink-700 italic leading-relaxed pl-3"
                          style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                          {quote}
                        </p>
                        <div className="text-2xl mt-1 opacity-30 text-right text-pink-400">
                          ❞
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Signature */}
                <div className="text-center mt-2">
                  <p
                    className="text-base md:text-lg text-pink-600/80 mb-1"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    With all my love,
                  </p>
                  <p
                    className="text-xl md:text-2xl text-pink-700 font-medium"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    {names.from}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 mt-6 w-full">
        <div className="glass-card inline-block px-8 py-4">
          <p className="text-sm text-pink-600/80">
            Made with 💕 by{" "}
            <span className="font-semibold text-pink-700">{names.from}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

