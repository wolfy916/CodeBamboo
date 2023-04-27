import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  follow_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn()
  follower_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn()
  following_id: number;
}
