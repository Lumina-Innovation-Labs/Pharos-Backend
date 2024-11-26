import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Thread {
  // Attributes
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;

  @Column()
  title: string;

  @Column()
  timestamp: string;

  // Relationships
  @ManyToOne(() => User, (user) => user.threads)
  @JoinColumn({ name: 'id_user' })
  user: User;

  // Messages
  @OneToMany(() => Message, (message) => message.thread)
  @JoinColumn({ name: 'id' })
  messages: Message[];
}
