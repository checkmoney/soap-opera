import Axios, { AxiosInstance } from 'axios';
import { plainToClass } from 'class-transformer';

import { DateRange } from '../types/DateRange';
import { PeriodType } from '../types/PeriodType';
import { Average } from '../types/statistics/Average';
import { PeriodAmount } from '../types/statistics/PeriodAmount';
import { PeriodCategories } from '../types/statistics/PeriodCategories';
import { addTokenToHttpConfig } from './utils/addTokenToHttpConfig';
import { dateRangeForQuery } from './utils/dateRangeToQuery';
import { plainArrayToArrayOfClasses } from './utils/plainArrayToArrayOfClasses';

export class DrKhomyuk {
  private readonly http: AxiosInstance;

  constructor(url: string) {
    const serviceUrl = url;

    this.http = Axios.create({
      baseURL: serviceUrl,
    });
  }

  readonly triggers = {
    currency: async (token: string) => {
      await this.http.post(
        'v1/trigger/default-currency',
        null,
        addTokenToHttpConfig(token, {}),
      );
    },
    transaction: async (token: string) => {
      await this.http.post(
        'v1/trigger/transaction',
        null,
        addTokenToHttpConfig(token, {}),
      );
    },
  };

  async getAverage(token: string, periodType: PeriodType): Promise<Average> {
    const { data: rawAverage } = await this.http.get(
      `v1/statistics/average?periodType=${periodType}`,
      addTokenToHttpConfig(token, {}),
    );

    return plainToClass(Average, rawAverage);
  }

  async fetchAmount(
    token: string,
    periodType: PeriodType,
    dateRange: DateRange,
  ): Promise<PeriodAmount[]> {
    const { data: rawAmounts } = await this.http.get(
      `v1/statistics/periods?periodType=${periodType}&${dateRangeForQuery(
        dateRange,
      )}`,
      addTokenToHttpConfig(token, {}),
    );

    return plainArrayToArrayOfClasses(PeriodAmount, rawAmounts);
  }

  async fetchCategories(
    token: string,
    periodType: PeriodType,
    dateRange: DateRange,
  ): Promise<PeriodCategories[]> {
    const { data: rawCategories } = await this.http.get(
      `v1/statistics/categories?periodType=${periodType}&${dateRangeForQuery(
        dateRange,
      )}`,
      addTokenToHttpConfig(token, {}),
    );

    return plainArrayToArrayOfClasses(PeriodCategories, rawCategories);
  }
}
