

import { NextResponse } from 'next/server';

import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth/next'; // Ensure you're using the right import for getServerSession
import { authOptions } from '../../auth/[...nextauth]/route';
import clientPromise from '../../../lib/mongodb';
import { deleteImage } from '@/app/lib/cloudinary';
 // Adjust the import path according to your project structure

export async function POST(req) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  
  const eventData = await req.json();
  const result = await db.collection('events').insertOne(eventData);

  return NextResponse.json(result);
}

export async function PATCH(req) {
  // Check user session for authentication
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    
    // Parse the request URL and body
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const eventData = await req.json();
    
    // Update only the fields provided in eventData
    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(id) },
      { $set: eventData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('Error updating event:', error.message);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}


// export async function PUT(req) {
//   const session = await getServerSession(authOptions);
  
//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const client = await clientPromise;
//   const db = client.db(process.env.DB_NAME);
  
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id');
//   const eventData = await req.json();

//   const result = await db.collection('events').updateOne(
//     { _id: new ObjectId(id) },
//     { $set: eventData }
//   );

//   return NextResponse.json(result);
// }

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // First, fetch the event to get the gallery
    const event = await db.collection('events').findOne({ _id: new ObjectId(id) });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Delete all images in the gallery from Cloudinary
    if (event.gallery && event.gallery.length > 0) {
      const deletePromises = event.gallery.map(img => deleteImage(img.public_id));
      await Promise.all(deletePromises);
    }

    // Now delete the event from the database
    const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Event and associated images deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'An error occurred while deleting the event' }, { status: 500 });
  }
}