import Image from "next/image";
import { Award as AwardIcon } from "lucide-react";
import type { Award } from "@/lib/schemas";

export function AwardCard({ award }: { award: Award }) {
  return (
    <div className="corner-brackets border border-border-hairline rounded-lg overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-bg-surface">
        {award.imageUrl ? (
          <Image
            src={award.imageUrl}
            alt={`Pinnacle Events receiving the ${award.title}, ${award.year}`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <AwardIcon className="w-8 h-8 text-text-tertiary" />
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col gap-2">
        <p className="font-mono-tag text-[12px] text-gold-primary">{award.year}</p>
        <p className="font-display text-xl leading-snug">{award.title}</p>
        <p className="text-sm text-text-tertiary">{award.org}</p>
      </div>
    </div>
  );
}