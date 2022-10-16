import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { throws } from 'assert';
import { CreateHostPartyDto } from './dto/createHostParty.dto';
import { PartyService } from './party.service';
import { RestaurantNameRequest } from './dto/restaurantNameRequest';



@Controller()
export class PartyController {
    private LOGGER: Logger;

    constructor(private readonly partyService: PartyService) {
        this.LOGGER = new Logger();
    }   

    @MessagePattern({ cmd : 'getRestaurantName' })
    getRestaurantName(restaurantNameRequest:RestaurantNameRequest) {
        return this.partyService.getRestaurantName(
            restaurantNameRequest.coordinate
        )
    }
    
    @MessagePattern({ cmd: 'getHostPartyById' })
    getHostPartyById(id: string) {
        return this.partyService.getHostPartyById(id);
    }

    @MessagePattern({ cmd: 'getHostParty' })
    getHostParty() {
        return this.partyService.getHostParty();
    }

    @MessagePattern({ cmd: 'createHostParty' })
    createHostParty(createHostPartyDto: CreateHostPartyDto) {
        return this.partyService.createHostParty(createHostPartyDto);
    }
}
