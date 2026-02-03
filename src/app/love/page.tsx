import Link from "next/link";

const loveAspects = [
    {
        icon: "🤝",
        title: "Trust",
        description: "Love begins with trust. It's the foundation that holds two hearts together. When you trust someone, you open your heart completely, knowing they will cherish it.",
        color: "from-pink-400 to-rose-400",
    },
    {
        icon: "💝",
        title: "Care",
        description: "To love is to care deeply. It's the gentle touch when they're unwell, the warm meal when they're hungry, the soft words when they're troubled.",
        color: "from-rose-400 to-pink-500",
    },
    {
        icon: "🙏",
        title: "Respect",
        description: "True love respects. It honors boundaries, values opinions, and celebrates differences. Respect is love in action.",
        color: "from-pink-500 to-fuchsia-400",
    },
    {
        icon: "⏳",
        title: "Patience",
        description: "Love is patient. It waits, it understands, it forgives. In the garden of love, patience is the water that makes everything bloom.",
        color: "from-fuchsia-400 to-purple-400",
    },
    {
        icon: "💪",
        title: "Commitment",
        description: "Love is a promise kept through storms and sunshine. It's standing together when the world tries to pull you apart.",
        color: "from-purple-400 to-pink-400",
    },
    {
        icon: "😊",
        title: "Joy",
        description: "Love brings joy - the kind that makes your heart dance. It's the smile that appears when you think of them, the warmth that fills you when they're near.",
        color: "from-pink-400 to-rose-300",
    },
];

export default function LovePage() {
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

                    <div className="text-6xl mb-6 animate-heartbeat">📖💕</div>

                    <h1
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        What is Love?
                    </h1>

                    <p className="text-xl text-pink-700 max-w-2xl mx-auto">
                        Love is the most powerful force in the universe. It transforms, heals,
                        and connects souls in ways nothing else can. Let&apos;s explore its beautiful aspects.
                    </p>
                </div>

                {/* Opening Quote */}
                <div className="glass-card p-8 text-center mb-16 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    <p
                        className="text-2xl md:text-3xl text-pink-700 italic"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        &ldquo;Love is composed of a single soul inhabiting two bodies.&rdquo;
                    </p>
                    <p className="mt-4 text-pink-500 font-medium">— Aristotle</p>
                </div>

                {/* Love Aspects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {loveAspects.map((aspect, index) => (
                        <div
                            key={aspect.title}
                            className="love-card animate-fadeIn group"
                            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                        >
                            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${aspect.color} flex items-center justify-center text-4xl mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                                {aspect.icon}
                            </div>
                            <h3
                                className="text-2xl font-bold text-pink-600 mb-3 text-center"
                                style={{ fontFamily: "'Dancing Script', cursive" }}
                            >
                                {aspect.title}
                            </h3>
                            <p className="text-pink-700/80 text-center leading-relaxed">
                                {aspect.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* The Meaning Section */}
                <div className="glass-card p-10 mb-16 animate-fadeIn">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-8"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        The True Meaning of Love 💕
                    </h2>

                    <div className="space-y-6 text-pink-700 text-lg leading-relaxed">
                        <p>
                            <span className="text-2xl">💗</span> Love is not just a feeling—it&apos;s a choice you make every day.
                            It&apos;s waking up and choosing that person again and again, through good times and bad.
                        </p>

                        <p>
                            <span className="text-2xl">💗</span> Love is being vulnerable. It&apos;s letting someone see your
                            imperfections and trusting they&apos;ll still stay. It&apos;s showing your scars and finding
                            someone who calls them beautiful.
                        </p>

                        <p>
                            <span className="text-2xl">💗</span> Love is growth. It&apos;s two people becoming better versions
                            of themselves, not because they have to, but because they inspire each other to.
                        </p>

                        <p>
                            <span className="text-2xl">💗</span> Love is simple moments—a shared laugh, a knowing glance,
                            comfortable silence. It&apos;s finding home in a person, not a place.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center animate-fadeIn">
                    <p
                        className="text-2xl text-pink-600 mb-6"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Now that you know what love is...
                    </p>

                    <Link href="/proposal">
                        <button className="romantic-btn text-xl px-10 py-4 animate-pulse-glow">
                            💍 Ready for Something Special? 💍
                        </button>
                    </Link>
                </div>

                {/* Closing Quote */}
                <div className="text-center mt-16 animate-fadeIn">
                    <p
                        className="text-xl text-pink-500 italic"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        &ldquo;The best thing to hold onto in life is each other.&rdquo;
                    </p>
                    <p className="mt-2 text-pink-400">— Audrey Hepburn 💕</p>
                </div>
            </div>
        </div>
    );
}
