import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { uploadImage } from '../../../lib/cloudinary'; // Ensure correct path

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const files = formData.getAll('file');

  try {
    const uploadPromises = files.map(file => uploadImage(file));
    const uploadedImages = await Promise.all(uploadPromises);
    return NextResponse.json(uploadedImages);
  } catch (error) {
    console.error('Error in upload API:', error);
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}
