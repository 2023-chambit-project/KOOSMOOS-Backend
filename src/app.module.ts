import { Module } from '@nestjs/common';
import { GamesController } from './games/Games.controller';
import { GamesService } from './games/Games.service';

@Module({
  imports: [],
  controllers: [GamesController],
  providers: [GamesService],
})
export class AppModule {}
