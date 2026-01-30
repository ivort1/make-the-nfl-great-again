import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';
import { sql } from "drizzle-orm";

export const createDb = (connectionString: string) => {
    return drizzle(connectionString, { schema });
}

export type Database = ReturnType<typeof createDb>;
export * from './schema/schema';
export { sql };

// import 'dotenv/config';
// import { Pool } from 'pg';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import * as schema from './schema/schema';

// 1. Setup the Postgres Connection Pool
// This efficiently manages multiple connections from the API to the DB
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL!,
// });

// 2. Initialize Drizzle with the schema
// Passing { schema } enables the "query" builder (db.query.users.findMany)
// export const db = drizzle(pool, { schema });

// 3. Export the schema so other packages can use the types
// export * from './schema/schema';