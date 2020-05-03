import { TransformBigInt } from '../../utils/TransformBigInt';

export class Average {
  @TransformBigInt()
  readonly expenses: bigint;

  @TransformBigInt()
  readonly earnings: bigint;
}
