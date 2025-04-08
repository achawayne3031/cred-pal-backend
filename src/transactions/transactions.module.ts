import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Transaction } from './entities/transaction.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account, Transaction])],

  controllers: [TransactionsController],
  providers: [TransactionsService, JwtService],
})
export class TransactionsModule {}
