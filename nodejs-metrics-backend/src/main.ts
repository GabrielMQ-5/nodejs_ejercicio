import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Config } from './config/config';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  await app.listen(Config.port);
  console.log('App is running on port %d. Press CTRL-C to stop.', Config.port);
}
bootstrap();
