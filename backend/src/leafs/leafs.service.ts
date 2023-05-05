import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Leaf } from './entities/leaf.entity';
import { Repository, Like, QueryFailedError } from 'typeorm';
import { CreateLeafDto } from './dto/create.leaf.dto';
import { SimpleLeafDto } from './dto/simple.leaf.dto';
import { Code } from './entities/code.entity';
import { CreateCodeDto } from './dto/create.code.dto';
import { makeLeaf } from './utils/utils';

@Injectable()
export class LeafsService {
  constructor(
    @Inject('LEAF_REPOSITORY')
    private leafRepository: Repository<Leaf>,
    @Inject('CODE_REPOSITORY')
    private codeRepository: Repository<Code>,
  ) {}

  // async getAll(): Promise<SimpleLeafDto[]> {
  //   const leaf = await this.leafRepository.find({
  //     relations: ['user', 'topic', 'code'],
  //     loadRelationIds: { relations: ['user', 'topic'] },
  //   });
  //   return leaf;
  // }

  async search(userInput: string) {
    //title로 조회. where문으로 검색할 수 있음. 괄호 주의
    const titleLeafs = await this.leafRepository.find({
      where: {
        title: Like(`%${userInput}%`),
      },
      relations: { user: true, likes: true, codes: true },
    });
    const userLeafs = await this.leafRepository.find({
      relations: {
        user: true,
        likes: true,
        codes: true,
      },
      where: { user: { nickname: Like(`%${userInput}%`) } },
    });
    //닉네임이나 타이틀로 검색 안되면 []로 들어와서 길이를 재서 유무 판별
    if (userLeafs.length == 0 && titleLeafs.length == 0) {
      throw new NotFoundException(
        `'${userInput}'라는 검색결과를 찾을 수 없습니다.`,
      );
    } else if (userLeafs.length > 0) {
      const user = userLeafs.map((data) => makeLeaf(data));
      return user;
    } else if (titleLeafs.length > 0) {
      const title = titleLeafs.map((data) => makeLeaf(data));
      return title;
    }
  }

  async getOne(id: number) {
    const leaf = await this.leafRepository.findOne({
      relations: { user: true, likes: true, codes: true },
      where: { leaf_id: id },
    });
    // console.log(leaf);
    if (!leaf) {
      throw new NotFoundException(`leaf id ${id} not found`);
    }
    const response = makeLeaf(leaf);
    return response;
  }

  async create(data): Promise<void> {
    // console.log(data);
    //user와 topic에 맞추어줌.
    const userId = { user: { user_id: data.user_id } };
    const topicId = { topic: { topic_id: data.topic_id } };

    //type 코드 없으면0, 있으면1 처리
    let type = { type: 1 };
    if (data.codes.length == 0) {
      type = { type: 0 };
    }
    //code만 따로 저장
    const createCode = data.code;
    let json = { ...data, ...userId, ...topicId };

    //json에서 code객체만 추출 후 재정의
    const { code, ...obj } = json;
    json = obj;

    //재정의한 객체를 leaf에 저장
    const createLeaf = await this.leafRepository.save(json);

    //leaf_id 가져오기
    const leaf_id = createLeaf.leaf_id;

    //따로 빼놓았던 code를 DB에 저장
    for (let index = 0; index < createCode.length; index++) {
      const element = createCode[index];
      // console.log(element);
      const id = { leaf: { leaf_id: leaf_id } };
      const json: CreateCodeDto = { ...element, ...id };
      // console.log(json);
      await this.codeRepository.save(json);
    }
  }

  //   async deleteOne(id: number): Promise<void> {
  //     const simpleUserDto = await this.getOne(id);
  //     if (simpleUserDto) {
  //       await this.userRepository.delete(id);
  //     }
  //   }

  //   async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
  //     const simpleUserDto = await this.getOne(id);
  //     if (simpleUserDto) {
  //       await this.userRepository
  //         .createQueryBuilder()
  //         .update(User)
  //         .set({
  //           nickname: updateUserDto.nickname,
  //           image: updateUserDto.image,
  //           introduce: updateUserDto.introduce,
  //         })
  //         .where('user_id = :id', { id })
  //         .execute();
  //     }
  //   }
}
