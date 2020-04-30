import Axios, { AxiosInstance } from 'axios';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { stringify } from 'querystring';

import { addTokenToHttpConfig } from './utils/addTokenToHttpConfig';
import { InvalidResponseException } from './exceptions/InvalidResponseException';
import { Transaction } from '../types/Transaction';
import { Collection } from '../types/Collection';

export class MrButcher {
  private readonly http: AxiosInstance;

  constructor(url: string) {
    const serviceUrl = url;

    this.http = Axios.create({
      baseURL: serviceUrl,
    });
  }

  async eagerFetchIds(token: string) {
    const allIds: string[] = [];

    for await (const id of this.lazyFetchIds(token)) {
      allIds.push(id);
    }

    return allIds;
  }

  async *lazyFetchIds(token: string) {
    const REQUEST_LIMIT = 100;

    let offset = 0;

    while (true) {
      // we realy want to make request in a sequence
      // eslint-disable-next-line no-await-in-loop
      const data = await this.fetchIds(token, offset, REQUEST_LIMIT);

      const { items, total } = data;

      offset += REQUEST_LIMIT;
      if (offset >= total) {
        break;
      }

      yield* items;
    }
  }

  private async fetchIds(
    token: string,
    offset: number,
    limit: number,
  ): Promise<Collection<string>> {
    const query = stringify({ offset, limit });

    const { data: rawIds } = await this.http.get(
      `/v1/transactions/ids?${query}`,
      addTokenToHttpConfig(token, {}),
    );

    const idCollection = plainToClass<Collection<string>, any>(
      Collection,
      rawIds,
    );

    await validateOrReject(idCollection);

    return idCollection;
  }

  async fetchTransactions(
    token: string,
    ids: string[],
  ): Promise<Transaction[]> {
    const { data: rawTransactions } = await this.http.post(
      '/v1/transactions/fetch-batch',
      { ids },
      addTokenToHttpConfig(token, {}),
    );

    if (!Array.isArray(rawTransactions)) {
      throw new InvalidResponseException(Array, rawTransactions, 'mr-butcher');
    }

    const transactions = rawTransactions.map((raw) =>
      plainToClass(Transaction, raw),
    );

    await Promise.all(
      transactions.map((transaction) => validateOrReject(transaction)),
    );

    return transactions;
  }
}
