import { Module } from '@nestjs/common';
import { HashService } from './Hash.service';
import { ManageController } from './Manage.controller';
import { ManageService } from './Manage.service';

@Module({
  controllers: [ManageController],
  providers: [ManageService, HashService],
})
export class ManageModule {}
