import {
  Query,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SimpleUserDto } from './dto/simple.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateFollowDto } from './dto/create.follow.dto';
import { GetUserDto } from './dto/get.user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { memoryStorage } from 'multer';

// @UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // [#] 테스트용 코드
  @Get()
  getAll(): Promise<SimpleUserDto[]> {
    return this.usersService.getAll();
  }

  // [1] 유저 nickname으로 정보 조회
  @Get('search')
  @UseGuards(JwtAuthGuard)
  searchUsersNickname(
    @Req() req: Request,
    @Query('nickname') searchNickname: string,
  ): Promise<GetUserDto[]> {
    console.log(req.user);
    return this.usersService.searchUsersNickname(searchNickname);
  }

  // [2] 유저Id로 팔로우 목록 조회
  @Get('following/:id')
  getFollowUsers(@Param('id') id: number): Promise<GetUserDto[]> {
    return this.usersService.getFollowUsers(id);
  }

  // [3] 팔로우 생성 및 삭제
  @Post('follow')
  followUser(@Body() createFollowDto: CreateFollowDto) {
    return this.usersService.followUser(createFollowDto);
  }

  // [4] 유저 토픽 조회
  @Get('topic/:id')
  getUserTopics(@Param('id') userId: number) {
    return this.usersService.getUserTopics(userId);
  }

  // [5] 유저 리프 조회
  @Get('leaf/:id')
  getUserLeafs(@Param('id') userId: number) {
    return this.usersService.getUserLeafs(userId);
  }

  // [6] 특정 유저가 즐겨찾기한 리프 조회
  // 헤더값으로 요청한 유저의 아이디값을 알아야함
  // 현재 더미 userId: 2 전달
  @UseGuards(JwtAuthGuard)
  @Get('bookmark')
  getBookmarkLeafs(@Req() req: Request) {
    return this.usersService.getBookmarkLeafs(req.user['user_id']);
  }

  // [7] 즐겨찾기 추가 및 제거
  // 헤더값으로 요청한 유저의 아이디값을 알아야함
  // 현재 더미 userId: 2 전달
  @UseGuards(JwtAuthGuard)
  @Post('bookmark/:id')
  addBookmarkLeaf(@Param('id') leafId: number, @Req() req: Request) {
    return this.usersService.addBookmarkLeaf(req.user['user_id'], leafId);
  }

  // [8] 리프 좋아요 추가 및 삭제
  // 헤더값으로 요청한 유저의 아이디값을 알아야함
  // 현재 더미 userId: 2 전달
  @UseGuards(JwtAuthGuard)
  @Post('like/:id')
  addLikeLeaf(@Param('id') leafId: number, @Req() req: Request) {
    return this.usersService.addLikeLeaf(req.user['user_id'], leafId);
  }

  // [9] 유저 id로 정보 조회
  @Get(':id')
  getUser(@Param('id') id: number): Promise<GetUserDto> {
    return this.usersService.getUser(id);
  }
  // [10] 유저 삭제
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.deleteOne(id);
  }
  // [11] 유저 정보 수정
  // @ApiConsumes('multipart/form-data')
  // @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 2097152 }, // 2MB --- 2*2^20
      fileFilter: (req, file, callback) => {
        return file.mimetype.match(/image\/(jpg|jpeg|png|gif)$/)
          ? callback(null, true)
          : callback(new BadRequestException('Only image files are allowed'), false);
      }
    })
  )
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @UploadedFile() profileImg) {
    // console.log('body :', updateUserDto);
    return this.usersService.update(id, updateUserDto, profileImg);
  }

  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('image'))
  // @Post('profile-image')
  // async profileImg(@Req() req:Request, @UploadedFile() file){
  //   console.log(file)
  //   const user = req.user
  //   console.log(user["user_id"])

  //   const url = await this.usersService.uploadImage('user-id', file);
  //   console.log(url)
  // }
}
