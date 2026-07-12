"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { uploadImage } from "@/lib/upload-image";

interface ImageUploaderProps {
  value?: string;
  onChange(value: string): void;

  objectKey: string;

  label?: string;

  accept?: string;

  aspectRatio?: string;

  disabled?: boolean;

  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  objectKey,
  label = "Upload Image",
  accept = "image/*",
  aspectRatio = "aspect-video",
  disabled = false,
  className,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    try {
      setUploading(true);

      const uploaded = await uploadImage({
        file,
        objectKey,
      });

      onChange(uploaded.url);

      toast.success("Image uploaded successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to upload image.",
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className={className}>
      <div
        className={`relative overflow-hidden rounded-lg border border-border-hairline bg-muted cursor-pointer ${aspectRatio}`}
      >
        {value ? (
          <>
            <Image
              src={value}
              alt=""
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 flex items-start justify-end p-3">
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => onChange("")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <button
            type="button"
            disabled={disabled || uploading}
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 cursor-pointer"
          >
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-sm text-muted-foreground">
                  Uploading...
                </span>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8" />

                <p className="font-medium">{label}</p>

                <p className="text-xs text-muted-foreground">
                  JPG, PNG, WEBP
                </p>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        disabled={disabled || uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          handleFile(file);
        }}
      />
    </div>
  );
}