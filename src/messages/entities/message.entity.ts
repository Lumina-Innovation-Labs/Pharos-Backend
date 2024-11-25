import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Thread } from '../../threads/entities/thread.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  @Column()
  isUserMessage: boolean;

  @Column('datetime')
  timestamp: Date;

  // Relationships
  @ManyToOne(() => Thread, (thread) => thread.messages)
  @JoinColumn({ name: 'id_thread' })
  thread: Thread;
}
