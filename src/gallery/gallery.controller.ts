import { Controller, Get, Post, Query } from '@nestjs/common';
import { GalleryService } from './Gallery.service';
import { ReqUploadContent, ResContentDTO } from './dtos';
import type { Category, Sorting } from './types';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}
  @Get()
  findByFilter(
    @Query('sortBy') sortBy: Sorting,
    @Query('category') category: Category,
  ): ResContentDTO[] {
    return this.galleryService.findByFilter(sortBy, category);
  }
  @Post()
  uploadImageInfo(request: ReqUploadContent) {
    this.galleryService.saveGalleryContent(request);
  }
  //   @Post('/:id')
  //   updateLikeCnt() {}
  //   @Delete('/:id')
  //   deleteImageInfo() {}
}
