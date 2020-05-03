/* eslint-disable unicorn/consistent-function-scoping */
import { Transform } from 'class-transformer';

export const TransformBigInt = () => (target: any, key: string) => {
  Transform((value: bigint) => value.toString(), { toPlainOnly: true })(
    target,
    key,
  );
  Transform((value: string) => BigInt(value), { toClassOnly: true })(
    target,
    key,
  );
};
