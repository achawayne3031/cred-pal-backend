import { IsNumber } from 'class-validator';

export class WithdrawalAccountDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  balance: number;
}
