"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { compressImage } from "@/lib/compress-image";
import { ExistingGalleryImage } from "@/lib/types";

export interface GalleryImage {
  image: File;
  alt?: string;
}

interface GalleryUploaderProps {
  existingImages: ExistingGalleryImage[];

  removedImages: ExistingGalleryImage[];
  newImages: GalleryImage[];
  onNewImagesChange(images: GalleryImage[]): void;
  onRemoveExisting(id: string): void;

  onRestoreExisting(id: string): void;

  onExistingAltChange(
    id: string,
    alt: string,
  ): void;

  disabled?: boolean;
}

type PreviewImage = GalleryImage & {
  preview: string;
};

const MAX_IMAGES = 10;

export function GalleryUploader({
  existingImages,
  removedImages,

  newImages,
  onNewImagesChange,

  onRemoveExisting,
  onRestoreExisting,
  onExistingAltChange,

  disabled = false,
}: GalleryUploaderProps) {
  const [newPreviews, setNewPreviews] = useState<PreviewImage[]>([]);

  useEffect(() => {
    const next = newImages.map((item) => ({
      ...item,
      preview: URL.createObjectURL(item.image),
    }));

    setNewPreviews(next);

    return () => {
      next.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, [newImages]);

  async function handleFiles(files: FileList | null) {
    if (!files) return;

    try {
      if (
        existingImages.length +
        newImages.length +
        files.length >
        MAX_IMAGES
      ) {
        throw new Error(
          `You can upload a maximum of ${MAX_IMAGES} images.`,
        );
      }
      const compressedFiles = await Promise.all(
        Array.from(files).map((file) =>
          compressImage(file),
        ),
      );

      const images: GalleryImage[] = [
        ...newImages,
        ...compressedFiles.map((file) => ({
          image: file,
          alt: "",
        })),
      ];

      onNewImagesChange(images);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  function removeNewImage(index: number) {
    onNewImagesChange(
      newImages.filter((_, i) => i !== index),
    );
  }

  function updateNewAlt(
    index: number,
    alt: string,
  ) {
    const images = [...newImages];

    images[index] = {
      ...images[index],
      alt,
    };

    onNewImagesChange(images);
  }

  return (
    <div className="space-y-6">
      <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed">
        <Plus className="mb-3 h-8 w-8" />

        <p className="font-medium">
          Add Gallery Images
        </p>

        <p className="text-sm text-muted-foreground">
          JPG, PNG or WEBP
        </p>

        <input
          hidden
          multiple
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      <div className="space-y-8">
        {existingImages.length > 0 && (
          <div>
            <h3 className="mb-4 text-sm font-medium">
              Existing Images
            </h3>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {existingImages.map((item) => (
                <div
                  key={item.id}
                  className="space-y-3"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
                    <Image
                      src={item.imageUrl}
                      alt={item.alt ?? ""}
                      fill
                      className="object-cover"
                    />

                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute right-2 top-2"
                      onClick={() =>
                        onRemoveExisting(item.id)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Input
                    value={item.alt ?? ""}
                    placeholder="Alt text (optional)"
                    onChange={(e) =>
                      onExistingAltChange(
                        item.id,
                        e.target.value,
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {newPreviews.length > 0 && (
          <div>
            <h3 className="mb-4 text-sm font-medium">
              New Images
            </h3>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {newPreviews.map((item, index) => (
                <div
                  key={`${item.image.name}-${index}`}
                  className="space-y-3"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
                    <Image
                      src={item.preview}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                    />

                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute right-2 top-2"
                      onClick={() =>
                        removeNewImage(index)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Input
                    value={item.alt ?? ""}
                    placeholder="Alt text (optional)"
                    onChange={(e) =>
                      updateNewAlt(
                        index,
                        e.target.value,
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {removedImages.length > 0 && (
          <div>
            <h3 className="mb-4 text-sm font-medium text-destructive">
              Removed Images
            </h3>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {removedImages.map((item) => (
                <div
                  key={item.id}
                  className="space-y-3 opacity-70"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-dashed">
                    <Image
                      src={item.imageUrl}
                      alt={item.alt ?? ""}
                      fill
                      className="object-cover grayscale"
                    />

                    <div className="absolute inset-0 bg-black/40" />

                    <Button
                      type="button"
                      variant="secondary"
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      onClick={() =>
                        onRestoreExisting(item.id)
                      }
                    >
                      Undo
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}