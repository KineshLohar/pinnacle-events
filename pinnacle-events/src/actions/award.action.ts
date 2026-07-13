"use server";

import { revalidateTag } from "next/cache";

import { destroyImages } from "@/lib/cloudinary/destroy";
import {
  uploadImage,
} from "@/lib/cloudinary/upload";

import {
  createAward,
  deleteAward,
  getAwardById,
  getAwards as getAwardsRepository,
  getLatestAwardsRepository,
  getPublicAwardsRepository,
  updateAward,
} from "@/lib/repository/award.repository";

import { awardClientSchema } from "@/lib/validations/award.validation";
import { formDataToAward } from "@/lib/award.form-data";
import { ExistingCoverImage } from "@/lib/types";

interface ActionResult {
  success: boolean;
  message: string;
}

export async function getAwards() {
  return getAwardsRepository();
}

export async function createAwardAction(
  formData: FormData,
): Promise<ActionResult> {
  const values = formDataToAward(formData);

  const parsed =
    awardClientSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the form errors.",
    };
  }

  const data = parsed.data;

  if (!data.image) {
    return {
      success: false,
      message: "Award image is required.",
    };
  }

  const uploadedPublicIds: string[] = [];

  try {
    const uploaded =
      await uploadImage(data.image);

    uploadedPublicIds.push(
      uploaded.publicId,
    );

    await createAward({
      name: data.name,

      excerpt: data.excerpt,

      awardDate: data.awardDate,

      imageUrl: uploaded.url,

      imagePublicId:
        uploaded.publicId,
    });

    revalidateTag("awards", "max");

    return {
      success: true,
      message:
        "Award created successfully.",
    };
  } catch (error) {
    console.error(error);

    await destroyImages(uploadedPublicIds);

    return {
      success: false,
      message:
        "Unable to create award.",
    };
  }
}

export async function updateAwardAction(
  formData: FormData,
): Promise<ActionResult> {
  const id = formData.get("id") as string;

  const existingImage = JSON.parse(
    (formData.get(
      "existingImage",
    ) as string) ?? "null",
  ) as ExistingCoverImage | null;

  const values = formDataToAward(formData);

  const parsed =
    awardClientSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
    };
  }

  const data = parsed.data;

  const award = await getAwardById(id);

  if (!award) {
    return {
      success: false,
      message: "Award not found.",
    };
  }

  const uploadedPublicIds: string[] = [];

  let image = existingImage;

  try {
    if (data.image) {
      const uploaded =
        await uploadImage(data.image);

      uploadedPublicIds.push(
        uploaded.publicId,
      );

      image = {
        url: uploaded.url,
        publicId: uploaded.publicId,
      };
    }

    if (!image) {
      return {
        success: false,
        message: "Award image is required.",
      };
    }

    await updateAward({
      id,

      name: data.name,

      excerpt: data.excerpt,

      awardDate: data.awardDate,

      image,
    });

    if (
      data.image &&
      award.imagePublicId
    ) {
      await destroyImages([
        award.imagePublicId,
      ]);
    }

    revalidateTag("awards", "max");

    return {
      success: true,
      message:
        "Award updated successfully.",
    };
  } catch (error) {
    console.error(error);

    await destroyImages(
      uploadedPublicIds,
    );

    return {
      success: false,
      message:
        "Unable to update award.",
    };
  }
}

export async function deleteAwardAction(
  id: string,
): Promise<ActionResult> {
  const award = await getAwardById(id);

  if (!award) {
    return {
      success: false,
      message: "Award not found.",
    };
  }

  try {
    await destroyImages([
      award.imagePublicId,
    ]);

    await deleteAward(id);

    revalidateTag("awards", "max");

    return {
      success: true,
      message:
        "Award deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        "Unable to delete award.",
    };
  }
}

export async function getLatestAwards() {
  return getLatestAwardsRepository();
}

export async function getPublicAwards() {
  return getPublicAwardsRepository();
}