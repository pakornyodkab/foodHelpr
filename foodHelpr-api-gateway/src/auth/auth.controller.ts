import { Controller, Get, Request, UseGuards , Response} from '@nestjs/common';
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
    const token = this.authService.googleLogin(req.user , res);
    return token;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user
  }
}
