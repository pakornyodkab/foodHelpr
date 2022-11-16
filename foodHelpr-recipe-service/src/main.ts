import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import * as Consul from 'consul';

const MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['recipe', 'ingredient'],
    protoPath: [
      join(__dirname, '../proto/ingredient.proto'),
      join(__dirname, '../proto/recipe.proto'),
    ],
    url: `${process.env.HOST}:${process.env.PORT}`,
  },
};

const consul = new Consul({
  host: process.env.CONSUL_HOST,
  port: Number(process.env.CONSUL_PORT),
});

async function bootstrap() {
  const LOGGER = new Logger();

  await consul.agent.service.register({
    name: 'recipe-service',
    address: process.env.HOST,
    port: Number(process.env.PORT),
    check: {
      http: `http://${process.env.HOST}:4003/`,
      interval: '30s',
    },
  });
  LOGGER.log('Consul registered');

  const app = await NestFactory.create(AppModule);

  const microservice = app.connectMicroservice(MicroserviceOptions);
  await app.startAllMicroservices();
  await app.listen(4003);
  console.log('Recipe Microservice is listening');
}
bootstrap();
