import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { AxiosModule } from 'src/common/axios/axios.module';

@Module({
  imports: [AxiosModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
