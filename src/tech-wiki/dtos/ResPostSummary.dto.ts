import type { Post } from '../types/Post.type';

export class ResPostSummaryDTO {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  date: string;

  static of(post: Post): ResPostSummaryDTO {
    return {
      id: post.id,
      thumbnail: post.thumbnail,
      title: post.title,
      description: post.description,
      date: post.createAt,
    };
  }
}
