import Axios, { AxiosInstance } from 'axios';
import { plainToClass } from 'class-transformer';

import { plainArrayToArrayOfClasses } from './utils/plainArrayToArrayOfClasses';
import { PeriodCategories } from '../types/statistics/PeriodCategories';
import { addTokenToHttpConfig } from './utils/addTokenToHttpConfig';
import { PeriodAmount } from '../types/statistics/PeriodAmount';
import { dateRangeForQuery } from './utils/dateRangeToQuery';
import { Average } from '../types/statistics/Average';
import { PeriodType } from '../types/PeriodType';
import { DateRange } from '../types/DateRange';
import { Grow } from '../types/statistics/Grow';

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

  async getGrow(token: string, periodType: PeriodType): Promise<Grow> {
    const { data: rawGrow } = await this.http.get(
      `v1/statistics/grow?periodType=${periodType}`,
      addTokenToHttpConfig(token, {}),
    );

    return plainToClass(Grow, rawGrow);
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
