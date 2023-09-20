import { IsString } from 'class-validator';

export class ReqAnswersDTO {
  @IsString({ each: true })
  answers: string[];
}
