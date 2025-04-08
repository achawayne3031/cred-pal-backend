import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './../user/user.service';
import { IRegister } from 'src/interface/IRegister';
import { ILogin } from 'src/interface/ILogin';
import { User } from 'src/user/entities/user.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { JwtService } from '@nestjs/jwt';
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private accountService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async register(payload: IRegister) {
    const users = await this.userService.find(payload.email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    let hashedPassword = passwordHash.generate(payload.password);
    payload.password = hashedPassword;
    const user = await this.userService.create(payload);

    //// Create account /////
    this.accountService.create({ userId: user.id, balance: 0 });

    /// Generate Token /////
    let accessToken = this.generateToken(user);

    return { user, token: accessToken };
  }

  async login(payload: ILogin) {
    const [user] = await this.userService.find(payload.email);

    if (!user) {
      throw new NotFoundException('user not found.');
    }

    const dbPassword = user.password;
    let verify = passwordHash.verify(payload.password, dbPassword);

    if (!verify) {
      throw new BadRequestException('invalid login credentials.');
    }

    //// Check if user has an account /////
    let account = await this.accountService.find(user.id);
    if (account.length == 0) {
      //// Create account /////
      this.accountService.create({ userId: user.id, balance: 0 });
    }

    let accessToken = await this.generateToken(user);

    return { user, token: accessToken };
  }

  async generateToken(user: User) {
    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload, {
      secret: 'CredPal12345',
    });
    return token;
  }
}
