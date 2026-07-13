"use server";

import { revalidateTag } from "next/cache";

import { destroyImages } from "@/lib/cloudinary/destroy";
import { uploadImage, uploadImages } from "@/lib/cloudinary/upload";
import { db } from "@/lib/db";
import { createWork, deleteWork, findWorkBySlug, getWorkById, updateWork } from "@/lib/repository/work.repository";
import { workClientSchema } from "@/lib/validations/work";
import { formDataToWork } from "@/lib/work.form-data";
import { ExistingCoverImage } from "@/lib/types";

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
      coverImageUrl: true,
      projectDate: true,
      featured: true,
      isPublished: true,
    },
    orderBy: (works, { desc }) => [
      desc(works.projectDate),
    ],
  });
}

export async function createWorkAction(
  formData: FormData,
): Promise<ActionResult> {
  const values = formDataToWork(formData);

  const parsed = workClientSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the form errors.",
    };
  }

  const data = parsed.data;

  if (data.gallery.length === 0) {
    return { success: false, message: "Please add at least one gallery image." };
  }

  const existing =
    await findWorkBySlug(data.slug);

  if (existing) {
    return {
      success: false,
      message:
        "A work with this slug already exists.",
    };
  }

  const uploadedPublicIds: string[] = [];

  try {
    const uploadedCover =
      await uploadImage(data.coverImage!);

    uploadedPublicIds.push(
      uploadedCover.publicId,
    );

    const uploadedGallery =
      await uploadImages(
        data.gallery.map(
          (image) => image.image,
        ),
      );

    uploadedGallery.forEach((image) =>
      uploadedPublicIds.push(
        image.publicId,
      ),
    );

    await createWork({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,

      client: data.client,
      eventType: data.eventType,
      location: data.location,

      coverImageUrl:
        uploadedCover.url,
      coverImagePublicId:
        uploadedCover.publicId,

      projectDate: data.projectDate,

      objective:
        data.objective ?? "",
      challenge:
        data.challenge ?? "",
      execution:
        data.execution ?? "",
      outcome:
        data.outcome ?? "",

      featured: data.featured,
      isPublished:
        data.isPublished,

      gallery: uploadedGallery.map(
        (image, index) => ({
          imageUrl: image.url,
          publicId: image.publicId,
          alt:
            data.gallery[index]?.alt ??
            "",
        }),
      ),
    });

    revalidateTag("portfolio-page", "max");

    return {
      success: true,
      message:
        "Work created successfully.",
    };
  } catch (error) {
    console.error(error);

    await destroyImages(uploadedPublicIds);

    return {
      success: false,
      message:
        "Unable to create work.",
    };
  }
}

export async function updateWorkAction(
  formData: FormData,
): Promise<ActionResult> {
  const id = formData.get("id") as string;

  const existingCover =
    JSON.parse(
      (formData.get("existingCover") as string) ??
      "null",
    ) as ExistingCoverImage | null;

  const existingGallery = JSON.parse(
    (formData.get("existingGallery") as string) ??
    "[]",
  );



  const removedGallery: string[] = JSON.parse(
    (formData.get("removedGallery") as string) ??
    "[]",
  );

  const values = formDataToWork(formData);

  const parsed =
    workClientSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
    };
  }

  const data = parsed.data;

  if (existingGallery.length + data.gallery.length === 0) {
    return {
      success: false,
      message: "Please add at least one gallery image.",
    };
  }

  const work = await getWorkById(id);

  if (!work) {
    return {
      success: false,
      message: "Work not found.",
    };
  }

  const duplicate =
    await findWorkBySlug(data.slug);

  if (duplicate && duplicate.id !== id) {
    return {
      success: false,
      message:
        "Slug already exists.",
    };
  }

  const uploadedPublicIds: string[] = [];

  let cover: ExistingCoverImage | null = existingCover;



  try {
    if (data.coverImage) {
      const uploaded = await uploadImage(data.coverImage);

      uploadedPublicIds.push(uploaded.publicId);

      cover = {
        url: uploaded.url,
        publicId: uploaded.publicId,
      };
    }

    if (!cover) {
      return {
        success: false,
        message: "Cover image is required.",
      };
    }

    const uploadedGallery =
      await uploadImages(
        data.gallery.map(
          (x) => x.image,
        ),
      );

    uploadedGallery.forEach((image) =>
      uploadedPublicIds.push(
        image.publicId,
      ),
    );

    await updateWork({
      id,

      data,

      cover,

      existingGallery,

      removedGallery,

      uploadedGallery: uploadedGallery.map(
        (image, index) => ({
          url: image.url,
          publicId: image.publicId,
          alt: data.gallery[index]?.alt ?? "",
        }),
      ),
    });

    if (
      data.coverImage &&
      work.coverImagePublicId
    ) {
      await destroyImages([
        work.coverImagePublicId,
      ]);
    }

    const removedPublicIds =
      work.gallery
        .filter((x) =>
          removedGallery.includes(x.id),
        )
        .map((x) => x.publicId);

    await destroyImages(
      removedPublicIds,
    );

    revalidateTag(
      "portfolio-page", "max"
    );

    revalidateTag(
      "featured-portfolio", "max"
    );

    return {
      success: true,
      message:
        "Work updated successfully.",
    };
  } catch (error) {
    console.error(error);

    await destroyImages(
      uploadedPublicIds,
    );

    return {
      success: false,
      message:
        "Unable to update work.",
    };
  }
}

export async function deleteWorkAction(
  id: string,
): Promise<ActionResult> {
  console.log("WORKD DELETE ID", id);
  
  const work = await getWorkById(id);

  if (!work) {
    return {
      success: false,
      message: "Work not found.",
    };
  }

  try {
    const publicIds = [
      work.coverImagePublicId,
      ...work.gallery.map(
        (image) => image.publicId,
      ),
    ];

    await destroyImages(publicIds);

    await deleteWork(id);

    revalidateTag("portfolio-page", "max");
    revalidateTag(
      "featured-portfolio",
      "max",
    );
    revalidateTag(
      `portfolio-${id}`,
      "max",
    );

    return {
      success: true,
      message:
        "Work deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        "Unable to delete work.",
    };
  }
}