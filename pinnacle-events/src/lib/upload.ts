import { randomUUID } from "crypto";

export function createUploadSession() {
  return randomUUID();
}

export function buildObjectKey(
  folder: string,
  uploadSession: string,
  filename: string,
) {
  return `temp/${folder}/${uploadSession}/${filename}`;
}