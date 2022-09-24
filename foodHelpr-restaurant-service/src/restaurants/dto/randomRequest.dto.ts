import { Coordinate } from './coordinate.dto';

export class RandomRequest {
  constructor(
    public coordinate: Coordinate,
    public randomNumber: number,
    public range: number,
  ) {}
}
