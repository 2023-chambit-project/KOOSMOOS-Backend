import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PickFlagBackgroundImgSrcOne } from '../utils/AutoPicker';
import DateCalculation from '../utils/DateCalculation';
import getTodaysLunaInfo from './apis.ts/Luna';
import MBTIResults from './constants/MBTIResult';
import { ReqFlagDTO, ResMoonNLFlags } from './dtos';
import { FlagEntity } from './entities/Flag.entity';
import type * as T from './types';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(FlagEntity)
    private flagRepository: Repository<FlagEntity>,
  ) {}

  // MBTI 분석하기.
  analyzeMBTI = (input: string[]) => {
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
  };

  // 모든 깃발 가져오기.
  getFlags = async (): Promise<ResMoonNLFlags> => {
    let moonShape: keyof T.Moon;
    try {
      const lunInfo = await getTodaysLunaInfo();
      moonShape = DateCalculation.getMoonShapeByLunaAge(lunInfo.lunAge);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
    const flags = await this.flagRepository.findBy({ shape: moonShape });

    const result: ResMoonNLFlags = {
      moonShape: moonShape,
      flagList: [],
    };

    flags.forEach((flag) => {
      result.flagList.push({
        id: flag.id,
        writer: flag.writer,
        greeting: flag.greeting,
        posX: flag.posX,
        posY: flag.posY,
        img_src: PickFlagBackgroundImgSrcOne(flag.id),
      });
    });

    return result;
  };

  saveFlag = async (request: ReqFlagDTO): Promise<void> => {
    let moonShape: keyof T.Moon;
    try {
      const lunInfo = await getTodaysLunaInfo();
      moonShape = DateCalculation.getMoonShapeByLunaAge(lunInfo.lunAge);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.SERVICE_UNAVAILABLE);
    }

    const { year, month, date } = DateCalculation.getTodaysYMD();

    const newFlag: Omit<T.Flag, 'img_src'> = {
      id: 0,
      writer: request.writer,
      greeting: request.greeting,
      posX: request.posX,
      posY: request.posY,
      createAt: `${year}-${month}-${date}`,
      shape: moonShape,
    };
    try {
      this.flagRepository.save(newFlag);
    } catch {
      throw new HttpException(
        '저장이 실패하였습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  };
}
