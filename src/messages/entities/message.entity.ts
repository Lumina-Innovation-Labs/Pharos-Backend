import { Thread } from 'src/threads/entities/thread.entity';
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
  content: string;

  @Column()
  isUserMessage: boolean;

  @Column()
  timestamp: string;

  @ManyToOne(() => Thread, (thread) => thread.messages)
  @JoinColumn({ name: 'id_thread' })
  thread: Thread;
}
