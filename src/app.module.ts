import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      entities: [User],
      synchronize: true,
      database: 'cred_pal_test',
      host: 'localhost',
      username: 'root',
      password: '',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
