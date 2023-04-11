import { Query, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() :User[] {
    return this.usersService.getAll()
  }

  // @Get('search')
  // search(@Query('name') searchingName:string){
  //   return `You will search User by name : ${searchingName}`
  // }

  @Get(":id")
  getOne(@Param('id') id:string): User {
    return this.usersService.getOne(id)
  }

  @Post()
  create(@Body() userProfile){
    return this.usersService.create(userProfile)
  }

  @Delete(":id")
  delete(@Param('id') id:string){
    return this.usersService.deleteOne(id)
  }

  @Patch(':id')
  update(@Param('id') id:string, @Body() updateProfile){
    return {
      id,
      ...updateProfile
    }
  }
}
