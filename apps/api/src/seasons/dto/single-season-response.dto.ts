import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TeamOwnerDto {
     /** The user ID of the owner on Sleeper*/
    @ApiProperty({ example: "191723751765708800" })
    ownerId: string;

     /** The username of the owner on Sleeper */
    @ApiPropertyOptional({ example: "@ivun" })
    displayName: string | null;

     /** The name of the team */
    @ApiPropertyOptional({ example: "DEEZ NUTS" })
    teamName: string | null;
}

export class SingleSeasonResponseDto {
    /** The calendar year of the season */
    @ApiProperty({ example: 2024 })
    year: number;
    
    /** Platform the league was hosted on */
    @ApiPropertyOptional({ 
        enum: ['sleeper', 'espn', 'yahoo', 'manual'],
        description: 'Platform the league was hosted on'
    })
    platform: string | null;
    @ApiProperty({ example: 2024 })

    /** External league ID from platform (Only Sleeper provides one) */
    @ApiPropertyOptional({ example: "2090420195238478116" })
    leagueId: string | null;

    /** The number of teams that make the playoffs*/
    @ApiProperty({ example: 6 })
    playoffSlots: number;
    
    /** The league entry fee */
    @ApiPropertyOptional({ example: "100.00" })
    leagueFee: string | null;
    
    /** The current status of the season: in_season, complete, etc. */
    @ApiPropertyOptional({ 
        enum: ['pre_season', 'in_season', 'complete', 'cancelled'],
        description: 'Current season status'
    })
    status: 'pre_season' | 'in_season' | 'complete' | 'cancelled' | null;

    /** The team who finished in 1st place */
    champion: TeamOwnerDto | null;
    
    /** The team who finished in 2nd place */
    runnerUp: TeamOwnerDto | null;
}