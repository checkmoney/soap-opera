import { IsNumberString, IsBoolean } from 'class-validator';

export class ConvertedValue {
  @IsNumberString()
  result: string;

  @IsBoolean()
  accurate: boolean;
}
