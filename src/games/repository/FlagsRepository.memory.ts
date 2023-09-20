import type { Flag } from '../types/Flag.type';

export class FlagsRepository {
  // DB 연동 후 아래 코드는 삭제됩니다.
  private flags: Flag[] = [
    {
      id: 1,
      writer: 'user1',
      greeting: 'hi',
      posX: 192.25,
      posY: 168.31,
      createAt: '2023-01-01',
      shape: 'newMoon',
    },
    {
      id: 2,
      writer: 'user2',
      greeting: 'hello',
      posX: 192.23,
      posY: 168.3,
      createAt: '2023-01-02',
      shape: 'firstQuarter',
    },
    {
      id: 3,
      writer: 'user3',
      greeting: 'world',
      posX: 132.25,
      posY: 170.31,
      createAt: '2023-01-03',
      shape: 'waxingCrescent',
    },
    {
      id: 4,
      writer: 'user4',
      greeting: '안녕하세요.',
      posX: 190.23,
      posY: 160.34,
      createAt: '2023-01-04',
      shape: 'waxingGibbous',
    },
    {
      id: 5,
      writer: 'user5',
      greeting: '인사드립니다.',
      posX: 192.25,
      posY: 128.31,
      createAt: '2023-01-05',
      shape: 'newMoon',
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
