import { IsDateString, IsUUID } from "class-validator";

export class WorkoutUpdateDto {

    @IsUUID()
    workoutId: string

    @IsDateString()
    timeEnd: Date;
}