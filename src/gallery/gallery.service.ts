import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReqUploadContent, ResContentDTO } from './dtos';
import { galleryContentRepository } from './repository/GalleryContentRepository.memory';
import type { Category, GalleryContent, Sorting } from './types';

@Injectable()
export class GalleryService {
  /* 아래 코드는 DB 연동 이후 삭제 됩니다. */
  galleryContentRepository = new galleryContentRepository();

  findByFilter(sortBy: Sorting, category: Category): ResContentDTO[] {
    const contents = this.galleryContentRepository.searchByCategory(
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
  upCountLike(contentId: number) {
    const found: GalleryContent =
      this.galleryContentRepository.getOne(contentId);
    if (!found) {
      throw new HttpException(
        '존재하지 않는 컨텐츠입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const { id, contentSrc, createAt, likes, category } = found;
    this.galleryContentRepository.remove(id);
    const updateContent: GalleryContent = {
      id: 0,
      createAt: createAt,
      contentSrc: contentSrc,
      category: category,
      likes: likes + 1,
    };
    this.galleryContentRepository.save(updateContent, id);
  }
  removeContent(contentId) {
    try {
      const found: GalleryContent =
        this.galleryContentRepository.getOne(contentId);
      if (!found) throw new Error('존재하지 않는 게시물입니다.');
      this.galleryContentRepository.remove(found.id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
