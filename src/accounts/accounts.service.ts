import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IAccount } from 'src/interface/IAccount';
import { DepositAccountDto } from './dto/deposit-account.dto';
import { WithdrawalAccountDto } from './dto/withdrawal-account.dto';
import { TransferTransactionDto } from 'src/transactions/dto/transfer-transaction.dto';
import { TransferAccountDto } from './dto/transfer-account.dto';

@Injectable()
export class AccountsService {
  constructor(@InjectRepository(Account) private repo: Repository<Account>) {}

  find(userId: number): Promise<Account> {
    return this.repo.findOne({ where: { userId: userId } });
  }

  create(accountData: IAccount) {
    const account = this.repo.create({
      userId: accountData.userId,
      balance: 0.0,
    });

    return this.repo.save(account);
  }

  async deposit(deposit: DepositAccountDto) {
    const account = await this.findOne(deposit.userId);

    if (!account) {
      throw new NotFoundException('user not found');
    }

    await this.repo.update(
      { userId: deposit.userId },
      {
        balance: deposit.balance,
      },
    );
  }

  async withdrawal(withdrawal: WithdrawalAccountDto) {
    const account = await this.findOne(withdrawal.userId);

    if (!account) {
      throw new NotFoundException('user not found');
    }

    await this.repo.update(
      { userId: withdrawal.userId },
      {
        balance: withdrawal.balance,
      },
    );
  }

  async transfer(transfer: TransferAccountDto) {
    const account = await this.findOne(transfer.userId);

    if (!account) {
      throw new NotFoundException('user not found');
    }

    await this.repo.update(
      { userId: transfer.userId },
      {
        balance: transfer.balance,
      },
    );
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
