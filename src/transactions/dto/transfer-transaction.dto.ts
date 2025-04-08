import { IsCurrency, IsNumber } from 'class-validator';

export class TransferTransactionDto {
  @IsNumber()
  receiverId: number;

  @IsNumber()
  amount: number;
}
