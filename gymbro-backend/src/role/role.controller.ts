import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto';
import { Roles } from '../auth/decorator/auth-roles.decorator';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { RolesGuard } from '../auth/guard/roles.guard';


@UseGuards(JwtGuard)
@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService) { }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Get()
    async getRoles() {
        return this.roleService.getRoles();
    }

    @Get('/:name')
    async getRoleByName(@Param('name') roleName: string) {
        return this.roleService.getRoleByName(roleName);
    }
    
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Post()
    async createRole(@Body() dto: RoleDto) {
        return this.roleService.createRole(dto);
    }
}
