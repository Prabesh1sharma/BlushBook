import Link from "next/link";
import { VALENTINE_DAYS } from "@/utils/encoding";

export default function ValentineHubPage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 animate-fadeIn">
          <Link
            href="/"
            className="inline-block mb-8 text-pink-500 hover:text-pink-600 transition-colors"
          >
            ← Back to Home
          </Link>

          <div className="text-6xl mb-6 animate-heartbeat">💕</div>

          <h1
            className="text-5xl md:text-7xl font-bold mb-5 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Valentine Week
          </h1>

          <p className="text-xl text-pink-700 max-w-2xl mx-auto">
            Explore each special day, learn its meaning, and share a beautiful wish
            page with someone you love.
          </p>
        </div>

        {/* Days Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {VALENTINE_DAYS.map((day, index) => (
            <Link
              key={day.slug}
              href={`/valentine/${day.slug}`}
              className="group"
            >
              <div
                className="love-card group-hover:border-pink-400 transition-all cursor-pointer animate-fadeIn"
                style={{ animationDelay: `${0.08 * (index + 1)}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl md:text-6xl animate-heartbeat">
                    {day.emoji}
                  </div>
                  <div className="flex-1">
                    <h2
                      className="text-3xl md:text-4xl font-bold text-pink-600 mb-1"
                      style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                      {day.name}
                    </h2>
                    <p className="text-pink-700/80">{day.date}</p>
                    <div className="mt-3 text-pink-500 font-semibold group-hover:text-pink-600 transition-colors">
                      Know what it means →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center py-6 mt-12">
          <div className="glass-card inline-block px-8 py-4">
            <p className="text-sm text-pink-600/80">
              Tip: Use <span className="font-semibold">/admin</span> to generate
              personalized wish links.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

