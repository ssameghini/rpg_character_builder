import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { HealthCheckResponse } from 'types/health';

enum connectionStates {
  'disconnected',
  'connected',
  'connecting',
  'disconnecting',
}

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}

  getHealthCheck(): HealthCheckResponse {
    const databaseStatus = this.connection.readyState;
    return {
      database: connectionStates[databaseStatus],
    };
  }
}
