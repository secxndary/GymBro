import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto';

@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService) { }

    @Get()
    async getRoles() {
        return this.roleService.getRoles();
    }

    @Get('/:name')
    async getRoleByName(@Param('name') roleName: string) {
        return this.roleService.getRoleByName(roleName);
    }

    @Post()
    async createRole(@Body() dto: RoleDto) {
        return this.roleService.createRole(dto);
    }
}
