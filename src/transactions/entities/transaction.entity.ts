import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  type: 'deposit' | 'withdrawal' | 'transfer';

  @Column()
  timestamp: Date;

  @Column({ nullable: true })
  @ManyToOne(() => User, { nullable: true })
  senderId: number;

  @Column({ nullable: true })
  @ManyToOne(() => User, { nullable: true })
  receiverId: number;

  @Column({ default: 0 })
  status: number;
}
