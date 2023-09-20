import { IsNumber, IsString, Length } from 'class-validator';

export class ReqFlagDTO {
  @IsString()
  writer: string;
  @IsString()
  @Length(1, 20)
  greeting: string;
  @IsNumber()
  posX: number;
  @IsNumber()
  posY: number;
}
