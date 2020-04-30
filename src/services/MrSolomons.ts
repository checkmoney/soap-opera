import Axios, { AxiosInstance } from 'axios';
import { format } from 'date-fns';
import { stringify } from 'querystring';
import { Cache, InMemoryProvider } from '@solid-soda/cache';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConvertedValue } from '../types/ConvertedValue';
import { Transaction } from '../types/Transaction';

interface MrSolomonsParams {
  amount: string;
  from: string;
  to: string;
  date: Date;
}

export class MrSolomons {
  private readonly http: AxiosInstance;

  private readonly cache: Cache;

  constructor(url: string, cache?: Cache) {
    const serviceUrl = url;

    this.http = Axios.create({
      baseURL: serviceUrl,
    });

    this.cache = cache || new Cache(new InMemoryProvider());
  }

  async convertTransaction(
    transaction: Transaction,
    targetCurrency: string,
  ): Promise<Transaction> {
    const params: MrSolomonsParams = {
      from: transaction.currency,
      to: targetCurrency,
      amount: transaction.amount,
      date: transaction.date,
    };

    const convertedAmount = await this.convert(params);

    return new Transaction(
      convertedAmount,
      targetCurrency,
      transaction.date,
      transaction.category,
    );
  }

  async convert(params: MrSolomonsParams): Promise<string> {
    const { from, to, amount } = params;

    if (from === to) {
      return amount;
    }

    const requestUrl = this.createUrl(params);

    const [cached, setCached] = await this.cache.useCache<string>(requestUrl);

    if (cached) {
      return cached;
    }

    const { data: rawData } = await this.http.get(requestUrl);

    const data = plainToClass(ConvertedValue, rawData);
    await validateOrReject(data);

    const { accurate, result } = data;

    if (accurate) {
      await setCached(result);
    }

    return result;
  }

  private createUrl = ({
    amount,
    from,
    to,
    date,
  }: MrSolomonsParams): string => {
    const query = stringify({
      date: format(date, 'yyyy-MM-dd'),
      amount,
      from,
      to,
    });

    return `/v1/convert?${query}`;
  };
}
