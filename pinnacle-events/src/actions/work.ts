"use server";

import { revalidateTag } from "next/cache";

import { db } from "@/lib/db";
import { workSchema } from "@/lib/validations/work";

interface ActionResult {
  success: boolean;
  message: string;
}

export async function getWorks() {
  return db.query.works.findMany({
    columns: {
      id: true,
      title: true,
      client: true,
      coverImage: true,
      projectDate: true,
      featured: true,
      isPublished: true,
    },
    orderBy: (works, { desc }) => [
      desc(works.projectDate),
    ],
  });
}

export async function createWorkAction(values: unknown) {
  const parsed = workSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten(),
    };
  }

  const data = parsed.data;

  try {
    // DB insert comes next

    revalidateTag("portfolio-page", "max");

    return {
      success: true,
      message: "Work created successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}