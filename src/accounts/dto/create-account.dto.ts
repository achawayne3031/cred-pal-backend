import {
  IsCurrency,
  IsEmail,
  IsNumber,
  IsString,
  isString,
} from 'class-validator';

export class CreateAccountDto {
  @IsNumber()
  userId: number;

  @IsCurrency()
  balance: number;
}
