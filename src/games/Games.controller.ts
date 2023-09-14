import { Body, Controller, Post } from '@nestjs/common';
import { GamesService } from './Games.service';
import { AnswersDTO } from './dtos/Answers.dto';

@Controller('api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  @Post('mbti')
  getTestResult(@Body() request: AnswersDTO) {
    return this.gamesService.analyzeMBTI(request.answers);
  }
}
