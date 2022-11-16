import { Controller, Get, Request, UseGuards, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './google/google.guard';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @MessagePattern({ cmd: 'googleAuth' })
  @Get('google/login')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  //@MessagePattern({ cmd: 'googleRedirect' })
  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Request() req, @Response() res) {
    // req.user => email , firstname , lastname , picture , accessToken
    return this.authService.googleLogin(req.user, res);
  }

  @Get('userId')
  @UseGuards(JwtAuthGuard)
  getUserId(@Request() req) {
    return req.user.id;
  }
}
