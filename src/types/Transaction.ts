import {
  IsNumberString,
  Length,
  IsDate,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Transaction {
  @IsString()
  readonly id: string;

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

  constructor(
    id: string,
    amount: string,
    currency: string,
    date: Date,
    category: string,
  ) {
    this.id = id;
    this.amount = amount;
    this.currency = currency;
    this.date = date;
    this.category = category;
  }
}
