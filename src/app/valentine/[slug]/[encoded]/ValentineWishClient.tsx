'use client';

import { VALENTINE_DAYS, type NamePair } from "@/utils/encoding";

// Import day-specific components
import RoseDayWish from "./days/RoseDayWish";
import ProposeDayWish from "./days/ProposeDayWish";
import ChocolateDayWish from "./days/ChocolateDayWish";
import TeddyDayWish from "./days/TeddyDayWish";
import PromiseDayWish from "./days/PromiseDayWish";
import HugDayWish from "./days/HugDayWish";
import KissDayWish from "./days/KissDayWish";
import ValentinesDayWish from "./days/ValentinesDayWish";

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
  // Route to day-specific component based on slug
  switch (day.slug) {
    case "rose-day":
      return <RoseDayWish day={day} names={names} quotes={quotes} />;
    case "propose-day":
      return <ProposeDayWish day={day} names={names} quotes={quotes} />;
    case "chocolate-day":
      return <ChocolateDayWish day={day} names={names} quotes={quotes} />;
    case "teddy-day":
      return <TeddyDayWish day={day} names={names} quotes={quotes} />;
    case "promise-day":
      return <PromiseDayWish day={day} names={names} quotes={quotes} />;
    case "hug-day":
      return <HugDayWish day={day} names={names} quotes={quotes} />;
    case "kiss-day":
      return <KissDayWish day={day} names={names} quotes={quotes} />;
    case "valentines-day":
      return <ValentinesDayWish day={day} names={names} quotes={quotes} />;
    default:
      // Fallback to a simple display (should never happen)
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="glass-card p-10 text-center">
            <div className="text-6xl mb-4">{day.emoji}</div>
            <h1 className="text-4xl font-bold text-pink-600 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Happy {day.name}!
            </h1>
            <p className="text-xl text-pink-700">
              Dear {names.to}, wishing you a wonderful {day.name}!
            </p>
            <p className="text-lg text-pink-600 mt-4">
              With love, {names.from} 💕
            </p>
          </div>
        </div>
      );
  }
}
