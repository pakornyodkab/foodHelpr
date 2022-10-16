import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateHostPartyDto } from 'src/dto/createHostParty.dto';
import { PartyService } from './party.service';

@Controller('party')
export class PartyController {
  constructor(
    private readonly partyService: PartyService,
    private readonly authService: AuthService,
  ) {}

  @Get('test')
  test() {
    return 'test';
  }

  @Get('get-host-partys')
  @UseGuards(JwtAuthGuard)
  getHostParty() {
    return this.partyService.getHostParty();
  }

  @Get('get-host-party-by-id/:id')
  @UseGuards(JwtAuthGuard)
  getHostPartyById(@Param('id') id: string) {
    return this.partyService.getHostPartyById(id);
  }

  @Post('create-host-party')
  @UseGuards(JwtAuthGuard)
  createHostParty(@Body() createHostPartyDto: CreateHostPartyDto) {
    return this.partyService.createHostParty(createHostPartyDto);
  }

  @Delete('delete-host-party/:id')
  @UseGuards(JwtAuthGuard)
  deleteHostParty(@Param('id') id: string){
    return this.partyService.deleteHostParty(id);
  }

  @Delete('delete-all-host-party')
  @UseGuards(JwtAuthGuard)
  deleteAllHostParty() {
    return this.partyService.deleteAllHostParty();
  }


}
