
import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/create-user.dto';
import { Request, Response } from 'express';

let mockData = 
    {
        username: "xxx",
        password: "123456789",
        email: "",
        firstname: "yyy",
        lastname: "zzz",
        profile_picture: "N/A",
        age: 99,
        nickname: "test",
        job: "student"
    }

@Injectable()
export class AuthService {
    constructor( 
        private jwtService: JwtService,
        @Inject('USER') private readonly userService: ClientProxy
    ) {}

  generateJwt(payload: any) {
    return this.jwtService.sign(payload)
  }

  async googleLogin(user: any,res: Response) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }
    
    console.log(`User email: ${user.email}`);
    

    let existingUsers = [];
    await this.userService.send({ cmd: 'getUsers' }, {}).forEach(exUser => existingUsers.push(exUser))
    existingUsers = existingUsers[0]
    const existingUser = existingUsers.find(e => e.email === user.email )
    
    console.log(`Existing Users: ${existingUsers}`);
    
    
    
    console.log(`ExistingUser : ${existingUser}`);
    
    
    if (!existingUser) {
        return this.googleRegister(user,res)
    }

    const token = this.generateJwt({
      sub: existingUser.user_id,
      email: existingUser.email
    })

    if (!token) {
      throw new ForbiddenException('Could not signin');
    }

    res.cookie('token',token,{})

    return res.send({ message: 'Logged in successfully' });
  }

  async googleRegister(user: any,res: Response) {
    try {

      mockData.email = user.email
      let newUser: any;
      await this.userService.send<CreateUserDto>({ cmd: 'createUser' }, mockData).forEach(e => newUser = e);

      console.log(`Create New User : ${newUser}`);

      
      const token = this.generateJwt({
        sub: newUser.user_id,
        email: newUser.email
      })
  
      if (!token) {
        throw new ForbiddenException('Could not signin');
      }
  
      res.cookie('token',token,{})
  
      return res.send({ message: 'Registered successfully' });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  
}