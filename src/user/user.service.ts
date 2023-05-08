import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MeasurementDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async addMeasurements(dto: MeasurementDto) {
        // const measurements = this.prisma.bodyMeasurement.create({ dto });
    }

    async getAllUsers(user: User) {
        if (user.roleId === 2)
            return this.prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    // password: true,
                    firstName: true,
                    lastName: true,
                    roleId: true
                }
            });
        else
            throw new ForbiddenException('You must be an admin to view this information');
    }
}
