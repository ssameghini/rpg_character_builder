import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RacesController } from './races.controller';
import { RacesService } from './races.service';
import { RaceSchema, Race } from './schemas/race.schema';

describe('RacesController', () => {
  let controller: RacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RacesController],
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

    controller = module.get<RacesController>(RacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
