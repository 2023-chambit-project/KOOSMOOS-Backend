import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Post' })
export class PostEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  thumbnail_post: string;

  @Column({ type: 'varchar' })
  thumbnail_list: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column()
  createAt: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar' })
  profile_img: string;

  @Column({
    type: 'longtext',
  })
  content: string;
}
