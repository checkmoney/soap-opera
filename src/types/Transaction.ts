import {
  IsNumberString,
  Length,
  IsDate,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Transaction {
  @IsNumberString()
  readonly amount: string;

  @Length(3)
  readonly currency: string;

  @Type(() => Date)
  @IsDate()
  readonly date: Date;

  @IsString()
  @MinLength(1)
  readonly category: string;

  constructor(amount: string, currency: string, date: Date, category: string) {
    this.amount = amount;
    this.currency = currency;
    this.date = date;
    this.category = category;
  }
}
