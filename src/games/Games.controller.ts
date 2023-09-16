import { Body, Controller, Get, Post } from '@nestjs/common';
import { GamesService } from './Games.service';
import { AnswersDTO } from './dtos/Answers.dto';

@Controller('api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  private readonly DATA_URL =
    'https://apis.data.go.kr/B090041/openapi/service/LunPhInfoService/getLunPhInfo';
  @Post('mbti')
  getMBTIResult(@Body() request: AnswersDTO): { resultImageSrc: string } {
    return this.gamesService.analyzeMBTI(request.answers);
  }
  @Get('flags')
  async getFlags() {
    return this.gamesService.getFlags();
  }
}
