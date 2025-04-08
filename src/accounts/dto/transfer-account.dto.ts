import { IsNumber } from 'class-validator';

export class TransferAccountDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  balance: number;
}
