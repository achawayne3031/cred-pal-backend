import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { IDeposit } from 'src/interface/IDeposit';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { SaveTransactionDto } from './dto/save-transaction.dto';
import { IWithdrawal } from 'src/interface/IWithdrawal';
import { ITransfer } from 'src/interface/ITransfer';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    private userService: UserService,
    private accountService: AccountsService,
  ) {}

  async userTransaction(currentPage: number = 1, currentUser: User) {
    let perPage = 5;
    let skipItem = perPage * currentPage - perPage;
    let total = await this.transactionRepo
      .createQueryBuilder('transaction')
      .getCount();
    let nextPage = skipItem + perPage > total ? null : currentPage + 1;
    let prevPage = currentPage - 1 != 0 ? currentPage - 1 : null;

    let transactions = await this.transactionRepo
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.senderId', 'senderId')
      .leftJoinAndSelect('transaction.receiverId', 'receiverId')
      .where('senderId = :senderId', { senderId: currentUser.id })
      .andWhere('receiverId = :receiverId', { receiverId: currentUser.id })
      .skip(skipItem)
      .take(perPage)
      .orderBy('transaction.timestamp', 'DESC')
      .getMany();

    return {
      currentPage: currentPage,
      data: transactions,
      total: total,
      perPage: perPage,
      nextPage: nextPage,
      prevPage: prevPage,
    };
  }

  async deposit(payload: IDeposit, currentUser: User) {
    let receiverAccountData = await this.accountService.find(currentUser.id);

    let newReceiverAmount = receiverAccountData.balance + payload.amount;

    this.accountService.deposit({
      userId: currentUser.id,
      balance: newReceiverAmount,
    });

    const transactionD = this.transactionRepo.create({
      amount: payload.amount,
      type: 'deposit',
      timestamp: new Date(),
      senderId: currentUser.id,
      receiverId: currentUser.id,
      status: 1,
    });

    return this.transactionRepo.save(transactionD);
  }

  async withdrawal(payload: IWithdrawal, currentUser: User) {
    let userAccountData = await this.accountService.find(currentUser.id);

    if (payload.amount > userAccountData.balance) {
      throw new BadRequestException('Insufficient balance.');
    }

    let newUserBalance = userAccountData.balance - payload.amount;

    this.accountService.withdrawal({
      userId: currentUser.id,
      balance: newUserBalance,
    });

    const transactionD = this.transactionRepo.create({
      amount: payload.amount,
      type: 'withdrawal',
      timestamp: new Date(),
      senderId: currentUser.id,
      receiverId: currentUser.id,
      status: 1,
    });

    return this.transactionRepo.save(transactionD);
  }

  async transfer(payload: ITransfer, currentUser: User) {
    let receiverData = await this.userService.findOne(payload.receiverId);

    if (!receiverData) {
      throw new NotFoundException('receiver user not found');
    }

    let senderAccountData = await this.accountService.find(currentUser.id);
    let receiverAccountData = await this.accountService.find(
      payload.receiverId,
    );

    if (payload.amount > senderAccountData.balance) {
      throw new BadRequestException('Insufficient balance.');
    }

    let newSenderAmount = senderAccountData.balance - payload.amount;
    let newReceiverAmount = receiverAccountData.balance + payload.amount;

    this.accountService.deposit({
      userId: senderAccountData.userId,
      balance: newSenderAmount,
    });
    this.accountService.deposit({
      userId: receiverAccountData.userId,
      balance: newReceiverAmount,
    });

    const transactionD = this.transactionRepo.create({
      amount: payload.amount,
      type: 'transfer',
      timestamp: new Date(),
      senderId: currentUser.id,
      receiverId: payload.receiverId,
      status: 1,
    });

    return this.transactionRepo.save(transactionD);
  }

  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
