import { IsNumber } from 'class-validator';

export class DepositAccountDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  balance: number;
}
