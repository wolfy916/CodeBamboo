import {
  Query,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  // @Get('search')
  // search(@Query('name') searchingName:string){
  //   return `You will search User by name : ${searchingName}`
  // }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<User> {
    return this.usersService.getOne(id);
  }

  @Post()
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.usersService.deleteOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() user: User) {
    this.usersService.update(id, user);
  }
}
