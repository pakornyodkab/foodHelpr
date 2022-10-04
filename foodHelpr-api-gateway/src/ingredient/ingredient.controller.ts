import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('ingredient')
export class IngredientController implements OnModuleInit {
  private ingredientService: any;

  constructor(@Inject('INGREDIENT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.ingredientService = this.client.getService('IngredientService');
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-ingredients')
  getIngredients() {
    return this.ingredientService.getAll({});
  }
}
