import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  create() {
    return 'This action adds a new message';
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
