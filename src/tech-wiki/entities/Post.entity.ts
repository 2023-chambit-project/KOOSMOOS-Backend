import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column()
  thumbnail: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createAt: string;

  @Column()
  nickname: string;

  @Column()
  profile_img: string;

  @Column({
    type: 'longtext',
  })
  content: string;
}
