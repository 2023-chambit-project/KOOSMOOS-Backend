import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './games/Games.module';
import { TechWikiModule } from './tech-wiki/TechWiki.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true, //한 번 읽은 환경 변수의 값을 캐싱 => 속도 향상
      isGlobal: true, // ConfigModule 을 여기서 한번만 임포트
      envFilePath: '.env.local', // env 파일 탐색 위치
    }),
    GamesModule,
    TechWikiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
