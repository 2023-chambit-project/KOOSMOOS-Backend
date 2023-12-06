import type * as T from '../types';

export class ResMoonNLFlags {
  moonShape: keyof T.Moon;
  flagList: Omit<T.Flag, 'shape' | 'createAt'>[];
}
