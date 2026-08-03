import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WorksTable } from "@/components/admin/works/works-table";
import { getWorks } from "@/actions/work";
import { cacheLife, cacheTag } from "next/cache";

export default async function WorksPage() {
    "use cache";
    cacheLife("max");
    cacheTag("portfolio-page");
    const works = await getWorks();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">
                        Works
                    </h1>

                    <p className="text-muted-foreground mt-2">
                        Manage portfolio projects.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/works/new" className="flex items-center justify-between gap-2">
                        <Plus className="mr-2 h-4 w-4" />
                        New Work
                    </Link>
                </Button>
            </div>

            <WorksTable works={works} />
        </div>
    );
}