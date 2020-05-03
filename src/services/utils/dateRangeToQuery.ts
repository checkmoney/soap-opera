import { DateRange } from '../../types/DateRange';

export const dateRangeForQuery = (range: DateRange) =>
  `start=${range.start}&end=${range.end}`;
