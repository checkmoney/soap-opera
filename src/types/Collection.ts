import { IsNumber, IsArray } from 'class-validator';

export class Collection<T> {
  @IsArray()
  readonly items: T[];

  @IsNumber()
  readonly total: number;
}
