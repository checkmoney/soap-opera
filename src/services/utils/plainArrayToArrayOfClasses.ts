import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

import { InvalidResponseException } from '../exceptions/InvalidResponseException';

export const plainArrayToArrayOfClasses = <T>(
  classType: ClassType<T>,
  data: unknown,
) => {
  if (!Array.isArray(data)) {
    throw new InvalidResponseException(Array, data, 'soap-opera');
  }

  return data.map((item) => plainToClass(classType, item));
};
