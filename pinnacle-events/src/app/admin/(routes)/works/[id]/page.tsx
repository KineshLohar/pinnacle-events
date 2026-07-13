import { notFound } from "next/navigation";

import { getWorkById } from "@/lib/repository/work.repository";
import { WorkForm } from "@/components/admin/works/work-form";
import { cacheLife, cacheTag } from "next/cache";


interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditWorkPage({
  params,
}: Props) {
  "use cache";
  const { id } = await params;

  cacheLife("max");
  cacheTag(`portfolio-${id}`)
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

      <WorkForm mode="edit" work={work} />
    </div>
  );
}