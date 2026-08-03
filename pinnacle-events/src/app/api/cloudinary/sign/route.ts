import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function GET() {
  try {
    const timestamp = Math.round(Date.now() / 1000);

    const params = {
      timestamp,
      folder: "pinnacle-events",
    };

    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET!,
    );

    return NextResponse.json({
      timestamp,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      folder: "pinnacle-events",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Unable to generate upload signature.",
      },
      {
        status: 500,
      },
    );
  }
}