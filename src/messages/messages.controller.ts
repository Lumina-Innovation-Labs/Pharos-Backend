import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
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
