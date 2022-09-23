import { Controller, Get, Req, UseGuards , Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './google/google.guard';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'googleAuth' })
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @MessagePattern({ cmd: 'googleRedirect' })
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req) {
    // req.user => email , firstname , lastname , picture , accessToken
    const token = this.authService.googleLogin(req.user);
    return token;
  }

  // @Get('profile')
  // @UseGuards(JwtAuthGuard)
  // getProfile(@Req() req) {
  //   return req.user
  // }
}
