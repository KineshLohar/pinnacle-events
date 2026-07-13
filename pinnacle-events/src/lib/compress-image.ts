import imageCompression, {
    type Options,
  } from "browser-image-compression";
  
  const options: Options = {
    maxSizeMB: 1.5,
    maxWidthOrHeight: 2400,
    initialQuality: 0.92,
    useWebWorker: true,
    fileType: "image/webp",
  };
  
  const MAX_FILE_SIZE = 20 * 1024 * 1024;
  
  const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];
  
  export async function compressImage(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(
        "Only JPG, PNG and WEBP images are allowed.",
      );
    }
  
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        "Image must be smaller than 20 MB.",
      );
    }
  
    if (file.size <= 1024 * 1024) {
      return file;
    }
  
    return imageCompression(file, options);
  }