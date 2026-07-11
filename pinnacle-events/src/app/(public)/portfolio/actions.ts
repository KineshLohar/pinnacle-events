"use server";

import { getCaseStudiesPage, PORTFOLIO_PAGE_SIZE } from "@/content/portfolio";

/**
 * Called from the client feed (PortfolioFeed) every time the sentinel at the
 * bottom of the grid scrolls into view. Right now it reads from the static
 * `caseStudies` array; once Drizzle/Postgres is wired up, only the inside of
 * `getCaseStudiesPage` (in content/portfolio.ts) needs to change -- this
 * action's signature and the client that calls it stay the same.
 */
export async function loadMoreCaseStudies(cursor: number) {
  // Simulated network latency so the loading state is real to test against.
  // Safe to remove once this hits an actual database round-trip.
  await new Promise((resolve) => setTimeout(resolve, 400));

  return getCaseStudiesPage(cursor, PORTFOLIO_PAGE_SIZE);
}