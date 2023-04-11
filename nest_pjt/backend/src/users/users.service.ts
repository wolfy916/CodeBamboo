import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users:User[] = [
    {
      "id":1,
      "name":"seoyong",
      "age":28,
      "position":"FrontEnd",
      "skills":["react","redux"]
    }
  ]

  getAll():User[] {
    return this.users
  }

  getOne(id:string):User {
    return this.users.find(user=>user.id === +id)
  }

  create(userProfile:User) {
    this.users = [...this.users, {
      id:this.users.length+1,
      ...userProfile
    }]
    return 'User create Success!'
  }

  deleteOne(id:string) {
    this.users = this.users.filter(user=> user.id !== +id)
    return "Delete Success"
  }
}
