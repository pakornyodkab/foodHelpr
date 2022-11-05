import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google/google.strategy';
import { config } from 'dotenv';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import consul from '../utils/consul';

config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    ClientsModule.registerAsync([
      {
        name: 'USER',
        useFactory: async (...args) => ({
          transport: Transport.TCP,
          options: await consul('user-service'),
        }),
      },
    ]),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
  exports: [AuthService, JwtModule, HttpModule],
})
export class AuthModule {}
