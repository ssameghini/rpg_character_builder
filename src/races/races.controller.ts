import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RacesService } from './races.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { parseQuery } from 'src/database/query';

@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  @Post()
  create(@Body() createRaceDto: CreateRaceDto) {
    return this.racesService.create(createRaceDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.racesService.find(parseQuery(query));
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.racesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.racesService.update(id, updateRaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.racesService.remove(id);
  }
}
