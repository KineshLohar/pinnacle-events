import Link from "next/link";


import { Button } from "@/components/ui/button";
import { getAwards } from "@/actions/award.action";
import { cacheLife, cacheTag } from "next/cache";
import { AwardsTable } from "@/components/admin/awards/awards-table";

export default async function AwardsPage() {
    "use cache";
    cacheLife("max");
    cacheTag("awards");
    const awards = await getAwards();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Awards
                    </h1>

                    <p className="text-muted-foreground">
                        Manage company awards.
                    </p>
                </div>

                <Button asChild>
                    <Link href="/admin/awards/new">
                        Add Award
                    </Link>
                </Button>
            </div>

            <AwardsTable awards={awards} />
        </div>
    );
}