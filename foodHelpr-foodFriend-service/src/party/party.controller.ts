import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { throws } from 'assert';
import { CreateHostPartyDto } from './dto/createHostParty.dto';
import { PartyService } from './party.service';



@Controller()
export class PartyController {
    private LOGGER: Logger;

    constructor(private readonly hostService: PartyService) {
        this.LOGGER = new Logger();
    }   

    @MessagePattern({ cmd: 'getHostPartyById' })
    getHostPartyById(id: string) {
        return this.hostService.getHostPartyById(id);
    }

    @MessagePattern({ cmd: 'getHostParty' })
    getHostParty() {
        return this.hostService.getHostParty();
    }

    @MessagePattern({ cmd: 'createHostParty' })
    createHostParty(createHostPartyDto: CreateHostPartyDto) {
        return this.hostService.createHostParty(createHostPartyDto);
    }
}
