import { IsObject, IsString, IsUrl } from 'class-validator';

export class ReqCreatePostDTO {
  @IsUrl()
  thumbnail: string;
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsString()
  description: string;
  @IsObject()
  writer: {
    profile_img: string;
    nickname: string;
  };
}
