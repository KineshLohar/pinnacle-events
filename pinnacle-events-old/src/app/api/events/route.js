import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function GET(request) {
  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // Get query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '9');
    const skip = (page - 1) * limit;

    // Fetch events from the database with pagination
    const eventsCollection = db.collection('events');
    const events = await eventsCollection.find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    // Check if there are more events
    const totalEvents = await eventsCollection.countDocuments();
    const hasMore = skip + events.length < totalEvents;

    // Return events and hasMore flag as JSON
    return NextResponse.json({ events, hasMore });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}