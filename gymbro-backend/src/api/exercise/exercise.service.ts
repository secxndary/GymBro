import { NotFoundException, Injectable, ConflictException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ExerciseDto } from './dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class ExerciseService {
    constructor(private prisma: PrismaService) { }


    async getAllExercises() {
        return await this.prisma.exercise.findMany();
    }


    async getExerciseById(id: string) {
        return await this.prisma.exercise.findUnique({
            where: { id },
        });
    }


    async getExercisesByWorkoutId(id: string) {
        const exercises = await this.prisma.exercise.findMany({
            include: {
                routine: {
                    include: {
                        workout: {
                            where: { id }
                        }
                    }
                }
            }
        });
        return exercises;
    }



    async getExercisesByRoutineId(id: string) {
        const exercises = await this.prisma.exercise.findMany({
            where: {
                routine: {
                    some: {
                        id: id,
                    },
                },
            },
            include: {
                routine: {
                    where: {
                        id: id,
                    },
                },
            },
        });
        return exercises;
    }





    async createExercise(
        dto: ExerciseDto,
        user: User
    ) {
        const { name, image, technique, muscleGroupId } = dto;
        const exerciseExists = await this.prisma.exercise.findFirst({ where: { name } });
        const muscleGroupExists = await this.prisma.muscleGroup.findFirst({ where: { id: muscleGroupId } });
        if (exerciseExists)
            throw new ConflictException('There is already an exercise with such name');
        if (!muscleGroupExists)
            throw new NotFoundException('There is no muscle group with such id');

        const exercise = await this.prisma.exercise.create({
            data: {
                id: uuidv4(),
                name: name,
                image: image != "" ? image : null,
                technique: technique != "" ? technique : null,
                muscleGroupId: muscleGroupId
            }
        });
        return exercise;
    }



    async updateExercise(
        id: string,
        dto: ExerciseDto,
        user: User
    ) {
        const exerciseToUpdate = await this.prisma.exercise.findFirst({
            where: { id }
        });
        if (!exerciseToUpdate)
            throw new NotFoundException('This user does not have a exercise with such id');

        const exerciseUpdated = await this.prisma.exercise.update({
            where: { id: id },
            data: {
                name: dto.name,
                image: dto.image != "" ? dto.image : null,
                technique: dto.technique != "" ? dto.technique : null,
                muscleGroupId: dto.muscleGroupId
            }
        });

        return exerciseUpdated;
    }



    async deleteExercise(
        id: string,
        user: User
    ) {
        const exerciseToDelete = await this.prisma.exercise.delete({
            where: { id }
        });
        return exerciseToDelete;
    }
}
