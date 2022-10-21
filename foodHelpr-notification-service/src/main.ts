import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

//* don't know
// import { initializeApp, credential, ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
// import serviceAccount from '../testnoti-sw-arch-firebase-adminsdk-ji9oy-75e07990d4.json';

dotenv.config();

async function bootstrap() {
  //! no longer used.
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  //* don't know
  // initializeApp({
  //   credential: credential.cert({
  //     privateKey: process.env.FIREBASE_PRIVATE_KEY,
  //     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  //     projectId: process.env.FIREBASE_PROJECT_ID,
  //   } as Partial<ServiceAccount>),
  //   // databaseURL: process.env.FIREBASE_DATABASE_URL,
  // });

  // initializeApp({
  //   credential: credential.cert(serviceAccount),
  // });

  // new approach
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    } as Partial<admin.ServiceAccount>),
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'notification_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.listen();
}
bootstrap();
