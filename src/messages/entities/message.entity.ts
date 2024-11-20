import { Thread } from 'src/threads/entities/thread.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  // Attributes
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_thread: number;

  @Column()
  id_user: number;

  @Column()
  content: string;

  @Column()
  timestamp: string;

  @ManyToOne(() => User, (user) => user.threads)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Thread, (thread) => thread.messages)
  @JoinColumn({ name: 'id_thread' })
  thread: Thread;
}
