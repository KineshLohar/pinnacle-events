"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { RevealGroup } from "@/components/shared/reveal";
import { loadMoreCaseStudies } from "@/app/(public)/portfolio/actions";
import type { CaseStudy } from "@/lib/schemas";

type Props = {
  initialItems: CaseStudy[];
  initialNextCursor: number | null;
  initialHasMore: boolean;
};

export function PortfolioFeed({ initialItems, initialNextCursor, initialHasMore }: Props) {
  const [items, setItems] = useState(initialItems);
  const [cursor, setCursor] = useState(initialNextCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false); // guards against duplicate fetches from rapid intersection events

  const loadMore = useCallback(async () => {
    if (cursor === null || loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError(false);

    try {
      const page = await loadMoreCaseStudies(cursor);
      setItems((prev) => [...prev, ...page.items]);
      setCursor(page.nextCursor);
      setHasMore(page.hasMore);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [cursor]);

  useEffect(() => {
    if (!hasMore) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px" }, // start fetching before the user actually hits bottom
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <div>
      <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((c) => (
          <PortfolioCard
            key={c.slug}
            title={c.title}
            slug={c.slug}
            client={c.client}
            location={c.location}
            category={c.category}
          />
        ))}
      </RevealGroup>

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center pt-16">
          {loading && (
            <p className="font-mono-tag text-[12px] text-text-tertiary animate-pulse">
              Loading more work…
            </p>
          )}
          {error && (
            <button
              type="button"
              onClick={loadMore}
              className="text-sm text-gold-primary hover:text-gold-bright transition-colors"
            >
              Couldn&apos;t load more work — tap to retry
            </button>
          )}
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <p className="text-center text-sm text-text-tertiary pt-16">
          You&apos;ve seen all our work so far.
        </p>
      )}
    </div>
  );
}