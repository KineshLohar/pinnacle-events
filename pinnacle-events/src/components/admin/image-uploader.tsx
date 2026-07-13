"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ExistingCoverImage {
  url: string;
  publicId: string;
}

interface ImageUploaderProps {
  value: File | null;
  onChange(file: File | null): void;

  existingImage?: ExistingCoverImage | null;

  onRemoveExisting?(): void;

  label?: string;
  accept?: string;
  aspectRatio?: string;
  disabled?: boolean;
  className?: string;
}

import imageCompression, {
  type Options,
} from "browser-image-compression";

const compressionOptions: Options = {
  maxSizeMB: 2,
  maxWidthOrHeight: 2400,
  initialQuality: 0.92,
  useWebWorker: true,

  fileType: "image/webp",
};

export function ImageUploader({
  value,
  onChange,

  existingImage,
  onRemoveExisting,

  label = "Upload Image",
  accept = "image/*",
  aspectRatio = "aspect-video",
  disabled = false,
  className,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [processing, setProcessing] = useState(false);

  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setObjectUrl(null);
      return;
    }

    const url = URL.createObjectURL(value);

    setObjectUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    }
  }, [value]);

  const preview = objectUrl ?? existingImage?.url ?? null;

  async function handleFile(file: File) {
    try {
      setProcessing(true);

      let finalFile = file;

      if (file.size > 1024 * 1024) {
        finalFile = await imageCompression(
          file,
          compressionOptions,
        );
      }
      const before = file.size;
      const after = finalFile.size;
      console.log(
        `${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024 / 1024).toFixed(2)}MB`
      );

      onChange(finalFile);
    } finally {
      setProcessing(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function removeImage() {
    if (value) {
      onChange(null);
    } else {
      onRemoveExisting?.();
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className={className}>
      <div
        className={`relative overflow-hidden rounded-lg border border-border-hairline bg-muted ${aspectRatio}`}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Cover Preview"
              fill
              unoptimized
              className="object-cover"
            />

            <div className="absolute right-3 top-3">
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <button
            type="button"
            disabled={disabled || processing}
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-3 p-6"
          >
            {processing ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-sm text-muted-foreground">
                  Processing...
                </span>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8" />

                <p className="font-medium">
                  {label}
                </p>

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
        disabled={disabled || processing}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          handleFile(file);
        }}
      />
    </div>
  );
}