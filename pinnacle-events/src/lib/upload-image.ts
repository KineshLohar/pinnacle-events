import imageCompression, { type Options } from "browser-image-compression";

interface UploadImageOptions {
  file: File;
}

export interface UploadedImage {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

interface SignatureResponse {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
}

const compressionOptions: Options = {
  maxSizeMB: 1.5,
  maxWidthOrHeight: 2400,
  initialQuality: 0.9,
  useWebWorker: true,
};

export async function uploadImage({
  file,
}: UploadImageOptions): Promise<UploadedImage> {
  // Compress image
  const compressed = await imageCompression(
    file,
    compressionOptions,
  );

  // Get signed upload params
  const signatureResponse = await fetch(
    "/api/cloudinary/sign",
  );

  if (!signatureResponse.ok) {
    throw new Error(
      "Unable to generate upload signature.",
    );
  }

  const {
    timestamp,
    signature,
    apiKey,
    cloudName,
    folder,
  } = (await signatureResponse.json()) as SignatureResponse;

  // Build upload payload
  const formData = new FormData();

  formData.append("file", compressed);

  formData.append("api_key", apiKey);

  formData.append("timestamp", String(timestamp));

  formData.append("signature", signature);

  formData.append("folder", folder);

  // Upload directly to Cloudinary
  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!uploadResponse.ok) {
    throw new Error(
      "Unable to upload image.",
    );
  }

  const uploaded = await uploadResponse.json();

  return {
    url: uploaded.secure_url,
    publicId: uploaded.public_id,
    width: uploaded.width,
    height: uploaded.height,
  };
}