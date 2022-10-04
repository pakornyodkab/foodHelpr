import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/create-user.dto';
import { Request, Response } from 'express';
import { Auth, google } from 'googleapis';
import { config } from 'dotenv';
import { sign, verify } from 'jsonwebtoken';
import { HttpService } from '@nestjs/axios';

config();

let mockData = {
  username: 'xxx',
  password: '123456789',
  email: '',
  firstname: 'yyy',
  lastname: 'zzz',
  profile_picture: 'N/A',
  age: 99,
  nickname: 'test',
  job: 'student',
};

@Injectable()
export class AuthService {
  private oauthClient: Auth.OAuth2Client;
  constructor(
    private jwtService: JwtService,
    @Inject('USER') private readonly userService: ClientProxy,
    private readonly httpService: HttpService,
  ) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_SECRET;
    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
  }

  generateJwt(payload: any) {
    return this.jwtService.sign(payload);
  }

  getUserId(req: any) {
    return req.user.id;
  }

  async googleLogin(googleToken: string, res: Response) {
    if (!googleToken) {
      throw new BadRequestException('Unauthenticated');
    }

    // const tokenInfo = await this.oauthClient.getToken(googleToken);
    let tokenInfo: any;
    await this.httpService
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleToken}`,
      )
      .forEach((value) => (tokenInfo = value.data));

    if (!tokenInfo) {
      throw new BadRequestException('Unauthenticated');
    }

    let existingUser: any;
    await this.userService
      .send({ cmd: 'getUserByEmail' }, tokenInfo.email)
      .forEach((exUser) => (existingUser = exUser));

    if (!existingUser) {
      return this.googleRegister(
        tokenInfo.email,
        tokenInfo.picture,
        tokenInfo.given_name,
        tokenInfo.family_name,
        res,
      );
    }

    const token = sign(
      { sub: existingUser.user_id, email: existingUser.email },
      process.env.JWT_SECRET,
    );

    if (!token) {
      throw new ForbiddenException('Could not signin');
    }

    res.cookie('token', token, {});

    return res.send({ message: 'Logged in successfully', access_token: token });
  }

  async googleRegister(
    email: string,
    picture_url: string,
    firstname: string,
    lastname: string,
    res: Response,
  ) {
    try {
      mockData.email = email;
      mockData.profile_picture = picture_url;
      mockData.firstname = firstname;
      mockData.lastname = lastname;
      let newUser: any;
      await this.userService
        .send<CreateUserDto>({ cmd: 'createUser' }, mockData)
        .forEach((e) => (newUser = e));

      console.log(`Create New User Successfully`);

      const token = sign(
        {
          sub: newUser.user_id,
          email: newUser.email,
        },
        process.env.JWT_SECRET,
      );

      if (!token) {
        throw new ForbiddenException('Could not signin');
      }

      res.cookie('token', token, {});

      return res.send({
        message: 'Registered successfully',
        access_token: token,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
