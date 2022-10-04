import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { IngredientController } from './ingredient.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INGREDIENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'ingredient',
          protoPath: join(__dirname, '../../../proto/ingredient.proto'),
          url: 'localhost:3003',
        },
      },
    ]),
  ],
  controllers:[IngredientController]
})
export class IngredientModule {}
