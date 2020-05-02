import Axios, { AxiosInstance } from 'axios';
import * as jwt from 'jsonwebtoken';

import { addTokenToHttpConfig } from './utils/addTokenToHttpConfig';
import { InvalidResponseException } from './exceptions/InvalidResponseException';
import { TokenPayload } from '../types/TokenPayload';

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
    const payload: TokenPayload = {
      login: userId,
      isManager: false,
      pretending: true,
    };

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        this.appSecret,
        { algorithm: 'HS256' },
        (error, token) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(token);
        },
      );
    });
  }

  async decode(token: string): Promise<TokenPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.appSecret,
        { algorithms: ['HS256'] },
        (error, payload) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(payload as TokenPayload);
        },
      );
    });
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
