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
import { GuestJoinPartyDto } from 'src/dto/guestJoinParty.dto';
import { HostPartyActionDto } from 'src/dto/hostPartyAction.dto';
import { GetCurrentUserId } from 'src/auth/decorator';

@Controller('party')
export class PartyController {
  constructor(
    private readonly partyService: PartyService,
    private readonly authService: AuthService,
  ) {}

  @Get('get-all-party')
  @UseGuards(JwtAuthGuard)
  getAllParty() {
    return this.partyService.getAllParty();
  }

  @Get('get-host-partys')
  @UseGuards(JwtAuthGuard)
  getHostParty() {
    return this.partyService.getHostParty();
  }

  @Get('get-party-by-id/:id')
  @UseGuards(JwtAuthGuard)
  async getPartyById(@Param('id') id: string) {
    return await this.partyService.getPartyById(id);
  }

  @Post('create-host-party')
  @UseGuards(JwtAuthGuard)
  createHostParty(@Body() createHostPartyDto: CreateHostPartyDto) {
    return this.partyService.createHostParty(createHostPartyDto);
  }

  @Delete('delete-host-party/:id')
  @UseGuards(JwtAuthGuard)
  deleteHostParty(@Param('id') id: string) {
    return this.partyService.deleteHostParty(id);
  }

  @Delete('delete-all-host-party')
  @UseGuards(JwtAuthGuard)
  deleteAllHostParty() {
    return this.partyService.deleteAllHostParty();
  }

  @Get('get-host-party-view-model')
  @UseGuards(JwtAuthGuard)
  getHostPartyViewModel() {
    return this.partyService.getHostPartyViewModel();
  }

  @Post('guestJoinParty')
  @UseGuards(JwtAuthGuard)
  guestJoinParty(
    @GetCurrentUserId() userId: number,
    @Body() guestJoinPartyDto: Partial<GuestJoinPartyDto>,
  ) {
    return this.partyService.guestJoinParty({
      partyId: guestJoinPartyDto.partyId,
      memberId: userId.toString(),
    });
  }

  @Post('hostPartyAction')
  @UseGuards(JwtAuthGuard)
  hostPartyAction(@Body() hostPartyActionDto: HostPartyActionDto) {
    return this.partyService.hostPartyAction({
      partyId: hostPartyActionDto.partyId,
      memberId: hostPartyActionDto.memberId,
      action: hostPartyActionDto.action,
    });
  }

  @Get('get-guest-party-view-model')
  @UseGuards(JwtAuthGuard)
  getGuestPartyViewModel() {
    return this.partyService.getGuestPartyViewModel();
  }
}
