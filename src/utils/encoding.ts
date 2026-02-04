/**
 * Encoding utilities for Valentine Week URLs
 * Encodes and decodes "From" and "To" names in URL-safe Base64
 */

export interface NamePair {
    from: string;
    to: string;
}

/**
 * Encode the from and to names into a URL-safe Base64 string
 */
export function encodeNames(from: string, to: string): string {
    const data = JSON.stringify({ from, to });
    // Use base64 encoding and make it URL-safe
    const base64 = Buffer.from(data).toString('base64');
    // Replace + with -, / with _, and remove = padding
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decode a URL-safe Base64 string back to from and to names
 */
export function decodeNames(encoded: string): NamePair | null {
    try {
        // Restore Base64 characters
        let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        // Add back padding if needed
        while (base64.length % 4) {
            base64 += '=';
        }
        const data = Buffer.from(base64, 'base64').toString('utf-8');
        const parsed = JSON.parse(data);
        if (parsed.from && parsed.to) {
            return { from: parsed.from, to: parsed.to };
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Valentine Week day information
 * slug: used in URLs like /valentine/[slug] and /valentine/[slug]/[encoded]
 */
export const VALENTINE_DAYS = [
    { day: 1, slug: 'rose-day', name: 'Rose Day', date: 'February 7', emoji: '🌹', color: 'rose' },
    { day: 2, slug: 'propose-day', name: 'Propose Day', date: 'February 8', emoji: '💍', color: 'pink' },
    { day: 3, slug: 'chocolate-day', name: 'Chocolate Day', date: 'February 9', emoji: '🍫', color: 'amber' },
    { day: 4, slug: 'teddy-day', name: 'Teddy Day', date: 'February 10', emoji: '🧸', color: 'orange' },
    { day: 5, slug: 'promise-day', name: 'Promise Day', date: 'February 11', emoji: '🤝', color: 'purple' },
    { day: 6, slug: 'hug-day', name: 'Hug Day', date: 'February 12', emoji: '🤗', color: 'teal' },
    { day: 7, slug: 'kiss-day', name: 'Kiss Day', date: 'February 13', emoji: '💋', color: 'red' },
    { day: 8, slug: 'valentines-day', name: "Valentine's Day", date: 'February 14', emoji: '💕', color: 'fuchsia' },
] as const;

/**
 * Meaning / explanation text for each Valentine day, keyed by slug
 */
export const VALENTINE_MEANINGS: Record<string, { intro: string; points: string[] }> = {
    'rose-day': {
        intro:
            "Rose Day is the beautiful beginning of Valentine Week. It's the day when feelings start to bloom just like a rose.",
        points: [
            "Roses are a timeless symbol of love, admiration, and affection.",
            "A red rose says 'I love you' without using any words.",
            "On this day, people express their feelings through roses—sometimes shyly, sometimes boldly.",
            "Each rose you give carries a little piece of your heart with it.",
        ],
    },
    'propose-day': {
        intro:
            "Propose Day is the day when hidden feelings finally find the courage to speak out loud.",
        points: [
            "It's about confessing your love with honesty and a hopeful heart.",
            "A proposal doesn’t have to be grand—it just has to be true.",
            "On this day, many beautiful love stories officially begin.",
            "Sometimes, a simple 'Will you be mine?' can change two lives forever.",
        ],
    },
    'chocolate-day': {
        intro:
            "Chocolate Day is all about adding sweetness to your relationship.",
        points: [
            "Chocolate symbolizes comfort, happiness, and joy shared together.",
            "Gifting chocolates is a way to say, 'You make my life sweeter.'",
            "Every bite carries warmth, care, and a little bit of love.",
            "Like chocolate, true love melts away worries and fills the heart with happiness.",
        ],
    },
    'teddy-day': {
        intro:
            "Teddy Day is about warmth, comfort, and the feeling of being held close.",
        points: [
            "A teddy bear represents innocence, softness, and gentle love.",
            "People gift teddies so their loved one always has something to hug.",
            "It’s a promise of presence—even when you’re not physically there.",
            "Every time they hug the teddy, they’re really hugging your love.",
        ],
    },
    'promise-day': {
        intro:
            "Promise Day is where words turn into lifelong commitments from the heart.",
        points: [
            "It’s a day to make sincere promises of love, loyalty, and support.",
            "Promises are the threads that hold two hearts together through every season.",
            "A true promise is not just spoken—it is lived, every single day.",
            "On this day, couples vow to grow, stay, and love through it all.",
        ],
    },
    'hug-day': {
        intro:
            "Hug Day celebrates the magic of a simple embrace that says more than a thousand words.",
        points: [
            "A hug can calm storms inside the heart without saying anything.",
            "It’s a safe space where two souls feel protected and understood.",
            "On this day, people hold their loved ones a little tighter and a little longer.",
            "A warm hug can heal wounds that even words cannot reach.",
        ],
    },
    'kiss-day': {
        intro:
            "Kiss Day is a celebration of closeness, passion, and deep emotional connection.",
        points: [
            "A kiss is one of the most intimate ways to say 'I love you.'",
            "It seals promises, deepens bonds, and captures moments in time.",
            "On this day, couples express love through gentle, loving gestures.",
            "A single kiss can say what the heart struggles to express in words.",
        ],
    },
    'valentines-day': {
        intro:
            "Valentine's Day is the grand celebration of love in all its beautiful forms.",
        points: [
            "It’s a day to cherish your partner, your crush, or even the idea of true love.",
            "People express gratitude for the love they have and the love they hope for.",
            "From handwritten notes to grand surprises, every gesture comes from the heart.",
            "Most importantly, it’s a reminder that love is the greatest gift of all.",
        ],
    },
};

/**
 * Get quotes for each Valentine day
 */
export const VALENTINE_QUOTES: Record<number, string[]> = {
    1: [
        "A single rose can be my garden, a single friend, my world.",
        "Roses are red, violets are blue, sugar is sweet, and so are you!",
        "Where flowers bloom, so does hope and love.",
        "Like a rose, you bring beauty and fragrance to my life.",
        "In a field of roses, you are the one that stands out to me.",
        "Every rose has its thorn, but with you, every thorn is worth it.",
    ],
    2: [
        "I choose you. And I'll choose you over and over again.",
        "Every love story is beautiful, but ours is my favorite.",
        "You are my today and all of my tomorrows.",
        "I fell in love with you because of a million tiny things you never knew you were doing.",
        "Will you be my forever? Because I can't imagine my life without you.",
        "You had me at hello, and you'll have me forever.",
    ],
    3: [
        "Life is like a box of chocolates, sweet moments to share with you.",
        "You make life sweeter than the sweetest chocolate.",
        "Love is sweet when it's new, but sweeter when it's true.",
        "You're the chocolate to my Valentine's Day - sweet, irresistible, and always wanted.",
        "Like chocolate melts in your mouth, my heart melts for you.",
        "Life without you would be like chocolate without sweetness.",
    ],
    4: [
        "I'll be your teddy bear, always there to hold you tight.",
        "Soft, cuddly, and always there for you - just like my love.",
        "Every time you hug a teddy, remember you're hugging my heart.",
        "Just like a teddy bear, I want to be your comfort in every moment.",
        "You're the teddy to my bear - soft, warm, and forever cherished.",
        "May this teddy remind you that you're always in my arms, even when we're apart.",
    ],
    5: [
        "I promise to love you forever, through every up and down.",
        "A promise is forever, and so is my love for you.",
        "I promise to be your best friend, your partner, and your love.",
        "I promise to choose you every single day, for the rest of my life.",
        "My promise to you: I will love you in sunshine and in rain, in joy and in pain.",
        "I promise to be your safe place, your happy place, your forever place.",
    ],
    6: [
        "A hug is a silent way of saying, 'You matter to me.'",
        "Sometimes a hug is all you need to feel better.",
        "Let me hold you close and never let you go.",
        "In your arms, I found my home. In your hug, I found my peace.",
        "A hug from you is worth a thousand words and a million smiles.",
        "I want to be the reason you look forward to every hug.",
    ],
    7: [
        "A kiss is a lovely trick designed by nature to stop speech.",
        "Your lips are like wine, and I want to get drunk.",
        "Sealed with a kiss, my heart is forever yours.",
        "Every kiss with you feels like the first time and the forever time.",
        "Your kiss is the poetry my heart has been waiting to read.",
        "In your kiss, I taste tomorrow and all the beautiful moments yet to come.",
    ],
    8: [
        "You are my Valentine today, tomorrow, and forever.",
        "My heart beats only for you, my Valentine.",
        "Love is not finding someone to live with; it's finding someone you can't live without.",
        "On this Valentine's Day and every day, you are my greatest love story.",
        "You're not just my Valentine, you're my always and forever.",
        "Every day with you is Valentine's Day, but today we celebrate it extra special.",
    ],
};
