import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type * as T from '../types';

@Entity()
export class FlagEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column()
  writer: string;

  @Column()
  greeting: string;

  @Column()
  posX: number;

  @Column()
  posY: number;

  @CreateDateColumn()
  createAt: string;

  @Column({
    type: 'enum',
    enum: [
      'newMoon',
      'waxingCrescent',
      'firstQuarter',
      'waxingGibbous',
      'fullMoon',
      'waningGibbous',
      'thirdQuarter',
      'waningCrescent',
    ],
    default: 'newMoon',
  })
  shape: keyof T.Moon;
}
