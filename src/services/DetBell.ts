import Axios, { AxiosInstance } from 'axios';
import * as jwt from 'jsonwebtoken';

import { addTokenToHttpConfig } from './utils/addTokenToHttpConfig';
import { InvalidResponseException } from './exceptions/InvalidResponseException';

export class DetBell {
  private readonly http: AxiosInstance;

  constructor(private readonly appSecret: string, url: string) {
    const serviceUrl = url;

    this.http = Axios.create({
      baseURL: serviceUrl,
    });
  }

  // TODO: It is a fake method, rewrite it!
  async pretend(userId: string): Promise<string> {
    const payload = { login: userId, isManager: false };

    return jwt.sign(payload, this.appSecret, { algorithm: 'HS256' });
  }

  async getDefaultCurrency(token: string): Promise<string> {
    const { data: defaultCurrency } = await this.http.get<string>(
      `/v1/default-currency`,
      addTokenToHttpConfig(token, {}),
    );

    if (typeof defaultCurrency !== 'string' || defaultCurrency.length !== 3) {
      throw new InvalidResponseException(
        'String with 3 symbols',
        defaultCurrency,
        'det-bell',
      );
    }

    return defaultCurrency;
  }
}
