import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { SeasonsService } from './seasons.service';
import { SeasonsResponseDto } from './dto/seasons-response.dto';
import { SingleSeasonResponseDto } from './dto/single-season-response.dto';

@ApiTags('Seasons')
@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get()
  @ApiOperation({ summary: 'List all seasons' })
  @ApiOkResponse({
    description: 'List of all seasons',
    type: SeasonsResponseDto
  })
  findAll() {
    return this.seasonsService.findAll();
  }

  @Get(':year')
  @ApiOperation({ summary: 'Get single season with champion and runner-up' })
  @ApiParam({
    name: 'year',
    description: 'Season year',
    example: 2024,
  })
  @ApiOkResponse({
    description: 'Season details with champion and runner-up',
    type: SingleSeasonResponseDto
  })
  @ApiNotFoundResponse({
    description: 'Season not found'
  })
  findOne(@Param('year', ParseIntPipe) year: number) {
    return this.seasonsService.findOne(year);
  }
}