import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get(':id')
  getFollowList(@Param('id') id: number): Promise<void> {}
}
