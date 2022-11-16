import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { IngredientController } from './ingredient.controller';
import consul from '../utils/consul';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'INGREDIENT_PACKAGE',
        useFactory: async (...args) => {
          const { host, port } = await consul('recipe-service');
          return {
            transport: Transport.GRPC,
            options: {
              package: 'ingredient',
              protoPath: join(__dirname, '../../proto/ingredient.proto'),
              loader: {
                includeDirs: [join(__dirname, '../../proto')],
              },
              url: `${host}:${port}`,
            },
          };
        },
      },
    ]),
  ],
  controllers: [IngredientController],
})
export class IngredientModule {}
