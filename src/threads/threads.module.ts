import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Thread, User])],
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}
