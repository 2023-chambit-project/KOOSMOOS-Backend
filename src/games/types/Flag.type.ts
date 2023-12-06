import type * as T from '.';

export interface Flag {
  id: number;
  writer: string;
  greeting: string;
  posX: number;
  posY: number;
  createAt: string;
  img_src: string;
  shape: keyof T.Moon;
}
