import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './Games.controller';
import { GamesService } from './Games.service';
import { FlagEntity } from './entities/Flag.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([FlagEntity])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
