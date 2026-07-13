import { Readable } from "node:stream";

import { UploadApiResponse } from "cloudinary";

import type { CloudinaryUploadResult } from "./types";
import { cloudinary } from "./client";

function fileToBuffer(file: File) {
  return file.arrayBuffer().then((buffer) => Buffer.from(buffer));
}

function uploadBuffer(
  buffer: Buffer,
  folder: string,
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error);

          return;
        }

        resolve(result);
      },
    );

    Readable.from(buffer).pipe(stream);
  });
}

export async function uploadImage(
  file: File,
  folder = "pinnacle-events/works",
): Promise<CloudinaryUploadResult> {
  const buffer = await fileToBuffer(file);

  const uploaded = await uploadBuffer(
    buffer,
    folder,
  );

  return {
    url: uploaded.secure_url,
    publicId: uploaded.public_id,
  };
}

export async function uploadImages(
  files: File[],
  folder = "pinnacle-events/works",
): Promise<CloudinaryUploadResult[]> {
  return Promise.all(
    files.map((file) =>
      uploadImage(file, folder),
    ),
  );
}