import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ReqCreatePostDTO,
  ReqUpdatePostDTO,
  ResPostDTO,
  ResPostSummaryDTO,
} from './dtos';
import { PostEntity } from './entities/Post.entity';
import type * as T from './types';

@Injectable()
export class TechWikiService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}
  async getTechWikiSummaryList(): Promise<ResPostSummaryDTO[]> {
    const found = await this.postRepository.find();
    const result = found.map((post) => ResPostSummaryDTO.of(post));
    return result;
  }

  async getTechWikiPost(postId: number): Promise<ResPostDTO> {
    const found: T.Post = await this.postRepository.findOneBy({ id: postId });
    try {
      if (!found)
        throw new HttpException(
          '존재하지 않는 게시물입니다.',
          HttpStatus.NOT_FOUND,
        );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
    const result = ResPostDTO.of(found);
    return result;
  }

  async savePost(request: ReqCreatePostDTO) {
    /** id, date 는 db에서 알아서 나온다. */
    const newPost: T.Post = {
      id: 0,
      createAt: '2023-01-01',
      thumbnail: request.thumbnail,
      title: request.title,
      description: request.description,
      content: request.content,
      nickname: request.writer.nickname,
      profile_img: request.writer.profile_img,
    };
    this.postRepository.save(newPost);
  }

  async updatePost(postId: number, updateData: ReqUpdatePostDTO) {
    let found: T.Post = await this.postRepository.findOneBy({ id: postId });
    try {
      if (!found)
        throw new HttpException(
          '존재하지 않는 게시물입니다.',
          HttpStatus.NOT_FOUND,
        );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }

    found = {
      ...found,
      ...updateData,
    };
    await this.postRepository.save(found);
  }

  async removePost(postId: number) {
    const found: T.Post = await this.postRepository.findOneBy({ id: postId });
    try {
      if (!found)
        throw new HttpException(
          '존재하지 않는 게시물입니다.',
          HttpStatus.NOT_FOUND,
        );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
    await this.postRepository.remove(found);
  }
}
