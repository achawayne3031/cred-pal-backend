import { IsCurrency, IsEmail, IsNumber } from 'class-validator';

export class TransferEmailTransactionDto {
  @IsEmail()
  email: string;

  @IsNumber()
  amount: number;

  note: string;
}
