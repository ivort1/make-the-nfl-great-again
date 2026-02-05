import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SeasonResponseDto {
    /** Season year */
    @ApiProperty({ example: 2024 })
    year: number;

    /** Platform the league was hosted on */
    @ApiPropertyOptional({ 
        enum: ['sleeper', 'espn', 'yahoo', 'manual'],
        description: 'Platform the league was hosted on'
    })
    platform: 'sleeper' | 'espn' | 'yahoo' | 'manual' | null;
    
    /** External league ID from platform (Only Sleeper provides one) */
    @ApiProperty({ example: "2090420195238478116" })
    leagueId: string | null;
    
    /** The number of teams that make the playoffs*/
    @ApiProperty({ example: 6 })
    playoffSlots: number;
    
    /** The league entry fee */
    @ApiProperty({ example: "100.00" })
    leagueFee: string | null;
    
    /** The current status of the season: in_season, complete, etc. */
    @ApiPropertyOptional({ 
        enum: ['pre_season', 'in_season', 'complete', 'cancelled'],
        description: 'Current season status'
    })
    status: 'pre_season' | 'in_season' | 'complete' | 'cancelled' | null;
}

export class SeasonsResponseDto {
    /** Array of seasons */
    data: SeasonResponseDto[];
}