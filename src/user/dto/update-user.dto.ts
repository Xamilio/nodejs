import { PartialType } from '@nestjs/mapped-types';
import { CreateUserReqDto } from './create-user.req.dto.js';

export class UpdateUserDto extends PartialType(CreateUserReqDto) {}
