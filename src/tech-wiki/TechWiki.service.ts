import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DateCalculation from 'src/utils/DateCalculation';
import { Repository } from 'typeorm';
import { ReqCreatePostDTO, ResPostDTO, ResPostSummaryDTO } from './dtos';
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
    const result = found.map((post) => {
      return {
        id: post.id,
        thumbnail: post.thumbnail_list,
        title: post.title,
        description: post.description,
        date: post.createAt,
      };
    });
    return result;
  }

  async getTechWikiPost(postId: number): Promise<ResPostDTO> {
    const found = await this.postRepository.findOneBy({ id: postId });
    try {
      if (!found)
        throw new HttpException(
          '존재하지 않는 게시물입니다.',
          HttpStatus.NOT_FOUND,
        );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
    const result = {
      id: found.id,
      thumbnail: found.thumbnail_post,
      title: found.title,
      date: found.createAt,
      content: found.content,
      writer: {
        profile_img: found.profile_img,
        nickname: found.nickname,
      },
    };
    return result;
  }

  async savePost(request: ReqCreatePostDTO) {
    const { year, month, date } = DateCalculation.getTodaysYMD();
    const newPost: T.Post = {
      id: 0,
      createAt: `${year}-${month}-${date}`,
      thumbnail: request.thumbnail,
      title: request.title,
      description: request.description,
      content: request.content,
      nickname: request.writer.nickname,
      profile_img: request.writer.profile_img,
    };
    this.postRepository.save(newPost);
  }

  /**
   * 나중에 구현해야합니다.
   */
  // async updatePost(postId: number, updateData: ReqUpdatePostDTO) {
  //   let found: T.Post = await this.postRepository.findOneBy({ id: postId });
  //   try {
  //     if (!found)
  //       throw new HttpException(
  //         '존재하지 않는 게시물입니다.',
  //         HttpStatus.NOT_FOUND,
  //       );
  //   } catch (e) {
  //     throw new HttpException(e.message, HttpStatus.NOT_FOUND);
  //   }

  //   found = {
  //     ...found,
  //     ...updateData,
  //   };
  //   await this.postRepository.save(found);
  // }

  async removePost(postId: number) {
    const found = await this.postRepository.findOneBy({ id: postId });
    try {
      if (!found)
        throw new HttpException(
          '존재하지 않는 게시물입니다.',
          HttpStatus.NOT_FOUND,
        );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
    await this.postRepository.delete({ id: found.id });
  }
}
