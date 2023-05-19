import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MeasurementDto, UserDto } from './dto';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }


    // async addMeasurements(
    //     user: User,
    //     dto: MeasurementDto
    // ) {
    //     const { weight, height, chest, neck, shoulders, leftBicep, rightBicep,
    //         leftForearm, rightForearm, waist, thighs, calves } = dto;
    //     const measurements = this.prisma.bodyMeasurement.create({
    //         data: {
    //             id: uuidv4(),
    //             userId: user.id,
    //             weight, height, chest, neck, shoulders,
    //             leftBicep, rightBicep, leftForearm, rightForearm,
    //             waist, thighs, calves
    //         }
    //     });
    //     return measurements;
    // }


    async getMe(user: User) {
        return user;
    }


    async getAllUsers(user: User) {
        // if (user.roleId === 2)
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                // password: true,
                firstName: true,
                lastName: true,
                role: true
            }
        });
        // else
        //     throw new ForbiddenException('You must be an admin to view this information');
        // }
    }


    async updateUser(user: User, dto: UserDto) {
        return await this.prisma.user.update({
            data: dto,
            where: {
                id: user.id
            }
        });
    }
}
