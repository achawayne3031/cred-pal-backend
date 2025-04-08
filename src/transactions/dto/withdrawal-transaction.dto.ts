import { IsCurrency, IsDate, IsNumber, IsString } from 'class-validator';

export class WithdrawalTransactionDto {
  @IsNumber()
  amount: number;
}
