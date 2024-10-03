import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get()
  findOne() {
    return this.usersService.findOne();
  }

  @Patch()
  update() {
    return this.usersService.update();
  }

  @Delete()
  remove() {
    return this.usersService.remove();
  }
}
