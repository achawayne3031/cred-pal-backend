import { IsCurrency, IsDate, IsNumber, IsString } from 'class-validator';

export class SaveTransactionDto {
  @IsString()
  type: string;

  @IsNumber()
  senderId: number;

  @IsNumber()
  receiverId: number;

  @IsNumber()
  amount: number;

  @IsDate()
  timestamp: Date;
}
