import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

const MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'recipe',
    //package: 'ingredient',
    protoPath: join(__dirname, '../../proto/recipe.proto'),
    //protoPath: join(__dirname, '../../proto/ingredient.proto'),
    url: 'localhost:3003',
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    MicroserviceOptions,
  );
  console.log('Recipe Microservice is listening');
  await app.listen();
}
bootstrap();
