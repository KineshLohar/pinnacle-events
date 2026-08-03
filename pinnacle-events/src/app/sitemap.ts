import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

import { getPortfolioSlugs } from "@/lib/repository/work.repository";

const BASE_URL = "https://www.pinnacleevents.co.in";

const EXCLUDED_FOLDERS = new Set([
  "api",
]);

function getStaticRoutes(
  dir: string,
  currentRoute = "",
): string[] {
  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  const routes: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const name = entry.name;

    // Ignore API routes
    if (EXCLUDED_FOLDERS.has(name)) continue;

    // Ignore route groups like (marketing)
    if (name.startsWith("(") && name.endsWith(")")) {
      routes.push(
        ...getStaticRoutes(
          path.join(dir, name),
          currentRoute,
        ),
      );
      continue;
    }

    // Ignore dynamic routes like [slug]
    if (name.startsWith("[") && name.endsWith("]")) {
      continue;
    }

    // Ignore private folders
    if (name.startsWith("_")) {
      continue;
    }

    const route = `${currentRoute}/${name}`;

    routes.push(route);

    routes.push(
      ...getStaticRoutes(
        path.join(dir, name),
        route,
      ),
    );
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = path.join(process.cwd(), "src", "app");

  const staticRoutes = [
    "",
    ...getStaticRoutes(appDir),
  ];

  const works = await getPortfolioSlugs();

  const dynamicRoutes = works.map((work) => ({
    url: `${BASE_URL}/portfolio/${work.slug}`,
    lastModified: work.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  return [...staticEntries, ...dynamicRoutes];
}