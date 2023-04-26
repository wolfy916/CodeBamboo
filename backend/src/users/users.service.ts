import { Injectable, Inject } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { user_id: id } });
  }

  async create(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async deleteOne(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(id: number, user: User): Promise<void> {
    const existedUser = await this.getOne(id);
    if (existedUser) {
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          nickname: user.nickname,
          image: user.image,
          introduce: user.introduce,
        })
        .where('user_id = :id', { id })
        .execute();
    }
  }
}
