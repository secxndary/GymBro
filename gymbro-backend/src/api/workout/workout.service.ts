import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { WorkoutDto, WorkoutUpdateDto } from './dto';
import { v4 as uuidv4 } from 'uuid';


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


    async getWorkoutById(user: User, id: string) {
        const workout = await this.prisma.workout.findFirst({
            where: { id }
        });
        return workout;
    }


    async startWorkout(
        user: User,
        dto: WorkoutDto
    ) {
        const workout = await this.prisma.workout.create({
            data: {
                id: uuidv4(),
                timeStart: dto.timeStart,
                routineId: dto.routineId
            }
        });
        return workout;
    }


    async endWorkout(
        user: User,
        dto: WorkoutUpdateDto
    ) {
        const workout = await this.prisma.workout.update({
            where: {
                id: dto.workoutId
            },
            data: {
                timeEnd: dto.timeEnd
            }
        });
        return workout;
    }
}
