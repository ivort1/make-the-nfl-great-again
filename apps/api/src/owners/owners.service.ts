import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type Database, eq, matchup, owner, team } from '@repo/database';

@Injectable()
export class OwnersService {
    constructor(@Inject('DATABASE') private database: Database) {}

    async findAll() {
        return this.database.select().from(owner);
    }
    
    async findOne(sleeperId: string) {
        const result = await this.database
            .select()
            .from(owner)
            .where(eq(owner.sleeperId, sleeperId));

        if(result.length === 0) {
            throw new NotFoundException(`Owner with ID ${sleeperId} not found.`);
        }

        return result[0];
    }

    async findOneStats(id: string) {
        const result = await this.database
            .select({teamId: team.id, rosterId: team.rosterId, points: matchup.points})
            .from(owner)
            .innerJoin(team, eq(team.ownerId, id))
            .innerJoin(matchup, eq(team.rosterId, matchup.matchupGroupId))
        
        return result[0];
    }
}