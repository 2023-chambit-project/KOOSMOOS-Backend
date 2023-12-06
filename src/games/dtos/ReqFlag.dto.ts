import { IsNumber, IsString, Length } from 'class-validator';

export class ReqFlagDTO {
  @IsString()
  @Length(1, 9)
  writer: string;
  @IsString()
  @Length(1, 31)
  greeting: string;
  @IsNumber()
  posX: number;
  @IsNumber()
  posY: number;
}
