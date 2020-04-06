import { IsNumber, IsArray } from 'class-validator';

export class Collection<T> {
  @IsArray()
  items: T[];

  @IsNumber()
  total: number;
}
