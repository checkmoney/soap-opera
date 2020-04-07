import { IsNumberString, IsBoolean } from 'class-validator';

export class ConvertedValue {
  @IsNumberString()
  readonly result: string;

  @IsBoolean()
  readonly accurate: boolean;
}
