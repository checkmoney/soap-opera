import Axios, { AxiosInstance } from 'axios';
import { format } from 'date-fns';
import { stringify } from 'querystring';
import { Cache, InMemoryProvider } from '@solid-soda/cache';

interface MrSolomonsParams {
  amount: string;
  from: string;
  to: string;
  date: Date;
}

interface MrSolomonsResponse {
  result: string;
  accurate: boolean;
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

    const {
      data: { accurate, result },
    } = await this.http.get<MrSolomonsResponse>(requestUrl);

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
      date: format(date, 'YYYY-MM-DD'),
      amount,
      from,
      to,
    });

    return `/v1/convert?${query}`;
  };
}
