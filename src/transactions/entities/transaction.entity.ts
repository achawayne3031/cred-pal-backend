import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  senderId: number;

  @Column({ nullable: true })
  receiverId: number;
}
