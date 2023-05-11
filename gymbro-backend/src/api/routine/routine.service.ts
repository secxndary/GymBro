import { NotFoundException, Injectable, ConflictException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { RoutineDto, RoutineUpdateDto } from './dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class RoutineService {
    constructor(private prisma: PrismaService) { }

    
    async getAllRoutines() {
        return await await this.prisma.routine.findMany();
    }


    async getRoutines(user: User) {
        const routines = await this.prisma.routine.findMany({
            where: { userId: user.id },
            select: {
                id: true,
                title: true,
                userId: true
            }
        });
        return routines;
    }


    async createRoutine(
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
            throw new ConflictException('This user already has routine with this name');

        const routine = await this.prisma.routine.create({
            data: {
                id: uuidv4(),
                title: dto.title,
                userId: user.id,
            },
            select: {
                id: true,
                title: true,
                userId: true
            }
        });
        return routine;
    }


    async updateRoutine(
        id: string,
        dto: RoutineUpdateDto,
        user: User
    ) {
        const routineToUpdate = await this.prisma.routine.findFirst({
            where: {
                id: id,
                userId: user.id
            }
        });
        if (!routineToUpdate)
            throw new NotFoundException('This user does not have a routine with such id');

        const routineUpdated = await this.prisma.routine.update({
            where: { id: id },
            data: {
                title: dto.title
            }
        });

        return routineUpdated;
    }


    async deleteRoutine(
        id: string,
        user: User
    ) {
        const routineToDelete = await this.prisma.routine.findFirst({
            where: {
                id: id,
                userId: user.id
            }
        });
        if (!routineToDelete)
            throw new NotFoundException('This user does not have a routine with such id');

        await this.prisma.routine.delete({
            where: { id: routineToDelete.id }
        });

        return routineToDelete;
    }
}
