import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ManageService } from './Manage.service';
import { ReqNothingDto } from './dtos';

@Controller('/api/manager')
export class ManageController {
  constructor(private readonly manageService: ManageService) {}
  @Post('/verify')
  @HttpCode(200)
  simpleLogIn(@Body() request: ReqNothingDto) {
    this.manageService.verify(request);
  }
}
