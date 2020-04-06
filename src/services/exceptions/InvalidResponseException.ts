export class InvalidResponseException extends Error {
  constructor(
    public readonly expect: any,
    public readonly actual: any,
    source: string,
  ) {
    super(`Invalid response from  ${source}`);
  }
}
