import { Award as AwardIcon } from "lucide-react";
import Image from "next/image";

interface AwardCardProps {
  award: {
    id: string;
    name: string;
    excerpt: string;
    imageUrl: string;
    awardDate: string;
  };
}

export function AwardCard({ award }: AwardCardProps) {
  return (
    <div className="corner-brackets border border-border-hairline rounded-lg overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-bg-surface">
        {award.imageUrl ? (
          <Image
            src={award.imageUrl}
            alt={`Pinnacle Events receiving the ${award.name}`}
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
        <p className="font-mono-tag text-[12px] text-gold-primary">
          {new Date(award.awardDate).getFullYear()}
        </p>
        <p className="font-display text-xl leading-snug">{award.name}</p>
        <p className="text-sm text-text-tertiary">{award.excerpt}</p>
      </div>
    </div>
  );
}