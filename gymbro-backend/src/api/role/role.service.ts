import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoleDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class RoleService {

    constructor(private prisma: PrismaService) { }

    async getRoles() {
        return (await this.prisma.role.findMany()).sort((a, b) => a.id - b.id);
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
        console.log({ dto })
        const existingRole = await this.prisma.role.findUnique({ where: { name } });
        console.log(existingRole)
        if (existingRole)
            throw new ConflictException(`There is already a role with name = ${name}`)
        else
            return await this.prisma.role.create({ data: dto });
    }
}
