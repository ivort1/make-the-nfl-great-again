import { Controller, Get, Param } from '@nestjs/common';
import { OwnersService } from './owners.service';

@Controller('owners')
export class OwnersController {
    constructor(private readonly ownersService: OwnersService) {}

    @Get()
    findAll() { 
        return this.ownersService.findAll();
    }
    
    @Get(':sleeperId')
    findOne(@Param('sleeperId') sleeperId: string) {
        return this.ownersService.findOne(sleeperId);
    }

    @Get('rosters/:id')
    findOneStats(@Param('id') id: string) {
        return this.ownersService.findOneStats(id);
    }
}