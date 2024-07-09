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

  // Create module and provide in-memory database
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

  // Close database connections after all tests
  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  // Clean models between tests
  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
