import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RecipeController } from './recipe.controller';
import consul from '../utils/consul';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RECIPE_PACKAGE',
        useFactory: async (...args) => {
          const { host, port } = await consul('recipe-service');
          return {
            transport: Transport.GRPC,
            options: {
              package: 'recipe',
              protoPath: join(__dirname, '../../proto/recipe.proto'),
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
  providers: [],
  controllers: [RecipeController],
})
export class RecipeModule {}
