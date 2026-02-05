import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SeasonResponseDto } from './dto/seasons-response.dto';

import { 
  type Database,
  and, eq, or,
  owner, season, team, 
} from '@repo/database';

import { SeasonsResponseDto } from './dto/seasons-response.dto';
import { SingleSeasonResponseDto} from './dto/single-season-response.dto';

@Injectable()
export class SeasonsService {
  constructor(@Inject('DATABASE') private database: Database) {}

  async findAll():Promise<SeasonsResponseDto> {
    const seasons = await this.database
    .select({
      year: season.year,
      platform: season.platform,
      leagueId: season.leagueId,
      playoffSlots: season.playoffSlots,
      leagueFee: season.leagueFee,
      status: season.status
    })
    .from(season);

    return {
      data: seasons as SeasonResponseDto[]
    }
  }

  async findOne(year: number):Promise<SingleSeasonResponseDto> {
    const result = await this.database
      .select({
        id: season.id,
        year: season.year,
        leagueId: season.leagueId,
        status: season.status,
        platform: season.platform,
        playoffSlots: season.playoffSlots,
        leagueFee: season.leagueFee,
        createdAt: season.createdAt,
        teamId: team.id,
        teamName: team.teamName,
        finalStanding: team.finalStanding,
        ownerId: owner.id,
        ownerDisplayName: owner.displayName,
      })
      .from(season)
      .leftJoin(
        team,
        and(
          eq(team.seasonId, season.id),
          or(eq(team.finalStanding, 1), eq(team.finalStanding, 2))
        )
      )
      .leftJoin(owner, eq(owner.id, team.ownerId))
      .where(eq(season.year, year));

    // result is always an array - check if empty
    if (!result || result.length === 0) {
      throw new NotFoundException(`Season ${year} not found`);
    }

    // Now TypeScript knows result is an array
    const rows = result as Array<typeof result[number]>;
    const seasonData = rows[0];
    const champion = rows.find(r => r.finalStanding === 1);
    const runnerUp = rows.find(r => r.finalStanding === 2);

    return {
      year: seasonData.year,
      platform: seasonData.platform,
      leagueId: seasonData.leagueId,
      playoffSlots: seasonData.playoffSlots,
      leagueFee: seasonData.leagueFee,
      status: seasonData.status,
      champion: champion?.ownerId ? {
        ownerId: champion.ownerId,
        displayName: champion.ownerDisplayName,
        teamName: champion.teamName,
      } : null,
      runnerUp: runnerUp?.ownerId ? {
        ownerId: runnerUp.ownerId,
        displayName: runnerUp.ownerDisplayName,
        teamName: runnerUp.teamName,
      } : null,
    };
  }
}