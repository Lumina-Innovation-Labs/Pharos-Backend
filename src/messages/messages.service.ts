import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/common/axios/axios.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly axiosService: AxiosService) {}
  create(createMessageDto: CreateMessageDto) {
    return this.axiosService.testApi(createMessageDto.prompt);
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne() {
    return `This action returns a message`;
  }

  update() {
    return `This action updates a message`;
  }

  remove() {
    return `This action removes a message`;
  }
}
