import { Test, TestingModule } from '@nestjs/testing';
import { RacesService } from './races.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Race, RaceSchema } from './schemas/race.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('RacesService', () => {
  let service: RacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RacesService],
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('DB_HOST'),
          }),
          inject: [ConfigService],
        }),
        ConfigModule.forRoot({
          envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
          isGlobal: true,
        }),
        MongooseModule.forFeature([{ name: Race.name, schema: RaceSchema }]),
      ],
    }).compile();

    service = module.get<RacesService>(RacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
