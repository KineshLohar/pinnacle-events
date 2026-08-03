import { notFound } from "next/navigation";

import { WorkForm } from "@/components/admin/works/work-form";
import { getWorkById } from "@/lib/repository/work.repository";
import { Suspense } from "react";


interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditWorkPage({
  params,
}: Props) {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditWork params={params} />
    </Suspense>
  );
}

async function EditWork({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const work = await getWorkById(id);

  if (!work) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Work
        </h1>

        <p className="text-muted-foreground">
          Update your portfolio project.
        </p>
      </div>

      <WorkForm
        mode="edit"
        work={work}
      />
    </div>
  );
}
