import { Flag, Moon } from '../types';

export class ResMoonNLFlags {
  moonShape: keyof Moon;
  flagList: Omit<Flag, 'shape'>[];
}
