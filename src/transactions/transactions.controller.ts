import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { DepositTransactionDto } from './dto/deposit-transaction.dto';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { WithdrawalTransactionDto } from './dto/withdrawal-transaction.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { TransferTransactionDto } from './dto/transfer-transaction.dto';
import { TransferEmailTransactionDto } from './dto/transfer-email-transaction.dto';

@Controller('/api/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/user')
  @HttpCode(200)
  async userTransaction(@CurrentUser() currentUser) {
    return this.transactionsService.userTransaction(1, currentUser);

    ///return this.transactionsService.deposit(body, currentUser);
  }

  @Post('/deposit')
  @HttpCode(200)
  async deposit(
    @Body() body: DepositTransactionDto,
    @CurrentUser() currentUser,
  ) {
    return this.transactionsService.deposit(body, currentUser);
  }

  @Post('/withdrawal')
  @HttpCode(200)
  async withdrawal(
    @Body() body: WithdrawalTransactionDto,
    @CurrentUser() currentUser,
  ) {
    return this.transactionsService.withdrawal(body, currentUser);
  }

  @Post('/transfer')
  @HttpCode(200)
  async transfer(
    @Body() body: TransferTransactionDto,
    @CurrentUser() currentUser,
  ) {
    return this.transactionsService.transfer(body, currentUser);
  }

  @Post('/transfer-email')
  @HttpCode(200)
  async transferEmail(
    @Body() body: TransferEmailTransactionDto,
    @CurrentUser() currentUser,
  ) {
    return this.transactionsService.transferEmail(body, currentUser);
  }

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
