import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { Race } from './schemas/race.schema';

@Injectable()
export class RacesService {
  constructor(@InjectModel(Race.name) private raceModel: Model<Race>) {}

  create(createRaceDto: CreateRaceDto): Promise<Race> {
    const newRace = new this.raceModel(createRaceDto);
    return newRace.save();
  }

  find(params: any = {}): Promise<Race[]> {
    const query = this.raceModel.find(params.filters, params.fields);
    params.sort && query.sort(params.sort);
    params.limit && query.limit(params.limit);
    params.page && query.skip((params.page - 1) * params.limit);

    return query.exec();
  }

  findById(id: string): Promise<Race | null> {
    return this.raceModel.findById(id).exec();
  }

  findByName(name: string): Promise<Race | null> {
    return this.raceModel.findOne({ name }).exec();
  }

  update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race | null> {
    return this.raceModel.findByIdAndUpdate(id, updateRaceDto).exec();
  }

  remove(id: string): Promise<Race | null> {
    return this.raceModel.findByIdAndDelete(id).exec();
  }
}
