import { notFound } from "next/navigation";

import { getAwardById } from "@/lib/repository/award.repository";

import { AwardForm } from "@/components/admin/awards/award-form";
import { Suspense } from "react";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditAwardPage({
    params,
}: Props) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Edit Award
                </h1>

                <p className="text-muted-foreground">
                    Update award details.
                </p>
            </div>
            <Suspense fallback={<></>}>
                <Editwork params={params} />
            </Suspense>
        </div>
    );
}

const Editwork = async ({ params }: Props) => {
    const { id } = await params;

    const award = await getAwardById(id);

    if (!award) {
        notFound();
    }
    return (
        <AwardForm
            mode="edit"
            award={award}
        />
    )
}