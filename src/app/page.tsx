import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto animate-fadeIn">
        {/* Main Heart */}
        <div className="text-8xl md:text-9xl mb-6 animate-heartbeat">
          💕
        </div>

        {/* Title */}
        <h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Happy Valentine&apos;s Day
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-pink-700 mb-4 font-light">
          ✨ A celebration of love, warmth, and togetherness ✨
        </p>

        <p className="text-lg text-pink-600/80 mb-12 max-w-2xl mx-auto">
          Love is the most beautiful feeling in the world.
          Let us take you on a journey to discover what love truly means.
        </p>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Learn About Love Card */}
          <Link href="/love" className="group">
            <div className="love-card group-hover:border-pink-400 transition-all cursor-pointer">
              <div className="text-5xl mb-4">📖</div>
              <h2
                className="text-2xl md:text-3xl font-bold text-pink-600 mb-3"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                What is Love?
              </h2>
              <p className="text-pink-700/80">
                Discover the beautiful aspects of love - trust, care, respect, and more.
                A journey to understand the deepest emotion.
              </p>
              <div className="mt-4 text-pink-500 font-semibold group-hover:text-pink-600 transition-colors">
                Explore Love →
              </div>
            </div>
          </Link>

          {/* Proposal Card */}
          <Link href="/proposal" className="group">
            <div className="love-card group-hover:border-rose-400 transition-all cursor-pointer">
              <div className="text-5xl mb-4 animate-heartbeat">💍</div>
              <h2
                className="text-2xl md:text-3xl font-bold text-rose-600 mb-3"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Be Mine?
              </h2>
              <p className="text-rose-700/80">
                A special moment awaits. Will you take the leap of love?
                The answer might surprise you! 😉
              </p>
              <div className="mt-4 text-rose-500 font-semibold group-hover:text-rose-600 transition-colors">
                Open Your Heart →
              </div>
            </div>
          </Link>
        </div>

        {/* Quote */}
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <p
            className="text-2xl md:text-3xl text-pink-700 italic"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            &ldquo;Love is not about how many days, months, or years
            you have been together. Love is about how much you love
            each other every single day.&rdquo;
          </p>
          <div className="mt-4 text-pink-500">💕 💕 💕</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-pink-500/70">
        <p>Made with 💖 for Valentine&apos;s Day 2026</p>
      </footer>
    </div>
  );
}
