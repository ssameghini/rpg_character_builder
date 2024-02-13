import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model, connect, Connection } from 'mongoose';
import { RacesService } from './races.service';
import { Race, RaceSchema } from './schemas/race.schema';

describe('RacesService', () => {
  let service: RacesService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let raceModel: Model<Race>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    raceModel = mongoConnection.model(Race.name, RaceSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RacesService,
        { provide: getModelToken(Race.name), useValue: raceModel },
      ],
    }).compile();

    service = module.get<RacesService>(RacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
