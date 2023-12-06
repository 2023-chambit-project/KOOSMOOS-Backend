import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type * as T from '../types';

@Entity({ name: 'Flag' })
export class FlagEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 9 })
  writer: string;

  @Column({ type: 'varchar', length: 31 })
  greeting: string;

  @Column({ type: 'float' })
  posX: number;

  @Column({ type: 'float' })
  posY: number;

  @CreateDateColumn({ name: 'createAt' })
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
