import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GalleryService } from './Gallery.service';
import { ReqUploadContent, ResContentDTO } from './dtos';
import type { Category, Sorting } from './types';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}
  // 컨텐츠 목록 조회
  @Get()
  findByFilter(
    @Query('sortBy') sortBy: Sorting,
    @Query('category') category: Category,
  ): ResContentDTO[] {
    return this.galleryService.findByFilter(sortBy, category);
  }
  // 컨텐츠 업로드
  @Post()
  uploadImageInfo(request: ReqUploadContent) {
    this.galleryService.saveGalleryContent(request);
  }
  // 좋아요 갱신
  @Patch('/:id')
  upCountLike(@Param('') contentId: number) {
    this.galleryService.upCountLike(contentId);
  }
  // 컨텐츠 삭제
  @Delete('/:id')
  deleteImageInfo(@Param('') contentId: number) {
    this.galleryService.removeContent(contentId);
  }
}
