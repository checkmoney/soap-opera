/* eslint-disable max-classes-per-file */

import { DatePeriod } from './DatePeriod';
import { TransformBigInt } from '../../utils/TransformBigInt';

export class CategoryData {
  @TransformBigInt()
  readonly amount: bigint;

  readonly category: string;
}

export class PeriodCategories {
  readonly expenses: CategoryData[];

  readonly earnings: CategoryData[];

  readonly period: DatePeriod;
}
