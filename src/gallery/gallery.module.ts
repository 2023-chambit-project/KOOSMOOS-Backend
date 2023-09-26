import { Module } from '@nestjs/common';
import { GalleryController } from './Gallery.controller';
import { GalleryService } from './Gallery.service';

@Module({
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
