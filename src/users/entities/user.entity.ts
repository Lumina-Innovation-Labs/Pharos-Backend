import { Expose } from 'class-transformer';
import { Thread } from 'src/threads/entities/thread.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose({ name: 'name' })
  name: string;

  @Column({ unique: true })
  @Expose({ name: 'email' })
  email: string;

  @Column()
  @Expose({ name: 'password' })
  password: string;

  @OneToMany(() => Thread, (thread) => thread.user)
  threads: Thread[];
}
