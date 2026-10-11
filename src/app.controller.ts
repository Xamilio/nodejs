import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Public } from './auth/decorators/public.decorator.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //endpoints
  @Get('/product/:id')
  getProductById(@Param('id') id: string): string {
    return `Hello from Nest! Your id: ${+id}`;
  }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
