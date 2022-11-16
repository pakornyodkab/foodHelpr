import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
export interface CustomSocket extends Socket {
  user: {
    token: string;
    userId: number;
  };
}

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
    const server = super.createIOServer(port, { ...options, cors: true });
    server.use(async (socket: CustomSocket, next) => {
      try {
        if (socket.handshake?.headers?.authorization) {
          const token = socket.handshake.headers.authorization.split(' ')[1];
          console.log('test1', token);
          const verified = token && (await this.authService.verifyJwt(token));
          console.log('test2', verified);
          if (verified) {
            socket.user = {
              token: token,
              userId: verified.sub,
            };
            next();
            return;
          }
        }
      } catch (error) {
        next(new Error(error.message));
      }
      next(new Error('Authenticated error'));
    });
    return server;
  }
}
