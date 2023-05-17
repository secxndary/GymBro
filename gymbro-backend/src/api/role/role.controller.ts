import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto';
import { Roles } from '../../auth/decorator/auth-roles.decorator';
import { JwtGuard } from '../../auth/guard';
import { GetUser } from '../../auth/decorator';
import { User } from '@prisma/client';
import { RolesGuard } from '../../auth/guard/roles.guard';


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

    @Get('get-by-name/:name')
    async getRoleByName(@Param('name') roleName: string) {
        return this.roleService.getRoleByName(roleName);
    }

    @Get('get-by-id/:id')
    async getRoleById(@Param('id') id: string) {
        return this.roleService.getRoleById(id);
    }
   
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Post()
    async createRole(@Body() dto: RoleDto) {
        return this.roleService.createRole(dto);
    }
}
