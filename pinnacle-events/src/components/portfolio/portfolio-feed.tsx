"use client";

import { loadMoreWorks } from "@/actions/work";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { RevealGroup } from "@/components/shared/reveal";
import { getPortfolioPage } from "@/lib/repository/work.repository";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type PortfolioItem = Awaited<
  ReturnType<typeof getPortfolioPage>
>[number];

type Props = {
  initialItems: PortfolioItem[];
};

export function PortfolioFeed({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialItems.length === 8);

  async function handleLoadMore() {
    setLoading(true);

    try {
      const page = await loadMoreWorks(items.length);

      if (!page.success) {
        toast.error(page.message);
        return;
      }

      setItems((prev) => [
        ...prev,
        ...page.items,
      ]);

      setHasMore(page.hasMore);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to load more projects.",
      );
    } finally {
      setLoading(false);
    }
  }

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
            category={c.eventType}
            coverImage={c.coverImageUrl}
          />
        ))}
      </RevealGroup>

      <div className="mt-14 flex justify-center">
        {hasMore ? (
          <Button
            size="lg"
            onClick={
              handleLoadMore
            }
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "Load More"}
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            That's all, folks.
          </p>
        )}
      </div>

    </div>
  );
}