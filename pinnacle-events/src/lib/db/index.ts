import "dotenv";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Ensure the connection string exists
// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL environment variable is missing.');
// }
// console.log("URL , ", process.env.DATABASE_URL);

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
