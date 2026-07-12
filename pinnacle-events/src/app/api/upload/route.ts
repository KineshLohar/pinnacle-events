import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { r2, R2_BUCKET, R2_PUBLIC_URL } from "@/lib/r2";
import type { GenerateUploadUrlRequest } from "@/lib/upload-types";

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as GenerateUploadUrlRequest;

    const { objectKey, contentType } = body;

    if (!objectKey || !contentType) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid upload request.",
        },
        { status: 400 },
      );
    }

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: objectKey,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(r2, command, {
      expiresIn: 60,
    });

    return NextResponse.json({
      success: true,
      uploadUrl,
      key: objectKey,
      publicUrl: `${R2_PUBLIC_URL}/${objectKey}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to generate upload URL.",
      },
      {
        status: 500,
      },
    );
  }
}