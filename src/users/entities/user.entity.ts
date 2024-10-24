import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Thread } from 'src/threads/entities/thread.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose({ name: 'user_name' })
  name: string;

  @Column({ unique: true })
  @Expose({ name: 'user_email' })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Thread, (thread) => thread.user)
  threads: Thread[];
}
