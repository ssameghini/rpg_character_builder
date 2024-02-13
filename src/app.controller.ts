import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheckResponse } from 'types/health';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealthCheck(): HealthCheckResponse {
    return this.appService.getHealthCheck();
  }
}
