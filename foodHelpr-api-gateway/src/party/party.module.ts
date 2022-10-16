import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { PartyController } from './party.controller';
import { PartyService } from './party.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FOODFRIEND',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3090,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
    HttpModule,
  ],
  controllers: [PartyController],
  providers: [PartyService, AuthService, JwtService, AppService],
})
export class PartyModule {}