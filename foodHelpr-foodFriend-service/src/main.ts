import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {} from 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as Consul from 'consul';
// import serviceAccount from '../testnoti-sw-arch-firebase-adminsdk-ji9oy-75e07990d4.json';

dotenv.config();

const consul = new Consul({
  host: process.env.CONSUL_HOST,
  port: Number(process.env.CONSUL_PORT),
});

async function bootstrap() {
  const LOGGER = new Logger();

  await consul.agent.service.register({
    name: 'foodfriend-service',
    address: process.env.HOST,
    port: Number(process.env.PORT),
    check: {
      http: `http://${process.env.HOST}:4090/`,
      interval: '30s',
    },
  });
  LOGGER.log('Consul registered');

  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: 'foodfriend-service', port: process.env.PORT },
  });

  await app.startAllMicroservices();
  await app.listen(4090);
  LOGGER.log('foodFriend Microservices is listening');
}

bootstrap();

//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     AppModule,
//     {
//       transport: Transport.TCP,
//       options: { host: 'localhost', port: 3090 },
//     },
//   );
//   LOGGER.log('FoodFriend Microservices is listening');
//   await app.listen();
// }
// bootstrap();

// async function bootstrap() {
//   const LOGGER = new Logger();
//   // new approach
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       privateKey: process.env.FIREBASE_PRIVATE_KEY,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       projectId: process.env.FIREBASE_PROJECT_ID,
//     } as Partial<admin.ServiceAccount>),
//     // databaseURL: process.env.FIREBASE_DATABASE_URL,
//   });

//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     AppModule,
//     {
//       transport: Transport.RMQ,
//       options: {
//         urls: ['amqp://localhost:5672'],
//         queue: 'notification_queue',
//         queueOptions: {
//           durable: false,
//         },
//       },
//     },
//   );

//   LOGGER.log('Notification Microservices is listening');
//   app.listen();
// }
