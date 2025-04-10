import { IsCurrency, IsNumber } from 'class-validator';

export class DepositTransactionDto {
  @IsNumber()
  amount: number;
}
