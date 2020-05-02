export interface TokenPayload {
  readonly login: string;

  readonly isManager: boolean;

  readonly pretending?: boolean;
}
