import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ThreadsService } from './threads.service';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  create() {
    return this.threadsService.create();
  }

  @Get()
  findAll() {
    return this.threadsService.findAll();
  }

  @Get(':id')
  findOne() {
    return this.threadsService.findOne();
  }

  @Patch(':id')
  update() {
    return this.threadsService.update();
  }

  @Delete(':id')
  remove() {
    return this.threadsService.remove();
  }
}
