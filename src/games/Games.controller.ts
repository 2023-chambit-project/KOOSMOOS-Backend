import { Body, Controller, Get, Post } from '@nestjs/common';
import { GamesService } from './Games.service';
import { ReqAnswersDTO, ReqFlagDTO } from './dtos';
import { ResMoonNLFlags } from './dtos/ResMoonNFlags.dto';

@Controller('/api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  // MBTI 결과 조회
  @Post('/mbti')
  getMBTIResult(@Body() request: ReqAnswersDTO): { resultImageSrc: string } {
    return this.gamesService.analyzeMBTI(request.answers);
  }
  // 오늘 보이는 깃발 조회
  @Get('/flags')
  async getFlags(): Promise<ResMoonNLFlags> {
    return this.gamesService.getFlags();
  }
  // 깃발 세우기
  @Post('/flags')
  async uploadFlag(@Body() request: ReqFlagDTO): Promise<ResMoonNLFlags> {
    return this.gamesService.saveFlag(request);
  }
}
