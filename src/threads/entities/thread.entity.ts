import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Message } from 'src/messages/entities/message.entity';

@Entity()
export class Thread {
  // Attributes
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;

  @Column()
  title: string;

  // Relationships
  @ManyToOne(() => User, (user) => user.threads)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => Message, (message) => message.thread)
  messages: Message[];
}
