import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from 'src/app.service';
import { CreateHostPartyDto } from 'src/dto/createHostParty.dto';


@Injectable()
export class PartyService {
  constructor(
    @Inject('PARTY') private readonly partyService: ClientProxy,
    private readonly appService: AppService,
  ) {}

  getHostParty() {
    return this.partyService.send({ cmd: 'getHostParty' }, {});
  }

  getHostPartyById(id: string) {
    return this.partyService.send({ cmd: 'getHostPartyById' }, id);
  }

  createRestaurant(createHostPartyDto: CreateHostPartyDto) {
    return this.partyService.send<CreateHostPartyDto>(
      { cmd: 'create' },
      createHostPartyDto,
    );
  }

}