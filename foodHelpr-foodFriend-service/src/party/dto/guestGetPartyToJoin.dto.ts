import { Coordinate } from './coordinate.dto';

export class GuestGetPartyToJoin {
    constructor(
      public coordinate: Coordinate,
      public ageRestriction: number,
      public range: number
    ) {}
  }
  