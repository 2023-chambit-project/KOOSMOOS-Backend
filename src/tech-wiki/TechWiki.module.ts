import { Module } from '@nestjs/common';
import { TechWikiController } from './TechWiki.controller';
import { TechWikiService } from './TechWiki.service';

@Module({
  controllers: [TechWikiController],
  providers: [TechWikiService],
})
export class TechWikiModule {}
