import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {} from 'reflect-metadata';
import * as Consul from 'consul';

const consul = new Consul({
  host: process.env.CONSUL_HOST,
  port: Number(process.env.CONSUL_PORT),
});

async function bootstrap() {
  const LOGGER = new Logger();

  await consul.agent.service.register({
    name: 'restaurant-service',
    address: process.env.HOST,
    port: Number(process.env.PORT),
    check: {
      http: `http://${process.env.HOST}:4002/`,
      interval: '30s',
    },
  });
  LOGGER.log('Consul registered');

  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: process.env.HOST, port: process.env.PORT },
  });
  await app.startAllMicroservices();
  await app.listen(4002);
  LOGGER.log('Restaurant Microservices is listening');
}
bootstrap();
