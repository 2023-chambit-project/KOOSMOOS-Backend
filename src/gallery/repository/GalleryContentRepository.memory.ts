import { GalleryContent } from '../types/galleryContent.type';

export class galleryContentRepository {
  private galContents: GalleryContent[] = [
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
      category: 'artificial_satellite',
    },
    {
      id: 5,
      contentSrc: '/assets/tech-wiki/list-thumbnail/thumbnail1.png',
      createAt: '2010-03-21',
      likes: 132123,
      category: 'planet',
    },
  ];
  save() {}

  findByCategory(sortBy, category): GalleryContent[] {
    return sortBy === 'likes'
      ? this.galContents
          .filter((item) => item.category === category)
          .sort((a, b) => b.likes - a.likes)
      : this.galContents
          .filter((item) => item.category === category)
          .sort(
            (a, b) =>
              new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
          );
  }
}
