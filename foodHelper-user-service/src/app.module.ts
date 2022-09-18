import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './typeorm/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule , DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
