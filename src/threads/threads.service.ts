import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateThreadDto } from './dto/create-thread.dto';
import { Thread } from './entities/thread.entity';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private threadsRepository: Repository<Thread>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createThreadDto: CreateThreadDto): Promise<Thread> {
    const newThread = this.threadsRepository.create({
      ...createThreadDto,
      timestamp: new Date().toISOString(),
    });
    return this.threadsRepository.save(newThread);
  }

  async findAll(userId?: number): Promise<Thread[]> {
    if (userId) {
      return this.threadsRepository.find({
        where: { id_user: userId },
        relations: ['messages'],
      });
    }
    return this.threadsRepository.find({ relations: ['messages'] });
  }

  findOne(id: number): Promise<Thread> {
    return this.threadsRepository.findOne({
      where: { id },
      relations: ['messages'],
    });
  }

  async update(id: number, updateThreadDto: CreateThreadDto): Promise<Thread> {
    const thread = await this.findOne(id);

    if (!thread) {
      throw new Error('Thread not found');
    }

    const updatedThread = this.threadsRepository.merge(thread, updateThreadDto);

    return this.threadsRepository.save(updatedThread);
  }

  remove(id: number): Promise<void> {
    return this.threadsRepository.delete(id).then(() => undefined);
  }
}
