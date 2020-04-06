import { AxiosRequestConfig } from 'axios';

export const addTokenToHttpConfig = (
  token: string,
  config: AxiosRequestConfig = {},
): AxiosRequestConfig => {
  const headers = {
    ...(config.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  return {
    ...config,
    headers,
  };
};
