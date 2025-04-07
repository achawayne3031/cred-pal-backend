import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './../user/user.service';
import { IRegister } from 'src/interface/IRegister';
import { CreateUserDto } from './dto/create-user.dto';
const passwordHash = require('password-hash');

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(payload: IRegister) {
    const users = await this.userService.find(payload.email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    let hashedPassword = passwordHash.generate(payload.password);
    payload.password = hashedPassword;
    const user = this.userService.create(payload);

    return user;
  }
}
