import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from 'src/app.service';
import { CreateHostPartyDto } from 'src/dto/createHostParty.dto';


@Injectable()
export class PartyService {
  constructor(
    @Inject('FOODFRIEND') private readonly foodFriendService: ClientProxy,
    private readonly appService: AppService,
  ) {}

  getHostParty() {
    return this.foodFriendService.send({ cmd: 'getHostParty' }, {});
  }

  getHostPartyById(id: string) {
    return this.foodFriendService.send({ cmd: 'getHostPartyById' }, id);
  }

  createHostParty(createHostPartyDto: CreateHostPartyDto) {
    return this.foodFriendService.send<CreateHostPartyDto>(
      { cmd: 'createHostParty' },
      createHostPartyDto,
    );
  }

  deleteHostParty(id: string) {
    return this.foodFriendService.send<String>({ cmd: 'deleteHostParty' }, id);
  }

  deleteAllHostParty() {
    return this.foodFriendService.send({ cmd: 'deleteAllHostParty'}, {});
  }

}