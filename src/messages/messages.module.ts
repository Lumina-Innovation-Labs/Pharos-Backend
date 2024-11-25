import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { AxiosModule } from 'src/common/axios/axios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Thread } from 'src/threads/entities/thread.entity';

@Module({
  imports: [AxiosModule, TypeOrmModule.forFeature([Message, Thread])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
