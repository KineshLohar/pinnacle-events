import { cloudinary } from "./client";

export async function destroyImage(
    publicId: string,
) {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error(error);
    }
}

export async function destroyImages(
    publicIds: string[],
) {
    if (publicIds.length === 0) {
        return;
    }

    try {
        await Promise.all(
            publicIds.map((id) =>
                destroyImage(id),
            ),
        );
    } catch (error) {
        console.error(error);
    }


}