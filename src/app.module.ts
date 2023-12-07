import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GamesModule } from './games/Games.module';
import { FlagEntity } from './games/entities/Flag.entity';
import { ManageModule } from './manage/Manage.module';
import { TechWikiModule } from './tech-wiki/TechWiki.module';
import { PostEntity } from './tech-wiki/entities/Post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true, //한 번 읽은 환경 변수의 값을 캐싱 => 속도 향상
      isGlobal: true, // ConfigModule 을 여기서 한번만 임포트
      envFilePath: '.env.local', // env 파일 탐색 위치
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWD,
      database: process.env.DB_DATABASE,
      entities: [FlagEntity, PostEntity],
      synchronize: false,
      autoLoadEntities: true, // entity 가 자동으로 로드
    }),
    GamesModule,
    TechWikiModule,
    ManageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
