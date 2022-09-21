import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../typeorm/entities/user.entity';
import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google/google.strategy';
import { config } from 'dotenv';
import { JwtStrategy } from './jwt/jwt.strategy';

config();

@Module({
  imports: [UsersModule,TypeOrmModule.forFeature([User]),JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '7d'}
  })],
  controllers: [AuthController],
  providers: [AuthService,GoogleStrategy,JwtStrategy]
})
export class AuthModule {}
