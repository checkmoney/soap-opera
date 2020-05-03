import { DatePeriod } from './DatePeriod';
import { TransformBigInt } from '../../utils/TransformBigInt';

export class PeriodAmount {
  @TransformBigInt()
  readonly expenses: bigint;

  @TransformBigInt()
  readonly earnings: bigint;

  readonly period: DatePeriod;
}
