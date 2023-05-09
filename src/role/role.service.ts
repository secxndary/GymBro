import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleDto } from './dto';
import { where } from 'sequelize';

@Injectable()
export class RoleService {

    constructor(private prisma: PrismaService) { }

    async getRoles() {
        return this.prisma.role.findMany();
    }

    async getRoleByName(name: string) {
        const role = await this.prisma.role.findUnique({
            where: { name }
        });
        if (role)
            return role;
        else
            throw new NotFoundException(`Cannot find role with name = ${name}`)
    }

    async createRole(dto: RoleDto) {
        const { name, description } = dto;
        const existingRole = this.prisma.role.findUnique({ where: { name } });
        if (existingRole)
            throw new ConflictException(`There is already a role with name = ${name}`)
        else
            return await this.prisma.role.create({ data: dto });
    }
}
