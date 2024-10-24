import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Thread } from './entities/thread.entity';
import { CreateThreadDto } from './dto/create-thread.dto';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private threadsRepository: Repository<Thread>,
  ) {}

  async create(createThreadDto: CreateThreadDto): Promise<Thread> {
    const newThread = this.threadsRepository.create(createThreadDto);
    return this.threadsRepository.save(newThread);
  }

  findAll(): Promise<Thread[]> {
    return this.threadsRepository.find();
  }

  findOne(id: number): Promise<Thread> {
    return this.threadsRepository.findOne({ where: { id } });
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
