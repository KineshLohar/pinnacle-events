import { Metadata } from "next";

import { WorkForm } from "@/components/admin/works/work-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "New Work",
};

export default function NewWorkPage() {


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Create Work
        </h1>

        <p className="mt-2 text-muted-foreground">
          Add a new portfolio project.
        </p>
      </div>
      <Suspense fallback={<></>}>
        <WorkForm
          mode="create"
        />
      </Suspense>
    </div>
  );
}