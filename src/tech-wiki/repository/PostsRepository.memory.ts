import type * as T from '../types';

export class PostRepository {
  private posts: T.Post[] = [
    {
      id: 1,
      thumbnail: `https://github.com/TransparentDeveloper/ImageRepo/blob/main/Gallery/planet/planet3.jpeg?raw=true`,
      title: '1번 포스트입니다.',
      description:
        '천체를 관측해요 천체를 관측해요 천체를 관측해요 천체를 관측해요. 천체를 관측해요 천체를 관측해요 천체를 관측해요',
      createAt: '2023-09-15',
      nickname: 'TransparentDeveloper',
      profile_img: 'https://avatars.githubusercontent.com/u/50646145?v=4',
      content: '안녕하세요. 팀 LOSS의 **TransparentDeveloper**입니다.',
    },
    {
      id: 2,
      thumbnail: `https://github.com/TransparentDeveloper/ImageRepo/blob/main/Gallery/planet/planet5.jpeg?raw=true`,
      title: '2번 포스트입니다.',
      description:
        '천체를 관측해요 천체를 관측해요 천체를 관측해요 천체를 관측해요. 천체를 관측해요 천체를 관측해요 천체를 관측해요',
      createAt: '2023-09-14',
      nickname: 'Doeunnkimm',
      profile_img: 'https://avatars.githubusercontent.com/u/112946860?v=4',
      content: '안녕하세요. 팀 LOSS의 **Doeunnkimm**입니다.',
    },
    {
      id: 3,
      thumbnail: `https://github.com/TransparentDeveloper/ImageRepo/blob/main/Gallery/space/space6.jpeg?raw=true`,
      title: '3번 포스트입니다.',
      description:
        '천체를 관측해요 천체를 관측해요 천체를 관측해요 천체를 관측해요. 천체를 관측해요 천체를 관측해요 천체를 관측해요',
      createAt: '2023-09-15',
      nickname: 'smilevictory',
      profile_img: 'https://avatars.githubusercontent.com/u/113532580?v=4',
      content: '안녕하세요. 팀 LOSS의 **smilevictory**입니다.',
    },
    {
      id: 4,
      thumbnail: `https://github.com/TransparentDeveloper/ImageRepo/blob/main/Gallery/space/space4.jpeg?raw=true`,
      title: '4번 포스트입니다.',
      description:
        '천체를 관측해요 천체를 관측해요 천체를 관측해요 천체를 관측해요. 천체를 관측해요 천체를 관측해요 천체를 관측해요',
      createAt: '2023-09-14',
      nickname: 'TransparentDeveloper',
      profile_img: 'https://avatars.githubusercontent.com/u/50646145?v=4',
      content: '안녕하세요. 팀 LOSS의 **TransparentDeveloper**입니다.',
    },
  ];
  remove(postId) {
    const idx = this.posts.findIndex((post) => post.id === postId);
    this.posts.splice(idx, 1);
  }
  save(post: T.Post) {
    const id = this.posts[this.posts.length - 1].id + 1;
    const formattedDate = this.getFormattedDate(new Date());

    post.id = id;
    post.createAt = formattedDate;
    this.posts.push(post);
  }
  getAll(): T.Post[] {
    return this.posts;
  }
  getOne(postId): T.Post {
    const found = this.posts.find((post) => post.id === postId);
    return found;
  }
  private getFormattedDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(date.getDate()).padStart(2, '0')}`;
  }
}
