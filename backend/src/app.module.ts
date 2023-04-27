import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.main.env',
      isGlobal: true,
    }),
    UsersModule,
    FollowModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
