import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { MBTIResults } from './constants/MBTIResult';
import { ReqFlagDTO } from './dtos/ReqFlag.dto';
import { FlagsRepository } from './repository/FlagsRepository.memory';
import type { Flag } from './types/Flag.type';
import { Moon } from './types/Moon.type';

@Injectable()
export class GamesService {
  constructor(private readonly httpService: HttpService) {}
  /* 아래 코드는 DB 연동 이후 삭제 됩니다. */
  flagsRepository = new FlagsRepository();

  // MBTI 분석하기.
  analyzeMBTI(input: string[]) {
    const counter = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    };
    for (const character of input) {
      counter[character]++;
    }
    const result =
      (counter.E >= counter.I ? 'E' : 'I') +
      (counter.S >= counter.N ? 'S' : 'N') +
      (counter.T >= counter.F ? 'T' : 'F') +
      (counter.J >= counter.P ? 'J' : 'P');
    return { resultImageSrc: MBTIResults[result] };
  }

  // 모든 깃발 가져오기.
  async getFlags(): Promise<Flag[]> {
    const lunInfo = await this.getLunInfo();
    const moonShape = this.getMoonShape(lunInfo.lunAge);
    const flags = this.flagsRepository.getTodaysFlags(moonShape);
    return flags;
  }

  async saveFlag(request: ReqFlagDTO) {
    const lunInfo = await this.getLunInfo();
    const moon = this.getMoonShape(lunInfo.lunAge);

    const newFlag: Flag = {
      id: 0,
      writer: request.writer,
      greeting: request.greeting,
      posX: request.posX,
      posY: request.posY,
      createAt: '2023-01-01',
      shape: moon,
    };

    // 중복값에 대한 예처리가 필요한다.
    try {
      this.flagsRepository.save(newFlag);
    } catch {}
  }
  private getMoonShape(lunAge): keyof Moon {
    if (lunAge < 3 || 27 < lunAge) return 'newMoon'; // 초하루
    if (lunAge < 7) return 'waxingCrescent'; // 초승
    if (lunAge < 10) return 'firstQuarter'; // 상현
    if (lunAge < 14) return 'waxingGibbous'; // 상현 -> 보름
    if (lunAge < 16) return 'fullMoon'; // 보름
    if (lunAge < 19) return 'waningGibbous'; // 보름 -> 하현
    if (lunAge < 23) return 'thirdQuarter'; // 하현
    if (lunAge <= 27) return 'waningCrescent'; // 그믐
  }

  private async getLunInfo() {
    const DATA_URL =
      'https://apis.data.go.kr/B090041/openapi/service/LunPhInfoService/getLunPhInfo';
    const TODAY = new Date();
    const TODAY_SOL_YEAR = TODAY.getFullYear().toString().padStart(4, '0');
    const TODAY_SOL_MONTH = (TODAY.getMonth() + 1).toString().padStart(2, '0');
    const TODAY_SOL_DAY = TODAY.getDate().toString().padStart(2, '0');

    let result;
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get(DATA_URL, {
            params: {
              serviceKey: process.env.NEST_PUBLIC_DATA_LUNA_KEY,
              solYear: TODAY_SOL_YEAR,
              solMonth: TODAY_SOL_MONTH,
              solDay: TODAY_SOL_DAY,
            },
          })
          .pipe(
            catchError(() => {
              throw new Error('제공받은 서비스에 문제가 있습니다.\n');
            }),
          ),
      );
      result = data.response.body.items.item;
      if (result === null || result === undefined) {
        throw new Error('달의 정보를 가져오는 것에 실패했습니다.');
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
    return result;
  }
}
