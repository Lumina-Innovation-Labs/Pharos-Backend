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
  text: string;

  @Column()
  isUserMessage: boolean;

  // Relationships
  @ManyToOne(() => Thread, (thread) => thread.messages)
  @JoinColumn({ name: 'id_thread' })
  thread: Thread;
}
