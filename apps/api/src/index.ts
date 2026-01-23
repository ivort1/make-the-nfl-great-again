import "dotenv/config";
import { createDb, type Database } from "@repo/database";

export const db: Database = createDb(process.env.DATABASE_URL!);
