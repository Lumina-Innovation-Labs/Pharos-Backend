import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosService } from 'src/common/axios/axios.service';
import { Thread } from 'src/threads/entities/thread.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    private readonly axiosService: AxiosService,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const thread = await this.threadRepository.findOneOrFail({
      where: { id: createMessageDto.id_thread },
    });

    const message = this.messageRepository.create({
      ...createMessageDto,
      timestamp: new Date().toISOString(),
      isUserMessage: true,
      thread,
    });

    this.messageRepository.save(message);

    const { response } = await this.axiosService.testApi(
      createMessageDto.content,
    );

    const messageResponse = this.messageRepository.create({
      content: response,
      timestamp: new Date().toISOString(),
      isUserMessage: false,
      id_thread: createMessageDto.id_thread,
    });

    this.messageRepository.save(messageResponse);

    return { response };
  }

  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  findOne(id: number): Promise<Message> {
    return this.messageRepository.findOne({ where: { id } });
  }
}
