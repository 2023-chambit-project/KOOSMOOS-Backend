import { Controller, Get, Query } from '@nestjs/common';
import { ResContentDTO } from './dtos';
import { GalleryService } from './gallery.service';
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

  //   @Post()
  //   uploadImageInfo(request: ReqUploadContent) {

  //   }
  //   @Post('/:id')
  //   updateLikeCnt() {}
  //   @Delete('/:id')
  //   deleteImageInfo() {}
}
