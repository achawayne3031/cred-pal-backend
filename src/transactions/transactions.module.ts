import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Transaction } from './entities/transaction.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { CurrentUserMiddleware } from 'src/middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account, Transaction])],

  controllers: [TransactionsController],
  providers: [TransactionsService, JwtService, UserService, AccountsService],
})
export class TransactionsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes(TransactionsController);
  }
}
