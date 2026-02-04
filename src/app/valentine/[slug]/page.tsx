import Link from "next/link";
import { notFound } from "next/navigation";
import { VALENTINE_DAYS, VALENTINE_MEANINGS } from "@/utils/encoding";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ValentineInfoPage({ params }: PageProps) {
  const { slug } = await params;

  const day = VALENTINE_DAYS.find((d) => d.slug === slug);

  if (!day) {
    notFound();
  }

  const meaning = VALENTINE_MEANINGS[slug];

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <Link
            href="/"
            className="inline-block mb-8 text-pink-500 hover:text-pink-600 transition-colors"
          >
            ← Back to Home
          </Link>

          <div className="text-6xl mb-4 animate-heartbeat">{day.emoji}</div>

          <h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-linear-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {day.name}
          </h1>

          <p className="text-lg md:text-xl text-pink-700">
            {day.date} • A special chapter of Valentine Week
          </p>
        </div>

        {/* Meaning Section */}
        <div className="glass-card p-8 md:p-10 mb-12 animate-fadeIn">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            What does {day.name} mean?
          </h2>

          <p className="text-pink-700 text-lg leading-relaxed mb-6">
            {meaning?.intro}
          </p>

          <div className="space-y-4 text-pink-700 text-lg leading-relaxed">
            {meaning?.points.map((point, index) => (
              <p key={index}>
                <span className="text-2xl mr-2">{day.emoji}</span>
                {point}
              </p>
            ))}
          </div>
        </div>

        {/* Gentle Note */}
        <div className="glass-card p-8 text-center animate-fadeIn">
          <p
            className="text-2xl md:text-3xl text-pink-700 italic leading-relaxed mb-4"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Every day of Valentine Week is a little doorway to express love in a
            new way. Today is all about{" "}
            <span className="font-semibold text-pink-600">{day.name}</span>.
          </p>
          <p className="text-pink-600">
            Someone special has chosen this day just for you, to make you feel
            loved, cherished, and truly important. 💕
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 mt-12">
          <div className="glass-card inline-block px-8 py-4">
            <p className="text-sm text-pink-600/80">
              Made with 💕 to celebrate {day.name}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

