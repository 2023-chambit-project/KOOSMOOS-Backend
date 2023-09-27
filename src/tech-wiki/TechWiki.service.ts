import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ReqCreatePostDTO,
  ReqUpdatePostDTO,
  ResPostDTO,
  ResPostSummaryDTO,
} from './dtos';
import { PostRepository } from './repository/PostsRepository.memory';
import type { Post } from './types';

@Injectable()
export class TechWikiService {
  /* 아래 코드는 DB 연동 이후 삭제 됩니다. */
  postsRepository = new PostRepository();

  getTechWikiSummaryList(): ResPostSummaryDTO[] {
    const found = this.postsRepository.getAll();
    const result = found.map((post) => ResPostSummaryDTO.of(post));
    return result;
  }

  getTechWikiPost(postId: number): ResPostDTO {
    const found: Post = this.postsRepository.getOne(postId);
    try {
      if (!found) throw new Error('존재하지 않는 게시물입니다.');
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
    const result = ResPostDTO.of(found);
    return result;
  }

  savePost(request: ReqCreatePostDTO) {
    /** id, date 는 db에서 알아서 나온다. */
    const newPost: Post = {
      id: 0,
      createAt: '2023-01-01',
      thumbnail: request.thumbnail,
      title: request.title,
      description: request.description,
      content: request.content,
      nickname: request.writer.nickname,
      profile_img: request.writer.profile_img,
    };
    this.postsRepository.save(newPost);
  }

  updatePost(postId: number, updateData: ReqUpdatePostDTO) {
    const found: Post = this.postsRepository.getOne(postId);
    if (!found) {
      throw new HttpException(
        '존재하지 않는 게시물입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const {
      thumbnail,
      title,
      content,
      description,
      writer: { profile_img, nickname },
    } = updateData;

    if (thumbnail) found.thumbnail = thumbnail;
    if (title) found.title = title;
    if (content) found.content = content;
    if (description) found.description = description;
    if (profile_img) found.profile_img = profile_img;
    if (nickname) found.nickname = nickname;

    this.postsRepository.remove(found.id);
    this.postsRepository.save(found);
  }

  removePost(postId: number) {
    try {
      const found: Post = this.postsRepository.getOne(postId);
      if (!found) throw new Error('존재하지 않는 게시물입니다.');
      this.postsRepository.remove(found.id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
