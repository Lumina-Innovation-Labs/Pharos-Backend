import { Injectable } from '@nestjs/common';

@Injectable()
export class ThreadsService {
  create() {
    return 'This action adds a new thread';
  }

  findAll() {
    return `This action returns all threads`;
  }

  findOne() {
    return `This action returns a thread`;
  }

  update() {
    return `This action updates a thread`;
  }

  remove() {
    return `This action removes a thread`;
  }
}
