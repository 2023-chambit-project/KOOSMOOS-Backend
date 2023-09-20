import { PartialType } from '@nestjs/mapped-types';
import { ReqCreatePostDTO } from './ReqCreatePost.dto';

export class ReqUpdatePostDTO extends PartialType(ReqCreatePostDTO) {}
