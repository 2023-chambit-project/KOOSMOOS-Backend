import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechWikiController } from './TechWiki.controller';
import { TechWikiService } from './TechWiki.service';
import { PostEntity } from './entities/Post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [TechWikiController],
  providers: [TechWikiService],
})
export class TechWikiModule {}
