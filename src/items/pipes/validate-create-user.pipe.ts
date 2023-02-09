import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateItemDto } from '../dto/create-item-dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateItemDto, metadata: ArgumentMetadata) {
    const parseQtyToInt = parseInt(value.qty.toString());
    if(isNaN(parseQtyToInt)) {
      console.log(`${value.qty} is not a number.`);
      throw new HttpException('Invalid data type for property qty. Expected number', HttpStatus.BAD_REQUEST)
    }
    console.log(`${value.qty} is a number. Returning...`);
    return { ...value, qty: parseQtyToInt };
  }
}
