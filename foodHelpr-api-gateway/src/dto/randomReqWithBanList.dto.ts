import { RandomRequest } from './randomRequest.dto';

export class RandomReqWithBanList {
  constructor(public req: RandomRequest, public userBanListId: String[]) {}
}
