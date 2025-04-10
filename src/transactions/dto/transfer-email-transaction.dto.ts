import { IsCurrency, IsEmail, IsNumber, IsString } from 'class-validator';
import { IsNull } from 'typeorm';

export class TransferEmailTransactionDto {
  @IsEmail()
  email: string;

  @IsNumber()
  amount: number;

  @IsString()
  note: string;
}
