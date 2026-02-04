import { redirect } from "next/navigation";
import { VALENTINE_DAYS } from "@/utils/encoding";

interface PageProps {
  params: Promise<{
    encoded: string;
    day: string;
  }>;
}

export default async function ValentineDayPage({ params }: PageProps) {
  const { encoded, day } = await params;
  const dayNumber = parseInt(day, 10);

  // Validate day number (1-8)
  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 8) {
    redirect("/valentine");
  }

  const dayInfo = VALENTINE_DAYS[dayNumber - 1];
  // Old format: /{encoded}/{dayNumber}
  // New format: /valentine/{slug}/{encoded}
  redirect(`/valentine/${dayInfo.slug}/${encoded}`);
}
