import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account } from 'src/accounts/entities/account.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
import { CurrentUserMiddleware } from 'src/middlewares/current-user.middleware';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([User, Account])],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, AccountsService, JwtService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes(UserController);
  }
}
