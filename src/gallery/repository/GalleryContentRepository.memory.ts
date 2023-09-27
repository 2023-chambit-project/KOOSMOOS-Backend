import { GalleryContent } from '../types';

export class galleryContentRepository {
  private galleryContents: GalleryContent[] = [
    {
      id: 1,
      contentSrc: '/assets/tech-wiki/list-thumbnail/thumbnail1.png',
      createAt: '2021-09-01',
      likes: 123,
      category: 'space',
    },
    {
      id: 2,
      contentSrc: '/assets/tech-wiki/list-thumbnail/thumbnail1.png',
      createAt: '2023-02-01',
      likes: 152,
      category: 'launch',
    },
    {
      id: 3,
      contentSrc: '/assets/tech-wiki/list-thumbnail/thumbnail1.png',
      createAt: '2022-12-31',
      likes: 123123,
      category: 'video',
    },
    {
      id: 4,
      contentSrc: '/assets/tech-wiki/list-thumbnail/thumbnail1.png',
      createAt: '2011-06-21',
      likes: 129213,
      category: 'AS',
    },
    {
      id: 5,
      contentSrc: '/assets/tech-wiki/list-thumbnail/thumbnail1.png',
      createAt: '2010-03-21',
      likes: 132,
      category: 'planet',
    },
    {
      id: 6,
      contentSrc: '/assets/tech-wiki/list-thumbnail/thumbnail1.png',
      createAt: '2011-03-21',
      likes: 132123,
      category: 'planet',
    },
  ];
  save(content: GalleryContent, id?: number) {
    const newId = id
      ? id
      : this.galleryContents[this.galleryContents.length - 1].id + 1;
    const formattedDate = this.getFormattedDate(new Date());
    content.id = newId;
    content.createAt = formattedDate;
    this.galleryContents.push(content);
  }

  getOne(contentId): GalleryContent {
    const found = this.galleryContents.find(
      (content) => content.id === contentId,
    );
    return found;
  }

  searchByCategory(sortBy, category): GalleryContent[] {
    return sortBy === 'likes'
      ? this.galleryContents
          .filter((item) => item.category === category)
          .sort((a, b) => b.likes - a.likes)
      : this.galleryContents
          .filter((item) => item.category === category)
          .sort(
            (a, b) =>
              new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
          );
  }

  remove(contentId) {
    const idx = this.galleryContents.findIndex(
      (content) => content.id === contentId,
    );
    this.galleryContents.splice(idx, 1);
  }

  private getFormattedDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(date.getDate()).padStart(2, '0')}`;
  }
}
