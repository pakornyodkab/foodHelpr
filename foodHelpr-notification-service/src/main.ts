import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import Consul from 'consul';
import ConsulServiceFinder from '../utils/consul';

dotenv.config();

const consul = new Consul({
  host: process.env.CONSUL_HOST,
  port: Number(process.env.CONSUL_PORT),
});

async function bootstrap() {
  const LOGGER = new Logger();

  await consul.agent.service.register({
    name: 'notification-service',
    address: process.env.HOST,
    check: {
      http: `http://${process.env.HOST}:4080/`,
      interval: '30s',
    },
  });
  LOGGER.log('Consul registered');

  const { host, port } = await ConsulServiceFinder('rabbitmq:rabbitmq');

  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${host}:${port}`],
      queue: 'notification_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(4080);
  LOGGER.log('Notification Microservices is listening');
}

bootstrap();
