import { Injectable } from '@nestjs/common';
import { ReqUploadContent } from './dtos';
import { ResContentDTO } from './dtos/ResContent.dto';
import { galleryContentRepository } from './repository/GalleryContentRepository.memory';
import type { Category, GalleryContent, Sorting } from './types';

@Injectable()
export class GalleryService {
  /* 아래 코드는 DB 연동 이후 삭제 됩니다. */
  galleryContentRepository = new galleryContentRepository();

  findByFilter(sortBy: Sorting, category: Category): ResContentDTO[] {
    const contents = this.galleryContentRepository.findByCategory(
      sortBy,
      category,
    );
    const result = contents.map((content) => ResContentDTO.of(content));
    return result;
  }
  saveGalleryContent(request: ReqUploadContent) {
    const newContent: GalleryContent = {
      id: 0,
      createAt: '2023-01-01',
      contentSrc: request.contentSrc,
      category: request.category,
      likes: 1,
    };
    this.galleryContentRepository.save(newContent);
  }
}
