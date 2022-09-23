import { Body, Controller, Get, Post,Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Get('auth/google/login')
  googleAuth(@Res() res){
    this.appService.googleAuth()
    res.redirect({cmd: 'googleAuth'})
    //return this.appService.googleAuth()
  }
  

  @Get('auth/google/redirect')
  googleAuthRedirect(@Req() req) {
    // req.user => email , firstname , lastname , picture , accessToken
    return this.appService.googleLogin(req);
  }
}
