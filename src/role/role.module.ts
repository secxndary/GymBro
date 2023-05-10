import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, UserService],
  exports: [RoleService]
})
export class RoleModule { }
