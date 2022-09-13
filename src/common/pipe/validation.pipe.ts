import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    console.log(metadata);
    if (!metatype || this.toValidate(metatype)) {
      return value;
    }
    console.log(value);
    const classObject = plainToClass(metatype, value); // js 객체를 class 객체로 바꿔줌
    console.log(classObject);
    const errors = await validate(classObject); // validate를 하기위해선 타입이 필요
    console.log(errors);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return types.includes(metatype);
  }
}
