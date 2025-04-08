import { IsCurrency, IsNumber } from 'class-validator';

export class DepositTransactionDto {
  @IsNumber()
  receiverId: number;

  @IsCurrency()
  amount: number;
}
