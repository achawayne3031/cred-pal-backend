import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IRegister } from 'src/interface/IRegister';
import { ILogin } from 'src/interface/ILogin';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private accountService: AccountsService,
  ) {}

  async profile(currentUser: User) {
    return {
      user: currentUser,
      account: await this.accountService.find(currentUser.id),
    };
  }

  create(payload: IRegister) {
    const user = this.repo.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });

    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number): Promise<User> {
    return this.repo.findOneBy({ id });
  }

  find(email: string): Promise<User[]> {
    return this.repo.findBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
