import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Validation_exception } from '../exceptions/validation.exception';

@Injectable()
export class Validation_pipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const dto = plainToClass(metadata.metatype, value);
    const errors = await validate(dto);

    if (errors.length) {
      const messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
      });
      throw new Validation_exception(messages);
    }

    return value;
  }
}
