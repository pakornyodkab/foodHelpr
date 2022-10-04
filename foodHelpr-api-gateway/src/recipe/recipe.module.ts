import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RecipeController } from './recipe.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RECIPE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'recipe',
          protoPath: join(__dirname, '../../../proto/recipe.proto'),
          loader: {
            includeDirs: [join(__dirname, '../../../proto')],
          },
          url: 'localhost:3003',
        },
      },
    ]),
  ],
  providers: [],
  controllers: [RecipeController],
})
export class RecipeModule {}
