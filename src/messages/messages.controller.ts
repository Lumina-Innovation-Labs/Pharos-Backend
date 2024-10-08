import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create() {
    return this.messagesService.create();
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne() {
    return this.messagesService.findOne();
  }

  @Patch(':id')
  update() {
    return this.messagesService.update();
  }

  @Delete(':id')
  remove() {
    return this.messagesService.remove();
  }
}
