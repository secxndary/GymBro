import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RoutineDto } from './dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class RoutineService {
    constructor(private prisma: PrismaService) { }

    async get(user: User) {
        const routines = this.prisma.routine.findMany({
            where: { userId: user.id },
            select: {
                id: true,
                title: true
            }
        });
        return routines;
    }


    async create(
        dto: RoutineDto,
        user: User
    ) {
        const userHasRoutine = await this.prisma.routine.findFirst({
            where: {
                userId: user.id,
                title: dto.title
            }
        });
        if (userHasRoutine)
            throw new ForbiddenException('This user already has routine with this name');

        console.log({ dto, })

        const routine = await this.prisma.routine.create({
            data: {
                id: uuidv4(),
                title: dto.title,
                userId: user.id,
            },
            select: {
                title: true,
                userId: true
            }
        });
        return routine;
    }
}
