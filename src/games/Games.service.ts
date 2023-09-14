import { Injectable } from '@nestjs/common';
import { MBTIResults } from './constants/MBTIResult';

@Injectable()
export class GamesService {
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
}
