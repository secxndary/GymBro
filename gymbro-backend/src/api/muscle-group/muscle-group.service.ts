import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';


@Injectable()
export class MuscleGroupService {

    constructor(private prisma: PrismaService) { }

    async getAllMuscleGroups(user: User) {
        return await this.prisma.muscleGroup.findMany({});
    }
}
