import type { Flag } from '../types';

export class FlagsRepository {
  // DB 연동 후 아래 코드는 삭제됩니다.
  private flags: Flag[] = [
    {
      id: 2,
      writer: 'user2',
      greeting: 'hello',
      posX: 10.1,
      posY: 15.3,
      createAt: '2023-01-02',
      shape: 'firstQuarter',
    },
    {
      id: 3,
      writer: 'user3',
      greeting: 'world',
      posX: -20.31,
      posY: 51,
      createAt: '2023-01-03',
      shape: 'waxingCrescent',
    },
    {
      id: 4,
      writer: 'user4',
      greeting: 'HIHI.',
      posX: 90.0,
      posY: 0.0,
      createAt: '2023-01-04',
      shape: 'firstQuarter',
    },
    {
      id: 5,
      writer: 'user5',
      greeting: '아ㄴ녕ㅇ핫[여.',
      posX: 52,
      posY: 12.6,
      createAt: '2023-01-05',
      shape: 'waxingGibbous',
    },
    {
      id: 6,
      writer: 'user6',
      greeting: '감사합니다.',
      posX: 43,
      posY: -23,
      createAt: '2023-03-05',
      shape: 'fullMoon',
    },
    {
      id: 7,
      writer: 'user7',
      greeting: '저는 서울에 사는 이윤신입니다..',
      posX: -25,
      posY: -31,
      createAt: '2025-01-07',
      shape: 'waningGibbous',
    },
    {
      id: 8,
      writer: 'user8',
      greeting: '인사드립니다.',
      posX: 12.2,
      posY: 8.3,
      createAt: '2022-01-03',
      shape: 'thirdQuarter',
    },
    {
      id: 9,
      writer: 'user9',
      greeting: '굿굿.',
      posX: 42.5,
      posY: -8.3,
      createAt: '2023-01-06',
      shape: 'waningCrescent',
    },
  ];
  save(flag: Flag) {
    const id = this.flags[this.flags.length - 1].id + 1;
    const formattedDate = this.getFormattedDate(new Date());

    flag.id = id;
    flag.createAt = formattedDate;
    this.flags.push(flag);
  }
  getTodaysFlags(moonShape) {
    return this.flags.filter((flag) => {
      return flag.shape == moonShape;
    });
  }

  private getFormattedDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(date.getDate()).padStart(2, '0')}`;
  }
}
