import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GamesController } from './Games.controller';
import { GamesService } from './Games.service';

@Module({
  imports: [HttpModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
