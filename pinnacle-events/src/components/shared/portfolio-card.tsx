import Link from "next/link";

export function PortfolioCard({
  title,
  slug,
  client,
  location,
  category,
}: {
  title: string;
  slug: string;
  client: string;
  location: string;
  category: string;
}) {
  return (
    <Link href={`/portfolio/${slug}`} className="corner-brackets group block">
      <div className="aspect-[4/5] rounded-lg bg-bg-surface border border-border-hairline overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center text-text-tertiary text-xs font-mono-tag">
          {category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-lg leading-snug">{title}</p>
          <p className="text-sm text-text-tertiary mt-1">
            {client} — {location}
          </p>
        </div>
      </div>
    </Link>
  );
}
