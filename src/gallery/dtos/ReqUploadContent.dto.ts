import { IsIn, IsUrl } from 'class-validator';
import type { Category } from '../types';

export class ReqUploadContent {
  @IsIn(['launch', 'space', 'planet', 'AS', 'video'])
  category: Category;
  @IsUrl()
  contentSrc: string;
}
