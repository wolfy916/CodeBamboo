import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TopicsModule } from './topics/topics.module';
import { ConfigModule } from '@nestjs/config';
import { LeafsModule } from './leafs/leafs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.main.env',
      isGlobal: true,
    }),
    UsersModule,
    TopicsModule,
    LeafsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
