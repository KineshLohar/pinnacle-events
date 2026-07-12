import imageCompression, { type Options } from "browser-image-compression";

import type {
  GenerateUploadUrlRequest,
  GenerateUploadUrlResponse,
} from "./upload-types";

interface UploadImageOptions {
  file: File;
  objectKey: string;
}

interface UploadedImage {
  url: string;
  key: string;
}

const compressionOptions: Options = {
  maxSizeMB: 1.5,
  maxWidthOrHeight: 2400,
  initialQuality: 0.9,
  useWebWorker: true,
};

export async function uploadImage({
  file,
  objectKey,
}: UploadImageOptions): Promise<UploadedImage> {
  const compressed = await imageCompression(file, compressionOptions);

  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      objectKey,
      contentType: compressed.type,
    } satisfies GenerateUploadUrlRequest),
  });

  if (!response.ok) {
    throw new Error("Unable to generate upload URL.");
  }

  const data =
    (await response.json()) as GenerateUploadUrlResponse;

  if (!data.success) {
    throw new Error("Unable to generate upload URL.");
  }

  const upload = await fetch(data.uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": compressed.type,
    },
    body: compressed,
  });

  if (!upload.ok) {
    throw new Error("Image upload failed.");
  }

  return {
    url: data.publicUrl,
    key: data.key,
  };
}