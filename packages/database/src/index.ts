import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema'; // Import everything as 'schema'

// This creates a "Typed" database instance
export const db = drizzle(process.env.DATABASE_URL!, { schema });

// Export the schema as well so the API can reference table names
export * from './schema/schema';