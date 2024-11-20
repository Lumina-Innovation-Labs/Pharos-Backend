import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private createMessageDto: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<any> {
    createMessageDto.timestamp = new Date().toISOString();
    const newMessage = this.createMessageDto.create(createMessageDto);
    return this.createMessageDto.save(newMessage);
  }

  findAll(): Promise<Message[]> {
    return this.createMessageDto.find();
  }

  findOne(id: number): Promise<Message> {
    return this.createMessageDto.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const message = await this.findOne(id);

    if (!message) {
      throw new Error('Message not found');
    }

    const updatedMessage = this.createMessageDto.merge(
      message,
      updateMessageDto,
    );

    return this.createMessageDto.save(updatedMessage);
  }

  async remove(id: number): Promise<void> {
    await this.createMessageDto.delete(id);
    return undefined;
  }
}
