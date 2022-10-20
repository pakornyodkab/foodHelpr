import { Coordinate } from './coordinate.dto';

export class RestaurantNameRequest {
  constructor(
    public coordinate: Coordinate,
    public ageRestriction: number,
    public maxGuests: number,
    public apptDate: Date,
    public roomName: string,
  ) {}
}
