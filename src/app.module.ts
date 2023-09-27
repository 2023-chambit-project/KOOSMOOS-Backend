import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GalleryModule } from './gallery/gallery.module';
import { GamesModule } from './games/Games.module';
import { TechWikiModule } from './tech-wiki/TechWiki.module';
import { ManageModule } from './manage/manage.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true, //한 번 읽은 환경 변수의 값을 캐싱 => 속도 향상
      isGlobal: true, // ConfigModule 을 여기서 한번만 임포트
      envFilePath: '.env.local', // env 파일 탐색 위치
    }),
    GamesModule,
    TechWikiModule,
    GalleryModule,
    ManageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
