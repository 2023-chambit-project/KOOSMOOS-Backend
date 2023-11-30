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
import { ReqCreatePostDTO, ReqUpdatePostDTO, ResPostDTO } from './dtos';

@Controller('/api/wiki')
export class TechWikiController {
  constructor(private readonly techWikiService: TechWikiService) {}
  // 게시물 목록 조회
  @Get()
  async getTechWikiSummaryList() {
    return await this.techWikiService.getTechWikiSummaryList();
  }
  // 특정 게시물 정보 조회
  @Get('/:id')
  async getTechWikiPost(@Param('id') postId: number): Promise<ResPostDTO> {
    return await this.techWikiService.getTechWikiPost(postId);
  }
  // 게시물 업로드
  @Post()
  async uploadPost(@Body() request: ReqCreatePostDTO) {
    await this.techWikiService.savePost(request);
  }
  // 게시물 수정
  @Patch('/:id')
  async updatePost(
    @Param('id') postId: number,
    @Body() updateData: ReqUpdatePostDTO,
  ) {
    await this.techWikiService.updatePost(postId, updateData);
  }
  // 게시물 삭제
  @Delete('/:id')
  async deletePost(@Param('id') postId: number) {
    await this.techWikiService.removePost(postId);
  }
}
