import { DateRange } from '../DateRange';
import { PeriodType } from '../PeriodType';

export class DatePeriod extends DateRange {
  readonly type: PeriodType;

  readonly start: Date;

  readonly end: Date;
}
