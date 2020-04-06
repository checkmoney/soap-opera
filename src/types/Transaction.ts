import { IsNumberString, Length, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class Transaction {
  @IsNumberString()
  readonly amount: string;

  @Length(3)
  readonly currency: string;

  @Type(() => Date)
  @IsDate()
  readonly date: Date;
}
