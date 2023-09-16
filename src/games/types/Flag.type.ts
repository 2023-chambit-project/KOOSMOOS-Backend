import { Moon } from './Moon.type';

export interface Flag {
  idx: number;
  writer: string;
  greeting: string;
  posX: number;
  posY: number;
  createAt: string;
  shape: keyof Moon;
}
