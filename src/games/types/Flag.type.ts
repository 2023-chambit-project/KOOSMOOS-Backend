import type { Moon } from './Moon.type';

export interface Flag {
  id: number;
  writer: string;
  greeting: string;
  posX: number;
  posY: number;
  createAt: string;
  shape: keyof Moon;
}
