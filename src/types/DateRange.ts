export class DateRange {
  constructor(readonly start: Date, readonly end: Date) {}

  toISOStrings() {
    return {
      start: this.start.toISOString(),
      end: this.end.toISOString(),
    };
  }
}
