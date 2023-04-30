import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Follow } from './entities/follow.entity';
import { Repository, Like, Equal } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { SimpleUserDto } from './dto/simple.user.dto';
import { CreateFollowDto } from './dto/create.follow.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,

    @Inject('FOLLOW_REPOSITORY')
    private followRepository: Repository<Follow>,
  ) {}

  // [#] 테스트용 코드
  async getAll(): Promise<SimpleUserDto[]> {
    return this.userRepository.find();
  }

  // [1] 유저 nickname으로 정보 조회
  async searchUsersNickname(userInput: string): Promise<SimpleUserDto[]> {
    const users = await this.userRepository.find({
      where: { nickname: Like(`%${userInput}%`) },
    });
    if (!users) {
      throw new NotFoundException(`user nickname ${userInput} not found`);
    }
    return users;
  }

  // [2] 유저Id로 팔로우 목록 조회
  async getFollowUsers(id: number) {
    const existedUser = await this.getUser(id);
    console.log(existedUser);
    if (existedUser) {
      return await this.followRepository.findBy({ follower_id: Equal(id) });
    }
  }

  // [3] 팔로우 생성
  async followUser(createFollowDto: CreateFollowDto): Promise<void> {
    console.log(createFollowDto);
    const existedUserA = await this.getUser(createFollowDto.userId);
    const existedUserB = await this.getUser(createFollowDto.followUserId);
    if (existedUserA && existedUserB) {
      const follow = await this.followRepository.findBy({
        follower_id: Equal(createFollowDto.userId),
        following_id: Equal(createFollowDto.followUserId),
      });
      console.log(follow);
      if (follow.length <= 0) {
        // 없는 관계면 생성
        await this.followRepository.save({
          follower_id: createFollowDto.userId,
          following_id: createFollowDto.followUserId,
        });
      } else {
        // 이미 있는 관계면 삭제
        await this.followRepository.delete(follow[0].follow_id);
      }
    }
  }

  // [4] 유저 id로 정보 조회
  async getUser(id: number): Promise<SimpleUserDto> {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) {
      throw new NotFoundException(`user id ${id} not found`);
    }
    return user;
  }

  async create(createUserdto: CreateUserDto): Promise<void> {
    await this.userRepository.save({
      ...createUserdto,
      refreshToken: '신선한 토큰',
    });
  }

  async deleteOne(id: number): Promise<void> {
    const user = await this.getUser(id);
    if (user) {
      await this.userRepository.delete(id);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const simpleUserDto = await this.getUser(id);
    if (simpleUserDto) {
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          nickname: updateUserDto.nickname,
          image: updateUserDto.image,
          introduce: updateUserDto.introduce,
        })
        .where('user_id = :id', { id })
        .execute();
    }
  }
}
