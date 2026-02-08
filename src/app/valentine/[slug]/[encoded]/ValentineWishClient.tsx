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
  }
}
