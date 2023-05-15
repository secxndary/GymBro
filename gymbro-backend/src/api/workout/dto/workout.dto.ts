import { IsDateString, IsNotEmpty, IsUUID } from "class-validator";

export class WorkoutDto {

    @IsDateString()
    @IsNotEmpty()
    timeStart: Date;

    @IsUUID()
    routineId: string
}