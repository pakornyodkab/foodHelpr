import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthService } from 'src/auth/auth.service';

export class AuthenticatedSocketIoAdapter extends IoAdapter {
  private readonly authService: AuthService;
  constructor(private app: INestApplicationContext) {
    super(app);
    this.authService = this.app.get(AuthService);
  }

  create(port: number, options?: any): any {
    return this.createIOServer(port, options);
  }

  createIOServer(port: number, options?: any): any {
    options.allowRequest = async (request, allowFunction) => {
      const token = request.headers.authorization.split(' ')[1];
      const verified = token && (await this.authService.verifyJwt(token));
      console.log(verified);
      if (verified) {
        request._query = {
          ...request._query,
          token: token,
          userId: verified,
        };
        return allowFunction(null, true);
      }

      return allowFunction('Unauthorized', false);
    };
    return super.createIOServer(port, options);
  }
}
