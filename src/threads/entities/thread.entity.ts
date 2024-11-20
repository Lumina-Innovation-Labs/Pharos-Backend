import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

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
}
