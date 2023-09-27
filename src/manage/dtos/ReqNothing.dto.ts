import { IsString } from 'class-validator';

export class ReqNothingDto {
  @IsString()
  passward: string;
}
