import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Thread } from 'src/threads/entities/thread.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Thread, (thread) => thread.user)
  threads: Thread[];
}
