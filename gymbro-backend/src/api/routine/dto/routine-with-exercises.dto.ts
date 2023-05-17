import { Exercise } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";


export class RoutineWithExercisesDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    exercises: Exercise[]
}