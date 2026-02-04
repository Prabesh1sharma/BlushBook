'use client';

import { useEffect, useState } from 'react';
import { VALENTINE_DAYS } from '@/utils/encoding';

interface NamePair {
  from: string;
  to: string;
}

interface ValentineDayClientProps {
  dayNumber: number;
  dayInfo: typeof VALENTINE_DAYS[number];
  names: NamePair;
  quotes: string[];
}

export default function ValentineDayClient({
  dayNumber,
  dayInfo,
  names,
  quotes,
}: ValentineDayClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get themed elements for each day
  const getThemedElements = () => {
    if (!mounted) return null;

    switch (dayNumber) {
      case 1: // Rose Day
        return Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${2 + Math.random() * 3}rem`,
            }}
          >
            🌹
          </span>
        ));
      case 2: // Propose Day
        return Array.from({ length: 15 }, (_, i) => (
          <span
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${2 + Math.random() * 3}rem`,
            }}
          >
            💍
          </span>
        ));
      case 3: // Chocolate Day
        return Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${2 + Math.random() * 3}rem`,
            }}
          >
            🍫
          </span>
        ));
      case 4: // Teddy Day
        return Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${2.5 + Math.random() * 3}rem`,
            }}
          >
            🧸
          </span>
        ));
      case 5: // Promise Day
        return Array.from({ length: 15 }, (_, i) => (
          <span
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${2 + Math.random() * 3}rem`,
            }}
          >
            🤝
          </span>
        ));
      case 6: // Hug Day
        return Array.from({ length: 15 }, (_, i) => (
          <span
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${2 + Math.random() * 3}rem`,
            }}
          >
            🤗
          </span>
        ));
      case 7: // Kiss Day
        return Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${2 + Math.random() * 3}rem`,
            }}
          >
            💋
          </span>
        ));
      case 8: // Valentine's Day
        return Array.from({ length: 25 }, (_, i) => (
          <span
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${1.5 + Math.random() * 2.5}rem`,
            }}
          >
            {['💕', '💖', '💗', '💓', '❤️', '💝'][Math.floor(Math.random() * 6)]}
          </span>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 py-8 relative overflow-hidden">
      {/* Themed Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {getThemedElements()}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fadeIn flex-grow flex flex-col justify-center">
        {/* Day Emoji with enhanced animation */}
        <div className="text-9xl md:text-[10rem] mb-8 animate-heartbeat drop-shadow-lg">
          {dayInfo.emoji}
        </div>

        {/* Day Name with enhanced gradient */}
        <h1
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {dayInfo.name}
        </h1>

        {/* Date with decorative elements */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-2xl text-pink-400">✨</span>
          <p className="text-2xl md:text-3xl text-pink-700 font-light">
            {dayInfo.date}
          </p>
          <span className="text-2xl text-pink-400">✨</span>
        </div>

        {/* Beautiful Letter Format */}
        <div className="relative mb-8">
          {/* Decorative top border */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent w-full max-w-md"></div>
            <span className="text-4xl mx-4">{dayInfo.emoji}</span>
            <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent w-full max-w-md"></div>
          </div>

          {/* Main Letter Card */}
          <div className="glass-card p-12 md:p-16 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-300 shadow-2xl">
            {/* Letter Header - Recipient Name Highlighted */}
            <div className="text-center mb-12">
              <p
                className="text-2xl md:text-3xl text-pink-600 mb-4"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                To My Dearest
              </p>
              <h2
                className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-600 bg-clip-text text-transparent drop-shadow-lg animate-pulse-glow"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {names.to}
              </h2>
              <div className="flex items-center justify-center gap-3 text-pink-400 text-2xl">
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
              </div>
            </div>

            {/* Letter Body - Day Greeting */}
            <div className="text-center mb-10">
              <h3
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-500 via-pink-600 to-fuchsia-500 bg-clip-text text-transparent"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Happy {dayInfo.name}!
              </h3>
              <div className="text-5xl mb-6">{dayInfo.emoji}</div>
            </div>

            {/* Multiple Quotes Section */}
            {quotes && quotes.length > 0 && (
              <div className="space-y-8 mb-12">
                {quotes.slice(0, 3).map((quote, index) => (
                  <div 
                    key={index} 
                    className="relative py-6 px-4 border-l-4 border-pink-300"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="text-3xl mb-3 opacity-30 text-pink-400">❝</div>
                    <p
                      className="text-xl md:text-2xl text-pink-700 italic leading-relaxed pl-4"
                      style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                      {quote}
                    </p>
                    <div className="text-3xl mt-3 opacity-30 text-right text-pink-400">❞</div>
                  </div>
                ))}
              </div>
            )}

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 text-3xl my-8">
              {dayInfo.emoji} <span className="text-pink-300">✧</span> {dayInfo.emoji} <span className="text-pink-300">✧</span> {dayInfo.emoji}
            </div>

            {/* Letter Signature - From name in small */}
            <div className="text-center mt-10">
              <p
                className="text-lg md:text-xl text-pink-600/70 mb-2"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                With love,
              </p>
              <p
                className="text-2xl md:text-3xl text-pink-700 font-medium"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {names.from}
              </p>
            </div>
          </div>

          {/* Decorative bottom border */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent w-full max-w-md"></div>
            <span className="text-4xl mx-4">💕</span>
            <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent w-full max-w-md"></div>
          </div>
        </div>
      </div>

      {/* Attribution Footer */}
      <footer className="relative z-10 text-center py-6 mt-12 w-full">
        <div className="glass-card inline-block px-8 py-4">
          <p className="text-sm text-pink-600/80">
            Made with 💕 by{' '}
            <span className="font-semibold text-pink-700">{names.from}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

