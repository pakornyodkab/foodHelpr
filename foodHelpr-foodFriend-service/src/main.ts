import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {} from 'reflect-metadata';

async function bootstrap() {
  const LOGGER = new Logger();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: 'localhost', port: 3090 },
    },
  );
  LOGGER.log('FoodFriend Microservices is listening');
  await app.listen();
}
bootstrap();
