import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthenticatedSocketIoAdapter } from './chat/socketio/socketio.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));
  await app.listen(3000);
}
bootstrap();
