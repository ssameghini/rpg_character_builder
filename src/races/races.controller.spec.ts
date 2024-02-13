import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model, connect, Connection } from 'mongoose';
import { RacesController } from './races.controller';
import { RacesService } from './races.service';
import { RaceSchema, Race } from './schemas/race.schema';

describe('RacesController', () => {
  let controller: RacesController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let raceModel: Model<Race>;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    raceModel = mongoConnection.model(Race.name, RaceSchema);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RacesController],
      providers: [
        RacesService,
        { provide: getModelToken(Race.name), useValue: raceModel },
      ],
    }).compile();

    controller = module.get<RacesController>(RacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
