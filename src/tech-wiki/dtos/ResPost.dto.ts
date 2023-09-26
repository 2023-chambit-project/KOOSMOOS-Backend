import { Post } from '../types/Post.type';

export class ResPostDTO {
  id: number;
  thumbnail: string;
  title: string;
  date: string;
  content: string;
  writer: {
    profile_img: string;
    nickname: string;
  };

  static of(post: Post): ResPostDTO {
    return {
      id: post.id,
      thumbnail: post.thumbnail,
      title: post.title,
      date: post.createAt,
      content: post.content,
      writer: {
        profile_img: post.profile_img,
        nickname: post.nickname,
      },
    };
  }
}