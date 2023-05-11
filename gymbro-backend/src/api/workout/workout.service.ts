import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';


@Injectable()
export class WorkoutService {

    constructor(private prisma: PrismaService) { }


    async getAllWorkouts() {
        return await this.prisma.workout.findMany({
            include: {
                routine: {
                    include: {
                        user: true
                    }
                }
            },
        });
    }


    async getWorkouts(user: User) {
        const workouts = await this.prisma.workout.findMany(
            {
                where: {
                    routine: {
                        user: {
                            id: user.id
                        }
                    }
                }
            }
        );
        return workouts;
    }


    // async createWorkout(
    //     dto: WorkoutDto,
    //     user: User
    // ) {
    //     const userHasWorkout = await this.prisma.workout.findFirst({
    //         where: {
    //             userId: user.id,
    //             title: dto.title
    //         }
    //     });
    //     if (userHasWorkout)
    //         throw new ConflictException('This user already has workout with this name');

    //     const workout = await this.prisma.workout.create({
    //         data: {
    //             id: uuidv4(),
    //             title: dto.title,
    //             userId: user.id,
    //         },
    //         select: {
    //             id: true,
    //             title: true,
    //             userId: true
    //         }
    //     });
    //     return workout;
    // }


    // async updateWorkout(
    //     id: string,
    //     dto: WorkoutUpdateDto,
    //     user: User
    // ) {
    //     const workoutToUpdate = await this.prisma.workout.findFirst({
    //         where: {
    //             id: id,
    //             userId: user.id
    //         }
    //     });
    //     if (!workoutToUpdate)
    //         throw new NotFoundException('This user does not have a workout with such id');

    //     const workoutUpdated = await this.prisma.workout.update({
    //         where: { id: id },
    //         data: {
    //             title: dto.title
    //         }
    //     });

    //     return workoutUpdated;
    // }


    // async deleteWorkout(
    //     id: string,
    //     user: User
    // ) {
    //     const workoutToDelete = await this.prisma.workout.findFirst({
    //         where: {
    //             id: id,
    //             userId: user.id
    //         }
    //     });
    //     if (!workoutToDelete)
    //         throw new NotFoundException('This user does not have a workout with such id');

    //     await this.prisma.workout.delete({
    //         where: { id: workoutToDelete.id }
    //     });

    //     return workoutToDelete;
    // }

}
