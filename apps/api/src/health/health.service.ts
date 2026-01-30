import { Inject, Injectable } from '@nestjs/common';
import { type Database, sql } from '@repo/database';

@Injectable()
export class HealthService {
    constructor(@Inject("DATABASE") private db: Database) {}
    
     async testDatabaseConnection() {
        try {
            await this.db.execute(sql`SELECT 1`);
            return {
                status: "ok",
                database: "connected",
                timestamp: new Date().toISOString()
            }
        } catch(err) {
            return {
                status: err,
                database: "disconnected",
                timestamp: new Date().toISOString()
            }
        }
    }
}