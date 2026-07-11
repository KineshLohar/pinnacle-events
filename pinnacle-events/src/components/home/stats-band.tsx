
import { Container } from "@/components/layout/container";
import { stats } from "@/content/home-data";
import { cacheLife, cacheTag } from "next/cache";
import { StatItem } from "./stats-item";

export async function StatsBand() {
  "use cache"
  cacheLife("max");
  cacheTag("stats-band");

  return (
    <section className="py-24 md:py-32 border-t border-border-hairline">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
