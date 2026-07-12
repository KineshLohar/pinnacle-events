"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ImageUploader } from "./image-uploader";

interface GalleryImage {
  image: string;
  alt?: string;
}

interface GalleryUploaderProps {
  uploadSession: string;

  value: GalleryImage[];

  onChange(images: GalleryImage[]): void;
}

export function GalleryUploader({
  uploadSession,
  value,
  onChange,
}: GalleryUploaderProps) {
  function addImages(files: FileList | null) {
    if (!files) return;

    const next = [...value];

    Array.from(files).forEach((file, index) => {
      const extension = file.name.split(".").pop();

      next.push({
        image: "",
        alt: "",
      });

      const currentIndex = next.length - 1;

      next[currentIndex] = {
        image: `temp://${extension}:${currentIndex}`,
        alt: "",
      };
    });

    onChange(next);
  }

  function update(index: number, image: string) {
    const next = [...value];

    next[index].image = image;

    onChange(next);
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-6">
      <input
        id="gallery-input"
        hidden
        multiple
        type="file"
        accept="image/*"
        onChange={(e) => {
          const files = e.target.files;

          if (!files) return;

          addImages(files);
        }}
      />

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          document
            .getElementById("gallery-input")
            ?.click()
        }
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Images
      </Button>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {value.map((item, index) => {
          const extension =
            item.image.startsWith("http")
              ? item.image.split(".").pop()
              : item.image.split(":")[1];

          return (
            <div key={index} className="space-y-3">
              <ImageUploader
                value={
                  item.image.startsWith("http")
                    ? item.image
                    : undefined
                }
                onChange={(url) => update(index, url)}
                objectKey={`temp/works/${uploadSession}/gallery-${index + 1}.${extension}`}
                label={`Gallery ${index + 1}`}
                aspectRatio="aspect-square"
              />

              <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={() => remove(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}