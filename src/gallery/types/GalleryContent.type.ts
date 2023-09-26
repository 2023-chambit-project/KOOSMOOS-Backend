import type { Category } from './Category.type';

export interface GalleryContent {
  id: number;
  contentSrc: string;
  createAt: string;
  likes: number;
  category: Category;
}
