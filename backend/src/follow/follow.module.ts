import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { DatabaseModule } from 'src/database/database.module';
import { followRepository } from './follow.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [FollowController],
  providers: [...followRepository, FollowService],
})
export class FollowModule {}
