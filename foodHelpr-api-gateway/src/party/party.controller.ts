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
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CreateHostPartyDto } from '../dto/createHostParty.dto';
import { PartyService } from './party.service';
import { GuestFindPartyDto } from '../dto/guestFindParty.dto';
import { GuestJoinPartyDto } from '../dto/guestJoinParty.dto';
import { GuestLeavePartyDto } from '../dto/guestLeaveParty.dto';
import { HostPartyActionDto } from '../dto/hostPartyAction.dto';
import { GetCurrentUserId } from '../auth/decorator';

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
  getPartyById(@Param('id') id: string) {
    return this.partyService.getPartyById(id);
  }

  @Get('get-party-list-by-user-id')
  @UseGuards(JwtAuthGuard)
  async getPartyListByUserId(@GetCurrentUserId() userId: number) {
    return await this.partyService.getPartyListByUserId(userId.toString());
  }

  @Post('create-host-party')
  @UseGuards(JwtAuthGuard)
  createHostParty(
    @GetCurrentUserId() userId: number,
    @Body() createHostPartyDto: Omit<CreateHostPartyDto, 'ownerId'>,
  ) {
    return this.partyService.createHostParty({
      ...createHostPartyDto,
      ownerId: userId.toString(),
    });
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

  @Get('get-guest-find-party-to-join')
  @UseGuards(JwtAuthGuard)
  async getGuestFindParty(
    @GetCurrentUserId() userId: number,
    @Query('distance') distance: number,
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ) {
    return await this.partyService.getGuestFindParty({
      userId: userId.toString(),
      distance: distance,
      location: {
        lat: lat,
        lng: lng,
      },
    });
  }

  @Post('guest-join-party')
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

  @Post('guest-leave-party')
  @UseGuards(JwtAuthGuard)
  guestLeaveParty(
    @GetCurrentUserId() userId: number,
    @Body() guestLeavePartyDto: Partial<GuestLeavePartyDto>,
  ) {
    return this.partyService.guestLeaveParty({
      partyId: guestLeavePartyDto.partyId,
      memberId: userId.toString(),
    });
  }

  @Post('host-party-action')
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
