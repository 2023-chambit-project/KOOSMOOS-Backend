import type { GalleryContent } from '../types';

export class ResContentDTO {
  id: number;
  contentSrc: string;
  date: string;
  likes: number;

  static of(content: GalleryContent): ResContentDTO {
    return {
      id: content.id,
      contentSrc: content.contentSrc,
      date: content.createAt,
      likes: content.likes,
    };
  }
}
