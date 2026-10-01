import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { User } from './entities/user.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashHelper } from '../helpers/hash.helper.js';
import { Role } from '../role/entities/role.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController],
  providers: [UserService, HashHelper],
  exports: [UserService],
})
export class UserModule {}
