import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ServiceCard({
  name,
  slug,
  description,
}: {
  name: string;
  slug: string;
  description: string;
}) {
  return (
    <Link
      href={`/services/${slug}`}
      className="corner-brackets group block border border-border-hairline rounded-lg p-8 hover:border-border-hairline-strong transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl leading-snug">{name}</h3>
        <ArrowUpRight className="w-5 h-5 text-text-tertiary group-hover:text-gold-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
      </div>
      <p className="mt-4 text-sm text-text-secondary leading-relaxed">{description}</p>
    </Link>
  );
}
