import { notFound } from "next/navigation";
import { decodeNames, VALENTINE_DAYS, VALENTINE_QUOTES } from "@/utils/encoding";
import ValentineWishClient from "./ValentineWishClient";

interface PageProps {
  params: Promise<{
    slug: string;
    encoded: string;
  }>;
}

export default async function ValentineWishPage({ params }: PageProps) {
  const { slug, encoded } = await params;

  const day = VALENTINE_DAYS.find((d) => d.slug === slug);
  if (!day) {
    notFound();
  }

  const names = decodeNames(encoded);
  if (!names) {
    notFound();
  }

  const quotes = VALENTINE_QUOTES[day.day] || [];

  return (
    <ValentineWishClient
      day={day}
      names={names}
      quotes={quotes}
    />
  );
}

