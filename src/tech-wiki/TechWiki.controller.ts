import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TechWikiService } from './TechWiki.service';
import { ReqCreatePostDTO } from './dtos/ReqCreatePost.dto';
import { ReqUpdatePostDTO } from './dtos/ReqUpdatePost.dto';
import { ResPostDTO } from './dtos/ResPost.dto';

@Controller('/api/wiki')
export class TechWikiController {
  constructor(private readonly techWikiService: TechWikiService) {}
  // 게시물 목록 조회
  @Get()
  getTechWikiSummaryList() {
    return this.techWikiService.getTechWikiSummaryList();
  }
  // 특정 게시물 정보 조회
  @Get('/:id')
  getTechWikiPost(@Param('id') postId: number): ResPostDTO {
    return this.techWikiService.getTechWikiPost(postId);
  }
  // 게시물 업로드
  @Post()
  uploadPost(@Body() request: ReqCreatePostDTO) {
    this.techWikiService.savePost(request);
  }
  // 게시물 수정
  @Patch('/:id')
  updatePost(
    @Param('id') postId: number,
    @Body() updateData: ReqUpdatePostDTO,
  ) {
    return this.techWikiService.updatePost(postId, updateData);
  }
  // 게시물 삭제
  @Delete('/:id')
  deletePost(@Param('id') postId: number) {
    this.techWikiService.removePost(postId);
  }
}
