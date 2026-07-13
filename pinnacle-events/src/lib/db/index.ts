import "dotenv";
import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

import * as schema from './schema';

// Ensure the connection string exists
// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL environment variable is missing.');
// }
// console.log("URL , ", process.env.DATABASE_URL);

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle(sql, { schema });

// Fix for Node.js environments where global WebSocket doesn't exist natively
if (typeof globalThis.WebSocket === 'undefined' && typeof process !== 'undefined') {
    // Use a dynamic require to prevent Edge/Serverless bundlers from crashing
    try {
      neonConfig.webSocketConstructor = require('ws');
    } catch (err) {
      console.error("Missing 'ws' package. Install it using 'npm install ws' if running in Node.js.");
    }
  }

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// 2. Pass the pool client to drizzle
export const db = drizzle({ client: pool, schema });
